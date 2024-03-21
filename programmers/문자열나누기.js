function solution(s) {
    var answer = 0;
    let targetCnt = 0;
    let notTargetCnt = 0;
    let targetIndex = 0;
    let isNew = true;

    for(let i = 0; i < s.length; i++){
        if(isNew){
            isNew = false;
            targetIndex = i;
            targetCnt++;
        }else{
            if(s[i] === s[targetIndex]){
                targetCnt++;
            }else{
                notTargetCnt++;
            }
        }
        if(targetCnt === notTargetCnt){
            isNew = true;
            targetCnt = 0;
            notTargetCnt = 0;
            answer++;
        }
    }
    if(targetCnt || notTargetCnt){
        answer++;
    }

    return answer;
}