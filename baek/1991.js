let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
const N = Number(input.shift());
let result = '';

const tree = {};
for (let i = 0; i < N; i++) {
    const [node, left, right] = input[i].split(" ");
    tree[node] = [left, right];
}

function pre(node) {
    if (node === '.'){
        return;
    }
    const [left, right] = tree[node];
    result += node;
    pre(left);
    pre(right);
}
function mid(node) {
    if (node === '.'){
        return;
    }
    const [left, right] = tree[node];
    mid(left);
    result += node;
    mid(right);
}
function post(node) {
    if (node === '.'){
        return;
    }
    const [left, right] = tree[node];
    post(left);
    post(right);
    result += node;
}
pre('A');
result += '\n';
mid('A');
result += '\n'
post('A');
result += '\n';
console.log(result)
