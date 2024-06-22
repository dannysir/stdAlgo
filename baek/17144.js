let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [R, C, T] = input.shift().split(' ').map(Number);
let MAP = input.map(v => v.split(' ').map(Number));


let AIRPURIFIER_POS = [];

// 공기청정기 위치 파악
for (let i = 0; i < R; i++) {
    if (MAP[i][0] === -1) {
        AIRPURIFIER_POS = [i, i + 1];
        break;
    }
}

const SpreadDust = () => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let newMap = Array.from({ length: R }, () => Array(C).fill(0));
    newMap[AIRPURIFIER_POS[0]][0] = -1;
    newMap[AIRPURIFIER_POS[1]][0] = -1;

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (MAP[i][j] > 0) {
                let spreadAmount = Math.floor(MAP[i][j] / 5);
                let spreadCount = 0;

                for (const [dx, dy] of dirs) {
                    const nx = i + dx;
                    const ny = j + dy;

                    if (nx >= 0 && nx < R && ny >= 0 && ny < C && MAP[nx][ny] !== -1) {
                        newMap[nx][ny] += spreadAmount;
                        spreadCount++;
                    }
                }
                newMap[i][j] += MAP[i][j] - spreadAmount * spreadCount;
            }
        }
    }
    MAP = newMap;
};

const AirPurifier = () => {
    const [top, bottom] = AIRPURIFIER_POS;

    // 위쪽 공기청정기 (반시계 방향)
    for (let i = top - 1; i > 0; i--) MAP[i][0] = MAP[i - 1][0];
    for (let i = 0; i < C - 1; i++) MAP[0][i] = MAP[0][i + 1];
    for (let i = 0; i < top; i++) MAP[i][C - 1] = MAP[i + 1][C - 1];
    for (let i = C - 1; i > 1; i--) MAP[top][i] = MAP[top][i - 1];
    MAP[top][1] = 0;

    // 아래쪽 공기청정기 (시계 방향)
    for (let i = bottom + 1; i < R - 1; i++) MAP[i][0] = MAP[i + 1][0];
    for (let i = 0; i < C - 1; i++) MAP[R - 1][i] = MAP[R - 1][i + 1];
    for (let i = R - 1; i > bottom; i--) MAP[i][C - 1] = MAP[i - 1][C - 1];
    for (let i = C - 1; i > 1; i--) MAP[bottom][i] = MAP[bottom][i - 1];
    MAP[bottom][1] = 0;
};

const TEST = () => {
    for (let i = 0; i < T; i++) {
        SpreadDust();
        AirPurifier();
    }
    let answer = 0;
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (MAP[i][j] > 0) {
                answer += MAP[i][j];
            }
        }
    }
    console.log(answer);
};

TEST();


// Map 사용
// let dustArr = new Map();
// let [AirCirPoSTop, AirCirPosBot] = [0, 0];
//
// // 공기청정기 위치 파악
// for (let i = 0; i < R; i++) {
//     if (MAP[i][0] === -1) {
//         AirCirPoSTop = i;
//         AirCirPosBot = i + 1;
//         break;
//     }
// }
//
// // 초기 먼지 위치 기록
// for (let i = 0; i < R; i++) {
//     for (let j = 0; j < C; j++) {
//         if (MAP[i][j] > 0) {
//             dustArr.set(`${i},${j}`, MAP[i][j]);
//         }
//     }
// }
//
// const SpreadDust = (dusts) => {
//     const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
//     let newDustArr = new Map();
//
//     for (const [pos, size] of dusts) {
//         const [x, y] = pos.split(',').map(Number);
//         let spreadAmount = Math.floor(size / 5);
//         if (spreadAmount > 0) {
//             let spreadCount = 0;
//             for (const [dirX, dirY] of dirs) {
//                 const nextX = x + dirX;
//                 const nextY = y + dirY;
//                 if (nextX >= 0 && nextX < R && nextY >= 0 && nextY < C && MAP[nextX][nextY] !== -1) {
//                     spreadCount++;
//                     const newPos = `${nextX},${nextY}`;
//                     newDustArr.set(newPos, (newDustArr.get(newPos) || 0) + spreadAmount);
//                 }
//             }
//             newDustArr.set(`${x},${y}`, (newDustArr.get(`${x},${y}`) || 0) + (size - spreadAmount * spreadCount));
//         } else {
//             newDustArr.set(`${x},${y}`, (newDustArr.get(`${x},${y}`) || 0) + size);
//         }
//     }
//     return newDustArr;
// };
//
// const TurnOn = (dusts) => {
//     let newDustArr = new Map();
//
//     // 위쪽 공기청정기 순환
//     for (let i = AirCirPoSTop - 1; i > 0; i--) newDustArr.set(`${i},0`, dusts.get(`${i - 1},0`) || 0);
//     for (let i = 0; i < C - 1; i++) newDustArr.set(`0,${i}`, dusts.get(`0,${i + 1}`) || 0);
//     for (let i = 0; i < AirCirPoSTop; i++) newDustArr.set(`${i},${C - 1}`, dusts.get(`${i + 1},${C - 1}`) || 0);
//     for (let i = C - 1; i > 1; i--) newDustArr.set(`${AirCirPoSTop},${i}`, dusts.get(`${AirCirPoSTop},${i - 1}`) || 0);
//     newDustArr.set(`${AirCirPoSTop},1`, 0);
//
//     // 아래쪽 공기청정기 순환
//     for (let i = AirCirPosBot + 1; i < R - 1; i++) newDustArr.set(`${i},0`, dusts.get(`${i + 1},0`) || 0);
//     for (let i = 0; i < C - 1; i++) newDustArr.set(`${R - 1},${i}`, dusts.get(`${R - 1},${i + 1}`) || 0);
//     for (let i = R - 1; i > AirCirPosBot; i--) newDustArr.set(`${i},${C - 1}`, dusts.get(`${i - 1},${C - 1}`) || 0);
//     for (let i = C - 1; i > 1; i--) newDustArr.set(`${AirCirPosBot},${i}`, dusts.get(`${AirCirPosBot},${i - 1}`) || 0);
//     newDustArr.set(`${AirCirPosBot},1`, 0);
//
//     // 나머지 먼지 위치 유지
//     for (const [pos, size] of dusts) {
//         if (!newDustArr.has(pos)) {
//             newDustArr.set(pos, size);
//         }
//     }
//
//     return newDustArr;
// };
//
// let answer = 0;
// for (let i = 0; i < T; i++) {
//     dustArr = SpreadDust(dustArr);
//     dustArr = TurnOn(dustArr);
// }
// dustArr.forEach(v => answer += v);
// console.log(answer);
