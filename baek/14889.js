let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const boards = input.map(v => v.split(' ').map(Number));
const visited = Array(N).fill(false);
const combinations = [];

const combination = (arr, visit, start) => {
    if (arr.length === N / 2) {
        const otherTeam = [];
        visit.forEach((value, index) => {
            if (!value) {
                otherTeam.push(index + 1);
            }
        });

        combinations.push([arr, otherTeam]);
        return;
    }

    for (let i = start; i < N; i++) {
        if (!visit[i]) {
            visit[i] = true;
            combination([...arr, i + 1], visit, i + 1);
            visit[i] = false;
        }
    }
};

combination([], visited, 0);

const calculate = (team) => {
    const [teamOne, teamTwo] = team;
    let teamOneScore = 0;
    let teamTwoScore = 0;
    for (let i = 0; i < teamOne.length - 1; i++) {
        for (let j = i; j < teamOne.length; j++) {
            teamOneScore += boards[teamOne[i] - 1][teamOne[j] - 1] + boards[teamOne[j] - 1][teamOne[i] - 1];
            teamTwoScore += boards[teamTwo[i] - 1][teamTwo[j] - 1] + boards[teamTwo[j] - 1][teamTwo[i] - 1];
        }
    }
    return Math.abs(teamTwoScore - teamOneScore);
};

let min = Number.MAX_SAFE_INTEGER;

combinations.forEach(v => {
    const tmp = calculate(v);
    min = Math.min(tmp, min);
});
console.log(min);
