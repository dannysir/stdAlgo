let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [M, N] = input.shift().split(' ').map(Number);

const planets = input.map(v => v.split(' ').map(Number));
const compressedMap = new Map();
const compress = (planets) => {
    const compressed = Array(N);
    const planetsSet = [...new Set(planets)];
    const rank = new Map();
    planetsSet.sort((a, b) => a - b);
    planetsSet.forEach((value, index) => {
        rank.set(value, index);
    });
    planets.forEach((value, index) => {
        compressed[index] = rank.get(value);
    });
    return compressed;
};

planets.forEach((arr, index) => {
    const result = compress(arr).join('-');
    if (compressedMap.has(result)) {
        compressedMap.set(result, compressedMap.get(result) + 1);
    }else compressedMap.set(result, 1);
});

let answer = 0;
for (const [key, value] of compressedMap.entries()) {
    if (value < 2) continue;

    answer += (value * (value - 1)) / 2;
}
console.log(answer);
