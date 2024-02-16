let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const Goal = input.shift();
let MyString = input.shift().split('');

const solution = () => {

    while (MyString.length !== Goal.length) {
        const TOP = MyString[MyString.length - 1];
        if (TOP === 'A') {
            MyString.pop();
        } else if (TOP === 'B') {
            MyString.pop();
            MyString.reverse();
        }else {
            return 0;
        }
    }

    return MyString.join('') === Goal ? 1 : 0;
};
console.log(solution());