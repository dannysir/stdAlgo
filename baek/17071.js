let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);
const visited = Array.from({length: 500_001}, _ => Array(2).fill(false));
const bfs = (now) => {
    const queue = [[now[0], 0]];
    let time = 0;
    visited[now[0]][0] = true;  // 시작 위치 방문 처리 추가

    while (queue.length) {
        const sisterPos = K + (time * (time + 1)) / 2;
        if (sisterPos > 500_000) return -1;
        if (visited[sisterPos][time % 2]) return time;

        const queueSize = queue.length;  // 현재 시간대의 위치 개수 저장
        for (let i = 0; i < queueSize; i++) {  // 현재 시간대의 위치만 처리
            const [n, t] = queue.shift();

            for (const nextPos of [n - 1, n + 1, n * 2]) {
                if (nextPos >= 0 && nextPos <= 500_000 && !visited[nextPos][(t + 1) % 2]) {
                    visited[nextPos][(t + 1) % 2] = true;
                    queue.push([nextPos, t + 1]);
                }
            }
        }

        time++;
    }
    return -1;
};
console.log(N === K ? 0 : bfs([N, 0]));