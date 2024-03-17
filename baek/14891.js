let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let wheels = input.splice(0, 4).map(v => v.split('').map(Number));
const Turn = parseInt(input[0]);
const Turns = input.splice(1, Turn).map(v => v.split(' ').map(Number));
// 2 - 오른쪽
// 6 - 왼쪽

const RotateCheckAll = (target, rotate, rotateArr) => {
    rotateArr[target - 1] = rotate;
    let Queue = [target];
    let idx = 0;
    while (Queue.length > idx) {
        let now = Queue[idx];
        const Left = now - 1;
        const Right = now + 1;
        if (Left > 0 && Left <= 4) {
            if (rotateArr[Left - 1] === 0) {
                if (wheels[Left - 1][2] !== wheels[now - 1][6]) {
                    rotateArr[Left - 1] = rotateArr[now - 1] === 1 ? -1 : 1;
                    Queue.push(Left);
                }

            }
        }
        if (Right > 0 && Right <= 4) {
            if (rotateArr[Right - 1] === 0) {
                if (wheels[Right - 1][6] !== wheels[now - 1][2]) {
                    rotateArr[Right - 1] = rotateArr[now - 1] === 1 ? -1 : 1;
                    Queue.push(Right);
                }

            }
        }
        idx++;
    }
    return rotateArr;
};

const RotateWheel = (rotateArr) => {
    for (let i = 0; i < rotateArr.length; i++) {
        const Rotate = rotateArr[i];
        if (Rotate === 1) {
            wheels[i] = [wheels[i].pop(), ...wheels[i]];
        }else if (Rotate === -1) {
            wheels[i].push(wheels[i].shift());
        }
    }
};
const solution = () => {
    for (const turn of Turns) {
        let rotateArr = new Array(4).fill(0);
        const [WheelNum, RotDir] = turn;
        rotateArr = RotateCheckAll(WheelNum, RotDir, rotateArr);
        RotateWheel(rotateArr);

    }
    let answer = 0;
    for (let i = 0; i < wheels.length; i++) {
        if (wheels[i][0] === 1) {
            answer += 2 ** i;
        }
    }
    console.log(answer);
};
solution();