let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, Cranes, M, Boxes] = input;
Cranes = Cranes.split(' ').map(Number).sort((a, b) => {
    return b - a;
});
Boxes = Boxes.split(' ').map(Number).sort((a, b) => b - a);
const solution = () => {
    let cnt = 0;
    if (Boxes[0] > Cranes[0]) return -1;
    while (Boxes.length) {
        for (const crane of Cranes) {
            for (let i = 0; i < Boxes.length; i++) {
                if (crane >= Boxes[i]) {
                    Boxes.splice(i, 1);
                    break;
                }
            }
        }
        cnt++;
    }
    return cnt;
};

console.log(solution());