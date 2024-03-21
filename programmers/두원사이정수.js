function solution(r1, r2) {
    var answer = 0;

    for(let i = 1; i <= r2; i++){
        let high = Math.floor(Math.sqrt(r2**2 - i**2));
        let min = 0;
        if(i < r1){
            min = Math.ceil(Math.sqrt(r1**2 - i**2));
        }
        answer += high - min + 1;
    }
    return answer*4;
}