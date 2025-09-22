let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.shift().split(' ').map(Number);

const counterMap = new Map();

let left = 0;
let right = 0;
let answer = 1;
let currentLength = 1;
counterMap.set(input[0], 1);

while (right < N - 1) {
    right++;
    if (counterMap.has(input[right])) {
        counterMap.set(input[right], counterMap.get(input[right]) + 1);
    }else counterMap.set(input[right], 1);

    currentLength++;

    // Shrink window if any element exceeds M occurrences
    while (counterMap.get(input[right]) > M) {
        counterMap.set(input[left], counterMap.get(input[left]) - 1);
        if (counterMap.get(input[left]) === 0) {
            counterMap.delete(input[left]);
        }
        left++;
        currentLength--;
    }

    // Update answer with current window size
    answer = Math.max(answer, currentLength);
}
console.log(answer);