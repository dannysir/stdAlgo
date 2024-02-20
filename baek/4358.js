let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let trees = {};
let total = input.length;
input.sort((a, b) => {
    return a.toUpperCase() < b.toUpperCase() ? -1 : 1;
});
for (const string of input) {
    trees[string] = trees[string] ? trees[string] + 1 : 1;
}

let answer = [];

for (const treesKey in trees) {
    const percent = (trees[treesKey] / total * 100).toFixed(4);
    answer.push(`${treesKey} ${percent}`);
}
console.log(answer.join('\n'));