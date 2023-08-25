let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let N = input.shift();
let conntection = input.shift();
let tree = new Array(parseInt(N)).fill( ).map(_ => []);
for (let i = 0; i < input.length; i++) {
    let a = input[i].split(' ');
    tree[a[0] - 1].push(a[1]);
    tree[a[1] - 1].push(a[0]);

}
tree.forEach(v => v.sort((a, b) => a - b));
let visited = new Array(parseInt(N)).fill(false);
let count = 0;
function BFS(start) {
    let queue = [start];
    visited[start] = true;
    while (queue.length > 0) {
        let a = queue.shift();
        for (let i = 0; i < tree[a].length; i++) {
            if (!visited[tree[a][i] - 1]) {
                visited[tree[a][i] - 1] = true;
                queue.push(tree[a][i] - 1);
                count++;
            }

        }
    }
}

BFS(0);

console.log(count);
