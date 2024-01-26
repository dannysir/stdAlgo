let N = 6;
let Cores = [1, 2, 3];
const solution = (n, cores) => {
    let rest = n - cores.length;
    let left = 1;
    let right = Math.ceil(rest * Math.max(...cores) / cores.length);

    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        let work = 0;
        for (let i = 0; i < cores.length; i++) {
            work += Math.floor(middle / cores[i]);
        }

        if (work >= rest) {
            right = middle;
        }else {
            left = middle + 1;
        }
    }

    for (let i = 0; i < cores.length; i++) {
        rest -= Math.floor((right - 1) / cores[i]);
    }

    for (let i = 0; i < cores.length; i++) {
        if (rest !== 0) {
            if (right % cores[i] === 0) {
                rest--;

                if (rest === 0) {
                    return i + 1;
                }
            }

        }
    }

};
console.log(solution(N,Cores));