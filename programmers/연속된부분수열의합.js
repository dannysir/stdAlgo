function solution(sequence, k) {
    var answer = [];
    let left = 0;
    let right = 0;
    let sum = sequence[left];

    let min = Infinity;

    while (left <= right && right < sequence.length) {
        console.log(left, right, sum);
        if (sum === k) {
            if (min > right - left + 1) {
                min = right - left + 1;
                answer = [left, right];
            }
            sum -= sequence[left];
            left++;
        } else if (sum > k) {
            sum -= sequence[left];
            left++;
        } else if (sum < k) {
            right++;
            if (right < sequence.length) {
                sum += sequence[right];
            }
        }
    }
    console.log(answer);
    return answer;
}

solution([1, 2, 3, 4, 5], 7);