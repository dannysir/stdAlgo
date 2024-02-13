let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);

input = input.filter(v => v.length >= M);
let InputMap = new Map();

input.forEach(Value => {
    if (InputMap.has(Value)) {
        InputMap.set(Value, InputMap.get(Value) + 1);
    }else InputMap.set(Value, 1);
});

let newArr = [...InputMap].sort((a, b) => {
    if (a[1] === b[1]) {
        if (a[0].length === b[0].length){
            return a[0] < b[0]? -1:1;
        }
        return b[0].length - a[0].length;
    }else {
        return b[1] - a[1];
    }
});
let result = newArr.map(v => v[0]).join('\n');
console.log(result);
