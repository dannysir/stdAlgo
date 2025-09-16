let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split('\\'));

class Node {
    constructor(value) {
        this.value = value;
        this.child = {};
    }
}

class Trie {
    constructor() {
        this.head = new Node(null);
    }

    add(arr) {
        let node = this.head;
        for (let i = 0; i < arr.length; i++) {
            const word = arr[i];

            if (!node.child[word]) {
                const newNode = new Node(word);
                node.child[word] = newNode;
            }

            node = node.child[word];
        }
    }

    find(parent, result, depth) {
        if (Object.keys(parent.child).length === 0) {
            return;
        }
        const keyArr = Object.keys(parent.child).sort();

        for (const key of keyArr) {
            result.push(' '.repeat(depth) + key);
            this.find(parent.child[key], result, depth + 1);
        }
    }

    print(result) {
        this.find(this.head, result, 0);

        console.log(result.join('\n'));
    }

}

const test = () => {
    const trie = new Trie();
    input.forEach(arr => {
        trie.add(arr);
    });
    const answer = [];
    trie.print(answer);
};

test();