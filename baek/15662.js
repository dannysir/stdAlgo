let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift())
let Wheels = new Array(N).fill(0);

Wheels = Wheels.map((Value, Index) => {
    return input.shift().split('').map(Number);
});
const Orders = input.splice(1, parseInt(input[0])).map(v => v.split(' ').map(Number));
const LEFT = 6;
const RIGHT = 2;

//1 시계
//-1 반시계
const Rotate = (WheelNum, Order) => {
    let rotateArr = new Array(N).fill(0);
    rotateArr[WheelNum - 1] = Order;
    let Queue = [[WheelNum, Order]];
    let idx = 0;
    while (Queue.length > idx) {
        const [Now, Turn] = Queue[idx];
        const LeftWheel = Now - 1;
        const RightWheel = Now + 1;

        if (LeftWheel > 0) {
            if (rotateArr[LeftWheel - 1] === 0 && Wheels[Now - 1][LEFT] !== Wheels[LeftWheel - 1][RIGHT]) {
                const NextRotate = Turn === 1 ? -1 : 1;
                rotateArr[LeftWheel - 1] = NextRotate;
                Queue.push([LeftWheel, NextRotate]);
            }
        }

        if (RightWheel <= N) {
            if (rotateArr[RightWheel - 1] === 0 && Wheels[Now - 1][RIGHT] !== Wheels[RightWheel - 1][LEFT]) {
                const NextRotate = Turn === 1 ? -1 : 1;
                rotateArr[RightWheel - 1] = NextRotate;
                Queue.push([RightWheel, NextRotate]);
            }
        }
        idx++;
    }

    for (let i = 0; i < rotateArr.length; i++) {
        if (rotateArr[i] === 1) {
            Wheels[i] = [Wheels[i].pop(), ...Wheels[i]];
        }else if (rotateArr[i] === -1) {
            Wheels[i].push(Wheels[i].shift());
        }
    }
};

const solution = () => {
    for (const [WheelNum, Order] of Orders) {
        Rotate(WheelNum, Order);
    }

    let answer = 0;
    Wheels.forEach(v => {
        if (v[0] === 1) {
            answer++;
        }
    });
    console.log(answer);
};
solution();