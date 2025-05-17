const init = (board, lock, m, spot) => {
    for (let i = 0; i < lock.length; i++) {
        for (let j = 0; j < lock.length; j++){
            if (lock[i][j] === 0) spot.push([i + m - 1, j + m - 1]);
            board[i + m - 1][j + m - 1] = lock[i][j];
        }
    }
}

const check = (board, key, spot, b) => {
    for (let i = 0; i <= b - key.length; i++) {
        for (let j = 0; j <= b - key.length; j++) {
            const newBoard = board.map(v => [...v]);

            // 키를 현재 위치에 적용
            let flag = false;
            for (let k = 0; k < key.length; k++) {
                for (let p = 0; p < key.length; p++) {
                    if (key[k][p] === 1) {  // 키의 돌기 부분만 고려
                        if (newBoard[k + i][p + j] === 1) {  // 자물쇠의 돌기와 키의 돌기가 만나면 안됨
                            flag = true;
                            break;
                        }
                        newBoard[k + i][p + j] = 1;  // 키의 돌기로 보드 업데이트
                    }
                }
                if (flag) break;
            }

            if (flag) continue;  // 키의 돌기와 자물쇠의 돌기가 충돌하면 다음 위치로

            // 모든 자물쇠 홈이 채워졌는지 확인
            flag = false;
            for (const [x, y] of spot) {
                if (newBoard[x][y] === 0) {  // 홈이 채워지지 않았으면
                    flag = true;
                    break;
                }
            }

            if (flag) continue;  // 모든 홈이 채워지지 않았으면 다음 위치로

            return true;  // 모든 조건을 통과하면 성공
        }
    }
    return false;  // 모든 위치와 회전을 시도해도 실패
}

const rotate = (key) => {
    const newKey = Array.from({length : key.length}, _ => Array(key.length).fill(0));
    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < key.length; j++) {
            newKey[j][key.length - 1 - i] = key[i][j];
        }
    }
    return newKey;
}

function solution(key, lock) {
    const M = key.length;
    const N = lock.length;
    const B = N + M + M - 2;
    const board = Array.from({length : B}, _ => Array(B).fill(0));
    const spot = [];

    init(board, lock, M, spot);

    // 자물쇠에 홈이 없는 경우 바로 true 반환
    if (spot.length === 0) return true;

    // 4회 회전
    for (let i = 0; i < 4; i++) {
        if (check(board, key, spot, B)) {
            return true;
        }
        key = rotate(key);
    }

    return false;
}