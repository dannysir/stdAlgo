let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
const distance = input[0].split(' ').map(Number);
const costs = input[1].split(' ').map(Number);

let tank = BigInt(0);
let answer = BigInt(0);
for (let i = 0; i < costs.length - 1; i++) {
    if (tank >= distance[i]) continue;


    let tmp = BigInt(distance[i]);
    for (let j = i + 1; j < costs.length - 1; j++) {
        if (costs[j] < costs[i]) break;

        tmp += BigInt(distance[j]);
    }
    tank += tmp;
    answer += tmp * BigInt(costs[i]);

}
console.log(String(answer));