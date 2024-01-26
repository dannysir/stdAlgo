let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n").map(v=>+v)[0];;
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let is_End = false;
const main = (str) =>{
    if (is_End) return;
    if (str.length === input) {
        console.log(str);
        is_End = true;
        return;
    }else{
        for (let i = 1; i <= 3; i++) {
            const next = str + `${i}`;
            if (next.length <= input && isGood(next)){
                main(next);
            }
        }
    }
}
const isGood = (str) => {
    const MAX_DIVIDE_LENGTH = Math.floor(str.length / 2);
    const FULL_LENGTH = str.length;
    for (let i = 1; i <= MAX_DIVIDE_LENGTH; i++) {
        const END = FULL_LENGTH;
        const MIDDLE = FULL_LENGTH - i;
        const START = FULL_LENGTH - (i * 2);
        if (START >= 0 && str.substring(MIDDLE, END) === str.substring(START, MIDDLE)) {
            return false;
        }
    }
    return true;
}
main('1');