let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let arr = input.shift().split('');

// 두개의 스택을 이용한 풀이
// let n = input.shift();
// let rightArray = [];
//
// for (const OrderList of input) {
//     const [Order, Element= null] = OrderList.split(' ');
//     switch (Order) {
//         case 'P':
//             leftArray.push(Element);
//             break;
//         case 'L':
//             if (leftArray.length) {
//                 rightArray.push(leftArray.pop());
//             }
//             break;
//         case 'D':
//             if (rightArray.length) {
//                 leftArray.push(rightArray.pop());
//             }
//             break;
//         case 'B':
//             leftArray.pop();
//             break;
//         default:
//             break;
//     }
// }
// console.log(leftArray.concat(rightArray.reverse()).join(''));
//

class Node {
    constructor() {
        this.node = -1;
        this.prev = null;
        this.next = null;
    }
}

class LIST {
    constructor() {
        this.head = new Node();
        this.cursor = this.head;
    }

    MoveLeft() {
        if (this.cursor.prev) {
            this.cursor = this.cursor.prev;
        }
    }

    MoveRight() {
        if (this.cursor.next) {
            this.cursor = this.cursor.next;
        }
    }

    Delete() {
        const DeleteItem = this.cursor.prev;
        if (DeleteItem == null) {
            return;
        }
        if (DeleteItem.prev !== null) {
            DeleteItem.prev.next = DeleteItem.next;
        }
        if (DeleteItem.next !== null) {
            this.cursor.prev = DeleteItem.prev;
        }
    }

    Push(item) {
        let newItem = new Node();
        newItem.node = item;
        newItem.prev = this.cursor.prev;
        newItem.next = this.cursor
        ;
        if (this.cursor.prev) {
            this.cursor.prev.next = newItem;
        }
        this.cursor.prev = newItem;
    }
    getNode() {
        if (this.cursor.node) {
            return this.cursor.node;
        }
    }

    SetBegin() {
        this.cursor = this.head;
    }

    isEnd() {
        return !this.cursor.prev;
    }
}

let n = input.shift();
input = input.map(v => v.split(' '));

const list = new LIST();
for (let i = 0; i < arr.length; i++) {
    list.Push(arr[i]);
}

for (let i = 0; i < input.length; i++) {
    const [Order, item = '0'] = input[i];
    switch (Order) {
        case 'P':
            list.Push(item);
            break;
        case 'L':
            list.MoveLeft();
            break;
        case 'D':
            list.MoveRight();
            break;
        case 'B':
            list.Delete();
            break;
        default:
            break;
    }
}
let answer = [];
list.SetBegin();
while (!list.isEnd()) {
    list.MoveLeft();
    answer.push(list.getNode());

}
console.log(answer.reverse().join(''));