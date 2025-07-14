const combination = (arr, result, motherArr, max, index) => {
    if (arr.length === max) {
        result.push([...arr]);
        return;
    }

    for (let i = index; i < motherArr.length; i++) {
        combination([...arr, motherArr[i]], result, motherArr, max, i + 1);
    }
};

const check = (relation, indexArr) => {
    const visited = new Set();
    const newRelation = relation.map((arr) => {
        const result = [];
        indexArr.forEach((index) => {
            result.push(arr[index]);
        });
        return result.join('-');
    });
    newRelation.forEach(v => visited.add(v));
    return visited.size === relation.length;
};

// 최소성 검사: 기존 후보키의 부분집합인지 확인
const isSubset = (candidateKeys, newKey) => {
    return candidateKeys.some(key =>
        key.every(attr => newKey.includes(attr))
    );
};

function solution(relation) {
    let answer = 0;
    const candidateKeys = [];
    const columnCount = relation[0].length;

    // 1개 속성부터 전체 속성 개수까지
    for (let comLength = 1; comLength <= columnCount; comLength++) {
        const possibleIndex = Array.from({length: columnCount}, (_, i) => i);
        const comArr = [];
        combination([], comArr, possibleIndex, comLength, 0);

        comArr.forEach(arr => {
            if (check(relation, arr)) {
                if (!isSubset(candidateKeys, arr)) {
                    candidateKeys.push(arr);
                    answer++;
                }
            }
        });
    }

    return answer;
}