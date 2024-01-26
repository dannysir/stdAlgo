let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());

let k = 0;
let total = 3;
while (N >= total) {
    k++;
    total = total * 2 + k + 3;
}
function Find(totalLen, mid, N) {
    let prev = (totalLen - mid) / 2;
    // prev - mid - prev

    if (N <= prev) {
        return  Find(prev, mid - 1, N);
    }else if (N > prev && N <= prev + mid) {
        N - prev === 1 ? console.log('m') : console.log('o');
    } else {
        return  Find(prev, mid - 1, N - prev - mid);
    }
}

Find(total, k + 3, N);

//무식하게
// function makeMoo(k) {
//     if (k === 0) {
//         return 'moo';
//     }
//     let moo = 'm';
//     if (k > 0) {
//         while (moo.length !== k + 3) {
//             moo += 'o';
//         }
//         return moo;
//     }
// }
// function MakeMooArr(k) {
//     let answer = '';
//     if (k === 0) {
//         return makeMoo(0);
//     }
//     if (k > 0) {
//         answer = `${MakeMooArr(k - 1)}${makeMoo(k)}${MakeMooArr(k - 1)}`;
//     }
//     return answer;
// }
// function Find() {
//     let p = Math.floor(N / 3);
//     let mooArr = MakeMooArr(p - 1);
//     console.log(mooArr[N - 1]);
// }