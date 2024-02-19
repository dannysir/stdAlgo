let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const FirstString = input.shift();
const SecondString = input.shift();

class LCString {
    constructor(StringA, StringB) {
        this.Alength = StringA.length;
        this.Blength = StringB.length;
        this.LcsMap = new Array(this.Alength + 1);
        for (let i = 0; i < this.LcsMap.length; i++) {
            this.LcsMap[i] = new Array(this.Blength + 1).fill(0);
        }
        this.Max = 0;
        this.FillLcsMap(StringA, StringB);
    }

    FillLcsMap(A, B) {
        for (let i = 0; i < this.Alength; i++) {
            for (let j = 0; j < this.Blength; j++) {
                const LastValue = this.LcsMap[i][j] + 1;
                if (A[i] === B[j]) {
                    this.LcsMap[i + 1][j + 1] = LastValue;
                    if (this.Max < LastValue) this.Max = LastValue;
                }
            }
        }
    }

    GetMax() {
        return this.Max;
    }

}

const LCS = new LCString(FirstString, SecondString);
console.log(LCS.GetMax());