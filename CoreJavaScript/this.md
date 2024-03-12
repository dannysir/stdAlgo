# 📚 3 장 This

![](https://velog.velcdn.com/images/dannysir/post/e7a10eb2-8d37-46da-87ae-e3d0645c355b/image.png)


## 🔎 주제

---

JavaScript에서 this는 매우 혼란스러운 개념 중에 하나이다. 이번 장에서는 this의 정확한 작동 방식과 상황에 따라 this가 어떻게 달리지는지, 예상과 다른 대상을 바라보고 있다면 왜 그런지 알아보자.

## 👨🏻‍💻학습 내용

---

우리가 이전에 실행 컨텍스트를 공부하며 알 수 있었듯, this는 기본적으로 실행 컨텍스트가 생성 될 때 함께 ThisBinding이 생성되며, 결정된다. 즉 바꿔 말하면 this는 함수가 호출 될 때 결정된다는 것이다.

JavaScript의 전역 공간에서 this는 전역 객체를 가리킨다. 그 이유를 위의 문장과 연관시켜서 설명하자면, 전역 컨텍스트를 생성하는 것이 바로 전역 객체이기 때문이다.

그럼 여기서 이제 우리가 생각해야 할 것은 함수 호출 방법 2가지이다.

- 메서드로서 호출.
- 함수로서 호출.

### 💡**함수로서 호출, 메서드로서 호출**

```jsx
let fun1 = function () {
    console.log(this);
}

let obj = {
    fun2: fun1
};

fun1();// 브라우저에서 실행하면 Window, Node에서 실행하면 global
obj.fun2(); // obj
```

위의 예시를 보면 두 함수 호출 방법에 따라 this가 가리키는 것이 다른 것을 알 수 있다.

이를 정리하면 다음과 같다.

- 메서드로서 호출 : 메서드 이름 앞의 .(점) 앞의 객체를 가리킨다.
- 함수로서 호출 : 전역 객체를 가리킨다.

이 이유는 바로 실행 컨텍스트의 ThisBinding이 생성될 때, 만약 this가 지정되지 않은 경우 this는 전역 객첼르 바라보게 설계가 되어있기 때문이다. 따라서 함수에서의 this는 전역 객체를 가리키고,

JavaScript 개발에 참여한 ‘더글라스 크락포드’는 이를 명백한 설계상의 오류라고 지적했다.

```jsx
let obj1 = {
    outer: function () {
        console.log(this); // (1) obj1
        let innerFun1 = function () {
            console.log(this); // (2) window
        };

        innerFun1();

        let obj2 = {
            method: innerFun1
        };

        obj2.method(); // (3) obj2
    }
}
obj1.outer();
```

위의 코드를 보면 왜 ‘더글라스 크락포드’가 오류라고 했는지 알 수 있다.

우선 우리는 this가 주는 단어적 느낌 그대로 위의 코드를 바라보면, (2)에서는 innerFun1의 위치인 outer나 obj1이 나와야 할 것 같지만, (2)은 전역 객체인 window를 가리키고 있다.

따라서 우리는 this라는 것을 어디서 호출 했는지보다 어떻게 호출을 했는지, 메서드로 호출을 했는지 함수로 호출을 했는지를 더 잘 파악해야 한다.

### 💡 this 우회 방법.

이제 우리는 this를 명확하게 알 수 있지만, this가 주는 단어 자체의 인상과는 조금 달라졌다. 따라서 this를 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변의 환경을 this로 담기 위해서는 조금 다른 방법을 써야하는데 그 방법은 크게 2가지가 있다.

- 변수를 이용.
- 화살표 함수 사용.

***변수 이용***

```jsx
let obj1 = {
    outer: function () {
        console.log(this); // (1) obj1
        let innerFun1 = function () {
            console.log(this); // (2) window
        };

        innerFun1();
				let self = this;
        let obj2 = function(){
						console.log(self); // (3) obj1
				}

				obj2();
    }
}
obj1.outer();
```

위의 방법은 아주 간단하게 현재 위치를 self라는 변수에 저장하는 방식으로 우회하는 방법이다.

***화살표 함수 이용***

```jsx
let obj1 = {
    outer: function () {
        console.log(this); // (1) obj1
        const fun1 = () => {
            console.log(this); // (2) obj1
        };
        fun1();
    }
}
obj1.outer();
```

> 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어서 스코프에서 가장 가까운 this를 찾아서 가게 된다.
>

> 추가로 생성자 함수 내부에 있는 this의 경우 우선 생성자 prototype을 참조하는 __proto__(던더 프로토)가 있는 객체를 만들고 미리 준비한 속성을 this에 부여하여, 구체적인 인스턴스(객체)가 만들어진다.
>

### 💡 명시적으로 this를 바인딩하는 방법

명시적으로 직접 this를 바인딩하는 방법으로 call 메서드나 bind 메서드를 이용하는 방법이 있고 아래 코드는 call / aply 메서드를 이용한 방법의 예시이다.

```jsx
let obj1 = {
    1: 'a',
    2: 'b',
    3: 'c',
    length: 3
}
Array.prototype.push.call(obj1, 'd');
console.log(obj1); // { '1': 'a', '2': 'b', '3': 'd', length: 4 }
```

### 💡 정리

- 전역 공간에서의 this는 전역 객체(window, global)를 가리킨다.
- 어떤 함수를 메서드로서 호출한 경우 this는 .(점) 앞에 쓰여진 객체를 기리킨다.
- 어디서 함수가 호출되던지 함수로서 호출할 경우 전역 객체(window, global)를 가리킨다.
- 생성자 함수에서 this는 생성된 객체를 가리킨다.
- call / aply 메서드를 이용해 명시적으로 this를 지정 가능하다.

## 🧐후기

---

JavaScript에서의 모호한 this 개념에 대해 실행 컨텍스트의 ThisBinding과 연결지어 생각을 하니 더욱 쉽게 이해 할 수 있었다.