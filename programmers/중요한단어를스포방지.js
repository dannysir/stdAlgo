const message = "my phone number is 01012345678 and may i have your phone number";
const spoiler_ranges = [[5, 5], [25, 28], [34, 40], [53, 59]];

const findStartIndex = (message) => {
  const msgSplit = message.split('');
  let lastWordIndex = 0;
  const wordStart = Array.from({length : msgSplit.length}, (_, index) => {
    if (msgSplit[index] !== ' ') {
      if (lastWordIndex === -1) {
        lastWordIndex = index;
      }
      return lastWordIndex;
    } else {
      return lastWordIndex = index;
    }
  });
  return wordStart;
}

const findEndIndex = (message) => {
  const msgSplit = message.split('');
  const wordEnd = Array(msgSplit.length);
  let lastWordIndex2 = -1;
  for (let i = msgSplit.length - 1; i >= 0; i--) {
    if (lastWordIndex2 === -1) {
      lastWordIndex2 = i;
    }
    if (msgSplit[i] === ' ') {
      lastWordIndex2 = i;
    }
    wordEnd[i] = lastWordIndex2;
  }
  return wordEnd;
}

const hideMessage = (message, spoiler_ranges) => {
  const msgSplit = message.split('');
  for (let i = spoiler_ranges.length - 1; i >= 0; i--) {
    const [s, e] = spoiler_ranges[i];
    msgSplit.splice(s, e - s + 1, '___');
  }

  return msgSplit.join('');
};

const fillHiddenRange = (message, hiddenMsg, spoiler_range) => {
  const [s, e] = spoiler_range;
  const fillValue = message.slice(s, e + 1);
  return hiddenMsg.replace('___', fillValue);
};

function solution(message, spoiler_ranges) {
  var answer = 0;
  const msgArr = message.split(' ');
  const wordStartIndex = findStartIndex(message);
  const wordEndIndex = findEndIndex(message);

  const spoilerWords = spoiler_ranges.map(([s, e]) => {
    const spoiler = message.slice(wordStartIndex[s], wordEndIndex[e] + 1).trim();
    return spoiler.split(' ');
  });

  let hiddenMsg = hideMessage(message, spoiler_ranges);

  for (let i = 0; i < spoilerWords.length; i++) {
    const hiddenMsgSplit = hiddenMsg.split(' ');
    for (let j = 0; j < spoilerWords[i].length; j++) {
      const word = spoilerWords[i][j];
      if (hiddenMsgSplit.find((value) => value === word)) {
        continue;
      }

      answer++;
    }

    hiddenMsg = fillHiddenRange(message, hiddenMsg, spoiler_ranges[i]);
  }
  return answer;
}

solution(message, spoiler_ranges);