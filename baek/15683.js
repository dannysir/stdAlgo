let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);
let Map = input.map(v => v.split(' ').map(Number));

let Cameras = [];
let answer = Infinity;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (Map[i][j] !== 0 && Map[i][j] !== 6) {
            Cameras.push([i, j, Map[i][j]]);
        }

    }
}

const DeepCopy = (map) => {
    let newMap = [];
    map.forEach(v => {
        newMap.push([...v]);
    });
    return newMap;
};

const LeftCamOn = (X, Y, map) => {
    let [NextX, NextY] = [X, Y - 1];
    while (NextY >= 0) {
        if (map[NextX][NextY] !== 6) {
            map[NextX][NextY] = -1;
            NextY--;
        } else break;

    }
};

const RightCamOn = (X, Y, map) => {
    let [NextX, NextY] = [X, Y + 1];
    while (NextY < M) {
        if (map[NextX][NextY] !== 6) {
            map[NextX][NextY] = -1;
            NextY++;
        } else break

    }
};

const UpCamOn = (X, Y, map) => {
    let [NextX, NextY] = [X - 1, Y];
    while (NextX >= 0) {
        if (map[NextX][NextY] !== 6) {

            map[NextX][NextY] = -1;
            NextX--;
        } else break;
    }
};

const DownCamOn = (X, Y, map) => {
    let [NextX, NextY] = [X + 1, Y];
    while (NextX < N) {
        if (map[NextX][NextY] !== 6) {
            map[NextX][NextY] = -1;
            NextX++;
        } else break;
    }
};

const FindAnswer = (map) => {
    let result = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (map[i][j] === 0) {
                result++;
            }
        }
    }
    return result;
};
const Combination = (Cams, Index, map) => {
    if (Index === Cams.length) {
        const result = FindAnswer(map);
        answer = Math.min(result, answer);
        return;
    }
    let OriginalMap = DeepCopy(map);
    const [X, Y, Type] = Cams[Index];

    if (Type === 1) {
        LeftCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        RightCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        UpCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);
    } else if (Type === 2) {
        LeftCamOn(X, Y, map);
        RightCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        UpCamOn(X, Y, map);
        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);
    }else if (Type === 3) {
        UpCamOn(X, Y, map);
        RightCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        RightCamOn(X, Y, map);
        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        DownCamOn(X, Y, map);
        LeftCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        LeftCamOn(X, Y, map);
        UpCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);
    }else if (Type === 4) {
        UpCamOn(X, Y, map);
        RightCamOn(X, Y, map);
        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        LeftCamOn(X, Y, map);
        RightCamOn(X, Y, map);
        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        UpCamOn(X, Y, map);
        LeftCamOn(X, Y, map);
        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);

        UpCamOn(X, Y, map);
        RightCamOn(X, Y, map);
        LeftCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);
    } else {
        UpCamOn(X, Y, map);
        RightCamOn(X, Y, map);
        LeftCamOn(X, Y, map);
        DownCamOn(X, Y, map);
        Combination(Cams, Index + 1, map);
        map = DeepCopy(OriginalMap);
    }
};
Combination(Cameras, 0, Map);
console.log(answer);