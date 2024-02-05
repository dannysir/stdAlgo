let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let TestNumber = input.shift();

class DEQUEUE {
    constructor(arr) {
        this.queue = arr;
        this.begin = 0;
        this.end = arr.length - 1;
        this.isReverse = false;
    }

    Reverse() {
        this.isReverse = !this.isReverse;
    }

    Drop() {
        if (this.begin <= this.end) {
            if (this.isReverse) {
                this.end--;
            } else {
                this.begin++;
            }
            return true;
        } else return false;
    }

    GetQueue() {
        let answer = this.queue.slice(this.begin, this.end + 1);
        return this.isReverse ? answer.reverse() : answer;
    }
}

const solution = (INPUT) => {
    let answer = '';
    while (INPUT.length) {
        const [Order, N, InputArray] = INPUT.splice(0, 3);
        const OrderArr = Order.split('');
        const ARRAY = JSON.parse(InputArray);
        answer += CHECK(OrderArr, ARRAY);
    }
    console.log(answer);
};
const CHECK = (OrderArr, ARRAY) => {
    const Dequeue = new DEQUEUE(ARRAY);
    for (let i = 0; i < OrderArr.length; i++) {
        if (OrderArr[i] === 'R') {
            Dequeue.Reverse();
        } else if (OrderArr[i] === 'D') {
            if (!Dequeue.Drop()) {
                return `error\n`;
            }
        }
    }
    return `[${Dequeue.GetQueue()}]\n`;
};

solution(input);
//
// let answer = '';
// const solution = (INPUT) => {
//     let answer = '';
//     while (INPUT.length) {
//         let [Order, N, Arr] = INPUT.splice(0, 3);
//         const OrderArr = Order.split('');
//         Arr = JSON.parse(Arr);
//         answer += `${CHECK(OrderArr, N, Arr)}\n`;
//
//     }
//     console.log(answer);
// };
//
// const CHECK = (ORDER, N, ARRAY) => {
//     for (const RorD of ORDER) {
//         if (RorD === 'R') {
//             ARRAY.reverse();
//         } else {
//             if (ARRAY.length) {
//                 ARRAY.shift();
//             } else {
//                 return 'error'
//             }
//         }
//     }
//     return ARRAY;
// };
// solution(input);