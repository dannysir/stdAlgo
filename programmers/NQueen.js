function solution(n) {
    let answer = 0;
    let Queens = new Array(n).fill(0);

    const check = (target) =>{
        for(let i = 0; i < target; i++){
            if(Queens[target] === Queens[i] || Math.abs(Queens[target] - Queens[i]) === target - i){
                return false;
            }
        }
        return true;
    }
    const DFS = (index) =>{
        if(index === n){
            answer++;
            return;
        }
        for(let i = 1; i < n + 1; i++){
            Queens[index] = i;
            if(check(index)){
                DFS(index + 1);
            }
        }
    }
    DFS(0);
    return answer;
}