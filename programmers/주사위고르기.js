function solution(dice) {
    const comDiceArr = [];
    const diceMaxLength = dice.length / 2;

    // 모든 가능한 주사위 조합 생성 (인덱스 기준)
    const combinationDice = (arr, index) => {
        if (arr.length === diceMaxLength) {
            comDiceArr.push([...arr]);
            return;
        }

        for (let i = index; i < dice.length; i++) {
            combinationDice([...arr, i], i + 1);
        }
    }

    combinationDice([], 0);

    // 주사위 조합별 가능한 모든 점수 계산
    const calculateScores = (team) => {
        const scores = [];

        const generateScores = (currentScore, diceIdx) => {
            if (diceIdx === team.length) {
                scores.push(currentScore);
                return;
            }

            const currentDice = dice[team[diceIdx]];
            for (const face of currentDice) {
                generateScores(currentScore + face, diceIdx + 1);
            }
        };

        generateScores(0, 0);
        return scores;
    };

    // 최고의 승률을 가진 조합 찾기
    let bestTeam = null;
    let maxWins = -1;

    for (const teamA of comDiceArr) {
        // 팀 B는 A에 포함되지 않은 주사위들
        const teamB = [];
        for (let i = 0; i < dice.length; i++) {
            if (!teamA.includes(i)) {
                teamB.push(i);
            }
        }

        const scoresA = calculateScores(teamA).sort((a, b) => a - b);
        const scoresB = calculateScores(teamB).sort((a, b) => a - b);

        let wins = 0;
        let pointer = 0;

        for (let i = 0; i < scoresA.length; i++) {
            while (pointer < scoresB.length && scoresA[i] > scoresB[pointer]) {
                pointer++;
            }
            wins += pointer;
        }

        if (wins > maxWins) {
            maxWins = wins;
            bestTeam = teamA;
        }
    }

    // 인덱스+1로 변환
    return bestTeam.map(idx => idx + 1);
}