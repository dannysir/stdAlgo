let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, K] = input.shift().split(' ').map(Number);

// 내구성 - 로봇 존재
const belt = input[0].split(' ').map(v => {
    return [Number(v), false];
});

const gameEnd = () => {
    let cnt = 0;
    belt.forEach(v => {
        if (v[0] <= 0) {
            cnt++;
        }
    });
    return cnt >= K;
};

const levelOne = () => {
    // 벨트와 로봇을 함께 회전
    const lastElement = belt.pop();
    belt.unshift(lastElement);

    // 내리는 위치의 로봇 제거
    if (belt[N-1][1]) {
        belt[N-1][1] = false;
    }
};

const levelTwo = () => {
    // 내리는 위치부터 시작 위치까지 역순으로 검사
    for (let i = N-2; i >= 0; i--) {
        if (belt[i][1]) {  // 현재 위치에 로봇이 있다면
            if (!belt[i+1][1] && belt[i+1][0] > 0) {  // 다음 위치로 이동 가능하다면
                belt[i][1] = false;
                belt[i+1][1] = true;
                belt[i+1][0]--;

                // 내리는 위치에 도달하면 즉시 로봇 제거
                if (i+1 === N-1) {
                    belt[i+1][1] = false;
                }
            }
        }
    }
};

const levelThree = () => {
    // 올리는 위치에 로봇을 올릴 수 있다면 올린다
    if (!belt[0][1] && belt[0][0] > 0) {
        belt[0][1] = true;
        belt[0][0]--;
    }
};

const solution = () => {
    let step = 0;

    while (!gameEnd()) {
        step++;
        levelOne();
        levelTwo();
        levelThree();
    }

    console.log(step);
};

solution();