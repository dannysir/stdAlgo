function solution(n, s) {
    var answer = [];
    if (n > s) {
        answer.push(-1);
        return answer;
    }

    for (let i = 0; i < n; i++) {
        answer.push(Math.floor(s / (n - i)));
        s -= answer[answer.length - 1];
    }

    return answer;
}