function solution(begin, target, words) {
    let answer = 52;
    // 두 단어의 알파뱃이 몇개가 다른지 확인.
    const Check = (word, goal) => {
        let cnt = 0;
        for (let i = 0; i < word.length; i++) {
            if (word[i] !== goal[i]) cnt++;
        }
        return cnt === 1;
    };
    // 깊이 우선 탐색
    const DFS = (word, cnt, visited) => {
        // 만약 현재 단어가 target이면 종료.
        if (word === target) {
            // 현재 answer와 cnt를 비교하여 최솟값으로 저장.
            answer = Math.min(answer, cnt);
            return;
        }
        // words 배열 순회.
        for (let i = 0; i < words.length; i++) {
            // 만약 아직 바꾸지 않은 단어이고 알파벳 하나만 바꾸면 된다면.
            if (!visited[i] && Check(word, words[i])) {
                visited[i] = true;
                DFS(words[i], cnt + 1,visited);
                visited[i] = false;
            }
        }
    };
    // words 배열에 없을 경우.
    if (!words.includes(target)) return 0;
    DFS(begin, 0,new Array(words.length).fill(false));
    // target으로 바꿀 수 없는 경우.
    return answer === 52 ? 0 : answer;
}