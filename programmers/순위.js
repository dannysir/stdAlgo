let n = 5;
let results = [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]];
let tables = Array.from({length: n}, _ => Array.from({length: n}, _ => false));
let TableCounter = Array.from({length: n}, _ => 0);

//DFS 사용
let GoStraight = Array.from({length: n}, _ => []);
// 역방향 트리
let GoReverse = Array.from({length: n}, _ => []);
// 연결된 노드 갯수를 저장 할 배열.
let TreeCounter = Array.from({length: n}, _ => 0);
// 트리 생성.
results.forEach(v => {
    const [Start, End] = v;
    GoStraight[Start - 1].push(End);
    GoReverse[End - 1].push(Start);
});
let MapCounter = Array.from({length: n}, _ => 0);

const DFS = (tree, now, visited) => {
    visited[now] = true;
    MapCounter[now] += 1;
    if (!tree[now]) return;
    for (let i = 0; i < tree[now].length; i++) {
        const Next = tree[now][i] - 1;
        if (!visited[Next]) {
            DFS(tree, Next, visited);
        }
    }
};

const Go = (tree) => {
    for (let i = 0; i < n; i++) {
        let visited = Array.from({length: n}, _ => false);
        DFS(tree, i, visited);
        visited = visited.map(_ => false);
    }
};
Go(GoStraight);
Go(GoReverse);
let answer = [];

console.log(MapCounter.reduce((acc,cur) => {
    if (cur > n) {
        return acc + 1;
    }else return acc;
}, 0));
