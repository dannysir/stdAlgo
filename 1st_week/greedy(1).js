function solution(people, limit) {
    people.sort((a, b) => a - b);
    let answer = 0;
    let min = 0;
    let max = people.length - 1;
    while (min <= max){
        if(people[min] + people[max] > limit){
            max--;
            answer++;
        }else if(people[min] + people[max] <= limit){
            min++;
            max--;
            answer++;
        }
    }

    return answer
}