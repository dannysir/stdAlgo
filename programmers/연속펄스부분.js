let sequence = [2, 3, -6, 1, 3, -1, 2, 4];

const CalculateMax = (NumArr) => {
    let StartPlus = [];
    let StartMinus = [];
    let max = 0;

    for (let i = 0; i < NumArr.length; i++) {
        if (i === 0) {
            StartPlus.push(sequence[i]);
            StartMinus.push(-sequence[i]);
        } else if (i % 2 === 0) {
            StartPlus.push(Math.max(StartPlus[i - 1] + sequence[i], sequence[i]));
            StartMinus.push(Math.max(StartMinus[i - 1] - sequence[i], -sequence[i]));
        } else {
            StartPlus.push(Math.max(StartPlus[i - 1] - sequence[i], -sequence[i]));
            StartMinus.push(Math.max(StartMinus[i - 1] + sequence[i], sequence[i]));
        }
        let Compare = StartPlus[i] > StartMinus[i] ? StartPlus[i] : StartMinus[i];
        max = max < Compare ? Compare : max;
    }
    return max;
};

console.log(CalculateMax(sequence));