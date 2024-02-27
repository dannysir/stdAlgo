let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = parseInt(input.shift());
let Concentrate = parseInt(input.shift());
if (Concentrate >= N) {
    console.log(0);
} else {
    let SensorArr = input.shift().split(' ').map(Number).sort((a, b) => a - b);
    let Distinct = SensorArr[SensorArr.length - 1] - SensorArr[0];
    let EachDisArr = [];
    for (let i = 0; i < SensorArr.length - 1; i++) {
        EachDisArr.push(SensorArr[i + 1] - SensorArr[i]);
    }
    EachDisArr.sort((a, b) => b - a);
    let answer = 0;
    for (let i = Concentrate - 1; i < EachDisArr.length; i++) {
        answer += EachDisArr[i];
    }
    console.log(answer);
    // const Between = EachDisArr.splice(0, Concentrate - 1).reduce((a, b) => a + b);
    // console.log(Distinct - Between);
}
