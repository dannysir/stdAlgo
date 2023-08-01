let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
const lev = +input[0]
const trees = input[1].split(' ').map(Number);
const answer = [];

//아래와 같이 배열을 생성할 경우 fill을 통해 빈 배열을 참조하기 때문에 하나의 배열에 push를 하면 모든 배열에 추가된다. !!!!!!!
//const ans = new Array(lev).fill([ ]);
for (let i = 0; i < lev; i++) {
    answer.push([]);
}

function Divid(arr, level) {
    let center = Math.floor(arr.length / 2);
    if (arr.length === 1) {
        answer[level].push(arr[0])
        return;
    }
    answer[level].push(arr[center]);

    let left = arr.slice(0, center);
    let right = arr.slice(center + 1, arr.length);
    Divid(left, level + 1);
    Divid(right, level + 1);

}

Divid(trees, 0);
console.log(answer.map(v => v.join(' ')).join('\n'));
