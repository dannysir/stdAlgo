let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
input = input[0].split('');

const stack = [];
for (let i = 0; i < input.length; i++) {
    if (stack.length >= 3) {
        const LastP = input[i];
        const A = stack.pop();
        const SecondP = stack.pop();
        const FirstP = stack.pop();

        if (LastP === 'P' && A === 'A' && SecondP === 'P' && FirstP === 'P') {
            stack.push('P');
        } else {
            stack.push(FirstP, SecondP, A, LastP);
        }
    } else {
        stack.push(input[i]);
    }
}
console.log(stack.join('') === 'P' ? 'PPAP' : 'NP');