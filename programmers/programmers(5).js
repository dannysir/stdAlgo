const arr = ["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"];
let sanArr = [];

function headerStr(sentence) {

    const parts = ['', '', ''];
    let a = sentence;
    [...a].forEach(word => {
        const isNumber = !isNaN(parseInt(word));
        if (!isNumber && !parts[1].length) {
            parts[0] += word;
        } else if (isNumber && !parts[2].length) {
            parts[1] += word;
        } else {
            parts[2] += word;
        }
    })
    return parts;
}

for (let i = 0; i < arr.length; i++) {
    sanArr.push(headerStr(arr[i]));
}

sanArr.sort((a, b) => {
    const stringA = a[0].toLowerCase();
    const stringB = b[0].toLowerCase();
    if (stringA > stringB){
        return 1;
    } else if(stringA < stringB){
        return -1;
    }else{
        const intA = a[1];
        const intB = b[1];
        return intA-intB;
    }
});
console.log(sanArr);
//32
//97~122
//65~90
