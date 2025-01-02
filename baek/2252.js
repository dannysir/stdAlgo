let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const inputArr = input.map(v => v.split(' ').map(Number));

const TopologicalSort = (N, M, inputArr) => {
    // 진입차수 배열 초기화
    const inDegree = Array(N + 1).fill(0);
    // 그래프 초기화 (인접 리스트)
    const graph = Array.from({ length: N + 1 }, () => []);

    // 그래프 구성 및 진입차수 계산
    for (const [a, b] of inputArr) {
        graph[a].push(b);
        inDegree[b]++;
    }

    const result = [];
    const queue = [];

    // 진입차수가 0인 노드를 큐에 삽입
    for (let i = 1; i <= N; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    // 위상 정렬 수행
    while (queue.length > 0) {
        const current = queue.shift(); // 큐의 맨 앞에서 노드 꺼내기
        result.push(current);

        // 현재 노드와 연결된 노드들의 진입차수 감소
        for (const next of graph[current]) {
            inDegree[next]--;

            // 진입차수가 0이 된 노드를 큐에 삽입
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    console.log(result.join(' '));
};

TopologicalSort(N, M, inputArr);