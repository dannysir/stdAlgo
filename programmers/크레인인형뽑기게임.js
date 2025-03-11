function solution(board, moves) {
    var answer = 0;
    const seroArr = [];
    const N = board.length;

    for (let i = 0; i < N; i++) {
        const tmpArr = [];
        for (let j = N - 1; j >= 0; j--) {
            if (board[j][i] !== 0){
                tmpArr.push(board[j][i]);
            }
        }
        seroArr.push(tmpArr);
    }

    const stack = [];
    console.log(seroArr)
    const activeCrane = (index, stack) => {
        if (seroArr[index].length === 0) return;

        const grabItem = seroArr[index].pop();
        if (stack.length) {
            if (stack[stack.length - 1] === grabItem) {
                stack.pop();
                answer += 2;
                return;
            }
        }
        stack.push(grabItem);
        return;
    }

    moves.forEach(v => {
        activeCrane(v - 1, stack);
    });


    return answer;
}