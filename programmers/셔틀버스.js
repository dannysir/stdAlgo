let n = 10;
let timetable = ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];
timetable = timetable.sort().map(v => v.split(':').map(Number));
let t = 25;
let m = 1;
let BusArrive = [];
for (let i = 0; i < n; i++) {
    let bus = new Date(2024, 0, 4, 0, 0, 0);;
    bus.setHours(9, t * i);
    BusArrive.push(bus);
}

timetable = timetable.map(v => {
    let UserTime = new Date(2024, 0, 4, 0, 0, 0);;
    UserTime.setHours(v[0], v[1]);
    return UserTime;
});
const takeBus = () => {
    let myTime = new Date(2024, 0, 4, 0, 0, 0);;
    for (let i = 0; i < BusArrive.length; i++) {
        let cnt = 0;
        if (i !== BusArrive.length - 1) {
            while (cnt < m) {
                if (timetable[0] <= BusArrive[i]) {
                    cnt++;
                    timetable.shift();
                } else break;
            }
        } else {
            if (timetable[m - 1] <= BusArrive[i] && timetable.length >= m) {
                myTime = timetable[m - 1];
                myTime.setMinutes(myTime.getMinutes() - 1);
            } else {
                myTime = BusArrive[i];
            }
        }
    }
    return `${myTime.getHours().toString().padStart(2, '0')}:${myTime.getMinutes().toString().padStart(2, '0')}`;
};
console.log(takeBus());


// let n = 10;
// let timetable = ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];
// timetable = timetable.sort().map(v => v.split(':').map(Number));
// let t = 25;
// let m = 1;
// let BusArrive = [];
// for (let i = 0; i < n; i++) {
//     let bus = new Date();
//     bus.setHours(9, t * i);
//     BusArrive.push(bus);
// }
//
// timetable = timetable.map(v => {
//     let UserTime = new Date();
//     UserTime.setHours(v[0], v[1]);
//     return UserTime;
// });
//
// const takeBus = () => {
//     let myTime = new Date();
//     for (let i = 0; i < BusArrive.length; i++) {
//         let cnt = 0;
//         if (i !== BusArrive.length - 1) {
//             while (cnt < m) {
//                 if (timetable[0] <= BusArrive[i]) {
//                     cnt++;
//                     timetable.shift();
//                 } else break;
//             }
//         } else {
//             if (timetable[m - 1] <= BusArrive[i] && timetable.length >= m) {
//                 myTime = timetable[m - 1];
//                 myTime.setMinutes(myTime.getMinutes() - 1);
//             } else {
//                 myTime = BusArrive[i];
//             }
//         }
//     }
//     return `${myTime.getHours().toString().padStart(2, '0')}:${myTime.getMinutes().toString().padStart(2, '0')}`;
// };
// console.log(takeBus());