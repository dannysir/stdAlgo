function solution(targets) {
    var answer = 1;
    targets.sort((a,b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        return a[1] - b[1];
    });
    let targetIndex = 0

    for (let i = 1; i < targets.length; i++) {
        if (targets[targetIndex][1] <= targets[i][0]) {
            answer++;
            targetIndex = i;
        }
    }


    return answer;
}