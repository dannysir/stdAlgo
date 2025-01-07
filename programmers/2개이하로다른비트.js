const numbers = [2, 7];
const result = [];

const solution = (input) => {
    let result = null;
    const isEven = input % 2 === 0;
    if (isEven) return input + 1;
    let inputBinary = input.toString(2);
    inputBinary = inputBinary.padStart(inputBinary.length + 1, '0').split('');
    for (let i = inputBinary.length - 1; i >= 0; i--) {
        if (inputBinary[i] === '0') {
            inputBinary[i + 1] = '0';
            inputBinary[i] = '1';
            break;
        }
    }
    return parseInt(inputBinary.join(''), 2);
};

numbers.forEach(v => {
    result.push(solution(v));
});

console.log(result);