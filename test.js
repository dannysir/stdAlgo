// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

// Run by Node.js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", function (line) {
    let NumArr = line.split(' ').sort((a, b) => {
        let tmp = 0;
        if (a.length < b.length) {
            tmp = a.repeat(b.length);
            return tmp - b
        }else if (a.length > b.length) {
            tmp = b.repeat(a.length);
            return a - tmp;
        }
    });
    let Min = BigInt(NumArr.join(''));
    let Max = BigInt(NumArr.reverse().join(''));
    console.log(Number(Min + Max));

    rl.close();
}).on("close", function () {
    process.exit();
});
// (async () => {
//     let rl = readline.createInterface({input: process.stdin});
//
//
//     for await (const line of rl) {
//         console.log(line);
//         rl.close();
//     }
//
//     process.exit();
// })();
