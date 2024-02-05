let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let n = parseInt(input.shift());
input = input.map(v => v.split(' '));

const PUSH = 'push';
const TOP = 'top';
const EMPTY = 'empty';
const SIZE = 'size';
const POP = 'pop';

class STACK {
    constructor() {
        this.Stack = [];
    }

    PUSH(element) {
        this.Stack.push(element);
    }

    POP() {
        if (this.Stack.length) {
            return this.Stack.pop();
        }else return -1;
    }

    TOP() {
        if (this.Stack.length) {
            return this.Stack[this.Stack.length - 1];
        }else return -1;
    }

    SIZE() {
        return this.Stack.length;
    }

    EMPTY() {
        return this.Stack.length ? 0 : 1;
    }
}

let answer = '';
const solution = (INPUT, N) => {
    const stack = new STACK();
    for (let i = 0; i < N; i++) {
        const [ORDER, NUMBER = 0] = [...INPUT[i]];
        switch (ORDER) {
            case PUSH:
                stack.PUSH(NUMBER);
                break;
            case POP:
                answer += `${stack.POP()}\n`;
                break;
            case TOP:
                answer += `${stack.TOP()}\n`;
                break;
            case SIZE:
                answer += `${stack.SIZE()}\n`;
                break;
            case EMPTY:
                answer += `${stack.EMPTY()}\n`;
                break;
            default:
                break;
        }
    }
};

solution(input, n);
console.log(answer);