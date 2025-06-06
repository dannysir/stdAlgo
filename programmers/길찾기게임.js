const nodeinfo = [[5, 3], [11, 5], [13, 3], [3, 5], [6, 1], [1, 3], [8, 6], [7, 2], [2, 2]];

class Node {
    constructor(x, y, index, parent) {
        this.x = x;
        this.y = y;
        this.index = index
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

class BinTree {
    constructor(x, y, index) {
        this.root = new Node(x, y, index, null);

    }

    insert(x, y, index) {
        let parent = this.root;
        let compare = parent.x > x ? parent.left : parent.right;
        while (compare !== null) {
            parent = compare;
            compare = parent.x > x ? parent.left : parent.right;
        }
        const insertNode = new Node(x, y, index, parent);
        if (parent.x > x) {
            parent.left = insertNode;
        }else parent.right = insertNode;
    }

    Test() {
        console.log(this.root);
    }

    #preorderDfs(arr, now) {
        arr.push(now.index);
        if (now.left) {
            this.#preorderDfs(arr, now.left);
        }
        if (now.right) {
            this.#preorderDfs(arr, now.right);
        }
    }

    preorder(arr) {
        this.#preorderDfs(arr, this.root);
        return arr;
    }

    #postorderDfs(arr, now) {
        if (now.left) {
            this.#postorderDfs(arr, now.left);
        }
        if (now.right) {
            this.#postorderDfs(arr, now.right);
        }
        arr.push(now.index);
    }

    postorder(arr) {
        this.#postorderDfs(arr, this.root);
        return arr;
    }
}

function solution(nodeinfo) {
    const answer = [];
    nodeinfo = nodeinfo.map((arr, index) => [...arr, index + 1])

    nodeinfo.sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        return b[1] - a[1];
    });
    const test = new BinTree(...nodeinfo[0], null);
    for (let i = 1; i < nodeinfo.length; i++) {
        const [x, y, index] = nodeinfo[i];
        test.insert(x, y, index);
    }
    const pre = [];
    const post = [];
    test.preorder(pre);
    test.postorder(post);
    answer.push(pre, post);
    return answer;
}
