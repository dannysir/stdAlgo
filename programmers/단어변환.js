const begin = 'aab';
const target = 'aba';
const words = ["abb", "aba"];


let answer = Number.MAX_SAFE_INTEGER;
const Check = (word, goal) => {
    let cnt = 0;
    for (let i = 0; i < word.length; i++) { // 수정: 'wordSplit'을 'wordSplit.length'로 변경
        if (word[i] !== goal[i]) cnt++;
    }
    return cnt === 1;
};

const DFS = (word, cnt, visited) => {
    if (word === target) {
        answer = Math.min(answer, cnt);
        return;
    }
    for (let i = 0; i < words.length; i++) {
        if (!visited[i] && Check(word, words[i])) { // 수정: 방문 여부를 확인하고 'Check' 함수를 사용하는 조건 추가
            visited[i] = true;
            DFS(words[i], cnt + 1,visited);
            visited[i] = false;
        }
    }
};

const solution = () => {
    if (!words.includes(target)) return 0;
    DFS(begin, 0,new Array(words.length).fill(false));
    console.log(answer);
};

solution();