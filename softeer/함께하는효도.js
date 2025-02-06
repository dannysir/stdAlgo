const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(v => v.split(' ').map(Number));

const [N, M] = input.shift();
const boards = input.slice(0, N);
const workers = input.slice(N, N + M).map(v => [v[0] - 1, v[1] - 1]);

const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

const findCourse = (arr, result, visited) => {
    if (arr.length === 4) {
        result.push(arr);
        return;
    }

    const [x, y] = arr[arr.length - 1];
    for (const dir of dirs) {
        const nx = x + dir[0];
        const ny = y + dir[1];
        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

        if (!visited[nx][ny]) {
            visited[nx][ny] = true;
            findCourse([...arr, [nx,ny]], result, visited);
            visited[nx][ny] = false;
        }

    }
}

const makeCombination = (workerCourse) => {
    const result = [];
    const Combination = (arr, arrIndex) => {
        if (workerCourse.length === arrIndex) {
            result.push(arr);
            return;
        }
        for (const course of workerCourse[arrIndex]) {
            Combination([...arr, course], arrIndex + 1);
        }
    }
    Combination([], 0);
    return result;
}

const sum = (arr) => {
    let sum = 0;
    const positionSet = new Set();
    for (const eachWorkerCourse of arr) {
        for (const eachPosition of eachWorkerCourse) {
            const [x, y] = eachPosition;
            const key = `${x},${y}`;
            if (positionSet.has(key)) continue;
            positionSet.add(key);
            sum += boards[x][y];
        }
    }
    return sum;
}
const solution = () => {
    const workerCourses = [];
    const answer = [];
    workers.forEach(v => {
        const visited = Array.from({length: N}, _ => Array(N).fill(false));
        const result = [];
        findCourse([v], result, visited);

        workerCourses.push(result);
    });
    const everyCourses = makeCombination(workerCourses);
    everyCourses.forEach(v => {
        answer.push(sum(v));
    });
    console.log(Math.max(...answer));
}

solution();