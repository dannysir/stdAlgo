let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' '));

const [N, M] = input.shift().map(Number);

const solution = (input) => {
  const rooms = [];
  const START = 'Started!\n';
  const WAITING = 'Waiting!\n';
  let answer = '';
  rooms.push([input[0]]);

  for (let i = 1; i < input.length; i++) {
    const [num, name] = input[i];
    let flag = true;
    for (const room of rooms) {
      if (room.length >= M) continue;
      if (+room[0][0] - 10 <= +num && +room[0][0] + 10 >= +num) {
        room.push(input[i]);
        flag = false;
        break;
      }
    }
    if (flag) {
      rooms.push([input[i]]);
    }
  }
  rooms.forEach((room) => {
    if (room.length === M) {
      answer += START;
    } else answer += WAITING;

    answer += room.sort((a, b) => {
      if (a[1] < b[1]) {
        return -1;
      }else return 1;
    }).map(v => v.join(' ')).join('\n') + '\n';
  });

  console.log(answer);

};

solution(input);
