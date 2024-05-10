let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
const Orders = input.map(v => v.split(' '));

class Node {
    constructor(now) {
        this.node = now;
        this.prev = null;
        this.next = null;
    }
}

class Deque {
    constructor() {
        this.queue = [];
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    PushFront(item) {
        const PushItem = new Node(item);
        if (this.length === 0) {
            this.head = PushItem;
            this.tail = PushItem;
        } else {
            PushItem.next = this.head;
            this.head.prev = PushItem;
            this.head = PushItem;
        }
        this.length++;
    }

    PopFront() {
        if (this.length === 0) return -1;
        const PopItem = this.head;
        this.head = this.head.next;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;

        } else {
            this.head.prev = null;
        }
        this.length--;
        return PopItem.node;
    }

    PushBack(item) {
        const PushItem = new Node(item);
        if (this.length === 0) {
            this.head = PushItem;
            this.tail = PushItem;
        } else {
            this.tail.next = PushItem;
            PushItem.prev = this.tail;
            this.tail = PushItem;
        }
        this.length++;
    }

    PopBack() {
        if (this.length === 0) return -1;
        const PopItem = this.tail;
        this.tail = this.tail.prev;

        if (this.length === 1) {
            this.tail = null;
            this.head = null;

        } else {
            this.tail.next = null;
        }

        this.length--;
        return PopItem.node;
    }

    Empty() {
        return this.length === 0 ? 1 : 0;
    }

    Front() {
        return this.head ? this.head.node : -1;
    }

    Back() {
        return this.tail ? this.tail.node : -1;
    }

    Size() {
        return this.length;
    }

}

const solution = () => {
    const deque = new Deque();
    let answer = [];
    for (const [order, Num] of Orders) {
        if (order === 'push_front') {
            deque.PushFront(parseInt(Num));
        }else if (order === 'push_back') {
            deque.PushBack(parseInt(Num));
        }else if (order === 'front') {
            answer.push(deque.Front());
        }else if (order === 'back') {
            answer.push(deque.Back());
        }else if (order === 'size') {
            answer.push(deque.Size());
        }else if (order === 'empty') {
            answer.push(deque.Empty());
        }else if (order === 'pop_front') {
            answer.push(deque.PopFront());
        }else if (order === 'pop_back') {
            answer.push(deque.PopBack());
        }
    }
    console.log(answer.join('\n'));
};
solution();