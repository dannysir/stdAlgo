function solution(picks, minerals) {
    var answer = 0;
    const diaMap = new Map();
    const ironMap = new Map();
    const stoneMap = new Map();
    diaMap.set('diamond', 1);
    diaMap.set('iron', 1);
    diaMap.set('stone', 1);
    ironMap.set('diamond', 5);
    ironMap.set('iron', 1);
    ironMap.set('stone', 1);
    stoneMap.set('diamond', 25);
    stoneMap.set('iron', 5);
    stoneMap.set('stone', 1);
    const mineralsArr = [];

    while (minerals.length) {
        mineralsArr.push(minerals.splice(0, 5));
    }
    let costArr = Array.from({length : mineralsArr.length}, _ => Array(3).fill(0));

    for (let i = 0; i <  mineralsArr.length; i++) {
        const eachCase = mineralsArr[i];
        // 각 곡괭이
        for (let j = 0; j <  3; j++) {
            if (j === 0) {
                const tmp = eachCase.reduce((acc, cur) => {
                    return acc + diaMap.get(cur);
                }, 0);
                costArr[i][j] = tmp;
            }
            if (j === 1) {
                const tmp = eachCase.reduce((acc, cur) => {
                    return acc + ironMap.get(cur);
                }, 0);
                costArr[i][j] = tmp;
            }
            if (j === 2) {
                const tmp = eachCase.reduce((acc, cur) => {
                    return acc + stoneMap.get(cur);
                }, 0);
                costArr[i][j] = tmp;
            }
        }
    }
    const Length = picks.reduce((acc, cur) => acc + cur, 0);
    costArr = costArr.splice(0, Length);
    costArr.sort((a, b) => {
        return (b[2] - b[0]) - (a[2] - a[0]);
    });
    let cnt = 0;
    for (let i = 0; i < costArr.length; i++) {
        for (let j = 0; j < 3; j++) {
            if (picks[j] === 0) continue;

            cnt += costArr[i][j];
            picks[j]--;
            break;
        }
    }

    return cnt;
}