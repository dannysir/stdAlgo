let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let n = input.shift();
let arr = input.shift().split(' ').map(v => parseInt(v));
let instead = parseInt(input.shift());
arr = arr.map(v => {
    if (v === -1) {
        return instead;
    } else {
        return v;
    }
}).sort((a, b) => a - b);
let trees = {};
for (let i = 0; i < n; i++) {
    trees[arr[i]]
}
let result = [];
function post(mid, dis) {
    if (dis <= 0) {
        result.push(arr[mid]);
        return;
    }
    post(mid - dis, Math.floor(dis / 2));
    post(mid + dis, Math.floor(dis / 2));
    result.push(arr[mid]);
}

post(Math.floor(n / 2), Math.floor((parseInt(n) + 1) / 4));
console.log(result.join(' '));