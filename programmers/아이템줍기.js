let rectangle = [[1, 1, 7, 4], [3, 2, 5, 5], [4, 3, 6, 9], [2, 6, 8, 8]];
let characterX = 1;
let characterY = 3;
let itemX = 7;
let itemY = 8;

const MAP = Array.from({length: 102}, _ => Array.from({length: 102}, _ => 0));

rectangle = rectangle.map(v => {
    return v.map(v => v * 2);
});

for (const [x1, y1, x2, y2] of rectangle) {
    for (let i = y1; i <= y2; i++) {
        for (let j = x1; j <= x2; j++) {
            if (i === y1 || i === y2 || j === x1 || j === x2) {
                if (MAP[j][i] === 1) {
                    continue;
                } else {
                    MAP[j][i] += 1; // 테두리인 경우는 값을 1로 설정
                }
            } else {
                MAP[j][i] = 2; // 테두리가 아닌 경우
            }
        }
    }
}

characterX *= 2;
characterY *= 2;
itemX *= 2;
itemY *= 2;

const BFS = () => {
    let counter = 0;
    let Queue = [[characterX, characterY, counter]];
    let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let answer = 0;
    while (Queue.length) {
        const [X, Y, cnt] = Queue.shift();
        if (X === itemX && Y === itemY) {
            return cnt / 2;
        }
        MAP[X][Y] = 2;

        for (const [dx, dy] of dirs) {
            const NextX = X + dx;
            const NextY = Y + dy;

            if (NextX < 0 || NextX >= 101 || NextY < 0 || NextY >= 101) continue;

            if (MAP[NextX][NextY] === 1) {
                Queue.push([NextX, NextY, cnt + 1]);
            }
        }
    }
    return answer;
};
console.log(BFS())