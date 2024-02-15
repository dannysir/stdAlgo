// let n = 10;
// let timetable = ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];
// timetable = timetable.sort().map(v => v.split(':').map(Number));
// let t = 25;
// let m = 1;
// let BusArrive = [];
// for (let i = 0; i < n; i++) {
//     let bus = new Date(2024, 0, 4, 0, 0, 0);;
//     bus.setHours(9, t * i);
//     BusArrive.push(bus);
// }
//
// timetable = timetable.map(v => {
//     let UserTime = new Date(2024, 0, 4, 0, 0, 0);;
//     UserTime.setHours(v[0], v[1]);
//     return UserTime;
// });
// const takeBus = () => {
//     let myTime = new Date(2024, 0, 4, 0, 0, 0);;
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


// 로컬 환경에서 풀이하기 위한 변수 입력
let n = 10;
let timetable = ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];
let t = 25;
let m = 1;
// sort()를 이용해 정렬 후
timetable = timetable.sort((a,b) => {
    return a <= b? -1:1;
}).map(v => v.split(':').map(Number));
// 버스 도착 시간 배열 생성
let BusArrive = [];
// 버스 도착 시간 입력
for (let i = 0; i < n; i++) {
    let bus = new Date();
    bus.setHours(9, t * i);
    BusArrive.push(bus);
}
// timetable 의 모든 배열 값을 Date() 객체로
timetable = timetable.map(v => {
    let UserTime = new Date();
    UserTime.setHours(v[0], v[1]);
    return UserTime;
});

const takeBus = () => {
    // 주인공이 버스를 타야하는 시간
    let myTime = new Date();
    for (let i = 0; i < BusArrive.length; i++) {
        // 버스에 타는 사람 수
        let cnt = 0;
        // 만약 마지막 버스가 아니라면
        if (i !== BusArrive.length - 1) {
            // 버스가 만차가 될 때까지
            while (cnt < m) {
                // 만약 timetable 맨 앞(가장먼저 도착) 사람이 버스 도착 시간보다 빨리 왔다면,
                if (timetable[0] <= BusArrive[i]) {
                    //인원 증가
                    cnt++;
                    //맨 앞 사람 제거
                    timetable.shift();
                    // 만약 맨 앞(가장먼저 도착) 사람이 버스 시간보다 늦게 왔다면 break
                } else break;
            }
            // 만약 마지막 버스라면
        } else {
            // m번째 사람이 도착 시간보다 일찍 왔다면,
            // 그리고 time table에 인원이 m보다 크다면,
            // 위의 조건 대로라면, 주인공은 무조건 m번째 사람보다 1분 일찍 와야한다.
            if (timetable[m - 1] <= BusArrive[i] && timetable.length >= m) {
                myTime = timetable[m - 1];
                myTime.setMinutes(myTime.getMinutes() - 1);
                // 만약 그 외의 상황이라면 주인공은 마지막 버스 시간에 맞춰 오면 됨
            } else {
                myTime = BusArrive[i];
            }
        }
    }
    // padStart 함수를 이용해 1 이 아닌 01 로 출력 되도록 수정
    return `${myTime.getHours().toString().padStart(2, '0')}:${myTime.getMinutes().toString().padStart(2, '0')}`;
};
// 로컬 환경에서 확인하기 위해 콘솔 창을 확인
console.log(takeBus());
