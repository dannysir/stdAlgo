let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
input = input.map(v => v.split(' ').map(Number));
let answer = [];


while (input.length) {
    const [Y, X] = input.shift();
    if (X ===0 && Y === 0) break;
    const MAP = input.splice(0, X);
    let visited = Array.from({length: X}, _ => Array.from({length: Y}, _ => 0));
    let cnt = 1;

    const DFS = (nowX, nowY, count) => {
        visited[nowX][nowY] = count;
        const dir = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

        for (const dirElement of dir) {
            const NextX = nowX + dirElement[0];
            const NextY = nowY + dirElement[1];
            if (NextX < 0 || NextX >= X || NextY < 0 || NextY >= Y) {
                continue;
            }

            if (!visited[NextX][NextY] && MAP[NextX][NextY] === 1) {
                DFS(NextX, NextY, count);
            }
        }
    };

    for (let i = 0; i < X; i++) {
        for (let j = 0; j < Y; j++) {
            if (!visited[i][j] && MAP[i][j] === 1) {
                DFS(i, j, cnt++);
            }
        }
    }
    answer.push(cnt - 1);
}
console.log(answer.join('\n'));