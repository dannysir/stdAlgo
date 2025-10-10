const combination = (arr, n, discounts, result) => {
    if (arr.length >= n) {
        result.push(arr);
        return;
    }

    for (const discount of discounts) {
        combination([...arr, discount], n, discounts, result);
    }
}

const calc = (users, emoticons, discounts) => {
    const dcEmo = emoticons.map((cost, index) => (100 - discounts[index]) / 100 * cost);
    let moneySum = 0;
    let plusSum = 0;

    users.forEach(([dc, max]) => {
        let money = 0;
        discounts.forEach((discount, index) => {
            if (discount >= dc) {
                money += dcEmo[index];
            }
        });
        if (money >= max) {
            plusSum += 1;
        } else moneySum += money;
    });

    return [plusSum, moneySum];
}

function solution(users, emoticons) {
    const answer = [];
    const discountCombination = [];
    const discounts = [10, 20, 30, 40];
    combination([], emoticons.length, discounts, discountCombination);

    discountCombination.forEach(arr => {
        answer.push(calc(users, emoticons, arr));
    });
    // answer.push(calc(users, emoticons, [30, 40]));
    answer.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        }
        return b[0] - a[0];
    })

    return answer[0];
}