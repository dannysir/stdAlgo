let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, K] = input.shift().split(' ').map(Number);

let boards = input.splice(0, N).map(v => v.split(' ').map(Number));
// 냄새 정보를 저장할 3차원 배열 [상어번호, 남은시간]
const visited = Array.from({length: N}, _ => Array.from({length: N}, _ => Array(2).fill(-1)));
const sharkPriority = {};
const sharksObj = {};
const sharkInitDirs = input.shift().split(' ').map(Number);

// 상어 우선순위 및 초기 정보 설정
for (let i = 0; i < M; i++) {
    sharkPriority[i] = input.splice(0, 4).map(v => v.split(' ').map(v => +v - 1));
    sharksObj[i] = {
        dir: 0,
        x: 0,
        y: 0,
        nx: null,
        ny: null,
    };
}

// 상어 초기 방향 설정
sharkInitDirs.forEach((value, index) => {
    sharksObj[index].dir = value - 1;
});

// 상어 초기 위치 설정 및 냄새 뿌리기
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (boards[i][j] !== 0) {
            const sharkIndex = boards[i][j] - 1;
            sharksObj[sharkIndex].x = i;
            sharksObj[sharkIndex].y = j;
            // 초기 냄새 설정
            visited[i][j] = [sharkIndex, K];
        }
    }
}

const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
/*
0 상
1 하
2 좌
3 우
*/

// 상어 이동
const moveSharks = (sharks, boards) => {
    for (const [sharkIndex, sharkInfo] of Object.entries(sharks)) {
        const dir = sharkInfo.dir;
        let flag = false;

        // 냄새가 없는 칸으로 이동 시도
        for (const dirIndex of sharkPriority[sharkIndex][dir]) {
            const [dx, dy] = dirs[dirIndex];
            const nx = sharkInfo.x + dx;
            const ny = sharkInfo.y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            // 냄새가 없는 칸인지 확인
            if (visited[nx][ny][0] === -1) {
                sharkInfo.nx = nx;
                sharkInfo.ny = ny;
                sharkInfo.dir = dirIndex;
                flag = true;
                break;
            }
        }

        // 냄새가 없는 칸이 없으면 자신의 냄새가 있는 칸으로 이동
        if (!flag) {
            for (const dirIndex of sharkPriority[sharkIndex][dir]) {
                const [dx, dy] = dirs[dirIndex];
                const nx = sharkInfo.x + dx;
                const ny = sharkInfo.y + dy;

                if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                if (visited[nx][ny][0] == sharkIndex) {
                    sharkInfo.nx = nx;
                    sharkInfo.ny = ny;
                    sharkInfo.dir = dirIndex;
                    flag = true;
                    break; // 이 break 추가
                }
            }
        }
    }
};

// 상어 이동 후 환경 업데이트
const makeNextEnvironment = (sharks) => {
    const nextSharks = {};
    const nextBoards = Array.from({length: N}, _ => Array(N).fill(0));

    // 각 상어의 다음 위치 계산
    for (const [sharkIndex, sharkInfo] of Object.entries(sharks)) {
        const nx = sharkInfo.nx;
        const ny = sharkInfo.ny;

        // 다음 위치 정보가 없으면 건너뛰기
        if (nx === null || ny === null) continue;

        // 새로운 상어 객체 생성
        const tmpObj = {
            x: nx,
            y: ny,
            dir: sharkInfo.dir,
            nx: null,
            ny: null
        };

        if (nextBoards[nx][ny] === 0) {
            // 빈 칸이면 상어 배치
            nextSharks[sharkIndex] = tmpObj;
            nextBoards[nx][ny] = +sharkIndex + 1;
            // 냄새 업데이트
            visited[nx][ny] = [+sharkIndex, K];
        } else {
            // 이미 다른 상어가 있는 경우, 번호가 작은 상어만 남김
            const existingSharkIndex = nextBoards[nx][ny] - 1;
            if (+sharkIndex < existingSharkIndex) {
                // 기존 상어 제거
                delete nextSharks[existingSharkIndex];
                // 새 상어 배치
                nextSharks[sharkIndex] = tmpObj;
                nextBoards[nx][ny] = +sharkIndex + 1;
                // 냄새 업데이트
                visited[nx][ny] = [+sharkIndex, K];
            }
        }
    }

    return [nextSharks, nextBoards];
};

// 냄새 업데이트 함수
const updateVisited = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (visited[i][j][0] !== -1) {
                let [sharkIndex, timer] = visited[i][j];
                timer--;
                if (timer === 0) {
                    visited[i][j] = [-1, -1];
                } else {
                    visited[i][j] = [sharkIndex, timer];
                }
            }
        }
    }
};

const solution = () => {
    let sharks = sharksObj;
    let timer = 0;

    // 시뮬레이션 시작
    while (timer <= 1000) { // 1000초까지 확인
        // 1번 상어만 남았는지 확인
        if (Object.keys(sharks).length === 1 && '0' in sharks) {
            return timer;
        }

        // 냄새 감소
        updateVisited();

        // 상어 이동
        moveSharks(sharks, boards);

        // 환경 업데이트
        const [nextShark, nextBoards] = makeNextEnvironment(sharks);
        sharks = nextShark;
        boards = nextBoards;

        timer++;
    }

    return -1; // 1000초가 지나도 1번 상어만 남지 않은 경우
};

console.log(solution());