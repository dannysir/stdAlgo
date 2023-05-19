const n = 78;
let nNumber = n.toString(2).split('').filter(a => a=='1').length;
function countingFunction(i){
    let a = n +1;
    while (a.toString(2).split('').filter(a => a=='1').length != nNumber){
        a++;
    }
    return a;
}

console.log(countingFunction(n));