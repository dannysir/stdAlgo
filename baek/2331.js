let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, K] = input[0].split(' ');

let arr = [];
let record = N;
while (!arr.includes(record)) {
    arr.push(record);
    let tmpArr = record.split('').map(Number);
    let tmp = 0;
    for (const number of tmpArr) {
        tmp += number ** K;
    }
    record = String(tmp);
}
console.log(arr.indexOf(record));