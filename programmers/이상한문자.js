function solution(s) {
    var answer = [];
    const MakeNewWord = (input) =>{
        let NewWord = '';
        for (let i = 0; i < input.length; i++){
            if (i % 2 === 0){
                NewWord += input[i].toUpperCase();
            }else{
                NewWord += input[i].toLowerCase();
            }
        }
        return NewWord;
    };
    const StringArr = s.split(' ');
    for (const word of StringArr){
        answer.push(MakeNewWord(word));
    }

    return answer.join(' ');
}