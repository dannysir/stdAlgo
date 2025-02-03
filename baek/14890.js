let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, L] = input.shift().split(' ').map(Number);

const board = input.map(v => v.split(' ').map(Number));

const check = (arr, n) => {
    let answer = true;

    let prev = arr[0];
    let len = 1;
    for (let i = 1; i < n; i++) {
        if (Math.abs(prev - arr[i]) > 1) {
            answer = false;
            break;
        }

        if (prev === arr[i]) {
            len++;
            continue;
        }

        if (prev < arr[i]) {
            if (len < L) {
                answer = false;
                break;
            } else {
                prev = arr[i];
                len = 1;
            }
        }

        if (prev > arr[i]) {
            let flag = true;
            for (let j = 1; j < L; j++) {
                if (arr[i] !== arr[i + j]) {
                    flag = false;
                }
            }

            if (flag) {
                prev = arr[i + L - 1];
                i = i + L - 1;
                len = 0;
            } else {
                answer = false;
                break;
            }

        }
    }
    return answer;
};

const solution = () => {
    let answer = 0;
    for (let i = 0; i < N; i++) {
        if (check(board[i], N)) {
            answer++;
        }
    }

    const seroArr = board[0].map((_, index) => {
        return board.map(v => v[index]);
    });
    seroArr.forEach(v => {
        if (check(v, N)) {
            answer++;
        }
    });

    console.log(answer);
};

solution();