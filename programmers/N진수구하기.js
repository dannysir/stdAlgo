let n = 16; // 진수
let t = 16; // 몇줄 찾을까
let m = 2;  // 참가 인원
let p = 1;  // 차례
let str = ``;
let answer = '';
for (let i = 0; str.length < t * m; i++) {
    let a = i.toString(n);
    str += a;
}

for (let i = 0; i < str.length; i++) {
    if (answer.length < t) {
        if ((i + 1) % m === p) {
            answer += str[i].toUpperCase();
        }else if (m == p && (i + 1) % m === 0){
            answer += str[i].toUpperCase();

        }
    }
}

console.log(str);
console.log(answer);