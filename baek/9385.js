let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let Test = parseInt(input.shift());

let answer = '';
for (let i = 0; i < Test; i++) {

    while (input.length) {
        const N = parseInt(input.shift());
        const MyDress = input.splice(0, N).map(v => v.split(' '));

        let newSet = new Set();

        for (let j = 0; j < MyDress.length; j++) {
            newSet.add(MyDress[j][1]);
        }

        newSet = [...newSet];
        let arr = new Array(newSet.length).fill(0);
        for (let j = 0; j < MyDress.length; j++) {
            arr[newSet.indexOf(MyDress[j][1])]++;
        }
        answer += `${arr.reduce((a, b) => {
            return a * (b + 1);
        }, 1) - 1}\n`;

    }
}
console.log(answer);
