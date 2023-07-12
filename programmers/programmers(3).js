let s = "[](){}".split("");

const pair =
    { '}': '{', ']': '[', ')': '(' };

let answer = 0;
function lotateString(sentence) {
    s.push(s.shift());
}
function checkFun(arr) {
    let newArr = [];
    if (arr.length % 2 == 0 && arr[0] != ']' && arr[0] != '}' && arr[0] != ')') {
        for (let i = 0; i < arr.length; i++) {
            if (pair[arr[i]] === undefined) newArr.push(arr[i]);
            else{
                if (newArr[newArr.length -1] !== pair[arr[i]]) return 0;
                newArr.pop();
            }
        }
        if (newArr.length == 0) {
            return 1;
        }
    } else {
        return 0;
    }

}
function main() {
    answer += checkFun(s);
    for (i = 1; i < s.length; i++) {
        lotateString(s);
        answer += checkFun(s);
    }
}
main();
console.log(answer);