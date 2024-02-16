let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
class LCSequence {
    constructor(StringA, StringB) {
        this.LcsMap = new Array(StringA.length + 1);
        this.StringA = StringA;
        this.StringB = StringB;
        for (let i = 0; i < this.LcsMap.length; i++) {
            this.LcsMap[i] = new Array(StringB.length + 1).fill(0);
        }
        this.find();
    }

    find() {
        for (let i = 1; i < this.LcsMap.length; i++) {
            for (let j = 1; j < this.LcsMap[0].length; j++) {
                if (this.StringA[i - 1] === this.StringB[j - 1]) {
                    this.LcsMap[i][j] = this.LcsMap[i - 1][j - 1] + 1;
                } else {
                    this.LcsMap[i][j] = Math.max(this.LcsMap[i][j - 1], this.LcsMap[i - 1][j]);
                }
            }
        }
    }

    GetMaxLength() {
        return this.LcsMap[this.StringA.length][this.StringB.length];
    }

    GetLCS() {
        let target = this.GetMaxLength();
        let targetX = this.StringA.length;
        let targetY = this.StringB.length;
        let answer = '';
        while (target !== 0) {
            if (this.LcsMap[targetX - 1][targetY] === target) {
                targetX = targetX - 1;
            }else if (this.LcsMap[targetX][targetY - 1] === target) {
                targetY = targetY - 1;
            } else {
                answer += this.StringA[targetX - 1];
                targetX = targetX - 1;
                targetY = targetY - 1;
                target = this.LcsMap[targetX][targetY];
            }
        }
        return answer;
    }

}

const LCS = new LCSequence(input[0], input[1]);
console.log(LCS.GetMaxLength());