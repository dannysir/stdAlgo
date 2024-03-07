let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, K] = input.shift().split(' ').map(Number);
const R2D2 = input.splice(0, N).map(v => v.split(' ').map(Number));
let trees = input.splice(0, M).map(v => (v).split(' ').map(Number));
trees = trees.map(v => {
    v.push(true)
    return v;
});
trees.sort((a, b) => b[2] - a[2]);
let MAP = new Array(N);
for (let i = 0; i < N; i++) {
    MAP[i] = new Array(N).fill(5);
}

const SPRING = () => {
    for (let i = trees.length - 1; i >= 0; i--) {
        let [x, y, age, isLive] = trees[i];
        if (MAP[x - 1][y - 1] >= age) {
            MAP[x - 1][y - 1] -= age;
            age += 1;
        } else {
            isLive = false;
        }
        trees[i] = [x, y, age, isLive];
    }
};

const SUMMER = () => {
    trees = trees.filter(v => {
        if (v[3]) {
            return true;
        } else {
            MAP[v[0] - 1][v[1] - 1] += Math.floor(v[2] / 2);
            return false;
        }

    });
};

const AUTUMN = () => {
    let dx = [1, 1, 1, 0, 0, -1, -1, -1];
    let dy = [1, 0, -1, -1, 1, 1, 0, -1];
    for (let i = 0; i < trees.length; i++) {
        const [x, y, age, isLive] = trees[i];
        if (age % 5 === 0) {
            for (let j = 0; j < dx.length; j++) {
                const nextX = x + dx[j] - 1;
                const nextY = y + dy[j] - 1;
                if (nextX < 0 || nextX >= N ||nextY < 0 || nextY >= N) continue;
                trees.push([nextX + 1, nextY + 1, 1, true]);
            }
        }
    }
};

const WINTER = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            MAP[i][j] += R2D2[i][j];
        }
    }
};

const solution = () => {
    let cnt = 0;
    while (K > cnt) {
        if (trees.length) {
            SPRING();
            SUMMER();
            AUTUMN();
            WINTER();
        }else break;
        cnt++;
    }
    return trees.length;
};
console.log(solution());