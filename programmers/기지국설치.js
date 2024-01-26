let n = 16;
let stations = [9];
let w = 2;
let width = w * 2 + 1;
let answer = 0;



const lastDistance = stations.reduce((prev, cur) => {
    const distance = cur - w - 1 - prev;
    console.log(distance);
    answer += distance > 0 ? Math.ceil((distance) / width) : 0;
    return cur + w;
}, 0);

if (lastDistance > 0) answer += Math.ceil((lastDistance) / width);

console.log(lastDistance);