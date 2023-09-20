let n = 6;
let times = [7, 10];

times = times.sort((a, b) => a - b);

let min = 1;
let max = times[times.length - 1] * n;
let answer = max;
while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    let N = 0;
    times.forEach(v => {
        N += Math.floor(mid / v);
        if (N >= n) {
            answer = Math.min(mid, answer);
        }
    });
    //28 ~ 29
    if (N >= n) {
        max = mid - 1;
    } else {
        min = mid + 1;
    }
}
