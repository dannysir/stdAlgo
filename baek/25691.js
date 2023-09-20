let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let [n, k] = input.shift().split(' ').map(v => parseInt(v));
let trees = new Array(n).fill().map(_ => []);
for (let i = 0; i < n - 1; i++) {
    let connection = input.shift().split(' ').map(v => parseInt(v));
    trees[connection[0]].push(connection[1]);
    trees[connection[1]].push(connection[0]);
}
let apple = input.shift().split(' ').map(v => parseInt(v));


let max = 0;
let visited = new Array(n).fill(false);
let cnt = 1;
visited[0] = true;
function Dfs(now, cntAple, counter) {
    let countApple = cntAple + apple[now];
    if (max < countApple) max = countApple;
    for (let i = 0; i < trees[now].length; i++) {
        if (counter === k) continue;
        if (visited[trees[now][i]] === false) {
            visited[trees[now][i]] = true;
            counter++;
            Dfs(trees[now][i], countApple, counter);
        }
    }
}

Dfs(0, 0, cnt);
console.log(max);
console.log(visited);
console.log(cnt);