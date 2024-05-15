let coin = 4;
const cards = [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4];

let keep = [];
const target = cards.length + 1;
let hand = cards.splice(0, cards.length / 3);;
const BuyOne = (inMyHand, MyKeep) => {
    for (let i = 0; i < inMyHand.length; i++) {
        for (let j = 0; j < MyKeep.length; j++) {
            if (inMyHand[i] + MyKeep[j] === target) {
                inMyHand.splice(i, 1);
                MyKeep.splice(j, 1);
                return [inMyHand, MyKeep];
            }
        }
    }
    return null;
};

const BuyTwo = (MyKeep) => {
    for (let i = 0; i < MyKeep.length - 1; i++) {
        for (let j = 1; j < MyKeep.length; j++) {
            if (MyKeep[i] + MyKeep[j] === target) {
                const A = MyKeep[i];
                const B = MyKeep[j];
                return MyKeep.filter(v => {
                    if (v !== A && v !== B) {
                        return true;
                    }
                });
            }
        }
    }
    return null;
};
let round = 0;
while (cards.length) {
    cards.splice(0, 2).forEach(v => keep.push(v));
    const ResultOne = BuyTwo(hand);
    if (hand.length && ResultOne) {
        hand = ResultOne;
        round++;
        continue;
    }

    const ResultTwo = BuyOne(hand, keep);

    if (ResultTwo && coin) {
        hand = ResultTwo[0];
        keep = ResultTwo[1];
        coin -= 1;
        round++;
        continue;
    }

    const ResultThird = BuyTwo(keep);

    if (ResultThird && coin >= 2) {
        keep = ResultThird;
        round++;
        coin -= 2;
        continue;
    }
    break;
}

console.log(round + 1);