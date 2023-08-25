let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift()); // N을 숫자로 변환
const map = input.map(v => v.split(''));
let visited = new Array(N); // N으로 초기화
for (let i = 0; i < N; i++) {
    visited[i] = new Array(N).fill(false); // N으로 초기화
}

function BFS(startX, startY, V) {
    let queue = [[startX, startY]];
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    let cnt = 0;
    while (queue.length > 0) {
        let current = queue.shift();
        let x = current[0];
        let y = current[1];
        visited[x][y] = true;
        map[x][y] = V;
        cnt++;
        for (let i = 0; i < dx.length; i++) {
            let nextX = x + dx[i];
            let nextY = y + dy[i];
            if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < N && map[nextX][nextY] == '1' && !visited[nextX][nextY]) {
                queue.push([nextX, nextY]);
                visited[nextX][nextY] = true;
                map[nextX][nextY] = V;
            }
        }
    }
    return cnt;
}
function main(){
    let a = 1;
    let answer = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] == '1' && visited[i][j] == false) {
                answer.push(BFS(i, j, a));
                a++;
                continue;
            }
        }
    }
    console.log(a - 1);
    answer.sort((a, b) => a - b); // 단지 내 집의 수 오름차순 정렬
    answer.forEach(v => console.log(v));
    return answer;
}
main();
console.log(map);