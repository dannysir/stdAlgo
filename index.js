// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// let hello = [];
// let N = -1;
// rl.on("line", function (line) {
//     if (N === -1) {
//         N = line;
//         return;
//     }
//     hello.push(line);
//     N--;
//     if (N === 0) rl.close();
// }).on("close", function () {
//     console.log(hello);
//     process.exit();
// });

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N = -1;
let input = [];
rl.on("line", function (line) {
    if (N === -1) {
        N = line;
        return;
    }
    input.push(line.split(",").map(Number));
    N--;
    if (N ===0) rl.close();
}).on("close", function () {
    console.log(input);
    process.exit();
})