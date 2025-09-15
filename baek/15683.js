let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const board = input.map(v => v.split(' ').map(Number));

const cameraDirs = [
    [
        [[0, 1]],
        [[0, -1]],
        [[1, 0]],
        [[-1, 0]]
    ],
    [
        [[0, 1], [0, -1]],
        [[1, 0], [-1, 0]],
    ],
    [
        [[-1, 0], [0, 1]],
        [[1, 0], [0, 1]],
        [[1, 0], [0, -1]],
        [[-1, 0], [0, -1]]
    ],
    [
        [[-1, 0], [0, -1], [0, 1]],
        [[-1, 0], [1, 0], [0, 1]],
        [[1, 0], [0, -1], [0, 1]],
        [[1, 0], [0, -1], [-1, 0]]
    ],
    [
        [[1, 0], [-1, 0], [0, -1], [0, 1]]
    ]
];


const bfs = (cameras, board) => {
    const queue = [];
    cameras.forEach(([x, y, dirs]) => {
        dirs.forEach(([dx, dy]) => {
            queue.push([x, y, dx, dy]);
        });
    });

    let idx = 0;

    while (queue.length > idx) {
        const [x, y, dx, dy] = queue[idx++];

        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 6) continue;

        board[nx][ny] = '#';
        queue.push([nx, ny, dx, dy]);
    }
};

const combination = (arr, result, cameras) => {
    if (arr.length >= cameras.length) {
        result.push([...arr]);
        return;
    }

    const [x, y, camType] = cameras[arr.length];
    for (let i = 0; i < cameraDirs[camType].length; i++) {
        const dir = cameraDirs[camType][i];
        combination([...arr, [x, y, [...dir]]], result, cameras);
    }
};

const calculate = (N, M, cameras, board) => {
    const camCombinations = [];
    combination([], camCombinations, cameras);

    let min = Infinity;

    camCombinations.forEach((arr) => {
        const newBoard = Array.from({length: N}, (_, index) => [...board[index]]);
        bfs(arr, newBoard);

        let cnt = 0;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (newBoard[i][j] === 0) {
                    cnt++;
                }
            }
        }
        min = Math.min(cnt, min);
    });

    console.log(min);
};

const solution = (N, M, board) => {
    const cameras = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] !== 0 && board[i][j] !== 6) {
                cameras.push([i, j, board[i][j] - 1]);
            }
        }
    }

    calculate(N, M, cameras, board);
};

solution(N, M, board);

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// //let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
// let [N, M] = input.shift().split(' ').map(Number);
// let Map = input.map(v => v.split(' ').map(Number));
//
// let Cameras = [];
// let answer = Infinity;
// const CHECK_VALUE = 10;
// for (let i = 0; i < N; i++) {
//     for (let j = 0; j < M; j++) {
//         if (Map[i][j] !== 0 && Map[i][j] !== 6) {
//             Cameras.push([i, j, Map[i][j]]);
//         }
//
//     }
// }
//
// const CamOn = (X, Y, dir, map, isCheck) => {
//     const Direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
//     for (const MyDir of dir) {
//         let [NextX, NextY] = [X + Direction[MyDir][0], Y + Direction[MyDir][1]];
//         while (NextX >= 0 && NextX < N && NextY >= 0 && NextY < M && map[NextX][NextY] !== 6) {
//             map[NextX][NextY] += isCheck;
//             [NextX, NextY] = [NextX + Direction[MyDir][0], NextY + Direction[MyDir][1]];
//         }
//     }
// };
//
// const FindAnswer = (map) => {
//     let result = 0;
//     for (let i = 0; i < N; i++) {
//         for (let j = 0; j < M; j++) {
//             if (map[i][j] === 0) {
//                 result++;
//             }
//         }
//     }
//     return result;
// };
// const Combination = (Cams, Index, map) => {
//     if (Index === Cams.length) {
//         const result = FindAnswer(map);
//         answer = Math.min(result, answer);
//         return;
//     }
//     const [X, Y, Type] = Cams[Index];
//
//     if (Type === 1) {
//         CamOn(X, Y, [2], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [2], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [3], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [0], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [1], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [1], map, -CHECK_VALUE);
//     } else if (Type === 2) {
//
//         CamOn(X, Y, [2, 3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [2, 3], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [0, 1], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0, 1], map, -CHECK_VALUE);
//     } else if (Type === 3) {
//         CamOn(X, Y, [0,3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0,3], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [1, 3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [1, 3], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [1, 2], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [1, 2], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [0, 2], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0, 2], map, -CHECK_VALUE);
//     } else if (Type === 4) {
//         CamOn(X, Y, [0, 1, 3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0, 1, 3], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [1, 2, 3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [1, 2, 3], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [0, 1, 2], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0, 1, 2], map, -CHECK_VALUE);
//
//         CamOn(X, Y, [0, 2, 3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0, 2, 3], map, -CHECK_VALUE);
//     } else {
//         CamOn(X, Y, [0, 1, 2, 3], map, CHECK_VALUE);
//         Combination(Cams, Index + 1, map);
//         CamOn(X, Y, [0, 1, 2, 3], map, -CHECK_VALUE);
//
//     }
// };
// Combination(Cameras, 0, Map);
// console.log(answer);