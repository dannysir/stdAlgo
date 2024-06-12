let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, C] = input[0].split(" ").map(Number);
input = input[1].split(' ').map(Number);
const A = input.splice(0, parseInt(input.length / 2));
const B = input;
let SumA = [];
let SumB = [];
const SumSubset = (Arr, targetArr, index, sum) => {
    if (index === Arr.length) {
        targetArr.push(sum);
        return;
    }
    SumSubset(Arr, targetArr, index + 1, sum);
    SumSubset(Arr, targetArr, index + 1, sum + Arr[index]);
};

const BinarySearch = (Arr, T) => {
    let Start = 0;
    let End = Arr.length;

    while (Start < End) {
        const mid = Math.floor((Start + End) / 2);
        if (Arr[mid] <= T) {
            Start = mid + 1;
        } else {
            End = mid;
        }
    }

    return End;
};

SumSubset(A, SumA, 0, 0);
SumSubset(B, SumB, 0, 0);

SumA.sort((a, b) => a - b);

let result = 0;
for (const num of SumB) {
    if (num > C) {
        continue;
    }

    result += BinarySearch(SumA, C - num);
}
console.log(result);