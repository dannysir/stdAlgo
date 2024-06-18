function solution(array, commands) {
    var answer = [];
    const SliceAndFind = (arr, cmd) => {
        const [Start, End, Index] = cmd;
        const SliceArr = arr.slice(Start - 1, End).sort((a, b) => a - b);
        return SliceArr[Index - 1];
    }
    for (const CMD of commands) {
        answer.push(SliceAndFind(array, CMD));
    }
    return answer;
}