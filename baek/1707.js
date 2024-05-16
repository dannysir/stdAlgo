let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const TESTCASE = parseInt(input.shift());

const Check = (start, linesOBJ, visited) => {
    let Queue = [start];
    visited[start] = 1;
    let idx = 0;
    while (Queue.length > idx) {
        const NOW = Queue[idx];
        const POSITION = visited[NOW];
        const OtherPos = POSITION === 1 ? -1 : 1;
        for (const NEXT of linesOBJ[NOW]) {
            if (visited[NEXT] === POSITION) {
                return false;
            }
            if (visited[NEXT] === 0) {
                Queue.push(NEXT);
                visited[NEXT] = OtherPos;
            }
        }
        idx++;
    }
    return true;
};

const solution = () => {
    let answer = [];
    let index = 0;
    for (let i = 0; i < TESTCASE; i++) {
        const [n, l] = input[index++].split(' ').map(Number);
        const graph = Array.from({ length: n + 1 }, () => []);
        let visited = new Array(n + 1).fill(0);

        for (let i = 0; i < l; i++) {
            const [start, end] = input[index++].split(' ').map(Number);
            graph[start].push(end);
            graph[end].push(start);
        }

        let result = true;
        for (let i = 1; i <= n; i++) {
            if (visited[i] === 0) {
                if (!Check(i, graph, visited)) {
                    result = false;
                    break;
                }
            }
        }
        answer.push(result ? 'YES' : 'NO');
    }
    console.log(answer.join('\n'));
};

solution();