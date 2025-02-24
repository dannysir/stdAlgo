let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const boards = input.map(v => v.split(' ').map(Number));
const visited = Array(N).fill(false);

let min = Number.MAX_SAFE_INTEGER;
const combination = (index) => {
    if (index === N - 1) {
        let teamOne = 0;
        let teamTwo = 0;
        for (let i = 0; i < N - 1; i++) {
            for (let j = i + 1; j < N; j++) {
                if (visited[i] && visited[j]) {
                    teamOne += boards[i][j] + boards[j][i]
                }
                if (!visited[i] && !visited[j]) {
                    teamTwo += boards[i][j] + boards[j][i]
                }
            }
        }

        min = Math.min(min, Math.abs(teamTwo - teamOne));
        return;
    }

    combination(index + 1);
    visited[index] = true;
    combination(index + 1);
    visited[index] = false;
};

combination(0);

console.log(min);