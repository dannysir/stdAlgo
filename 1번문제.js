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