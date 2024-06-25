let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M, S] = input.shift().split(' ').map(Number);
const sharks = input.map(v => v.split(' ').map(Number));
//d가 1인 경우는 위, 2인 경우는 아래, 3인 경우는 오른쪽, 4인 경우는 왼쪽
let map = Array.from({length: N}, _ => Array.from({length: M}, _ => 0));

for (const [x, y, speed, dir, size] of sharks) {
    map[x - 1][y - 1] = [speed, dir, size];
}
let answer = 0;
// 상어 이동
const SharkMove = (inputMap) => {
    let newMap = Array.from({length: N}, _ => Array.from({length: M}, _ => 0));
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (inputMap[i][j] !== 0) {
                let [SPEED, DIR, SIZE] = inputMap[i][j];
                let nextX = i;
                let nextY = j;
                let remainingSpeed = DIR <= 2 ? SPEED % (2 * (N - 1)) : SPEED % (2 * (M - 1));
                let cnt = 0;
                while (remainingSpeed > cnt) {
                    if (DIR === 1 && nextX === 0 || DIR === 2 && nextX === N - 1) {
                        DIR = DIR === 1 ? 2 : 1;
                    }
                    else if (DIR === 3 && nextY === M - 1 || DIR === 4 && nextY === 0) {
                        DIR = DIR === 3 ? 4 : 3;
                    }
                    nextX += directions[DIR - 1][0];
                    nextY += directions[DIR - 1][1];
                    cnt++;
                }
                if (newMap[nextX][nextY] !== 0) {
                    if (newMap[nextX][nextY][2] < SIZE) {
                        newMap[nextX][nextY] = [SPEED, DIR, SIZE];
                    }
                } else {
                    newMap[nextX][nextY] = [SPEED, DIR, SIZE];
                }
            }
        }
    }
    return newMap;
};
// 낚시꾼 이동
for (let i = 0; i < M; i++) {

    //열에서 가장 가까운 상어
    for (let j = 0; j < N; j++) {
        if (map[j][i] !== 0) {
            answer += map[j][i][2];
            map[j][i] = 0;
            break;
        }
    }

    map = SharkMove(map);
}

console.log(answer);

// // Map 사용
// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// const [N, M, S] = input.shift().split(' ').map(Number);
// const sharks = input.map(v => v.split(' ').map(Number));
// //d가 1인 경우는 위, 2인 경우는 아래, 3인 경우는 오른쪽, 4인 경우는 왼쪽
// let Shark = new Map();
//
// for (const [x, y, speed, dir, size] of sharks) {
//     Shark.set(`${x - 1},${y - 1}`, {speed:speed, dir:dir, size: size})
// }
// const SharkMove = (SharkMap) => {
//     const newMap = new Map();
//     const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
//
//     SharkMap.forEach((value, key) => {
//         let [x, y] = key.split(',').map(Number);
//         let {speed, dir, size} = value;
//         let [dx, dy] = directions[dir - 1];
//         let remainingSpeed = dir <= 2 ? speed % (2 * (N - 1)) : speed % (2 * (M - 1));
//
//         while (remainingSpeed--) {
//             if (dir === 1 && x === 0 || dir === 2 && x === N - 1) {
//                 dir = dir === 1 ? 2 : 1;
//             } else if (dir === 3 && y === M - 1 || dir === 4 && y === 0) {
//                 dir = dir === 3 ? 4 : 3;
//             }
//             [dx, dy] = directions[dir - 1];
//             x += dx;
//             y += dy;
//         }
//
//         if (newMap.has(`${x},${y}`)) {
//             if (newMap.get(`${x},${y}`).size < size) {
//                 newMap.set(`${x},${y}`, {speed, dir, size});
//             }
//         } else {
//             newMap.set(`${x},${y}`, {speed, dir, size});
//         }
//     });
//     return newMap;
// };
// const main = () => {
//     let answer = 0;
//     for (let i = 0; i < M; i++) {
//
//         for (let j = 0; j < N; j++) {
//             if (Shark.get(`${j},${i}`)) {
//                 // visited[j][i] = false;
//                 answer += Shark.get(`${j},${i}`).size;
//                 Shark.delete(`${j},${i}`);
//                 break;
//             }
//         }
//         Shark = SharkMove(Shark);
//     }
//     console.log(answer);
// };
//
// main();