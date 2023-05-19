function solution(n) {
    var answer = 0;
    let arr = [];
    arr[0] = 0;
    arr[1] = 1;
    arr[2] = 1;
// 78번부터 Number.MAX_SAFE_INTEGER 를 넘어감
// 따라서 1234567을 나눈 값을 넣어준다.
//모듈러 연산의 (A + B) % C ≡ ( ( A % C ) + ( B % C) ) % C라는 성질을 이용

    for (let i = 3; i <= n; i++) {
        arr[i] = arr[i - 1] % 1234567 + arr[i - 2] % 1234567;
    }
    answer = arr[n] % 1234567
    return answer;
}