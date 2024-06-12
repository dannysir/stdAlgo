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
// 1차 제출
// let wallet = Array.from({length: enroll.length}, _ => 0);
// for (let i = 0; i < seller.length; i++) {
//     const Name = seller[i];
//     const Sell = amount[i] * 100;
//     let SellerIndex = 0;
//     for (let j = 0; j < enroll.length; j++) {
//         if (enroll[j] === Name) {
//             SellerIndex = j;
//             break;
//         }
//     }
//     let tax = Math.floor(Sell / 10);
//     wallet[SellerIndex] += Sell - tax;
//
//     let parent = referral[SellerIndex];
//     while (true) {
//
//         if (parent === "-") {
//             break;
//         } else {
//             let tmp = tax - Math.floor(tax * 0.1);
//             for (let j = 0; j < enroll.length; j++) {
//                 if (enroll[j] === parent) {
//                     SellerIndex = j;
//                     break;
//                 }
//             }
//             wallet[SellerIndex] += tmp;
//             parent = referral[SellerIndex];
//             tax = Math.floor(tax * 0.1);
//             if (tax < 1) {
//                 break;
//             }
//         }
//     }
// }
// console.log(wallet);