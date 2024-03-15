let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let obj1 = {
    1: 'a',
    2: 'b',
    3: 'c',
    length: 3
}
Array.prototype.push.call(obj1, 'd');
console.log(obj1);