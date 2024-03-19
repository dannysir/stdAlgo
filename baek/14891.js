let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let wheels = input.splice(0, 4).map(v => v.split('').map(Number));
const Turn = parseInt(input[0]);
const Turns = input.splice(1, Turn).map(v => v.split(' ').map(Number));
// 2 - 오른쪽
// 6 - 왼쪽

// BFS 함수.
// (회전시킬 톱니, 방향, 전체 회전 배열) 을 인자로.
const RotateCheckAll = (target, rotate, rotateArr) => {
    rotateArr[target - 1] = rotate;
    // 회전할 톱니 추가.
    let Queue = [target];
    let idx = 0;
    while (Queue.length > idx) {
        let now = Queue[idx];
        const Left = now - 1;
        const Right = now + 1;
        // 현재 위치에서 좌우 톱니 확인
        // 왼쪽부터
        if (Left > 0 && Left <= 4) {
            // 만약 이전의 톱니가 회전을 아직 하지 않았다면.
            if (rotateArr[Left - 1] === 0) {
                // 맞닿은 부분 확인.
                if (wheels[Left - 1][2] !== wheels[now - 1][6]) {
                    // 회전 방향을 반대로.
                    rotateArr[Left - 1] = rotateArr[now - 1] === 1 ? -1 : 1;
                    // 큐에 추가.
                    Queue.push(Left);
                }

            }
        }
        //오른쪽 톱니
        if (Right > 0 && Right <= 4) {
            // 만약 이전의 톱니가 회전을 아직 하지 않았다면.
            if (rotateArr[Right - 1] === 0) {
                // 맞닿은 부분 확인.
                if (wheels[Right - 1][6] !== wheels[now - 1][2]) {
                    // 회전 방향을 반대로.
                    rotateArr[Right - 1] = rotateArr[now - 1] === 1 ? -1 : 1;
                    // 큐에 추가.
                    Queue.push(Right);
                }

            }
        }
        idx++;
    }
    return rotateArr;
};

// 톱니 회전
const RotateWheel = (rotateArr) => {
    // 첫번째 톱니부터 순차적으로 회전 진행.
    for (let i = 0; i < rotateArr.length; i++) {
        // 톱니의 회전 방향
        const Rotate = rotateArr[i];
        // 시계 방향 회전.
        if (Rotate === 1) {
            wheels[i] = [wheels[i].pop(), ...wheels[i]];
        // 반시꼐 방향 회전.
        }else if (Rotate === -1) {
            wheels[i].push(wheels[i].shift());
        }
    }
};
const solution = () => {
    let answer = 0;

    // K번 회전 확인.
    for (const turn of Turns) {
        // 회전을 저장할 배열 생성.
        let rotateArr = new Array(4).fill(0);
        const [WheelNum, RotDir] = turn;
        // 회전할 톱니 저장.
        rotateArr = RotateCheckAll(WheelNum, RotDir, rotateArr);
        // 회전 진행.
        RotateWheel(rotateArr);

    }
    // 거듭 제곱을 이용해 정답 찾기.
    for (let i = 0; i < wheels.length; i++) {
        if (wheels[i][0] === 1) {
            answer += 2 ** i;
        }
    }
    // 정답 출력
    console.log(answer);
};
solution();