let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const boards = input.map(v => v.split(''));

// 초기 구슬 위치 찾기
let redX, redY, blueX, blueY;
for(let i = 0; i < boards.length; i++) {
    for(let j = 0; j < boards[i].length; j++) {
        if(boards[i][j] === 'R') {
            redX = i;
            redY = j;
            boards[i][j] = '.';
        }
        if(boards[i][j] === 'B') {
            blueX = i;
            blueY = j;
            boards[i][j] = '.';
        }
    }
}

const isRedFirst = (dir, red, blue) => {
    const [redX, redY] = red;
    const [blueX, blueY] = blue;
    if (dir === 0) return redX >= blueX;  // 아래
    if (dir === 1) return redX <= blueX;  // 위
    if (dir === 2) return redY >= blueY;  // 오른쪽
    if (dir === 3) return redY <= blueY;  // 왼쪽
};

const moveBall = (targetBall, otherBall, dir) => {
    let moved = false;
    while (true) {
        let nx = targetBall[0] + dir[0];
        let ny = targetBall[1] + dir[1];

        // 벽을 만나면 멈춤
        if (boards[nx][ny] === '#') break;

        // 다른 구슬이 있는 위치라면 멈춤
        if (otherBall[0] === nx && otherBall[1] === ny) break;

        // 빈 공간이면 이동
        if (boards[nx][ny] === '.') {
            targetBall[0] = nx;
            targetBall[1] = ny;
            moved = true;
        }
        // 구멍을 만나면 구슬이 빠짐
        else if (boards[nx][ny] === 'O') {
            targetBall[0] = -1;
            targetBall[1] = -1;
            moved = true;
            break;
        }
        else break;
    }
    return moved;
};

const bfs = (redX, redY, blueX, blueY) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];  // 아래, 위, 오른쪽, 왼쪽
    const queue = [[redX, redY, blueX, blueY, 0]];
    const visited = new Set([`${redX},${redY},${blueX},${blueY}`]);

    while (queue.length > 0) {
        const [curRedX, curRedY, curBlueX, curBlueY, count] = queue.shift();

        if (count >= 10) continue;

        for (let i = 0; i < 4; i++) {
            const red = [curRedX, curRedY];
            const blue = [curBlueX, curBlueY];
            let moved = false;

            if (isRedFirst(i, red, blue)) {
                moved = moveBall(red, blue, dirs[i]) || moved;
                moved = moveBall(blue, red, dirs[i]) || moved;
            } else {
                moved = moveBall(blue, red, dirs[i]) || moved;
                moved = moveBall(red, blue, dirs[i]) || moved;
            }

            // 파란 구슬이 구멍에 빠졌다면 실패
            if (blue[0] === -1) continue;

            // 빨간 구슬만 구멍에 빠졌다면 성공
            if (red[0] === -1) return count + 1;

            // 움직임이 없었다면 다음으로
            if (!moved) continue;

            const newState = `${red[0]},${red[1]},${blue[0]},${blue[1]}`;
            if (visited.has(newState)) continue;

            visited.add(newState);
            queue.push([red[0], red[1], blue[0], blue[1], count + 1]);
        }
    }

    return -1;
};

const result = bfs(redX, redY, blueX, blueY);
console.log(result);