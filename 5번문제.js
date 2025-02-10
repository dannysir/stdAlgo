let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);

let visited = Array.from({length: N}, _ => Array.from({length: M}, _ => false));
let max = 0;
const BFS = (now) => {
    let Queue = [now];
    let idx = 0;
    let dirs = [[2, 1], [2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];
    visited[now[0]][now[1]] = true;
    while (Queue.length > idx) {
        const [nowX, nowY, cnt] = Queue[idx];
        max = Math.max(max, cnt);
        for (const [dx, dy] of dirs) {
            const NextX = nowX + dx;
            const NextY = nowY + dy;
            if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= M) continue;
            if (!visited[NextX][NextY]) {
                visited[NextX][NextY] = true;
                Queue.push([NextX, NextY, cnt + 1]);
            }

        }
        idx++;
    }
};
BFS([0, 0, 0]);
const Check = () => {
    let flag = true;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (visited[i][j] === false) {
                flag = false;
                return;
            }
        }
    }
    return flag;
};
if (Check()) {
    console.log(`T${max}`);
} else {
    console.log(`F${max}`);
}
