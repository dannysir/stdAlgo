function solution(n) {
    var answer = 0;
    let visited = new Array(n + 1).fill(0);
    visited[0] = 1;
    visited[1] = 1;
    for (let i = 1; i < Math.ceil(Math.sqrt(n + 1)); i++){
        let tmp = 2;
        if (visited[i] === 0){
            while(i * tmp <= n){
                visited[i * tmp] = 1;
                tmp++;
            }
        }

    }
    answer = visited.filter(v => v === 0).length;
    return answer;
}