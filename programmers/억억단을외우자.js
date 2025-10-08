function solution(e, starts) {
    var answer = Array(starts.length).fill(0);
    const cntArr = Array(5_000_001).fill(0);
    const startsIndexMap = new Map();
    starts.forEach((value, index) => startsIndexMap.set(value, index));
    const startsArr = [...starts].sort((a, b) => a - b);

    for (let i = 1; i <= e; i++) {
        for (let j = 1; j <= e / i; j++) {
            cntArr[i * j]++;
        }
    }

    let max = [0, 0];

    for (let i = e; i > 0; i--) {
        const cnt = cntArr[i];
        if (max[0] <= cnt) max = [cnt, i];
        if (startsIndexMap.has(i)) {
            answer[startsIndexMap.get(i)] = max[1];
        }
    }

    return answer;
}