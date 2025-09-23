let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();

class Node {
    constructor(value, age) {
        this.value = value;
        this.age = age;
        this.child = {};
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node(null, -1);
        this.maxWord = '';
        this.maxAge = Infinity;
    }

    insert(word, index) {
        let now = this.root;
        let depth = '';
        let minAge = Infinity;
        for (let i = 0; i < word.length; i++) {
            const alp = word[i];
            if (now.child[alp]) {
                now = now.child[alp];
                depth += (alp);
                minAge = now.age;
            } else {
                now.child[alp] = new Node(alp, index);
                now = now.child[alp];
            }
        }

        now.end = true;

        if (this.maxWord.length < depth.length) {
            this.maxWord = depth;
            this.maxAge = minAge;
        } else if (this.maxWord.length === depth.length) {
            if (this.maxAge > minAge) {
                this.maxWord = depth;
                this.maxAge = minAge;
            }
        }
    }

    #findWord(node, word, result) {
        if (node.end) {
            result.push(word);
        }

        for (const chiKey in node.child) {
            this.#findWord(node.child[chiKey], word + chiKey, result);
        }
    }

    findPair() {
        let startNode = this.root;
        for (const alp of this.maxWord) {
            startNode = startNode.child[alp];
        }

        const words = [];

        this.#findWord(startNode, this.maxWord, words);

        return words;
    }

}

const solution = () => {
    const trie = new Trie();
    const inputIndex = {};
    input.forEach((word, index) => {
        inputIndex[word] = index;
        trie.insert(word, index);
    });

    const words = trie.findPair();
    words.sort((a, b) => inputIndex[a] - inputIndex[b]);
    console.log(words.splice(0, 2).join('\n'));
};

solution();