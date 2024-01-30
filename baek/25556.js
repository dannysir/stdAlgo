let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let N = parseInt(input.shift());
input = input.shift().split(' ').map(Number);

class FourStack {
    constructor() {
        this.Stack = [[], [], [], []];
    }

    insert(element) {
        let targetIndex = 0;
        for (let i = 0; i < this.Stack.length; i++) {
            if (this.Stack[i].length !== 0) {
                if (this.Stack[i][this.Stack[i].length - 1] < element) {
                    targetIndex = i;
                    this.Stack[targetIndex].push(element);
                    return true;
                }
            } else {
                targetIndex = i;
                this.Stack[targetIndex].push(element);
                return true;
            }

        }
        return false;
    }

}

const solution = () => {
    const FS = new FourStack();

    for (let i = 0; i < input.length; i++) {
        let result = FS.insert(input[i]);
        if (!result) {
            return 'NO';
        }
    }
    return 'YES';
};
console.log(solution());