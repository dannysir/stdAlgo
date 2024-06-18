const enroll = ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"];
const referral = ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"];
const seller = ["young", "john", "tod", "emily", "mary"];
const amount = [12, 4, 2, 5, 10];

let member = new Map();

for (let i = 0; i < enroll.length; i++) {
    member.set(enroll[i], {parent : referral[i], budget: 0})
}

for (let i = 0; i < seller.length; i++) {
    let cur = member.get(seller[i]);
    let Money = amount[i] * 100;

    while (Money && cur) {
        let tax = Math.floor(Money * 0.1);
        cur.budget += Money - tax;
        Money = tax;
        cur = member.get(cur.parent);
    }
}
console.log(enroll.map(v => member.get(v).budget));
// // 1차 제출
// // 각자 얻은 돈.
// let wallet = Array.from({length: enroll.length}, _ => 0);
// for (let i = 0; i < seller.length; i++) {
//     // 현재 이익을 본 사람의 이름.
//     const Name = seller[i];
//     // 판매금.
//     const Sell = amount[i] * 100;
//     // 현재 이익을 본 사람의 enroll 에서의 인덱스 값.
//     let SellerIndex = 0;
//     // indexOf() 대신 추가한 부분.
//     for (let j = 0; j < enroll.length; j++) {
//         if (enroll[j] === Name) {
//             SellerIndex = j;
//             break;
//         }
//     }
//     // 추천인에게 줄 돈.
//     let tax = Math.floor(Sell / 10);
//     // 판매자가 가질 돈.
//     wallet[SellerIndex] += Sell - tax;
//     // 추천인.
//     let parent = referral[SellerIndex];
//     // 추천인을 하나씩 찾아 올라갈 반복문.
//     while (parent !== '-' && tax) {
//         // 내가 가질 금액
//         let tmp = tax - Math.floor(tax * 0.1);
//         // 추가한 부분.
//         for (let j = 0; j < enroll.length; j++) {
//             if (enroll[j] === parent) {
//                 SellerIndex = j;
//                 break;
//             }
//         }
//         // 내가 가진 금액에 추가.
//         wallet[SellerIndex] += tmp;
//         // 내 추천인
//         parent = referral[SellerIndex];
//         // 내가 추천인에게 줄 돈.
//         tax = Math.floor(tax * 0.1);
//     }
// }
// console.log(wallet);