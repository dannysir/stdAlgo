const name = "JEROEN";

let minimum = name.length - 1;
let answer = 0;
for (let i = 0; i < name.length; i++) {
    const upDown = Math.min(name[i].charCodeAt() - 'A'.charCodeAt(), 26 - (name[i].charCodeAt() - 'A'.charCodeAt()));

    answer += upDown;

    let idx = i + 1;
    while (idx < name.length && name[idx] === 'A') {
        idx++;
    }

    minimum = Math.min(
        minimum,
        i * 2 + (name.length - idx),
        i + 2 * (name.length - idx)
    );
}
answer += minimum;
console.log(answer);