let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const TestCase = parseInt(input.shift());

class Team {
    constructor(length) {
        this.score = new Array(length).fill(0);
        this.cnt = 0;
        this.lastOrder = 10000;
    }

    SetScore(Num, Score, LastOrder) {
        if (this.score[Num - 1] < Score) {
            this.score[Num - 1] = Score;
        }
        this.cnt++;
        this.lastOrder = LastOrder;
    }

    GetTotal() {
        let total = this.score.reduce((acc, cur) => {
            return acc + cur;
        }, 0);
        return [total, this.cnt, this.lastOrder];
    }
}

const CalculateMyScore = (N, K, T, M) => {
    const SubmitLists = input.splice(0, M).map(v => v.split(' ').map(Number));
    const Teams = new Array(N);
    let answer = 1;
    for (let i = 0; i < Teams.length; i++) {
        Teams[i] = new Team(K);
    }
    for (let i = 0; i < SubmitLists.length; i++) {
        const [TeamId, Num, Score] = SubmitLists[i];
        Teams[TeamId - 1].SetScore(Num, Score, i);
    }
    const My = Teams[T - 1].GetTotal();
    for (let i = 0; i < Teams.length; i++) {
        if (i !== T - 1) {
            const Compare = Teams[i].GetTotal();
            if (Compare[0] > My[0]) {
                answer++;
                continue;
            } else if (Compare[0] === My[0]) {
                if (Compare[1] < My[1]) {
                    answer++;
                    continue;
                } else if (Compare[1] === My[1]) {
                    if (Compare[2] < My[2]) {
                        answer++
                        continue;
                    }
                }
            }
        }
    }
    return answer;
};
const solution = () => {
    let answer = [];
    for (let i = 0; i < TestCase; i++) {
        const [N, K, T, M] = input.shift().split(' ').map(Number);
        answer.push(CalculateMyScore(N, K, T, M));
    }
    console.log(answer.join('\n'));
};
solution();