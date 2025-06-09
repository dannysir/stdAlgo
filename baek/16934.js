let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(''));

class Node {
    constructor(value) {
        this.value = value;
        this.child = {};
        this.end = 0;
    }
}

class Trie {
    constructor() {
        this.root = new Node(null);
        this.answer = [];
    }

    Insert(arr){
        let cur = this.root;
        const str = [];
        let flag = false;
        for (const now of arr) {
            if (!flag) {
                str.push(now);
            }
            if (!cur.child[now]) {
                cur.child[now] = new Node(now);
                flag = true;
            }
            cur = cur.child[now];
        }
        cur.end += 1;
        if (!flag && cur.end > 1) {
            str.push(cur.end);
        }
        this.answer.push(str.join(''));
    }

    Test() {
        console.log(this.answer.join('\n'));
    }
}

const test = new Trie();

input.forEach(arr => {
    test.Insert(arr);
});

test.Test();