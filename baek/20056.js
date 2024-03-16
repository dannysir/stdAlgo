let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, K] = input.shift().split(' ').map(Number);
//파이어볼을 인덱스에 맞게 저장.
const FIREBALL = input.map(v => v.split(' ').map(Number).map(v => {
    v[0] -= 1;
    v[1] -= 1;
    return v;
}));
//3차원 배열 생성.
let MAP = Array.from({length: N}, () =>
    Array.from({length: N}).map(() => [])
);
// 8방향
const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
const dy = [0, 1, 1, 1, 0, -1, -1, -1];
// 파이어볼 4분할시 방향
const goX = [1, 3, 5, 7];
const goPlus = [0, 2, 4, 6];
// 파이어볼 이동.
const FillMap = () => {
    while (FIREBALL.length) {
        let [X, Y, MASS, SPEED, DIR] = FIREBALL.pop();
        // 음수를 대비해 +N 을 진행한 후에 다시 %N
        X = (X + (SPEED * dx[DIR]) % N + N) % N;
        Y = (Y + (SPEED * dy[DIR]) % N + N) % N;
        // MAP에 추가
        MAP[X][Y].push([X, Y, MASS, SPEED, DIR]);

    }
};
// 파이어볼 이동 후 함수.
const Divide = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            // 만약 같은 곳에 파이어볼이 2개 이상일 경우
            if (MAP[i][j].length > 1) {
                let [SumMass, SumSpeed, cntEven, cnt] = [0, 0, 0, MAP[i][j].length];
                while (MAP[i][j].length) {
                    // 파이어볼의 질량과 속도를 모두 더함.
                    const PopItem = MAP[i][j].pop();
                    SumMass += PopItem[2];
                    SumSpeed += PopItem[3];
                    // 파이어볼의 방향이 모두 짝수인지 모두 홀수인지 확인.
                    cntEven = PopItem[4] % 2 === 0 ? cntEven + 1 : cntEven;
                }
                // 4분할 방향 결정.
                let Splash = cntEven === cnt || cntEven === 0 ? goPlus : goX;
                // 만약 질량이 0이 아니면.
                if (Math.floor(SumMass / 5)) {
                    for (const direction of Splash) {
                        // 파이어볼 배열에 저장.
                        FIREBALL.push([i, j, Math.floor(SumMass / 5), Math.floor(SumSpeed / cnt), direction]);
                    }
                }
            }
            // 만약 해당 위치에 파이어볼이 1개라면.
            if (MAP[i][j].length === 1) {
                // MAP에서 꺼낸 후 파이어볼 배열에 추가.
                const PopItem = MAP[i][j].pop();
                FIREBALL.push(PopItem);

            }
        }
    }
};

// 메인 함수.
const solution = () => {
    // K번 반복
    for (let i = 0; i < K; i++) {
        FillMap();
        Divide();
    }
    // reduce 함수를 이용해 질량을 더해줌.
    return FIREBALL.reduce((acc, cur) => {
        return acc + cur[2];
    }, 0);
};
console.log(solution());