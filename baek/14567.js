let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
// // 그냥 푼거.
// const Restriction = input.map(v => v.split(' ').map(Number));
//
// let dp = new Array(N).fill(1);
//
// Restriction.sort((a, b) => a[0] - b[0]);
// Restriction.forEach(v => {
//     dp[v[1] - 1] = Math.max(dp[v[1] - 1], dp[v[0] - 1] + 1);
// });
//
// console.log(dp.join(' '));

// 위상정렬 이용 풀이.
let lines = {};
let count = new Array(N + 1).fill(0);
let answer = new Array(N).fill(0);
for (let i = 1; i < N + 1; i++) {
    lines[i] = [];
}
input.forEach(v => {
    const [Start, End] = v.split(' ').map(Number);
    lines[Start].push(End);
    count[End]++;
});

const TopologicalSort = () => {
    let Queue = [];
    for (let i = 1; i < count.length; i++) {
        if (count[i] === 0) {
            Queue.push([i, 1]);
        }
    }
    let idx = 0;
    while (Queue.length > idx) {
        const [now, time] = Queue[idx];
        answer[now - 1] = time;

        for (const next of lines[now]) {
            count[next]--;
            if (count[next] === 0) {
                Queue.push([next, time + 1]);
            }
        }
        idx++;
    }
    console.log(answer.join(' '));

};
TopologicalSort();