let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [A, B, C] = input.shift().split(' ').map(Number);

const mod = BigInt(C);
const recursion = (A, cnt) => {
    if (cnt === 1) {
        return A % mod;
    }
    const result = recursion(A, Math.floor(cnt / 2)) % mod;
    if (cnt % 2 === 0) {
        return (result * result) % mod;
    } else {
        return ((A % mod * result) % mod * result) % mod;
    }

};

console.log(Number(recursion(BigInt(A), B)));
