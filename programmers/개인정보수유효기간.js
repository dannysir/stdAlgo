const calcExpireDate = (date, l) => {
    const lYear = Math.floor(l / 12);
    const lMonth = l % 12;
    let [nYear, nMonth, nDay] = date.split('.').map(v => +v);

    nYear += lYear;
    nMonth += lMonth;
    nDay -= 1;

    if (nDay === 0) {
        nDay = 28;
        nMonth -= 1;
    }

    if (nMonth > 12) {
        nYear += 1;
        nMonth = nMonth % 12;
    }

    if (nMonth === 0) {
        nYear -= 1;
        nMonth = 12;
    }

    return `${nYear}.${String(nMonth).padStart(2, '0')}.${String(nDay).padStart(2, '0')}`;
}

function solution(today, terms, privacies) {
    var answer = [];
    const [year, month, day] = today.split('.').map(v => +v);
    const termMap = new Map();
    terms.forEach(arr => {
        const [type, n] = arr.split(' ');
        termMap.set(type, +n);
    });

    privacies.forEach((str, index) => {
        const [date, type] = str.split(' ');
        const expireDate = calcExpireDate(date, termMap.get(type));
        if (expireDate < today) answer.push(index + 1);
    });

    return answer;
}