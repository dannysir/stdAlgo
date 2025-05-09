let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' '));

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

    add(arr) {
        let cur = this.root;

        for (const next of arr) {
            if (!cur.child[next]) {
                cur.child[next] = new Node();
            }

            cur = cur.child[next];
        }

        cur.end = true;
    }

    dfs(now, arr, depth) {
        const childArr = Object.keys(now.child);
        childArr.sort();

        for (const child of childArr) {
            const str = "--".repeat(depth) + child;
            arr.push(str);
            this.dfs(now.child[child], arr, depth + 1);
        }
    }

    print(){
        const result = []
        this.dfs(this.root, result, 0);
        console.log(result.join('\n'));
    }

}

const solution = () => {
    const trie = new Trie();
    for (const arr of input) {
        const K = arr.shift();
        trie.add(arr);
    }

    trie.print();
};

solution();