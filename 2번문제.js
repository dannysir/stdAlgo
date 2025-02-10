const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let [Order, Key, N, Message] = ['', '', 0, ''];
const MakeNum = (INPUT) => {
    let arr = [];
    INPUT.split('').forEach((value, index) => {
        arr.push(INPUT.charCodeAt(index) - 97);
    });
    return arr;
};
const SumArr = (KA, MA) => {
    let ResultArr = [];
    KA.forEach((value, index) => {
        ResultArr.push((value + MA[index]) % 26)
    });
    return ResultArr;
};

const Rotate = (n, arr) => {
    if (n !== 0) {
        let tmp = arr.splice(n);
        return tmp.concat(arr);
    }
    return arr
};

const DivArr = (RA, KA) => {
    let MA = [];
    RA.forEach((value, index) => {
        if (value < KA[index]) {
            MA.push(Math.abs(value + 26 - KA[index]));
        } else {
            MA.push(Math.abs(value - KA[index]));
        }
    });
    return MA;
};
const MakeString = (arr) => {
    let result = [];
    arr.forEach(v => {

        result.push(String.fromCharCode(v + 97));
    });
    console.log(result.join(''));
};
const solution = () => {
    if (Order === 'encrypt') {
        const KeyArr = MakeNum(Key);
        const MessageArr = MakeNum(Message);
        let resultArr = SumArr(KeyArr, MessageArr);
        resultArr = Rotate(N, resultArr);
        MakeString(resultArr);
    } else {
        const KeyArr = MakeNum(Key);
        const MessageArr = MakeNum(Message);
        let resultArr = Rotate(N * (-1), MessageArr);
        resultArr = DivArr(resultArr, KeyArr);
        MakeString(resultArr);
    }
};
solution();
rl.on("line", function (line) {
    [Order, Key, N, Message] = line.split(' ')

    rl.close();
}).on("close", function () {
    solution();
    process.exit();
});