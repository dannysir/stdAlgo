let computers = [[1, 1, 0], [1, 1, 0], [0, 0, 1]];
let n = 3;
let visited = new Array(n).fill(false);
let map = new Array(n).fill(0);
let counter = 0;
function BFS(now, cnt) {
    let queue = [now];
    if (visited[now] === false) {
        while (queue.length) {
            let nowPosi = queue.shift();
            visited[nowPosi] = true;
            map[nowPosi] = cnt;
            for (let i = 0; i < computers[nowPosi].length; i++) {
                if (computers[nowPosi][i] === 1 && visited[i] === false) {
                    queue.push(i);
                }
            }
        }
    }
}

for (let i = 0; i < n; i++) {
    if (visited[i] === false) {
        counter++;
        BFS(i, counter);
    }else if (visited === true) continue;
}

console.log(map);
console.log(visited);