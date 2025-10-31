'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
  // Write your code here
  const setPlayer = new Set([...ranked.concat(player)]);
  const setRank = new Set([...ranked]);
  const sortedPlayer = [...setPlayer].sort((a, b) => b - a);
  const mapPlayer = new Map();
  player.forEach(v => mapPlayer.set(v, -1));
  let rank = 0;
  for (let i = 0; i < sortedPlayer.length; i++) {
    const target = sortedPlayer[i];
    if (mapPlayer.has(target)) {
      mapPlayer.set(target, rank);
    }
    if (setRank.has(target)) {
      rank++;
    }
  }

  return player.map(v => mapPlayer.get(v) + 1);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const rankedCount = parseInt(readLine().trim(), 10);

  const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

  const playerCount = parseInt(readLine().trim(), 10);

  const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

  const result = climbingLeaderboard(ranked, player);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
