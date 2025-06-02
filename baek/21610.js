let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
let waterBoards = input.splice(0, N).map(v => v.split(' ').map(Number));
const orders = input.map(v => v.split(' ').map(Number));
const dirs = [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
let clouds = [[N - 1, 0], [N - 1, 1], [N - 2, 0], [N - 2, 1]];

const moveClouds = (clouds, order) => {
    const [dirIndex, dirLength] = order;
    const newClouds = clouds.map(([x, y]) => {
        const nx = (x + dirs[dirIndex - 1][0] * (dirLength % N) + N) % N;
        const ny = (y + dirs[dirIndex - 1][1] * (dirLength % N) + N) % N;
        return [nx, ny];
    });
    return newClouds;
}

const cloudRain = (clouds) => {
    clouds.forEach(([x, y]) => {
        waterBoards[x][y] += 1;
    })
    clouds.forEach(([x, y]) => {
        let cnt = 0;
        for (let i = 1; i < dirs.length; i += 2) {
            const [dx, dy] = dirs[i];
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (waterBoards[nx][ny] > 0) {
                cnt++;
            }
        }
        waterBoards[x][y] += cnt;
    });
}

const makeClouds = (waterBoards, clouds) => {
    const newClouds = [];
    const prevClouds = Array.from({length: N}, _ => Array(N).fill(true));
    clouds.forEach(([x, y]) => {
        prevClouds[x][y] = false;
    })
    const newWaterBoards = waterBoards.map((row, x) => row.map((value, y) => {
        if (value >= 2 && prevClouds[x][y]) {
            newClouds.push([x, y]);
            return value - 2;
        } else return value;
    }));
    return [newClouds, newWaterBoards];
}

orders.forEach((order) => {
    clouds = moveClouds(clouds, order);
    cloudRain(clouds);
    [clouds, waterBoards] = makeClouds(waterBoards, clouds);
});

console.log(waterBoards.reduce((acc, cur) => acc + cur.reduce((a, c) => a + c, 0), 0));