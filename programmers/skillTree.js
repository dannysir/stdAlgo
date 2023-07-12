let skill = "CBD";
let skill_trees = ["BACDE", "CBADF", "AECB", "BDA"];
let skillArr = skill.split('');

function check(tr) {
    let answer;
    let newArr = [];
    for (let i = 0; i < skillArr.length; i++) {
        newArr.push(tr.indexOf(skillArr[i]));
    }
    for (let i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] > newArr[i + 1] && newArr[i + 1] !== -1) {
            return false;
        }else if (newArr[i] < newArr[i + 1] && newArr[i] === -1){
            return false;
        } else answer = true;
    }
    if (skill.length === 1) return true;
    return answer;
}
function cnt(skillArr){
    let answer = 0;
    for (let i = 0; i < skill_trees.length; i++) {
        if (check(skill_trees[i]) === true) answer++;
    }
    return answer;
}

console.log(cnt(skill_trees));