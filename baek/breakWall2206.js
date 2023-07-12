const map = [[0, 1, 0, 0,], [1, 1, 1, 0,], [1, 0, 0, 0,], [0, 0, 0, 0,], [0, 1, 1, 1,], [0, 0, 0, 0,]];
const N = 6;
const M = 4;
const que = [];
const ch = Array.from(new Array(N), () => new Array());
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        ch[i][j] = new Array(2).fill(0);
    }
}
const dx = [1,0,-1,0];
const dy = [0,1,0,-1];

que.push([0,0,0]);
ch[0][0][0] = 1;
function bfs(){
    let a = 0;

    while (que.length !== a){
        const [y, x, breakwall] = que[a];

        if (x === M -1 && y === N -1) return ch[y][x][breakwall];

        for (let i = 0; i < dx.length; i++){
            const [nextX, nextY] = [x + dx[i], y + dy[i]];

            if (nextX >= 0 && nextX < M && nextY >= 0 && nextY < N){
                if(map[nextY][nextX] === 0 && ch[nextY][nextX][breakwall] === 0){
                    ch[nextY][nextX][breakwall] = ch[y][x][breakwall] + 1;
                    que.push([nextY, nextX, breakwall]);
                }else if(map[nextY][nextX] === 1 && breakwall === 0){
                    ch[nextY][nextX][breakwall + 1] = ch[y][x][breakwall] + 1;
                    que.push([nextY,nextX,breakwall + 1]);
                }
            }
        }
        a++;
    }
    return -1;
}

console.log(bfs());
