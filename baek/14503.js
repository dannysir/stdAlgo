let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const [N, M] = input.shift().split(' ').map(Number);
// let [nowX, nowY, direction] = input.shift().split(' ').map(Number);
// /* 0 북
//    1 동
//    2 남
//    3 서
// * */
// let MAP = input.map(v => v.split(' ').map(Number));
// let dx = [1, -1, 0, 0];
// let dy = [0, 0, 1, -1];
//
// const Scan = (x, y) => {
//     for (let i = 0; i < dx.length; i++) {
//         let nextX = x + dx[i];
//         let nextY = y + dy[i];
//         if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < M) {
//             if (MAP[nextX][nextY] === 0) {
//                 console.log('1');
//                 return true;
//             }
//
//         }
//     }
//     return false;
// };
// const RobotGoBack = () => {
//     if (direction === 0) {
//         nowX += 1;
//     }
//     if (direction === 1) {
//         nowY -= 1;
//     }
//     if (direction === 2) {
//         nowX -= 1;
//     }
//     if (direction === 3) {
//         nowY += 1;
//     }
//     if (nowX < 0 || nowX >= N || nowY < 0 || nowY >= M || MAP[nowX][nowY] === 1) {
//         return false;
//     } else return true;
// };
//
// const RobotRotateGo = () => {
//     while (true) {
//         direction = (direction + 3) % 4;
//         let [x, y] = [nowX, nowY];
//         if (direction === 0) {
//             x -= 1;
//         }
//         if (direction === 1) {
//             y += 1;
//         }
//         if (direction === 2) {
//             x += 1;
//         }
//         if (direction === 3) {
//             y -= 1;
//         }
//         if (x >= 0 && x < N && y >= 0 && y < M) {
//             if (MAP[x][y] === 0) {
//                 [nowX, nowY] = [x, y];
//                 break;
//             }
//         }
//
//     }
// };
// const Robot = () => {
//     let cnt = 0;
//     while (true) {
//         if (MAP[nowX][nowY] === 0) {
//             MAP[nowX][nowY] = 2;
//             cnt++;
//             continue;
//         } else {
//             if (Scan(nowX, nowY)) {
//                 RobotRotateGo();
//             } else {
//                 if (!RobotGoBack()) {
//                     break;
//                 }
//             }
//         }
//     }
//     console.log(cnt);
// };
// Robot();


const [N, M] = input.shift().split(' ').map(Number);
let [nowX, nowY, direction] = input.shift().split(' ').map(Number);

const MAP = input.map(v => v.split(' ').map(Number));
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const isCleanable = (x, y) => x >= 0 && x < N && y >= 0 && y < M && MAP[x][y] === 0;

const rotateAndMove = () => {
    for (let i = 1; i <= 4; i++) {
        const nextDirection = (direction + 4 - i) % 4;
        const [x, y] = [nowX + dx[nextDirection], nowY + dy[nextDirection]];

        if (isCleanable(x, y)) {
            [nowX, nowY, direction] = [x, y, nextDirection];
            return true;
        }
    }

    return false;
};

const cleanRoom = () => {
    let cnt = 0;

    while (true) {
        if (MAP[nowX][nowY] === 0) {
            MAP[nowX][nowY] = 2;
            cnt++;
        }

        if (!rotateAndMove()) {
            const backwardDirection = (direction + 2) % 4;
            const [x, y] = [nowX + dx[backwardDirection], nowY + dy[backwardDirection]];

            if (x >= 0 && x < N && y >= 0 && y < M && MAP[x][y] !== 1) {
                [nowX, nowY] = [x, y];
            } else {
                break;
            }
        }
    }

    console.log(cnt);
};

cleanRoom();