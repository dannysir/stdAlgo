let info = [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1];
let n = 9;
let answer;
function Rion(arr, start) {
    let rionArray = new Array(info.length).fill(0);
    let cnt = 0;
    for (let i = start; i < rionArray.length; i++) {
        if (cnt < n && cnt + arr[i] + 1 <= n){
            cnt += arr[i] + 1;
             rionArray[i] = arr[i] + 1;
        }else if(cnt === n) break;

    }
    
    return rionArray;
}
function FindScore(RionArray, ApeachArray) {
    let score = 0;
    for (let i = 0; i < RionArray.length; i++) {
        if (RionArray[i] > ApeachArray[i]){
            score += (10 - i);
        }else if (RionArray[i] <= ApeachArray[i] && ApeachArray[i] !== 0){
            score -= (10 - i);
        }
    }
    return score;
}
function main(){
    let max = 0;
    for (let i = 0; i < info.length; i++) {
        if (FindScore(Rion(info, i), info) > max){
            max = FindScore(Rion(info, i), info);
            answer = Rion(info,i);
        }else break;
    }
}

main();
console.log(answer);