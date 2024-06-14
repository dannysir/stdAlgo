let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
let TestCase = parseInt(input.shift());


const Find = (child, map) => {
    if (map[child] === child) return child;
    map[child] = Find(map[child], map);
    return map[child];
};

const Union = (line, map) => {
    const [ChildA, ChildB] = line;
    const AFather = Find(ChildA, map);
    const BFather = Find(ChildB, map);
    if (AFather < BFather) {
        map[BFather] = AFather;
    } else if (AFather > BFather) {
        map[AFather] = BFather;
    }
};

let idx = 0;
let SceneNum = 1;
let string = '';
while (input.length > idx) {
    let N = parseInt(input[idx++]);
    let M = parseInt(input[idx++]);
    let lines = input.splice(idx, M).map(v => v.split(' ').map(Number));
    let A = parseInt(input[idx++]);
    let answer = input.splice(idx, A).map(v => v.split(' ').map(Number));
    let Map = Array.from({length: N}, (value, index) => index);
    for (const line of lines) {
        Union(line, Map);
    }
    let output = [`Scenario ${SceneNum}:`];
    for (const INPUT of answer) {
        const [Start, End] = INPUT;
        if (Find(Start, Map) === Find(End, Map)) {
            output.push(1);
        } else {
            output.push(0);
        }
    }
    SceneNum++;
    string += output.join('\n');
    string += '\n\n';
}
console.log(string.trim());