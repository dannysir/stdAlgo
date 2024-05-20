let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const TESTCASE = parseInt(input.shift());
let idx = 0;
let output = [];

for (let i = 0; i < TESTCASE; i++) {
    let n = parseInt(input[idx++]);
    let students = input[idx++].split(' ').map(Number);
    students.unshift(0); // 1-based indexing

    let visited = new Array(n + 1).fill(false);
    let finished = new Array(n + 1).fill(false);
    let result = 0;

    const DFS = (current) => {
        visited[current] = true;
        let next = students[current];

        if (!visited[next]) {
            DFS(next);
        } else if (!finished[next]) {
            // Found a cycle
            let temp = next;
            while (temp !== current) {
                result++;
                temp = students[temp];
            }
            result++;
        }

        finished[current] = true;
    };

    for (let j = 1; j <= n; j++) {
        if (!visited[j]) {
            DFS(j);
        }
    }

    output.push(n - result);
}

console.log(output.join('\n'));
