function solution(bandage, health, attacks) {
    var answer = 0;
    const [castingTime, Heal, bonusHeal] = bandage;
    let life = health;

    const calculateHeal = (time) => {
        const cycle = Math.floor(time/castingTime);
        const remain = time % castingTime;
        let answer = 0;
        answer += (castingTime * Heal + bonusHeal) * cycle;
        answer += remain * Heal;
        return answer;
    }
    let prev = 0;
    for(const [attackTime, damage] of attacks) {
        const tmp = calculateHeal(attackTime - prev - 1);
        life = life + tmp > health ? health : life + tmp;
        life -= damage;
        prev = attackTime
        if (life <= 0) return -1;
    }
    return life;
}