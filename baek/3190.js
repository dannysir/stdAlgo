let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let AppleNumber = parseInt(input.shift());
let map = new Array(N);
for (let i = 0; i < N; i++) {
    map[i] = new Array(N).fill(0);
}
for (let i = 0; i < AppleNumber; i++) {
    const [x, y] = input.shift().split(' ').map(Number);
    map[x - 1][y - 1] = 1;
}
let SnakeMovement = parseInt(input.shift());
let SnakeOrder = [];
for (let i = 0; i < SnakeMovement; i++) {
    SnakeOrder.push(input.shift().split(' '));
}


class NODE {
    constructor(item) {
        this.node = item;
        this.prev = null;
        this.next = null;
    }
}

class DEQUE {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    PushFront(item) {
        const PushElement = new NODE(item);
        if (this.length === 0) {
            this.head = PushElement;
            this.tail = PushElement;
        } else {
            this.head.prev = PushElement;
            PushElement.next = this.head;
            this.head = PushElement;
        }
        this.length++;
    }

    PushEnd(item) {
        const PushElement = new NODE(item);
        if (this.length === 0) {
            this.head = PushElement;
            this.tail = PushElement;
        } else {
            this.tail.next = PushElement;
            PushElement.prev = this.tail;
            this.tail = PushElement;
        }
        this.length++;
    }

    PopFront() {
        if (this.length === 0) return;
        const PopElement = this.head;
        this.head = this.head.next;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head.prev = null;
        }
        this.length--;
        return PopElement;
    }

    PopEnd() {
        if (this.length === 0) return;
        const PopElement = this.tail;
        this.tail = this.tail.prev;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail.next = null;
        }
        this.length--;
        return PopElement;
    }

    GetLength() {
        return this.length;
    }

    test() {
        console.log(this.head.node);
        console.log(this.tail.node);
    }

    Has(x, y) {
        const remember = this.head;
        for (let i = 0; i < this.length; i++) {
            if (this.head.node[0] === x && this.head.node[1] === y) {
                return true;
            }
            this.head = this.head.next;
        }
        this.head = remember;
        return false;
    }
}

const solution = () => {
    const Snake = new DEQUE();
    let nowX = 0;
    let nowY = 0;
    Snake.PushFront([nowX, nowY]);
    []
    let cnt = 0;
    let direction = 1;
    let collision = false;
    let dx = [1, 0, -1, 0,];
    let dy = [0, 1, 0, -1];
    let [M, Order] = SnakeOrder[0];
    M = parseInt(M);
    while (!collision) {
        if (cnt === M) {
            if (Order === 'D') {
                direction = (direction - 1 + dx.length) % dx.length;
            } else {
                direction = (direction + 1) % dx.length;
            }
            SnakeOrder.shift();
            if (SnakeOrder.length) {
                [M, Order] = SnakeOrder[0];
                M = parseInt(M);
            }
        }
        const nextX = nowX + dx[direction];
        const nextY = nowY + dy[direction];
        cnt++;
        if (nextX >= N || nextY >= N || nextY < 0 || nextX < 0) {
            collision = true;
            break;
        }
        if (Snake.Has(nextX, nextY)) {
            collision = true;
            break;
        }
        if (map[nextX][nextY] === 0) {
            Snake.PushFront([nextX, nextY]);
            Snake.PopEnd();
        } else {
            map[nextX][nextY] = 0;
            Snake.PushFront([nextX, nextY]);
        }

        nowX = nextX;
        nowY = nextY;
    }
    return cnt;
};
console.log(solution());