const message = "my phone number is 01012345678 and may i have your phone number";
const spoiler_ranges = [[5, 5], [25, 28], [34, 40], [53, 59]];

// 각 인덱스가 속한 단어의 [시작, 끝] 반환 (공백이면 null)
const buildWordBoundary = (message) => {
  const boundary = Array(message.length).fill(null);
  let i = 0;
  while (i < message.length) {
    if (message[i] === ' ') {
      i++;
      continue;
    }
    let j = i;
    while (j < message.length && message[j] !== ' ') j++;
    // i ~ j-1 이 하나의 단어
    for (let k = i; k < j; k++) {
      boundary[k] = [i, j - 1]; // 단어의 [시작인덱스, 끝인덱스]
    }
    i = j;
  }
  return boundary;
};

const getNonSpoilerWords = (message, spoiler_ranges) => {
  const nonSpoilerWords = new Set();
  const spoilerSet = new Set();

  for (const [s, e] of spoiler_ranges) {
    for (let i = s; i <= e; i++) spoilerSet.add(i);
  }

  let i = 0;
  while (i < message.length) {
    if (message[i] === ' ') {
      i++;
      continue;
    }
    let j = i;
    while (j < message.length && message[j] !== ' ') j++;
    const isSpoiler = [...Array(j - i).keys()].some(k => spoilerSet.has(i + k));
    if (!isSpoiler) {
      nonSpoilerWords.add(message.slice(i, j));
    }
    i = j;
  }
  return nonSpoilerWords;
};

function solution(message, spoiler_ranges) {
  let answer = 0;
  const visited = new Set();
  const nonSpoilerWords = getNonSpoilerWords(message, spoiler_ranges);
  const boundary = buildWordBoundary(message);

  for (const [s, e] of spoiler_ranges) {
    // 스포 구간 [s, e]에 걸친 단어들의 실제 범위 계산
    const wordStart = boundary[s] ? boundary[s][0] : s;
    const wordEnd = boundary[e] ? boundary[e][1] : e;

    const words = message.slice(wordStart, wordEnd + 1).trim().split(' ');

    for (const word of words) {
      if (!word) continue;
      if (visited.has(word)) continue;         // 조건 3: 이전 공개 스포 단어 중복
      if (nonSpoilerWords.has(word)) continue; // 조건 2: 비-스포 구간에 등장

      visited.add(word);
      answer++;
    }
  }

  return answer;
}

console.log(solution(message, spoiler_ranges));