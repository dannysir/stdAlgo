let edges = [[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]];
let nodes = {};

for (const edge of edges) {
    const [a, b] = edge;
    nodes[a] = nodes[a] ? [nodes[a][0], nodes[a][1] + 1] : [0, 1];
    nodes[b] = nodes[b] ? [nodes[b][0] + 1, nodes[b][1]] : [1, 0];
}
let answer = new Array(4).fill(0);
// [ 정점, 도넛, 막대, 8 ]
for (const nodesKey in nodes) {
    const [In, Out] = nodes[nodesKey];
    if (Out === 0) {
        answer[2]++;
    } else if (Out === 2) {
        if (In > 0) {
            answer[3]++;
        } else {
            answer[0] = parseInt(nodesKey);
        }

    }else if (Out > 2) {
        answer[0] = parseInt(nodesKey);
    }
}
answer[1] = nodes[answer[0]][1] - (answer[2] + answer[3]);
console.log(answer);