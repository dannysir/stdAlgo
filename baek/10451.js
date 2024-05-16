let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const TESTCASE = parseInt(input.shift());

const solution = () => {
    let answer = [];
    let index = 0;
    for (let i = 0; i < TESTCASE; i++) {
        const N = parseInt(input[index++]);
        const Numbers = input[index++].split(' ').map(Number);

        let visited = new Array(N + 1).fill(0);

        const DFS = (now, cnt) => {
            visited[now] = cnt;
            const NEXT = Numbers[now - 1];
            if (!visited[NEXT]) {
                DFS(NEXT, cnt);
            }
        };
        let count = 1;
        for (let i = 1; i <= N; i++) {
            if (!visited[i]) {
                DFS(i, count);
                count++;
            }
        }
        answer.push(Math.max(...visited))
    }
    console.log(answer.join('\n'));
};
solution();