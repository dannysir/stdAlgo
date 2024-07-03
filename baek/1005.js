let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

let idx = 0;
const TESTCASE = parseInt(input[idx++]);
for (let i = 0; i < TESTCASE; i++) {

    const [B, L] = input[idx++].split(' ').map(Number);
    const BuildDuration = input[idx++].split(' ').map(Number);
    const inputLines = input.splice(idx, L);
    const Target = parseInt(input[idx++]);

    let lines = Array.from({length: B}, _ => []);
    let nodeCounter = Array.from({length: B}, _ => 0);
    inputLines.forEach(v => {
        const [Start, End] = v.split(' ').map(Number);
        lines[Start - 1].push(End - 1);
        nodeCounter[End - 1]++;
    });

    const TopologicalSort = () => {
        let Queue = [];
        let timeArr = Array.from({length: B}, _ => 0);
        for (let i = 0; i < B; i++) {
            if (nodeCounter[i] === 0) {
                Queue.push([i, 0]);
            }
        }

        let idx = 0;

        while (Queue.length > idx) {
            const [now, time] = Queue[idx];
            if (now === Target - 1) {
                console.log(time + BuildDuration[now]);
                return;
            }

            for (const next of lines[now]) {
                nodeCounter[next]--;
                timeArr[next] = Math.max(timeArr[next], time + BuildDuration[now]);
                if (nodeCounter[next] === 0) {
                    Queue.push([next, timeArr[next]]);
                }
            }
            idx++;
        }

    };
    TopologicalSort();
}
