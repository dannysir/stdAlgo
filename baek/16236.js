let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
let map = input.map(v => v.split(' ').map(Number));
let [X, Y] = [0, 0];
let findFlag = false;
for (let i = 0; i < N; i++) {
    if (findFlag) break;
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 9) {
            X = i;
            Y = j;
            findFlag = true;
            break;
        }
    }
}

class Shark {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.cnt = 0;
        this.size = 2;
        this.distance = 0;
    }

    Eat(nextX, nextY, distance) {
        this.cnt++;
        this.posX = nextX;
        this.posY = nextY;
        this.distance += distance;
        this.Grow();
    }

    Grow() {
        if (this.cnt === this.size) {
            this.cnt = 0;
            this.size++;
        }
    }

    GetDis() {
        return this.distance;
    }

    GetSharkInfo() {
        return [this.size, this.posX, this.posY];
    }

    test() {
        console.log(this.distance);
    }
}

const BFS = (mySize, nowX, nowY) => {
    let min = 1000;
    let visited = Array.from({length: N}, _ => Array.from({length: N}, _ => false));
    let record = Array.from({length: N}, _ => Array.from({length: N}, _ => 0));
    visited[nowX][nowY] = true;
    let Queue = [[nowX, nowY, 0]];
    let idx = 0;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (Queue.length > idx) {
        const [x, y, dis] = Queue[idx];
        for (const dir of dirs) {
            const NextX = x + dir[0];
            const NextY = y + dir[1];
            if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= N) continue;
            if (!visited[NextX][NextY]) {
                if (map[NextX][NextY] === 0) {
                    visited[NextX][NextY] = true;
                    Queue.push([NextX, NextY, dis + 1]);
                }else if (map[NextX][NextY] < mySize) {
                    visited[NextX][NextY] = true;
                    record[NextX][NextY] = dis + 1;
                    min = Math.min(dis + 1, min);
                }else if (map[NextX][NextY] === mySize) {
                    visited[NextX][NextY] = true;
                    Queue.push([NextX, NextY, dis + 1]);
                }
            }
        }
        idx++;
    }
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (record[i][j] === min) {
                return [i, j, min];
            }
        }
    }
    return [0, 0, 0];
};

const solution = () => {
    const BabyShark = new Shark(X, Y);
    while (true) {
        const [size, nowX, nowY] = BabyShark.GetSharkInfo();
        const [NextX, NextY, distance] = BFS(size, nowX, nowY);
        if (distance === 0) break;
        map[nowX][nowY] = 0;
        map[NextX][NextY] = 9;
        BabyShark.Eat(NextX, NextY, distance);
    }
    BabyShark.test();
};
solution();