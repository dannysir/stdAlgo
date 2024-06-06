let stones = [7, 2, 8, 7, 2, 5, 9];
const K = 3;

const Go = (stones, K) => {
    let jump = 1;
    for (let i = 0; i < stones.length; i++) {

        if (stones[i] === 0) {
            jump += 1;
            continue;
        }
        if (jump > 3) {
            return false;
        }

        if (stones[i]) {
            stones[i] -= 1;
            jump = 1;
        }
    }
    return true;
};

let cnt = 0;
while (true) {
    if (!Go(stones, K)) {
        break;
    }
    cnt++;
}
console.log(cnt);