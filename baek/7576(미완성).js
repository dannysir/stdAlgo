let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift().split(' ').map(v => parseInt(v));
let map = [];
while (input.length) {
    let garo = input.shift().split(' ').map(v => parseInt(v));
    //garo.forEach()
    map.push(garo);
}
let visited = new Array(N[1]);
for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(N[0]).fill(false);
}
let queue = [];
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 1) {
            queue.push([i, j]);
            visited[i][j] = true;
        }
    }
}
function BFS() {
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    while (queue.length) {
        let [nowX, nowY] = queue.shift();
        for (let i = 0; i < dx.length; i++) {
            let nextX = nowX + dx[i];
            let nextY = nowY + dy[i];
            if (nextX < N[1] && nextY < N[0] && nextX >= 0 && nextY >= 0) {
                if (visited[nextX][nextY] === false && map[nextX][nextY] === 0) {
                    queue.push([nextX, nextY]);
                    map[nextX][nextY] = map[nowX][nowY] + 1;
                    if (cnt < map[nowX][nowY] + 1) {
                        cnt = map[nowX][nowY] + 1;
                    }
                    visited[nextX][nextY] = true;
                }
            }
        }
    }
    return cnt > 0 ? cnt - 1 : 0;
}

console.log(BFS());

console.log(map);

