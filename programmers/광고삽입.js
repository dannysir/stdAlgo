let play_time = "02:03:55";
let adv_time = "00:14:15";
let logs = ["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"];
const TurnToSeconds = (input) => {
    const TimeArr = input.split(':').map(Number);
    let times = 0;
    TimeArr.forEach((Value, Index) => {
        times += Value * (60 ** (2 - Index));
    });
    return times;
};
const PlaySeconds = TurnToSeconds(play_time);
const AdvSeconds = TurnToSeconds(adv_time);
let TimeLine = new Array(PlaySeconds).fill(0);

logs.forEach(v => {
    const [Start, End] = v.split('-');
    const StartSeconds = TurnToSeconds(Start);
    const EndSeconds = TurnToSeconds(End);
    TimeLine[StartSeconds] += 1;
    TimeLine[EndSeconds] -= 1;
});

for (let i = 1; i < TimeLine.length; i++) {
    TimeLine[i] += TimeLine[i - 1];
}

for (let i = 1; i < TimeLine.length; i++) {
    TimeLine[i] += TimeLine[i - 1];
}

let max = TimeLine[AdvSeconds - 1];
let AdvStart = 0;
for (let i = AdvSeconds - 1; i < TimeLine.length; i++) {
    if (max < TimeLine[i] - TimeLine[i - AdvSeconds]) {
        max = TimeLine[i] - TimeLine[i - AdvSeconds];
        AdvStart = i - AdvSeconds + 1;
    }
}
const LocalScale = (StartSeconds) => {
    let Seconds = StartSeconds % 60;
    let Minutes = Math.floor(StartSeconds / (60)) % 60;
    let Hours = Math.floor(StartSeconds / (60 ** 2));
    console.log(`${Hours.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}:${Seconds.toString().padStart(2, '0')}`);
};
LocalScale(AdvStart);