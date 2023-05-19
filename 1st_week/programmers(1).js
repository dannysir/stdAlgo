let s = "110010101001";
let answer = new Array(2).fill(0);
function cngFnc(inputNum) {
    let a = inputNum.split("").filter(i => i == '0').length;
    answer[0] += a;
    s = (s.length - a).toString(2);
    answer[1]++;
}

    while (s != '1'){
        cngFnc(s);
    }


console.log(answer);
