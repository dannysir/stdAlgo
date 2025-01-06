const s = ["1110", "100111100", "0111111010"];
const result = [];


function solution(s) {
    const result = [];

    const solution = (str) => {
        const stack = [];
        let count110 = 0;

        // 한 번의 순회로 '110' 패턴 찾기
        for (let i = 0; i < str.length; i++) {
            const curr = str[i];

            if (stack.length >= 2) {
                const b = stack.pop();
                const a = stack.pop();

                if (a === '1' && b === '1' && curr === '0') {
                    count110++;
                    continue;
                }
                stack.push(a);
                stack.push(b);
            }
            stack.push(curr);
        }

        // 남은 문자열에서 마지막 0의 위치 찾기
        const remainStr = stack.join('');
        const lastZeroIdx = remainStr.lastIndexOf('0');

        // '110' 패턴을 마지막 0 뒤에 삽입
        const pattern110 = '110'.repeat(count110);

        return lastZeroIdx === -1
            ? pattern110 + remainStr
            : remainStr.slice(0, lastZeroIdx + 1) + pattern110 + remainStr.slice(lastZeroIdx + 1);
    }

    s.forEach(v => {
        result.push(solution(v));
    });

    return result;
}