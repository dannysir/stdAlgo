let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, T] = input.shift().split(' ').map(Number);
const board = input.map(v => v.split('').map(Number));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

class Node {
    constructor(n) {
        this.value = n;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null
        this.tail = this.head;
        this.length = 0;
    }

    Push(item) {
        const newElement = new Node(item);
        if (this.length === 0) {
            this.head = newElement;
            this.tail = this.head;
        } else {
            this.tail.next = newElement;
            this.tail = newElement;
        }
        this.length++;
    }

    Shift() {
        if (this.length === 0) {
            return null;
        }

        const target = this.head;
        this.head = target.next;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return target.value;
    }

    Length() {
        return this.length;
    }
}

const bfs = (now, visited) => {
    const queue = new Queue();
    queue.Push([...now, 0, 0]);

    while (queue.Length() > 0) {
        const [x, y, wall, cnt] = queue.Shift();
        if (x === N - 1 && y === M - 1) {
            return cnt + 1;
        }
        for (const [dx, dy] of dirs) {
            const nx = dx + x;
            const ny = dy + y;
            const nCnt = cnt + 1;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (board[nx][ny] === 0) {
                if (visited[nx][ny][wall] > nCnt) {
                    visited[nx][ny][wall] = nCnt;
                    queue.Push([nx, ny, wall, nCnt]);
                }
            } else {
                if (wall < T && visited[nx][ny][wall + 1] > nCnt) {
                    visited[nx][ny][wall + 1] = nCnt;
                    queue.Push([nx, ny, wall + 1, nCnt]);
                }
            }
        }

    }
    return -1;
};

const visited = Array.from({length: N}, () =>
    Array.from({length: M}, () =>
        Array.from({length: T + 1}, () => Infinity)
    )
);

visited[0][0][0] = 0;
console.log(bfs([0, 0], visited));