// 덱 풀이

let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.shift().split(' ').map(Number);

class Node {
    constructor(value, index) {
        this.value = value;
        this.index = index;
        this.prev = null;
        this.next = null;
    }
}

class Deque {
    constructor(l) {
        this.head = null;
        this.tail = this.head;
        this.L = l;
        this.length = 0;
    }

    PushFront(value, index) {
        const insertNode = new Node(value, index);
        if (this.length === 0) {
            this.tail = insertNode;
        } else {
            this.head.prev = insertNode;
            insertNode.next = this.head;
        }
        this.head = insertNode;
        this.length++;
    }

    PushBack(value, index) {
        const insertNode = new Node(value, index);

        while (this.tail) {
            if (this.tail.value > value) {
                this.PopBack();
            } else break;
        }

        if (this.length === 0) {
            this.head = insertNode;
        } else {
            this.tail.next = insertNode;
            insertNode.prev = this.tail;
        }
        this.tail = insertNode;
        this.length++;
    }

    PopFront() {
        if (this.length === 0) return null;

        const value = this.head.value;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            const prevHead = this.head;
            this.head = prevHead.next;
            this.head.prev = null;
            prevHead.next = null;
        }
        this.length--;
        return value;
    }

    PopBack() {
        if (this.length === 0) return null;

        const value = this.tail.value;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            const prevTail = this.tail;
            this.tail = prevTail.prev;
            this.tail.next = null;
            prevTail.prev = null;
        }
        this.length--;
        return value;
    }

    GetMin(now) {
        while (this.head) {
            if (this.head.index <= now - this.L) {
                this.PopFront();
            } else break;
        }
        return this.head.value;
    }
}

const deque = new Deque(M);
let result = '';

for (let i = 0; i < input.length; i++) {
    deque.PushBack(input[i], i);

    if (i > 0) {
        result += ' ';
    }
    result += deque.GetMin(i);

    if (i % 10000 === 0) {
        process.stdout.write(result);
        result = '';
    }
}

console.log(result);

// 우선순위 큐 풀이

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// const [N, M] = input.shift().split(' ').map(v => +v);
// input = input[0].split(' ').map(v => +v);
//
// class MinHeap {
//     constructor(M) {
//         this.queue = [null];
//         this.M = M;
//     }
//
//     Insert(value, index) {
//         let cur = this.queue.length;
//         while (cur > 1) {
//             const parent = Math.floor(cur / 2);
//             if (this.queue[parent][0] > value) {
//                 this.queue[cur] = this.queue[parent];
//                 cur = parent;
//             } else break;
//         }
//         this.queue[cur] = [value, index];
//     }
//
//     Pop() {
//         if (this.queue.length > 2) {
//             const popElement = this.queue[1];
//             this.queue[1] = this.queue.pop();
//
//             let cur = 1;
//             let left = cur * 2;
//             let right = cur * 2 + 1;
//
//             while (this.queue[left]) {
//                 let compare = left;
//                 if (this.queue[right] && this.queue[left][0] > this.queue[right][0]) {
//                     compare = right;
//                 }
//                 if (this.queue[compare][0] < this.queue[cur][0]) {
//                     [this.queue[cur], this.queue[compare]] = [this.queue[compare], this.queue[cur]];
//                     cur = compare;
//                     left = cur * 2;
//                     right = cur * 2 + 1;
//                 } else break;
//             }
//             return popElement;
//         } else if (this.queue.length === 2) {
//             return this.queue.pop();
//         } else {
//             return null;
//         }
//     }
//
//     Min(now) {
//         if (this.queue.length < 2) return null;
//
//         while (this.queue.length > 1 && this.queue[1][1] < now - this.M + 1) {
//             this.Pop();
//         }
//
//         return this.queue.length > 1 ? this.queue[1] : null;
//     }
// }
//
// const pq = new MinHeap(M);
// let result = '';
//
// for (let i = 0; i < input.length; i++) {
//     pq.Insert(input[i], i);
//
//     if (i > 0) {
//         result += ' ';
//     }
//     result += pq.Min(i)[0];
//
//     if (i % 10000 === 0) {
//         process.stdout.write(result);
//         result = '';
//     }
// }
//
// console.log(result);

// 슬라이딩 윈도우 풀이

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
//
// const [N, L] = input.shift().split(' ').map(Number);
// const arr = input.shift().split(' ').map(Number);
//
// // 덱을 배열로 구현하되 투 포인터 방식 사용
// const deque = new Array(N); // 미리 할당
// let front = 0; // 앞쪽 포인터
// let rear = 0;  // 뒤쪽 포인터
//
// let result = ""; // 배열 대신 문자열 사용
//
// for (let i = 0; i < N; i++) {
//     // 현재 윈도우 범위를 벗어난 인덱스들 제거
//     while (front < rear && deque[front] < i - L + 1) {
//         front++; // shift() 대신 포인터만 이동
//     }
//
//     // 현재 값보다 큰 값들을 뒤에서부터 제거 (단조 덱 유지)
//     while (front < rear && arr[deque[rear - 1]] >= arr[i]) {
//         rear--; // pop() 대신 포인터만 이동
//     }
//
//     // 현재 인덱스 추가
//     deque[rear] = i;
//     rear++;
//
//     // 덱의 첫 번째 인덱스가 현재 윈도우의 최솟값
//     if (i === 0) {
//         result = arr[deque[front]].toString();
//     } else {
//         result += " " + arr[deque[front]];
//     }
// }
//
// console.log(result);