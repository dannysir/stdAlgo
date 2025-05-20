function solution(scores) {
    let answer = 1;
    const myScoreString = scores[0].join(',');
    const myScore = scores[0];

    scores.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return b[0] - a[0]
    });
    let maxB = 0;

    for (const [a, b] of scores) {
        if (a > myScore[0] && b > myScore[1]) return -1;

        if (maxB <= b) {
            if ( a + b > myScore[0] + myScore[1]) answer++;
            maxB = b;
        }

        // if (`${a},${b}` === myScoreString) break;
    }

    return answer;
}