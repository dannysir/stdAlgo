const combination = (origin, n) => {
    const comArr = [];

    if (n === 1) {
        return origin.map(v => [v]);
    }

    origin.forEach((selected, index, originArr) => {
        const each = combination(origin.slice(index + 1), n - 1);
        comArr.push(...each.map(v => [selected, ...v].sort().join('')));
    });

    return comArr;
};

function solution(orders, course) {
    const answer = [];

    course.forEach((n) => {
        const visited = {};
        let max = 0;
        orders.forEach(order => {
            const comArr = combination(order.split(''), n);
            comArr.forEach(key => {
                if (visited[key]) {
                    visited[key]++;
                    max = Math.max(max, visited[key]);
                } else visited[key] = 1;
            });
        });
        for (const key in visited) {
            if (visited[key] === max) {
                answer.push(key);
            }
        }
    });

    return answer.sort();
}