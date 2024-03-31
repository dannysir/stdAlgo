let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);
let Books = input.shift().split(' ').map(Number);
let Left = Books.filter(v => v < 0);
let Right = Books.filter(v => v > 0);
Left.sort((a, b) => {
    return Math.abs(b) - Math.abs((a));
});
Right.sort((a, b) => {
    return Math.abs(b) - Math.abs((a));
});

let Distance = 0;
let max = 0;
let leftIDX = 0;
while (Left.length > leftIDX) {
    Distance += Math.abs(Left[leftIDX]) * 2;
    max = max < Math.abs(Left[leftIDX]) ? Math.abs(Left[leftIDX]) : max;
    leftIDX += M;
}
let rightIDX = 0;
while (Right.length > rightIDX) {
    Distance += Math.abs(Right[rightIDX]) * 2;
    max = max < Math.abs(Right[rightIDX]) ? Math.abs(Right[rightIDX]) : max;
    rightIDX += M;
}

console.log(Distance - max);