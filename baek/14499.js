let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M, X, Y, OrderCount] = input.shift().split(' ').map(Number);
let map = input.splice(0, N).map(v => v.split(' ').map(Number));
const Orders = input.shift().split(' ').map(Number);
// let Dice = new Array(2);
// // 0 => 1, 3 => 0
// Dice[0] = new Array(4);
// // 1 => [0][1], [0][3]
// Dice[1] = new Array(4);

class Dice {
    constructor(nowX,nowY) {
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
        [this.up, this.down, this.left, this.right, this.front, this.back] = [this.back, this.front, this.left, this.right, this.up, this.down];
        this.x++;
        this.ChangeValue();
    }

    GoUp() {
        [this.up, this.down, this.left, this.right, this.front, this.back] = [this.front, this.back, this.left, this.right, this.down, this.up];
        this.x--;
        this.ChangeValue();
    }

    GoLeft() {
        [this.up, this.down, this.left, this.right, this.front, this.back] = [this.left, this.right, this.down, this.up, this.front, this.back];
        this.y--;
        this.ChangeValue();
    }
    GoRight() {
        [this.up, this.down, this.left, this.right, this.front, this.back] = [this.right, this.left, this.up, this.down, this.front, this.back];
        this.y++;
        this.ChangeValue();
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

    GetPosition() {
        return [this.x, this.y];
    }

    GetUpside() {
        return this.up;
    }
}

const CheckOut = (nextX, nextY) => {
    if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) {
        return false;
    }
    return true;
}
const solution = () => {
    const MyDice = new Dice(X, Y);
    let answer = [];
    for (const order of Orders) {
        if (order === 1) {
            let [nextX, nextY] = MyDice.GetPosition();
            nextY += 1;
            if (CheckOut(nextX, nextY)) {
                MyDice.GoRight();
                answer.push(MyDice.GetUpside());
            }
        }else if (order === 2) {
            let [nextX, nextY] = MyDice.GetPosition();
            nextY -= 1;
            if (CheckOut(nextX, nextY)) {
                MyDice.GoLeft();
                answer.push(MyDice.GetUpside());
            }
        }else if (order === 3) {
            let [nextX, nextY] = MyDice.GetPosition();
            nextX -= 1;
            if (CheckOut(nextX, nextY)) {
                MyDice.GoUp();
                answer.push(MyDice.GetUpside());
            }
        }else if (order === 4) {
            let [nextX, nextY] = MyDice.GetPosition();
            nextX += 1;
            if (CheckOut(nextX, nextY)) {
                MyDice.GoDown();
                answer.push(MyDice.GetUpside());
            }
        }
    }
    console.log(answer.join('\n'));
};
solution();