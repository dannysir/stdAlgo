let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let connections = input[0].split(' ').map(Number);
let DeleteNode = parseInt(input[1]);

let lists = Array.from({length: N}, (_) => []);
let root = 0;
let isParent = Array.from({length: N}, (_) => false);
for (let i = 0; i < connections.length; i++) {
    const Parent = connections[i];
    if (Parent === -1) {
        root = i;
    } else {
        isParent[Parent] = true;
        lists[Parent].push(i);
    }
}

const DFS = (NOW) => {
    if (!lists[NOW].length) {
        isParent[NOW] = true;
        return;
    }
    for (const Child of lists[NOW]) {
        DFS(Child);
        isParent[Child] = true;
    }
};
const solution = () => {
    if (DeleteNode !== root) {
        if (lists[connections[DeleteNode]].length === 1) {
            isParent[connections[DeleteNode]] = false;
        }
        DFS(DeleteNode);
        console.log(isParent.filter(v => v === false).length);
    }else {
        console.log(0);
    }

};
solution();