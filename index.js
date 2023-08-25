let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let testNUM = input.shift();

function main(changedinput) {
    let inputSan = changedinput;
    let map;
    let visited;
    let maxX = 0;
    let maxY = 0;

    function makeMap(arr) {
        let all = arr.shift().split(' ');
        maxX = parseInt(all[0]);
        maxY = parseInt(all[1]);
        visited = new Array(maxX);
        map = new Array(maxX);
        for (let i = 0; i < visited.length; i++) {
            visited[i] = new Array(maxY).fill(false);
            map[i] = new Array(maxY).fill(0);
        }
        for (let i = 0; i < all[2]; i++) {
            let a = arr.shift().split(' ');
            map[a[0]][a[1]] = 1;
        }
    }

    makeMap(inputSan);

    function BFS(startX, startY) {
        let dx = [1, -1, 0, 0];
        let dy = [0, 0, 1, -1];
        let queue = [[startX, startY]];

        while (queue.length > 0) {
            let [x, y] = queue.shift();
            visited[x][y] = true;
            for (let i = 0; i < dx.length; i++) {
                let nextX = x + dx[i];
                let nextY = y + dy[i];
                if (nextX >= 0 && nextX < maxX && nextY >= 0 && nextY < maxY && map[nextX][nextY] === 1 && visited[nextX][nextY] === false) {
                    queue.push([nextX, nextY]);
                }
            }

        }

    }

// BFS(0, 0, 0);
    function countingFun() {
        let count = 0;
        for (let i = 0; i < maxX; i++) {
            for (let j = 0; j < maxY; j++) {
                if (visited[i][j] === false && map[i][j] === 1) {
                    BFS(i, j);
                    count++;
                }
            }
        }
        return count;
    }

    console.log(countingFun());
}

for (let i = 0; i < testNUM; i++) {
    main(input);
}