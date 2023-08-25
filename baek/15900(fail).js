let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
let tree = new Array(parseInt(N)).fill( ).map(_ => []);
for (let i = 0; i < input.length; i++) {
    let a = input[i].split(' ');
    tree[a[0] - 1].push(parseInt(a[1]));
    tree[a[1] - 1].push(parseInt(a[0]));

}
tree.forEach(v => v.sort((a, b) => a - b));
let visited = new Array(parseInt(N)).fill(false);

let counter = 0;
function DFS(node, height) {
    let isLeaf = true;
    visited[node - 1] = true;
    for (const nextnode of tree[node-1]) {

        if (!visited[nextnode - 1]) {
            isLeaf = false;
            DFS(nextnode, height + 1);

        }
    }
    if (isLeaf) {
        counter += height;
    }
}
DFS(1, 0);
if (counter % 2 === 1) {
    console.log('Yes');
}else{
    console.log('No');
}
console.log(visited);
console.log(tree)