let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, P, Q] = input.shift().split(' ').map(Number);

const dp = new Map();
dp.set(0, 1);

const solve = (n) => {
    if (dp.has(n)) {
        return dp.get(n);
    }

    const result = solve(Math.floor(n / P)) + solve(Math.floor(n / Q));
    dp.set(n, result);
    return result;
};

console.log(solve(N));