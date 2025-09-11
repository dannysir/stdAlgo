let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [F, S, G, U, D] = input.shift().split(" ").map(Number);

const bfs = () => {
    const visited = Array(F + 1).fill(-1);
    const queue = [[S, 0]];
    visited[S] = 0;
    const dirs = [U, -D];
    let idx = 0;

    while (queue.length > idx) {
        const [now, cnt] = queue[idx++];

        for (const dir of dirs) {
            const next = now + dir;
            const nextCnt = cnt + 1;
            if (next <= 0 || next > F) continue;
            if (visited[next] === -1 || visited[next] > nextCnt) {
                visited[next] = nextCnt;
                queue.push([next, nextCnt]);
            }
        }
    }
    console.log(visited[G] === -1 ? 'use the stairs' : visited[G]);
};

bfs();