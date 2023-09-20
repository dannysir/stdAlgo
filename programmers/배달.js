let road = [[1, 2, 1], [2, 3, 3], [5, 2, 2], [1, 4, 2], [5, 3, 1], [5, 4, 2]];
let N = 5;
let k = 3;
let connection = Array.from(Array(N + 1), () => []);
road.forEach((value) => {
    let [a, b, c] = value;
    connection[a].push({to: b, cost: c});
    connection[b].push({to: a, cost: c});
});

const minimumCost = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
minimumCost[1] = 0;

let queue = [{to: 1, cost: 0}];
while (queue.length) {
    let now =  queue.shift();
    connection[now.to].forEach(next =>{
        if (minimumCost[next.to] > minimumCost[now.to] + next.cost) {
            minimumCost[next.to] = minimumCost[now.to] + next.cost;
            queue.push(next);
        }
    })
}
console.log(minimumCost.filter(a => a <= k).length);
console.log(connection);
console.log(minimumCost);