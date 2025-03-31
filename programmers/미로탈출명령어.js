function solution(n, m, x, y, r, c, k) {
    var answer = [];
    const dirs = [[1, 0], [0, -1], [0, 1], [-1, 0], [0, 1]];
    const dirMap = {
        0 : 'd',
        1 : 'l',
        2 : 'r',
        3 : 'u' ,
    }
    let flag = false;
    const dfs = (nowX, nowY, arr) => {
        if (flag) return;

        if (arr.length === k) {
            if (nowX === r - 1 && nowY === c - 1) {
                answer.push(arr.join(''));
                flag = true;
            }
            return;
        }

        const remainingMoves = k - arr.length;
        const minDistance = Math.abs(nowX - (r - 1)) + Math.abs(nowY - (c - 1));
        if (minDistance > remainingMoves || (remainingMoves - minDistance) % 2 !== 0) {
            return;
        }

        for (let i = 0; i < dirs.length; i++) {
            const [dx, dy] = dirs[i];
            const nx = nowX + dx;
            const ny = nowY + dy;

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

            dfs(nx, ny, [...arr, dirMap[i]]);
        }
    }

    dfs(x - 1, y - 1, []);

    return answer.length ? answer[0] : 'impossible';
}