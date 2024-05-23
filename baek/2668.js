let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
let N = parseInt(input.shift());
const InputArr = input.map(Number);

const solution = () => {

    let visited = new Array(N).fill(false);
    let circulate = new Array(N).fill(false);

    let arr = [];
    const DFS = (now) => {
        visited[now] = true;
        const NEXT = InputArr[now] - 1;
        if (!visited[NEXT]) {
            DFS(NEXT);
        } else {
            if (!circulate[NEXT]) {
                let tmp = NEXT;
                arr.push(NEXT + 1);
                while (tmp !== now) {
                    tmp = InputArr[tmp] - 1;
                    arr.push(tmp + 1);
                }
            }
        }
        circulate[now] = true;
    };

    for (let i = 0; i < N; i++) {
        if (!visited[i]) {
            DFS(i);
        }
    }
    arr.sort((a, b) => a - b);
    arr.unshift(arr.length);
    console.log(arr.join('\n'));
};
solution();