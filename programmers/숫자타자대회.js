const findPos = (num) => {
    if (num === 0) return [3, 1];

    const x = Math.floor((num - 1) / 3);
    const y = (num - 1) % 3;
    return [x, y];
}

const findCost = (from, to) => {
    const gapX = Math.abs(from[0] - to[0]);
    const gapY = Math.abs(from[1] - to[1]);
    let cost = 0;

    cost += Math.min(gapX, gapY) * 3;
    cost += Math.abs(gapX - gapY) * 2;

    return cost === 0 ? 1 : cost;
}

function solution(numbers) {
    var answer = 0;
    const table = Array.from({length : 10}, (_, x) => Array.from({length : 10}, (_, y) => findCost(findPos(x), findPos(y))));

    const dp = Array.from({length : numbers.length + 1},
        _ => Array.from({length : 10},
            _ => Array.from({length : 10}, _ => Infinity)
        )
    );

    dp[0][4][6] = 0;
    dp[0][6][4] = 0;

    for (let numIndex = 0; numIndex < numbers.length; numIndex++) {
        const prevDp = dp[numIndex];
        const nowDp = dp[numIndex + 1];
        const targetNum = numbers[numIndex];

        for (let left = 0; left < 10; left++) {
            for (let right = 0; right < 10; right++) {
                if (left !== right && prevDp[left][right] !== Infinity) {
                    const prevCost = prevDp[left][right]
                    nowDp[left][targetNum] = Math.min(nowDp[left][targetNum], prevCost + table[targetNum][right]);
                    nowDp[targetNum][right] = Math.min(nowDp[targetNum][right], prevCost + table[left][targetNum]);
                }
            }
        }
    }


    return Math.min(...dp[numbers.length].flat());
}