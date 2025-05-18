function solution(k, dungeons) {
    let max = -1;
    const size = dungeons.length
    const visited = Array.from({length : size}, _ => false);

    const combination = (now, cnt, visited) => {
        max = Math.max(max, cnt);

        if (cnt === size) return;

        for (let i = 0; i < dungeons.length; i++) {
            const [least, cost] = dungeons[i];
            if (now >= least && !visited[i]) {
                visited[i] = true;
                combination(now - cost, cnt + 1, visited);
                visited[i] = false;
            }
        }
    }

    combination(k, 0, visited);

    return max;
}