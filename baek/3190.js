let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let AppleNumber = parseInt(input.shift());
let map = new Array(N);
for (let i = 0; i < N; i++) {
    map[i] = new Array(N).fill(0);
}
// 사과 위치를 map에 입력
for (let i = 0; i < AppleNumber; i++) {
    const [x, y] = input.shift().split(' ').map(Number);
    map[x - 1][y - 1] = 1;
}
let SnakeMovement = parseInt(input.shift());
//뱀의 움직임 저장 배열
let SnakeOrder = [];
// 뱀의 움직임을 배열로 저장
for (let i = 0; i < SnakeMovement; i++) {
    SnakeOrder.push(input.shift().split(' ').map((Value, Index) => {
        if (Index === 0) return parseInt(Value);
        return Value;
    }));
}
class NODE {
    constructor(item) {
        this.node = item;
        this.prev = null;
        this.next = null;
    }
}
//연결 리스트를 이용하여 구현
class DEQUE {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    PushFront(item) {
        const PushElement = new NODE(item);
        // 만약 한개의 원소만 있으면 시작과 끝은 같기 때문
        if (this.length === 0) {
            this.head = PushElement;
            this.tail = PushElement;
        } else {
            // 시작 부분 이전에 붙여주고 시작 부분을 변경해주는 방식
            this.head.prev = PushElement;
            PushElement.next = this.head;
            this.head = PushElement;
        }
        this.length++;
    }

    PopEnd() {
        // 길이가 0이면 pop을 해줄 수 없음
        if (this.length === 0) return;
        // 끝부분을 pop하고 끝부분의 위치를 이전으로 변경
        const PopElement = this.tail;
        this.tail = this.tail.prev;
        // 만약 길이가 1이었으면 큐는 비어야함
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            //끝부분의 마지막 부분 연결을 해제
            this.tail.next = null;
        }
        this.length--;
        return PopElement;
    }

    Has(x, y) {
        // 시작 부분을 기억하기 위해
        const remember = this.head;
        // 반복문을 돌며 일치 여부를 직접 확인
        for (let i = 0; i < this.length; i++) {
            if (this.head.node[0] === x && this.head.node[1] === y) {
                return true;
            }
            // 다음 위치 확인
            this.head = this.head.next;
        }
        // 확인을 완료했으면 다시 시작부분을 가리키게
        this.head = remember;
        return false;
    }
}

const solution = () => {
    // DEQUE 선언
    const Snake = new DEQUE();
    // 뱀의 시작 위치
    let nowX = 0;
    let nowY = 0;
    Snake.PushFront([nowX, nowY]);
    // 시간
    let cnt = 0;
    // 뱀의 진행 방향을 표시
    let direction = 1;
    let dx = [1, 0, -1, 0,];
    let dy = [0, 1, 0, -1];
    // 뱀의 충돌 여부 확인
    let collision = false;
    // 뱀 방향 전환을 위한 [초, 방향] 저장
    let [M, Order] = SnakeOrder[0];
    while (!collision) {
        // 만약 방향 전환 시간이 되었다면
        if (cnt === M) {
            // 방향 전환 실시
            if (Order === 'D') {
                direction = (direction - 1 + dx.length) % dx.length;
            } else {
                direction = (direction + 1) % dx.length;
            }
            SnakeOrder.shift();
            // 방향 전환 완료후 다음 방향 전환을 위해 변수 변경
            if (SnakeOrder.length) {
                [M, Order] = SnakeOrder[0];
            }
        }
        // 뱀의 다음 위치
        const nextX = nowX + dx[direction];
        const nextY = nowY + dy[direction];
        cnt++;
        // 만약 벽과 충돌 혹은 뱀의 몸과 충돌할 경우 종료
        if (nextX >= N || nextY >= N || nextY < 0 || nextX < 0 || Snake.Has(nextX,nextY)) {
            collision = true;
            break;
        }
        // 다음 위치에 사과가 없다면
        if (map[nextX][nextY] === 0) {
            Snake.PushFront([nextX, nextY]);
            Snake.PopEnd();
        } else { // 사과가 있을 때
            // 사과는 뱀이 먹기 때문에 0으로
            map[nextX][nextY] = 0;
            Snake.PushFront([nextX, nextY]);
        }
        // 뱀의 현재 위치 변경
        nowX = nextX;
        nowY = nextY;
    }
    return cnt;
};
console.log(solution());