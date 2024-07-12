let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
let idx = 0;
const N = parseInt(input[idx++]);
const POPULATION = input[idx++].split(' ').map(Number);
let lines = Array.from({length: 6}, _ => []);
// A팀 B팀 나눠서 저장.
let teamA = [];
let teamB = [];
let min = Number.MAX_SAFE_INTEGER;
// 연결 관계 저장.
for (let i = 0; i < N; i++) {
    lines[i] = input[idx++].split(" ").slice(1).map(Number).map(v => v - 1);
}

// BFS를 이용해서 연결되어 있는지 확인.
const BFS = (now, total, team) => {
    let queue = [now];

    let index = 0;
    let visited = Array.from({length: N}, _ => false);
    visited[now] = true;

    while (queue.length > index) {
        const NOW = queue[index];
        for (let i = 0; i < lines[NOW].length; i++) {
            const NEXT = lines[NOW][i];
            if (!visited[NEXT] && team.includes(NEXT)) {
                queue.push(NEXT);
                visited[NEXT] = true;

            }
        }
        index++;
    }
    return visited.filter(v => v === true).length === total;

};

// A 구역의 갯수를 주면 그 갯수만큼의 조합을 만들어줌.
const Combination = (A, arr, last) => {
    if (arr.length === A) {
        teamA = arr;
        let tmp = [];
        // B팀 갱신.
        for (let i = 0; i < N; i++) {
            if (arr.includes(i)) continue;
            tmp.push(i);
        }
        teamB = tmp;
        // B팀 수
        const B = N - A;

        // 두 팀이 조건에 맞게 연결된다면.
        if (BFS(teamA[0], A, teamA) && BFS(teamB[0], B, teamB)) {
            let sumA = 0;
            let sumB = 0;
            // 인구 계산.
            POPULATION.forEach((value, index) => {
                if (teamA.includes(index)) {
                    sumA += value;
                } else {
                    sumB += value;
                }
            });
            min = Math.min(min, Math.abs(sumB - sumA));
        }
        return;
    }

    // 재귀를 이용해 조합.
    for (let i = last; i < N; i++) {
        Combination(A, [...arr, i], i + 1);
    }
};
for (let i = 1; i < N; i++) {
    Combination(i, [0], 1);
}
min = min === Number.MAX_SAFE_INTEGER ? -1 : min;
console.log(min);