let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));

const [N, M] = input.shift();

input.forEach(v => v.shift());

const eachIn = Array(N + 1).fill(0);
const eachOut = Array.from({length: N + 1}, _ => []);

input.forEach((arr) => {
    for (let i = 0; i < arr.length; i++) {
        const now = arr[i];

        if (arr[i - 1]) {
            eachIn[now]++;
        }

        if (arr[i + 1]) {
            eachOut[now].push(arr[i + 1]);
        }
    }
});

const TopologicalSort = () => {
    const queue = [];
    eachIn.forEach((value, index) => {
        if (value === 0 && index !== 0) {
            queue.push(index);
        }
    });

    let idx = 0;

    while (queue.length > idx) {
        const now = queue[idx];

        for (const next of eachOut[now]) {
            eachIn[next]--;
            if (eachIn[next] === 0) {
                queue.push(next);
            }
        }
        idx++
    }
    return eachIn.some((value, index) => value !== 0) ? '0' : queue.join('\n');
};

console.log(TopologicalSort());