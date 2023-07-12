const citations =[1, 4, 5].sort((a,b)=>b-a);
let answer = 0;
for (let i = 0; i < citations[0]; i++){
    if (i == citations.filter(a => a >= i).length && i == citations.filter(a => a <= i).length){
        answer = i;
    }
}
console.log(citations.filter(a => a <= 2).length);