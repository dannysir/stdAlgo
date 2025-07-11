function solution(n, q, ans) {
    let answer = 0;

    const check = (target) => {
        for (let i = 0; i < q.length; i++) {
            const goal = ans[i];
            let cnt = 0;
            for (let j = 0; j < 5; j++) {
                if (q[i].includes(target[j])) {
                    cnt++;
                }
                if (cnt > goal) return false;
            }
            if (cnt === goal) {
                continue;
            } else return false;
        }
        return true;
    }

    const combination = (arr, index) => {
        if (arr.length === 5) {
            if (check(arr)) {
                answer++;
            }
            return;
        }

        for (let i = index; i <= n; i++) {
            combination([...arr, i], i + 1);
        }
    }
    combination([], 1);
    return answer;
}