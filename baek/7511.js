let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
let TestCase = parseInt(input.shift());
// Find
const Find = (child, map) => {
    if (map[child] === child) return child;
    map[child] = Find(map[child], map);
    return map[child];
};
// Union
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
// 반복문을 위한 index 번호.
let idx = 0;
// 테스트 케이스 번호.
let SceneNum = 1;
// 정답 문자열.
let string = '';
// 테스트 케이스 진행.
while (input.length > idx) {
    // 입력 받는 부분.
    let N = parseInt(input[idx++]);
    let M = parseInt(input[idx++]);
    let lines = input.splice(idx, M).map(v => v.split(' ').map(Number));
    let A = parseInt(input[idx++]);
    let answer = input.splice(idx, A).map(v => v.split(' ').map(Number));
    // 부모를 저장할 배열.
    // 초기값은 자기 자신으로 초기화.
    let Map = Array.from({length: N}, (value, index) => index);
    // 연결 관계를 보고 Union 진행.
    for (const line of lines) {
        Union(line, Map);
    }
    // 출력 문자열 배열.
    let output = [`Scenario ${SceneNum}:`];
    // 출력을 원하는 관계.
    for (const INPUT of answer) {
        const [Start, End] = INPUT;
        // 각각의 부모를 찾아서 비교.
        if (Find(Start, Map) === Find(End, Map)) {
            output.push(1);
        } else {
            output.push(0);
        }
    }
    SceneNum++;
    string += output.join('\n');
    // 정답 형식을 맞추기 위해.
    string += '\n\n';
}
console.log(string.trim());