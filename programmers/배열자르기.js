let n = 3;
let left = 2;
let right = 5;
let arr = [];
// let arr = Array.from(Array(n), () => new Array(n));
//
//
// for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//         if (i < j){
//             arr[i][j] = j+1;
//         }else{
//             arr[i][j] = i+1;
//         }
//     }
// }
// console.log(arr);
// console.log(arr.flat())
while (left <= right){
    arr.push(Math.max(left%n, Math.floor(left/n)) + 1 );
    left++;
}
console.log(arr)
