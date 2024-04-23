const board = [
    [0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0]];
const N = board.length;

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    Insert(item) {
        let Current = this.heap.length;
        while (Current > 1) {
            const Parent = Math.floor(Current / 2);
            if (this.heap[Parent][3] > item[3]) {
                this.heap[Current] = this.heap[Parent];
                Current = Parent;
            } else break;
        }
        this.heap[Current] = item;
    }

    Pop() {
        if (this.heap.length > 2) {
            const PopItem = this.heap[1];
            this.heap[1] = this.heap.pop();
            let Current = 1;
            let Left = Current * 2;
            let Right = Current * 2 + 1;
            while (this.heap[Left]) {
                let Compare = Left;
                if (this.heap[Right] && this.heap[Left][3] > this.heap[Right][3]) {
                    Compare = Right;
                }

                if (this.heap[Compare][3] < this.heap[Current][3]) {
                    [this.heap[Compare], this.heap[Current]] = [this.heap[Current], this.heap[Compare]];
                    Current = Compare;
                    Left = Current * 2;
                    Right = Current * 2 + 1;
                } else break;
            }
            return PopItem;
        } else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    GetLength() {
        return this.heap.length - 1;
    }

}

// 0 세로
// 1 가로
const Dijkstra = (start) => {
    let Queue = new MinHeap();
    Queue.Insert(start);
    let weight = Array.from({length: N}, _ => Array(N).fill(Infinity));
    weight[0][0] = 0
    let idx = 0;
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    while (Queue.GetLength()) {
        const [nowX, nowY, dir, cost] = Queue.Pop();
        if (cost > weight[nowX][nowY]) continue;
        for (let i = 0; i < dx.length; i++) {
            const nextX = nowX + dx[i];
            const nextY = nowY + dy[i];
            if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= N) continue;
            if (board[nextX][nextY] === 1) continue;

            let price = Math.floor(dir / 2) === Math.floor(i / 2) ? 100 : 600;
            if (weight[nextX][nextY] > price + cost) {
                weight[nextX][nextY] = price + cost;
                Queue.Insert([nextX, nextY, i, cost + price]);
            }

        }
        idx++;
    }
    console.log('san',weight);
    return weight[N - 1][N - 1];

};

console.log(Math.min(Dijkstra([0, 0, 2, 0]), Dijkstra([0, 0, 0, 0])));