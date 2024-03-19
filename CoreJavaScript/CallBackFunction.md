# 4 장 콜백 함수

# 📚 4 장 콜백 함수

!https://velog.velcdn.com/images/dannysir/post/cf7a00e7-4e84-4c61-a724-4e7687a340a8/image.png

## 🔎 주제

---

콜백 함수는 함수에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수를 의미한다. 이번 장에서는 이 콜백 함수에 대해 알아볼 것이다.

## 👨🏻‍💻학습 내용

---

콜백은 되돌아(back) 호출(call)해달라는 뜻으로 어떤 함수 X를 호출하면 특정 조건일 때 함수 Y를 싱행해서 나에게 알려달라는 요청을 함께 보내는 것이다. 이 요청을 받은 X의 입장에서는 해당 조건이 갖추어 졌는지 스스로 판단하고 직접 Y를 호출합니다.

그렇기 때문에 콜백 함수는 다른 코드에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수를 뜻합니다.

### 💡제어권

‘제어권을 갖는다’라는 말이 그냥 듣기만 하면 어색할 수 있는데 아래 코드를 통해 보면 이해가 쉽다.

```jsx
let count = 0;
let newFun = function () {
    console.log(count);
    if (++count > 4) clearInterval(timer);
};
let timer = setInterval(newFun, 1000);
//0
//1
//2
//3
//4
```

위의 코드에서 setInterval에게 newFun를 인자로 주면, 제어권도 함께 받아 setInterval이 판단하여 적절한 때에 이 함수를 실행시키게 된다.

### 💡this

```jsx
let obj = {
    numArr: [1, 2, 3],
    logNum: function (value, index) {
        console.log(this, value, index);
    }
};
[7, 8, 9].forEach(obj.logNum);
// window {...}, 7, 0
// window {...}, 8, 1
// window {...}, 9, 2
```

이전에 우리가 this를 이야기 했을 때를 생각해보면, this는 메서드로서 호출 즉 앞에 .(점)이 붙어서 호출이 되면 그 앞에 있는 대상을 가리킨다고 이야기 했다.

그런데 위의 코드를 보면 obj를 가리키는 것이 아니라 전역객체를 가리키고 있는 것을 볼 수 있다.

그 이유는 바로 콜백 함수도 함수이고, 저기서 보이는 obj.logNum는 메서드로서 호출 된 것이 아니고 콜백 함수로서 호출이 된 것이기 때문에 obj와 연관이 없어진다. 따라서 별도로 this를 지정하지 않았기 때문에 콜백 함수 내부에서 this는 전역객체를 가리키게 된다.

### 💡 콜백 함수 내부 this를 바인딩하는 법

this 직접 다른 값으로 바인딩하고 싶을 때 쓰는 방법으로는 몇가지가 있다.

- 변수를 이용.
- bind 메서드 이용

***변수 이용***

```jsx
let obj = {
    name: 'obj1',
    objFun: function () {
        let self = this;
        return function () {
            console.log(self);
        };
    }
};
let callback = obj.objFun();
setInterval(callback,1000);
```

위의 방법은 이전의 this 우회 방법으로 소개했던 방법과 유사하다.

메서드로서 호출하여 반환된 함수를 callback에 저장하여 콜백 함수로 이용하는 방법이다.

***bind메서드 이용***

```jsx
let obj = {
    name: 'obj1',
    objFun: function () {
            console.log(this);
    }
};
setTimeout(obj.objFun.bind(obj), 1000);
```

### 💡 콜백 지옥과 비동기 제어

> 동기적 코드 : 즉시 처리가 가능한 대부분의 코드
>

> 비동기적 코드 : 별도의 요청, 실행 대기, 보류 등과 관련된 코드
>

콜백 지옥은 콜백 함수를 익명으로 전달하는 과정에서 들여쓰기가 감당하기 힘든 수준으로 깊어지는 현상으로 웹 복잡도가 높아지며 흔히 발생하는 문제이다.

***콜백 지옥 예시***

```jsx
setTimeout(function (name) {
    let coffeeList = name;
    console.log(coffeeList);

    setTimeout(function (name) {
        coffeeList += `, ${name}`;
        console.log(coffeeList);

        setTimeout(function (name) {
            coffeeList += `, ${name}`;
            console.log(coffeeList);
            
        }, 500, '카페모카');
        
    }, 500, '아메리카노');
    
}, 500, '에스프레소');
```

이런 문제들을 해결하고, 비동기적인 코드를 동기적으로 표현하기 위해 JavaScript에서는 몇가지 방법들이 있다.

- Promise
- Generator
- async / await

***Promise문 예시 (1)***

```jsx
new Promise(function (resolve) {
    setTimeout(function () {
        let name = '에스프레소';
        console.log(name);
        resolve(name);
    }, 500);
}).then(function (prev) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            let name = `${prev}, 아메리카노`;
            console.log(name);
            resolve(name);
        }, 500);
    });
}).then(function (prev) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            let name = `${prev}, 카페모카`;
            console.log(name);
            resolve(name);
        }, 500);
    });
})
```

***Promise문 예시 (2)***

```jsx
let addCoffee = function (name) {
    return function (prev) {
        return  new Promise(function (resolve) {
            setTimeout(function () {
                let newName = prev ? `${prev}, ${name}` : name;
                console.log(newName);
                resolve(newName);
            }, 500);
        });
    };
}

addCoffee('에스프레소')()
    .then(addCoffee('아메리카노'))
    .then(addCoffee('카페모카'));
```

***Generator 예시***

```jsx
let addCoffee = function (prev, name) {
    setTimeout(function () {
        coffeeMaker.next(prev ? `${prev}, ${name}` : name);
    }, 500);
}

let coffeeGenerator = function* () {
    let espresso = yield addCoffee('', '에스프레소');
    console.log(espresso);
    let americano = yield addCoffee(espresso, '아메리카노');
    console.log(americano);
    let moca = yield addCoffee(americano, '카페모카');
    console.log(moca);
};
let coffeeMaker = coffeeGenerator();
coffeeMaker.next();
```

Generator는 함수 이름 뒤에 *이 붙은 함수 인다. Generator 함수가 실행되면 Iterator가 반환되어 next 메서드를 활용할 수 있게 된다.

> 참고 : .next() 의 인자로 들어간 값은 ‘value = yield 식’ 에서 value 값에 들어가게 된다.
>

간략하게 순서를 따라가면 아래 과정 반복이다.

- next() 처음 시작하여 첫번째 yield에서 멈춘다.
- 그 후 prev ? `${prev}, ${name}` : name 식을 통과하여 espresso에 문자열이 저장 된다.

***async / await 예시***

```jsx
let addCoffee = function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(name);
        }, 500);
    });
}

let coffeeMaker = async function () {
    let coffeeList = '';
    let ADD = async function (name) {
        coffeeList += (coffeeList ? ", " : '') + await addCoffee(name);
    };

    await ADD('에스프레소');
    console.log(coffeeList);
    await ADD('아메리카노');
    console.log(coffeeList);
    await ADD('카페모카');
    console.log(coffeeList);

};
coffeeMaker();
```

### 💡 정리

- 콜백 함수는 제어권을 가진다.
- 콜백 함수의 this가 무엇을 바라보게 할지 정할 수 있다.
- 콜백 지옥이 생길 수 있다.
- 콜백 지옥은 Promise, Generator, async / await를 이용해 해결 할 수 있다.

## 🧐후기

---

Promise문과 Generator문에 대해 공부하게 되었다. 특히 Generator는 개발에서 사용해본 적이 없어서 이해하는데 시간이 좀 걸렸다. 그 외의 Promise문과 async / await 문의 경우 그 동안 별 생각 없이 사용해 왔었는데 document도 읽어보고 resolve에 대해서도 찾아보는 시간을 가질 수 있었다.