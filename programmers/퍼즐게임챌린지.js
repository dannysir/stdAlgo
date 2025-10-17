const calc = (diff, level, time_prev, time_cur) => {
  if (diff > level) {
    const cost = time_prev + time_cur;
    const n = diff - level;

    return (n * cost) + time_cur;
  }else {
    return time_cur;
  }
}

function solution(diffs, times, limit) {
  var answer = Infinity;
  let minLv = 1;
  let maxLv = diffs.reduce((acc, cur) => Math.max(acc, cur), 0);

  while (minLv <= maxLv) {
    const midLv = Math.floor((minLv + maxLv) / 2);
    let time = 0;
    for (let i = 0; i < diffs.length; i++) {
      const diff = diffs[i];
      const time_cur = times[i];
      time += calc(diff, midLv, i === 0 ? 0 : times[i - 1], time_cur);
    }

    if (time <= limit) {
      answer = Math.min(answer, midLv);
      maxLv = midLv - 1;
    } else {
      minLv = midLv + 1;
    }
  }

  return answer;
}