let routes = [[-20, -15], [-14, -5], [-18, -13], [-5, -3]];
let answer = 1;
routes.sort((a,b) => a[1] - b[1]);
let max = routes[0][1];

for (let i = 1; i < routes.length; i++) {
    if (routes[i][0] <= max && routes[i][1] >= max) {
        continue;
    }else {
        max = routes[i][1];
        answer++;
    }
}
console.log(routes);
console.log(answer);