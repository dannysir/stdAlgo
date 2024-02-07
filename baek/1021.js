let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
input = input[0].split(' ').map(Number);

class NODE {
    constructor(item) {
        this.node = item;
        this.prev = null;
        this.next = null;
    }
}

class DEQUE {
    constructor() {
        this.start = null;
        this.end = null;
        this.length = 0;
    }

    PushFront(element) {
        const PushElement = new NODE(element);
        PushElement.node = element;
        if (this.length === 0) {
            this.start = PushElement;
            this.end = PushElement;
        } else {
            this.start.prev = PushElement;
            PushElement.next = this.start;
            this.start = PushElement;
        }
        this.length++;
    }

    PushBack(element) {
        const PushElement = new NODE(element);
        if (this.length === 0) {
            this.start = PushElement;
            this.end = PushElement;
        } else {
            this.end.next = PushElement;
            PushElement.prev = this.end;
            this.end = PushElement;
        }
        this.length++;
    }

    PopFront() {
        if (this.length === 0) return false;
        const PopElement = this.start;
        this.start = this.start.next;
        if (this.length === 1) {
            this.start = null;
        } else {
            this.start.prev = null;
        }
        this.length--;
        return PopElement.node;
    }

    PopEnd() {
        if (this.length === 0) return false;
        const PopElement = this.end;
        this.end = this.end.prev;
        if (this.length === 1) {
            this.end = null;
        } else {
            this.end.next = null;
        }
        this.length--;
        return PopElement.node;
    }

    getStart() {
        return this.start.node;
    }

    getFirstNode() {
        return this.start;
    }

    getLastNode() {
        return this.end;
    }

    RotateLeft() {
        this.PushBack(this.PopFront());
    }

    RotateRight() {
        this.PushFront(this.PopEnd());
    }
}

const solution = (n, INPUT) => {
    const Deque = new DEQUE();
    let answer = 0;
    for (let i = 1; i <= n; i++) {
        Deque.PushBack(i);
    }
    for (let i = 0; i < INPUT.length; i++) {
        const Target = INPUT[i];
        if (Deque.getStart() !== Target) {
            let leftDis = 0;
            let rightDis = 0;
            let cur = Deque.getFirstNode();
            while (cur.node !== Target) {
                cur = cur.next;
                leftDis++;
            }
            cur = Deque.getLastNode();
            while (cur.node !== Target) {
                cur = cur.prev;
                rightDis++;
            }

            if (leftDis <= rightDis) {
                while (Deque.getStart() !== Target) {
                    Deque.RotateLeft();
                    answer++;
                }
                if (Deque.getStart() === Target) {
                    Deque.PopFront();
                }
            } else {
                while (Deque.getStart() !== Target) {
                    Deque.RotateRight();
                    answer++;
                }
            }
        }
        if (Deque.getStart() === Target) {
            Deque.PopFront();
        }
    }
    console.log(answer);
};
solution(N, input);