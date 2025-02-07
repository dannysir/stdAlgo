const input = require('fs').readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const sortedArr = Array.from({length: 8}, (_, index) => index + 1);
let result = null;
if (input[0] === 1) {
    result = 'ascending'
}
if (input[0] === 8) {
    result = 'descending'
}

for (let i = 0; i < 8; i++) {
    if (input[0] === 1) {
        if (input[i] !== sortedArr[i]) {
            result = 'mixed';
            break;
        }
    } else if (input[0] === 8) {
        if (input[i] !== sortedArr[7 - i]) {
            result = 'mixed';
            break;
        }
    } else {
        result = 'mixed';
        break;
    }

}
console.log(result);