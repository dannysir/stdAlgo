const points = [[1, 1], [1, 3]];
const routes = [[1, 2, 1, 2], [2, 1, 2, 1]];
let answer = 0;
const heatMap = new Map();

const insertMap = (x, y, t) => {
    const key = `${x},${y},${t}`;
    if (heatMap.has(key)) {
        heatMap.set(key, heatMap.get(key) + 1);
    } else {
        heatMap.set(key, 1);
    }
};

const move = (start, end, time) => {
    let [sx, sy] = points[start];
    let [ex, ey] = points[end];

    // 가로 이동
    while (sx !== ex) {
        if (sx < ex) sx++;
        else sx--;
        time++;
        insertMap(sx, sy, time);
    }

    // 세로 이동
    while (sy !== ey) {
        if (sy < ey) sy++;
        else sy--;
        time++;
        insertMap(sx, sy, time);
    }

    return time;
};

routes.forEach((route) => {
    const routeLen = route.length;
    const [beginX, beginY] = points[route[0] - 1];
    let time = 0
    insertMap(beginX, beginY, time);
    for (let i = 1; i < routeLen; i++) {
        const start = route[i - 1];
        const end = route[i];

        time = move(start - 1, end - 1, time);
    }
})

heatMap.forEach((value, key) => {
    value > 1 ? answer++ : null;
})
console.log(answer);
// const check  = (start, end) =>{
//     const [sx, sy] = start;
//     const [ex, ey] = end;
//     let [nx, ny] = start;
//
//     while (nx !== ex) {
//         if (ex - sx > 0) {
//             map[nx + 1][ny] += 1;
//             nx += 1;
//         }else {
//             map[nx - 1][ny] += 1;
//             nx -= 1;
//         }
//     }
//
//     while (ny !== ey) {
//         if (ey - sy > 0) {
//             map[nx][ny + 1] += 1;
//             ny += 1;
//         }else {
//             map[nx][ny - 1] += 1;
//             ny -= 1;
//         }
//     }
// }
// const init = () => {
//     routes.forEach((route, index) => {
//         for (let i = 0; i < route.length - 1; i++) {
//             const start = points[route[i] - 1];
//             const end = points[route[i + 1] - 1];
//             check(start, end);
//         }
//     })
// };
// init();
// console.log(map);