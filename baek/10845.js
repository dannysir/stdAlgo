let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
const Orders = input.map(v => v.split(' '));
class Queue {
    constructor() {
        this.queue = [null];
        this.isEmpty = true;
        this.head = 1;
        this.tail = 0;
    }

    Push(item) {
        this.isEmpty = false;
        this.tail = this.queue.length;
        this.queue.push(item);
    }

    Pop() {
        if (this.isEmpty) {
            return -1;
        } else {
            if (this.head === this.tail) {
                this.isEmpty = true;
            }
            return this.queue[this.head++];
        }
    }

    GetSize() {
        if (this.isEmpty) {
            return 0;
        } else {
            return this.tail - this.head + 1;
        }
    }

    Empty() {
        return this.isEmpty ? 1 : 0;
    }

    GetHead() {
        if (this.isEmpty) {
            return -1;
        } else {
            return this.queue[this.head];
        }
    }

    GetTail() {
        if (this.isEmpty) {
            return -1;
        } else {
            return this.queue[this.tail];
        }
    }

}

const solution = () => {
    const q = new Queue();
    let answer = [];
    for (const [Order, Num] of Orders) {
        if (Order === 'push') {
            q.Push(parseInt(Num));
        }else if (Order === 'front') {
            answer.push(q.GetHead());
        }else if (Order === 'back') {
            answer.push(q.GetTail());
        }else if (Order === 'size') {
            answer.push(q.GetSize());
        }else if (Order === 'empty') {
            answer.push(q.Empty());
        }else if (Order === 'pop') {
            answer.push(q.Pop());
        }
    }
    console.log(answer.join('\n'));
};
solution();