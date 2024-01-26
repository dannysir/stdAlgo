let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split(" ");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
input = input[0].split('');

const CheckRight = (inputArray) => {
    let openArr = [];
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === ')' && openArr[openArr.length - 1] === '(') {
            openArr.pop();
        } else if (inputArray[i] === ']' && openArr[openArr.length - 1] === '[') {
            openArr.pop();
        } else {
            openArr.push(inputArray[i]);
        }
    }
    return openArr.length === 0;

    // let openArr = [];
    // let closeArr = [];
    // for (let i = 0; i < inputArray.length; i++) {
    //     if (inputArray[i] === '(') {
    //         openArr.push(inputArray[i]);
    //         closeArr.push(')');
    //     }
    //     if (inputArray[i] === '[') {
    //         openArr.push(inputArray[i]);
    //         closeArr.push(']');
    //     }
    //     if (inputArray[i] === ')' && closeArr[closeArr.length - 1] === inputArray[i]) {
    //         closeArr.pop();
    //         openArr.pop();
    //         openArr.push(2);
    //     }
    //     if (inputArray[i] === ']' && closeArr[closeArr.length - 1] === inputArray[i]) {
    //         closeArr.pop();
    //         openArr.pop();
    //     }
    // }
    // return openArr.length === 0 && closeArr.length === 0;
}

const Calculate = () => {
    if (!CheckRight(input)) return 0;
    let stack = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(' || input[i] === '[') {
            stack.push(input[i]);
        }
        if (input[i] === ')' || input[i] === ']') {

            const topShouldBe = input[i] === ')' ? '(' : '[';
            const num = topShouldBe === '(' ? 2 : 3;
            // (  3
            if (stack[stack.length - 1] === topShouldBe) {
                stack.pop();
                stack.push(num);
            } else {
                let temp = 0;
                while (true) {
                    const popNum = stack.pop();
                    if (typeof popNum === 'number') {
                        temp += popNum;
                    } else if (popNum === topShouldBe) {
                        stack.push(temp * num);
                        break;
                    }
                }
            }
        }
    }
    return stack.reduce((a, b) => a + b);
};
console.log((input));
console.log(Calculate());