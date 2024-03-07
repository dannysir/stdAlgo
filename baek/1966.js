let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const TestTime = parseInt(input.shift());

class Node {
    constructor(item) {
        this.node = item;
        this.prev = null;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.goal = null;
    }

    SetGoal(item) {
        this.goal = item;
    }

    Push(item) {
        let PushNode = new Node(item);
        if (this.length === 0) {
            this.head = PushNode;
            this.tail = PushNode;
        } else {
            this.tail.next = PushNode;
            PushNode.prev = this.tail;
            this.tail = PushNode;
        }
        this.length++;
    }

    Shift() {
        if (this.length === 0) return null;
        let ShiftNode = this.head;
        this.head = this.head.next;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head.prev = null;
        }
        this.length--;
        return ShiftNode.node;
    }

    Scan(item) {
        let scanner = this.head;
        for (let i = 0; i < this.length; i++) {
            if (scanner.node > item) return false;
            scanner = scanner.next;
        }
        return true;
    }

    Print() {
        let cnt = 0;
        while (true) {
            let FirstItem = this.head.node;
            const isBig = this.Scan(FirstItem);
            if (this.goal === 0) {
                if (isBig) {
                    return cnt + 1;
                } else {
                    this.Push(this.Shift());
                    this.goal = this.length - 1;
                }
            } else {
                if (isBig) {
                    this.Shift();
                    cnt++;
                    this.goal--;
                } else {
                    this.Push(this.Shift());
                    this.goal--;
                }
            }
        }
    }

    test() {
        console.log(this.Print());
    }
}

const solution = () => {
    let answer = [];
    for (let i = 0; i < TestTime; i++) {
        const TEST = input.splice(0, 2);
        const [Total, Goal] = TEST[0].split(' ').map(Number);
        const Lists = TEST[1].split(' ').map(Number);

        const queue = new Queue();
        queue.SetGoal(Goal);
        for (const list of Lists) {
            queue.Push(list);
        }
        answer.push(queue.Print());
    }
    console.log(answer.join('\n'));
};
solution();