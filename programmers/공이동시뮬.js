let n = 2;
let m = 2;
let x = 0;
let y = 0;
let queries = [[2, 1], [0, 1], [1, 1], [0, 1], [2, 1]];

const CalculateTotalMove = (ORDER_ARR) => {
    let [X, Y] = [0, 0];
    for (const orderarrElement of ORDER_ARR) {
        const [Order, DIS] = orderarrElement;
        if (Order === 0) [X, Y] = [X - DIS, Y];
        if (Order === 1) [X, Y] = [X + DIS, Y];
        if (Order === 2) [X, Y] = [X, Y - DIS];
        if (Order === 3) [X, Y] = [X, Y + DIS];
    }
    return [X, Y];
};
let [moveX, moveY] = CalculateTotalMove(queries);
console.log(moveX, moveY);
let nextX = x - moveY;
let nextY = y - moveX;
if (nextX <0 ) nextX = 0;
if (nextX > n - 1) nextX = n - 1;

if (nextY <0 ) nextY = 0;
if (nextY > m - 1) nextY = m - 1;
console.log(nextX, nextY);
console.log((nextX + 1 - x) * (nextY + 1 - y));