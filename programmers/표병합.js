const commands = ["UPDATE 1 1 menu", "UPDATE 1 2 category", "UPDATE 2 1 bibimbap", "UPDATE 2 2 korean", "UPDATE 2 3 rice", "UPDATE 3 1 ramyeon", "UPDATE 3 2 korean", "UPDATE 3 3 noodle", "UPDATE 3 4 instant", "UPDATE 4 1 pasta", "UPDATE 4 2 italian", "UPDATE 4 3 noodle", "MERGE 1 2 1 3", "MERGE 1 3 1 4", "UPDATE korean hansik", "UPDATE 1 3 group", "UNMERGE 1 4", "PRINT 1 3", "PRINT 1 4"];
let max = 51;
let table = Array.from({length: max}, () =>
    Array.from({length: max}, () => ['', undefined]),
);
let answer = [];
const UPDATE = 'UPDATE';
const MERGE = 'MERGE';
const UNMERGE = 'UNMERGE';
const PRINT = 'PRINT';
const EMPTY = 'EMPTY';
for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
        table[i][j][1] = `${i},${j}`;
    }
}
const Merge = (x1, y1, x2, y2) => {
    if (x1 === x2 && y1 === y2) return;
    let TargetValue = '';
    const cell1 = table[x1][y1];
    const cell2 = table[x2][y2];

    let Cell1Key = cell1[1];
    let Cell2Key = cell2[1];
    if (cell2[0] !== '') {
        TargetValue = cell2[0];
    }
    if (cell1[0] !== '') {
        TargetValue = cell1[0];
    }

    for (let i = 0; i < max; i++) {
        for (let j = 0; j < max; j++) {
            if (table[i][j][1] === Cell1Key) {
                table[i][j][0] = TargetValue;
            }else if (table[i][j][1] === Cell2Key) {
                table[i][j][0] = TargetValue;
                table[i][j][1] = Cell1Key;
            }
        }
    }
};
const Update = (order) => {

    if (order.length === 3) {
        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                if (table[i][j][1] === table[order[0]][order[1]][1]) {
                    table[i][j][0] = order[2];
                }
            }
        }
    }else if (order.length === 2) {
        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                if (table[i][j][0] === order[0]) {
                    table[i][j][0] = order[1];
                }
            }
        }
    }
};
const UnMerge = (x1, y1) =>{
    let value = table[x1][y1][0];
    let targetKey = table[x1][y1][1];
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < max; j++) {
            if (table[i][j][1] === targetKey) {
                table[i][j][0] = '';
                table[i][j][1] = `${i},${j}`;
            }

        }
    }
    table[x1][y1][0] = value;
}

const Print = (x1, y1) => {
    if (table[x1][y1][0] === '') {
        answer.push(EMPTY);
    }else{
        answer.push(table[x1][y1][0]);
    }
};

while (commands.length) {
    const ORDER = commands.shift().split(' ');
    switch (ORDER.shift()) {
        case UPDATE:
            Update(ORDER);
            break;
        case MERGE:
            Merge(...ORDER);
            break;
        case UNMERGE:
            UnMerge(...ORDER);
            break;
        case PRINT:
            Print(...ORDER);
            break;
        default:
            break;
    }

}
console.log(answer);