let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
let truth = input.shift().split(" ").map(Number);
let parties = input.map(v => v.split(" ").map(Number));

let parent = Array.from({length: N}, (value, index) => index);

const Find = (now) => {
    if (parent[now] === now) {
        return now;
    }
    parent[now] = Find(parent[now]);
    return parent[now];
};

const Union = (a, b) => {
    const PA = Find(a);
    const PB = Find(b);
    if (PA <= PB) {
        parent[PB] = PA;
    } else {
        parent[PA] = PB;
    }
};

for (const party of parties) {
    if (party[0] > 1) {
        let tmp = party.slice(1);
        tmp.sort((a, b) => a - b);
        for (let i = 1; i < tmp.length; i++) {
            Union(tmp[0] - 1, tmp[i] - 1);
        }
    }
}
let cnt = 0;
for (const party of parties) {
    const leader = party.slice(1).sort((a, b) => a - b)[0];

    let flag
    for (let i = 1; i < truth.length; i++) {
        const knowOne = truth[i];
        if (Find(leader - 1) === Find(knowOne - 1)) {
            flag = true;
            break;
        }
    }
    cnt = flag ? cnt : cnt + 1;
}
console.log(cnt);