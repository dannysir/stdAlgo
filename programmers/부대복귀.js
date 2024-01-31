let n = 3;
let roads = [[1, 2], [2, 3]];
let sources = [2, 3];
let destination = 1;
let answer = [];

const trees = new Array(n + 1).fill().map(_ => []);
for (let i = 0; i < roads.length; i++) {
    trees[roads[i][0]].push(roads[i][1]);
    trees[roads[i][1]].push(roads[i][0]);
}
let visited = new Array(n + 1).fill(Infinity);

const BFS = (goal) => {
    visited[goal] = 0;
    let queue = [goal];
    while (queue.length) {
        let now = queue.shift();
        for (let i = 0; i < trees[now].length; i++) {
            if (visited[now] + 1 < visited[trees[now][i]]) {
                visited[trees[now][i]] = visited[now] + 1;
                queue.push(trees[now][i]);
            }
        }
    }
};
BFS(destination);
for (const army of sources) {
    if (visited[army] === Infinity) {
        answer.push(-1);
    }else{
        answer.push(visited[army]);
    }

}
console.log(answer);