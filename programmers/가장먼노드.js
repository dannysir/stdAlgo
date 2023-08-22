let vertex = [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]];
let n = 6;
vertex.sort();
let arr = new Array(n).fill().map(_ => []);

for (let i = 0; i < vertex.length; i++) {
    arr[vertex[i][0] - 1].push(vertex[i][1]-1);
    arr[vertex[i][1] - 1].push(vertex[i][0]-1);
}

let que = [0];
let visited = [1];
while (que.length) {
    const now = que.shift();
    for (const i of arr[now]) {
        if (!visited[i]) {
            visited[i] = visited[now] + 1;
            que.push(i);
        }

    }
}
let max = Math.max(...visited);

console.log(visited);
console.log(visited.filter(v => v == max).length);

