// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const points = [[3, 2], [6, 4], [4, 7], [1, 4]];
const routes = [[4, 2], [1, 3], [2, 4]];
const map = Array.from({length: 10}, _ => Array(10).fill(0));
let answer = 0;

const check  = (start, end) =>{
    const [sx, sy] = start;
    const [ex, ey] = end;
    let [nx, ny] = start;

    while (nx !== ex) {
        if (ex - sx > 0) {
            map[nx + 1][ny] += 1;
            nx += 1;
        }else {
            map[nx - 1][ny] += 1;
            nx -= 1;
        }
    }

    while (ny !== ey) {
        if (ey - sy > 0) {
            map[nx][ny + 1] += 1;
            ny += 1;
        }else {
            map[nx][ny - 1] += 1;
            ny -= 1;
        }
    }
}
const init = () => {
    routes.forEach((route, index) => {
        for (let i = 0; i < route.length - 1; i++) {
            const start = points[route[i] - 1];
            const end = points[route[i + 1] - 1];
            check(start, end);
        }
    })
};
init();
console.log(map);