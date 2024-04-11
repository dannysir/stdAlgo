let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);
let Map = input.map(v => v.split(' ').map(Number));
const BFS = (x, y) => {
    let visited = Array.from({length: N}, _ => Array(M).fill(false));
    let Queue = [[x, y]];
    visited[x][y] = true;
    let idx = 0;
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    let Rotten = 0;
    while (Queue.length > idx) {
        let [X, Y] = Queue[idx];
        for (let i = 0; i < dx.length; i++) {
            const NextX = X + dx[i];
            const NextY = Y + dy[i];
            if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= M) continue;
            if (!visited[NextX][NextY]) {
                if (Map[NextX][NextY] === 0) {
                    visited[NextX][NextY] = true;
                    Queue.push([NextX, NextY]);
                }else if (Map[NextX][NextY] === 1) {
                    visited[NextX][NextY] = true;
                    Map[NextX][NextY] = 0;
                    Rotten++;
                }
            }

        }
        idx++;
    }
    return Rotten;
};

const solution = () => {
    let timer = 0;
    let CheeseExist = 0;
    let RottenCheese = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (Map[i][j] === 1) {
                CheeseExist++;
            }
        }
    }
    while (CheeseExist > 0) {
        RottenCheese = BFS(0, 0);
        CheeseExist = CheeseExist - RottenCheese;
        timer++;
    }
    console.log(`${timer}\n${RottenCheese}`);
};
solution();