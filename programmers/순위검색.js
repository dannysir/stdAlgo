let info = ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"];
let query = ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"];

query = query.map(v => {
    const tmp = v.split(' and ');
    tmp.push(...tmp.pop().split(' '));
    return tmp;
});

const inputMap = new Map();

info.forEach(v => {
    const [lan, domain, experience, food, score] = v.split(' ');
    const key = `${lan}-${domain}-${experience}-${food}`;
    if (inputMap.get(key)) {
        inputMap.set(key, [...inputMap.get(key), +score]);
    } else {
        inputMap.set(key, [+score]);
    }
});

for (const [key, score] of inputMap) {
    inputMap.set(key, score.sort((a, b) => a - b));
}

const makeQueries = (query) => {
    const result = [];
    const lanArr = query[0] === '-' ? ['java', 'python', 'cpp'] : [query[0]];
    const domainArr = query[1] === '-' ? ['frontend', 'backend'] : [query[1]];
    const experienceArr = query[2] === '-' ? ['junior', 'senior'] : [query[2]];
    const foodArr = query[3] === '-' ? ['chicken', 'pizza'] : [query[3]];
    for (const lan of lanArr) {
        for (const domain of domainArr) {
            for (const experience of experienceArr) {
                for (const food of foodArr) {
                    result.push(`${lan}-${domain}-${experience}-${food}`);
                }
            }
        }
    }
    return result;
};

const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    if (arr.length === 0 || arr[right] < target) {
        return 0;
    }

    if (arr[0] >= target) {
        return arr.length;
    }

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return arr.length - left;
};

const solution = () => {
    const result = [];
    for (const string of query) {
        let sum = 0;
        const madeQueries = makeQueries(string);
        const score = string[4];

        for (const madeQuery of madeQueries) {
            if (inputMap.has(madeQuery)) {
                sum += binarySearch(inputMap.get(madeQuery), score);
            }
        }
        result.push(sum);
    }
    return result;
};

solution();