// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split('\n');
//
// // let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const [N, L, MAX] = input.shift().split(' ').map(Number);
// let cars = input[0].split(' ').map(Number).reverse();
// let Bridge = new Array(L).fill(0);
//
// let PassedCar = [];
// const GO = () => {
//     let Weight = Bridge.reduce((acc, cur) => {
//         return acc + cur;
//     }, 0);
//     Weight = Weight - Bridge[0];
//     let shiftItem = Bridge.shift();
//     let pushItem = 0;
//     if (Weight + cars[cars.length - 1] <= MAX) {
//         pushItem = cars.pop();
//     }
//     Bridge.push(pushItem);
//     if (shiftItem !== 0) PassedCar.push(shiftItem);
// };
//
// const solution = () => {
//     const Goal = cars.length;
//     let cnt = 0;
//     while (PassedCar.length !== Goal) {
//         GO();
//         cnt++;
//     }
//     console.log(cnt);
// };
// solution();

let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));
const [N, L, W] = input.shift();
const trucks = input.shift();

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.weight = 0;
  }

  shift() {
    if (this.size === 0) return null;
    const value = this.head.value;
    this.weight -= value;
    this.size -= 1;
    if (this.size === 0) {
      this.head = null;
      this.tail = this.head;
      return value;
    }

    this.head = this.head.next;
    this.head.prev = null;

    return value;
  }

  insert(n) {
    const node = new Node(n);
    this.weight += n;
    this.size += 1;
    if (this.size === 1) {
      this.head = node;
      this.tail = this.head;
      return;
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  getSize() {
    return this.size;
  }

  getWeight() {
    return this.weight;
  }

  test() {
    console.log(this.head);
  }
}

const solution = (N, L, W, trucks) => {
  const bridge = new Queue();
  let answer = 0;
  for (let i = 0; i < L; i++) {
    bridge.insert(0);
  }

  let idx = 0;
  while (trucks.length > idx ) {
    const truckWeight = trucks[idx];
    bridge.shift();
    const totalWeight = bridge.getWeight();

    if (totalWeight + truckWeight <= W) {
      bridge.insert(truckWeight);
      idx++;
    } else {
      bridge.insert(0);
    }

    answer++;
  }

  while (bridge.getWeight()) {
    bridge.shift();
    bridge.insert(0);
    answer++;
  }

  console.log(answer);
};

solution(N, L, W, trucks);
