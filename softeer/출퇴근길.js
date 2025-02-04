const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let cnt = 0;
let N = null;
let M = null;
const input = [];

const move = (now, visited, connections) => {
    const queue = [now];
    visited[now] = true;

    while (queue.length > 0) {
        const current = queue.shift();

        for (const next of connections[current]) {
            if (!visited[next]) {
                visited[next] = true;
                queue.push(next);
            }
        }
    }
}

const solution = (inputArr) => {
    // S, T는 따로 처리
    const [S, T] = inputArr.pop().split(' ').map(v => Number(v) - 1);

    // 나머지 간선 정보 처리
    inputArr = inputArr.map(v => v.split(' ').map(v => Number(v) - 1));

    const connections = Array.from({length: N}, _ => []);
    const reverseConnections = Array.from({length: N}, _ => []);
    const toWork = Array(N).fill(false);
    const toHome = Array(N).fill(false);
    const reverseToWork = Array(N).fill(false);
    const reverseToHome = Array(N).fill(false);

    toWork[T] = true;
    toHome[S] = true;

    inputArr.forEach(v => {
        const [start, end] = v;
        connections[start].push(end);
        reverseConnections[end].push(start);
    });

    move(S, toWork, connections);
    move(T, toHome, connections);
    move(S, reverseToWork, reverseConnections);
    move(T, reverseToHome, reverseConnections);

    const answer = toWork.map((value, index) => {
        return value && toHome[index] && reverseToWork[index] && reverseToHome[index];
    }).filter(v => v);

    console.log(answer.length - 2)
}

rl.on("line", function(line){
    cnt++;
    if (cnt === 1) {
        [N, M] = line.split(' ').map(Number);
        return;
    }
    input.push(line);
    if (cnt === M + 2){
        rl.close();
    }
}).on("close", function(){
    solution(input);
    process.exit();
});