class MaxHeap {
  constructor() {
    this.heap = [null];
    this.sum = 0;
  }

  insert(num) {
    let cur = this.heap.length;
    while (cur > 1) {
      const parent = Math.floor(cur / 2);
      if (this.heap[parent] < num) {
        this.heap[cur] = this.heap[parent];
        cur = parent;
      } else break;
    }
    this.heap[cur] = num;
    this.sum += num;
  }

  pop() {
    if (this.heap.length > 2) {
      const popElement = this.heap[1];
      this.sum -= popElement;
      this.heap[1] = this.heap.pop();

      let cur = 1;
      let left = cur * 2;
      let right = cur * 2 + 1;

      while (this.heap[left]) {
        let compare = left;
        if (this.heap[right] && this.heap[left] < this.heap[right]) {
          compare = right;
        }

        if (this.heap[compare] > this.heap[cur]) {
          [this.heap[cur], this.heap[compare]] = [this.heap[compare], this.heap[cur]];
          cur = compare;
          left = cur * 2;
          right = cur * 2 + 1;
        } else break;
      }

      return popElement
    }else if (this.heap.length === 2) {
      const popElement = this.heap.pop();
      this.sum -= popElement;
      return popElement;
    }else return null;
  }

  getSum() {
    return this.sum;
  }
  test() {
    console.log(this.sum, this.heap);
  }
}

function solution(n, k, enemy) {
  var answer = 0;
  const maxHeap = new MaxHeap();
  let cnt = 0;
  for (let i = 0; i < enemy.length; i++) {
    maxHeap.insert(enemy[i]);

    if (maxHeap.getSum() > n) {
      if (cnt < k) {
        const chanceNum = maxHeap.pop();
        cnt++;
      } else {
        break;
      }
    }
    answer = i;
  }

  return answer + 1;
}
