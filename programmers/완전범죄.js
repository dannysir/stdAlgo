function solution(info, n, m) {
    var answer = Infinity;
    const visited = new Set();
    const dfs = (a, b, index) => {
        if (index >= info.length) {
            answer = Math.min(answer, a);
            return;
        }
        const key = `${a}-${b}-${index}`;
        if (visited.has(key)) return;
        visited.add(key);
        const nA = a + info[index][0];
        const nB = b + info[index][1];
        if (nA < n && nA < answer) {
            dfs(nA, b, index + 1);
        }

        if (nB < m) {
            dfs(a, nB, index + 1);
        }
    }

    dfs(0,0,0);

    return answer === Infinity ? -1 : answer;
}