function solution(n, w, num) {
    var answer = 0;
    const maxHeight = Math.ceil(n / w);
    let counter = 1;
    const boards = Array.from({length: maxHeight}, _ => Array.from({length : w}, _ => {
        if (counter <= n){
            return counter++;
        }else return 0;

    })).map((arr, index) => {
        if (index % 2 === 1) {
            return arr.reverse();
        }else return arr;
    });

    const columnArr = [];

    for (let i = 0; i < w; i++) {
        const tmpArr=  [];
        for (let j = 0; j < maxHeight; j++) {
            tmpArr.push(boards[j][i]);
        }
        columnArr.push(tmpArr);
    }

    let targetArr = null;

    for (let i = 0; i < w; i++) {
        let index = columnArr[i].indexOf(num);
        if (index !== -1) {
            targetArr = columnArr[i];
            break;
        }
    }

    let cnt = 0;

    for (let i = maxHeight - 1; i >= 0; i--) {
        if (targetArr[i] === 0) continue;
        if (targetArr[i] === num) break;
        cnt++;
    }

    return cnt + 1;
}