let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const boards = input.map(v => v.split(' ').map(Number));

const middlePoint = Math.floor(N / 2);

// 좌 - 하 - 우 - 상
const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const left = [
    [-2, 0, 0.02],
    [2, 0, 0.02],
    [-1, 0, 0.07],
    [1, 0, 0.07],
    [-1, -1, 0.1],
    [1, -1, 0.1],
    [-1, 1, 0.01],
    [1, 1, 0.01],
    [0, -2, 0.05],
    [0, -1, 0],
];
const right = left.map(([x, y, ratio]) => [x, -y, ratio]);
const up = left.map(([x, y, ratio]) => [y, x, ratio]);
const down = up.map(([x, y, ratio]) => [-x, y, ratio]);
const moveSand = (x, y, dirArr) => {
    const sand = boards[x][y];
    let outSand = 0;
    boards[x][y] = 0;
    let sum = 0;

    for (let i = 0; i < dirArr.length; i++) {
        const [dx, dy, percent] = dirArr[i];
        const nx = x + dx;
        const ny = y + dy;
        const movingSand = Math.floor(sand * percent);

        if (i === dirArr.length - 1) {
            const remainSand = sand - sum;
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
                outSand += remainSand;
            } else {
                boards[nx][ny] += remainSand;
            }
            continue;
        }

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
            outSand += movingSand;
        } else {
            boards[nx][ny] += movingSand;
        }
        sum += movingSand;
    }

    return outSand;
};
const moveTornado = (x, y, dir, len) => {
    let cnt = 1;
    let nextX = x;
    let nextY = y;
    let outCounter = 0;
    while (cnt < len) {
        if (nextX === 0 && nextY === 0) break;
        nextX = nextX + dirs[dir][0];
        nextY = nextY + dirs[dir][1];
        if (dir === 0) {
            outCounter += moveSand(nextX, nextY, left);
        }

        if (dir === 1) {
            outCounter += moveSand(nextX, nextY, down);
        }

        if (dir === 2) {
            outCounter += moveSand(nextX, nextY, right);
        }

        if (dir === 3) {
            outCounter += moveSand(nextX, nextY, up);
        }

        if (nextY < 0) {
            nextY = 0;
            break;
        }
        cnt++;
    }

    return [nextX, nextY, outCounter];
};

const solution = () => {
    let x = middlePoint;
    let y = middlePoint;
    let cnt = 0;
    let dirIndex = 0;
    let len = 2;
    let outCounter = 0;
    while (x !== 0 || y !== 0) {
        const [nextX, nextY, out] = moveTornado(x, y, dirIndex, len);
        x = nextX;
        y = nextY;
        cnt++;
        if (cnt === 2) {
            len++;
            cnt = 0;
        }
        dirIndex = (dirIndex + 1) % 4;

        outCounter += out;
    }
    console.log(outCounter);
};
solution();