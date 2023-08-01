let orders = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"];
let course = [2, 3, 4];
let answer = [];
for (let i = 0; i < course.length; i++) {
    let newObj = {};
    let max = 0;
    orders.forEach(v =>{
        combination(v.split(""), course[i]).forEach((comItem) =>{
            if (!newObj[comItem]) newObj[comItem] = 1;
            else newObj[comItem]++;
        });
        for (k in newObj){
            if (newObj[k] > max) max = newObj[k];
        }
    })
    for (k in newObj){
        if (newObj[k] === max && max > 1) answer.push(k);
    }
    console.log(newObj)
}
function combination(arr, num) {
    let newArr = [];
    if (num === 1) return arr.map( n => [n]);

    arr.forEach((select, i, origin) =>{
        const remain = origin.slice(i + 1);
        const combin = combination(remain, num - 1);
        const combine = combin.map(v => [select, ...v].sort().join(""));
        newArr.push(...combine);
    })
    return newArr;
}

console.log(combination(orders[0].split(""),4))