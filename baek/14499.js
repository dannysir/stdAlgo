let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M, X, Y, OrderCount] = input.shift().split(' ').map(Number);
let map = input.splice(0, N).map(v => v.split(' ').map(Number));
const Orders = input.shift().split(' ').map(Number);

class Dice {
    constructor(nowX, nowY) {
        this.up = 0;
        this.down = 0;
        this.left = 0;
        this.right = 0;
        this.front = 0;
        this.back = 0;
        this.x = nowX;
        this.y = nowY;
    }

    GoDown() {
        const [nextX, nextY] = [this.x + 1, this.y];
        if (this.CheckOut(nextX, nextY)) {
            [this.up, this.down, this.front, this.back] = [this.back, this.front, this.up, this.down];
            this.x = nextX;
            this.ChangeValue();
            return this.up;
        } else {
            return -1;
        }
    }

    GoUp() {
        const [nextX, nextY] = [this.x - 1, this.y];
        if (this.CheckOut(nextX, nextY)) {

            [this.up, this.down, this.front, this.back] = [this.front, this.back, this.down, this.up];
            this.x = nextX;
            this.ChangeValue();
            return this.up;

        }else {
            return -1;
        }
    }

    GoLeft() {
        const [nextX, nextY] = [this.x, this.y - 1];
        if (this.CheckOut(nextX, nextY)) {
            [this.up, this.down, this.left, this.right] = [this.left, this.right, this.down, this.up];
            this.y = nextY;
            this.ChangeValue();
            return this.up;

        }else {
            return -1;
        }
    }

    GoRight() {
        const [nextX, nextY] = [this.x, this.y + 1];
        if (this.CheckOut(nextX, nextY)) {
            [this.up, this.down, this.left, this.right] = [this.right, this.left, this.up, this.down];
            this.y = nextY;
            this.ChangeValue();
            return this.up;

        }else {
            return -1;
        }
    }

    ChangeValue() {
        const MapValue = map[this.x][this.y];
        if (MapValue) {
            this.down = MapValue;
            map[this.x][this.y] = 0;
        } else {
            map[this.x][this.y] = this.down;
        }
    }

    CheckOut(nextX, nextY) {
        return !(nextX < 0 || nextX >= N || nextY < 0 || nextY >= M);
    }
}
const solution = () => {
    const MyDice = new Dice(X, Y);
    let answer = [];
    for (const order of Orders) {
        let goDice = -1;
        if (order === 1) {
            goDice = MyDice.GoRight();
        } else if (order === 2) {
            goDice = MyDice.GoLeft();
        } else if (order === 3) {
            goDice = MyDice.GoUp();
        } else if (order === 4) {
            goDice = MyDice.GoDown();
        }

        if (goDice !== -1) {
            answer.push(goDice);
        }
    }
    console.log(answer.join('\n'));
};
solution();