let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let tc = Number(input[0]);
let index = 1;

for (let i = 0; i < tc; i++) {
    let board_size = Number(input[index]);
    let board = new Array(board_size);
    for (let j = 0; j < board.length; j++) {
        board[j] = new Array(board_size).fill(0);
    }
    let startX = Number(input[index + 1].split(" ")[0]);
    let startY = Number(input[index + 1].split(" ")[1]);
    let endX = Number(input[index + 2].split(" ")[0]);
    let endY = Number(input[index + 2].split(" ")[1]);
    board[startX][startY] = 1;
    function BFS() {
        let answer = 0;
        let dx = [2, 1, -1, -2, 2, 1, -1, -2];
        let dy = [1, 2, 2, 1, -1, -2, -2, -1];
        let que = [];
        que.push([startX, startY]);
        while (que.length){
            let leng = que.length;
            for (let i = 0; i < leng; i++) {
                let a = que.shift();
                if (a[0] === endX && a[1] === endY){
                    return answer;
                }
                for (let i = 0; i < 8; i++) {
                    let nX = a[0] + dx[i];
                    let nY = a[1] + dy[i];
                    if (nX >= 0 && nX < board_size && nY >= 0 && nY < board_size && board[nX][nY] ===0){
                        board[nX][nY] = 1;
                        que.push([nX, nY]);
                    }
                }
            }
            answer++;
        }
    }
    index += 3;
}