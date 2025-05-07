let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");

const N = +input.shift();

class Node {
    constructor() {
        this.end = false;
        this.child = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    add(str) {
        let cur = this.root;

        for (let i = 0; i < str.length; i++) {
            const each = str[i];

            if (cur.end) {
                return false;
            }

            if (!cur.child[each]) {
                cur.child[each] = new Node();
            }

            cur = cur.child[each];

            if (cur.end) {
                return false;
            }
        }

        cur.end = true;

        if (Object.keys(cur.child).length > 0) {
            return false;
        }

        return true;
    }
}

const trie = new Trie();

const solution = () => {
    for (let i = 0; i < N; i++) {
        if (!trie.add(input[i])) {
            console.log(`BAD SET\n${input[i]}`);
            return;
        }
    }

    console.log(`GOOD SET`);
};

solution();