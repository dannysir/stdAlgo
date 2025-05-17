function solution(n, costs) {
    const parent = Array.from({length : n}, (_, index) => index);
    costs.sort((a, b) => a[2] - b[2]);
    const find = (target) => {
        if (parent[target] === target) return target;
        return find(parent[target]);
    }

    const isSameParent = (a, b) => {
        const aParent = find(a);
        const bParent = find(b);
        return aParent === bParent;
    }

    const union = (a, b) => {
        const aParent = find(a);
        const bParent = find(b);
        if (aParent < bParent) {
            parent[bParent] = aParent;
        }else parent[aParent] = bParent;
    }

    let answer = 0;
    for (const [start, end, cost] of costs) {
        if (!isSameParent(start, end)) {
            answer += cost;
            union(start, end);
        }
    }
    return answer;
}