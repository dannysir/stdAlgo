# 📚 2장 실행 컨텍스트

![](https://velog.velcdn.com/images/dannysir/post/2fa03f86-dbb8-4b8c-b02c-382dfc83fe63/image.png)



## 🔎 주제

---

이번 장에서는 실행 컨텍스트가 무엇인지, 실행 컨텍스트의 구조와 그로 인에 발생하는 호이스팅 문제와 스코프에 대해서 알아볼 것이다.

## 👨🏻‍💻학습 내용

---

우선 실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다.

실행 컨텍스트는 스택 구조로 쌓이게 되며, 함수를 실행할 때 실행 컨텍스트를 구성하게 된다.

아래 코드를 예시로 들어보면

```jsx
var a = 1;
function outer(){
	function inner(){
		var a = 3;
	}
	inner();
}
outer();
```

![](https://velog.velcdn.com/images/dannysir/post/1a505df5-0f19-4bce-9881-0ec6e79aa7a1/image.webp)


위의 그림과 같이 스택이 쌓였다가 함수가 종료됨에 따라 하나씩 스택에서 제거되고 마지막에는 스택에 아무것도 남지 않은 상태로 종료된다.

실행 컨텍스트는 자바스크립트 엔진이 활용할 목적으로 생성하는데 개발자가 코드를 통해 확인할 수는 없다고 한다. 그리고 실행 컨텍스트에 담기는 정보는 다음과 같다.

- VariableEnvironment : 현재 컨텍스트 내의 식별자 정보, 외부 환전 정보. ( 선언 시점의 시간에서의 값, 변경 사항 반영 X )
- LexicalEnvironment : 처음에는 VariableEnvironment와 같지만 실시간으로 반영 된다.
- ThisBinding : this 식별자가 봐야할 대상.

### 💡 LexicalEnvironment

VariableEnvironment와 LexicalEnvironment 내부는

- environmentRecord
- outer - EnvironmentReference

로 구성되어 있다.

***environmentRecord***

environmentRecord에는 형재 컨텍스트와 관련된 코드의 식별자 정보가 저장된다.

여기에는 함수를 선언 했다면, 그 함수와 var로 선언한 변수가 이에 해당된다.

JavaScript는 이렇게 코드가 실행되기 전에 해당 코드에 대한 변수명들을 모두 이미 알고 코드를 실행하게 된다. 여기서 Hoisting이 등장하게 된다.

예를 들어

```jsx
function test(x){
    console.log(x); // 1
    var x = 2;
    console.log(x); // 2
    var x = 3;
    console.log(x); // 3
		
		function inner(){}
}

test(1);
```

위와 같은 함수가 있을 때, 호이스팅을 완료하면

아래와 같이 자바스크립트는 함수를 실행시킬 것이다.

```jsx
//호이스팅 완료 후
function test(){
		//변수 선언부만 끌고 옴.
		var x;
		var x;
		var x;
		function inner(){} // 함수는 전체를 끌고 온다.

		x = 1;
    console.log(x); // 1
    x = 2;
    console.log(x); // 2
    x = 3;
    console.log(x); // 3
}

test(1);
```

> function 을 이용해 함수 선언문을 이용해 선언할 경우 위의 예시처럼 함수 전체를 끌고 오지만, 함수 표현식을 이용해 함수를 생성할 경우, 일반 변수처럼 선언만 끌고 온다.
>

***스코프 (***outer-EnvironmentReference)

스코프는 식별자에 대한 유효 범위이다.

함수 외부에서 선언한 변수 A는 함수 내부에서도 접근이 가능하지만, 함수 내부에서 선언한 변수 B는 함수 내부에서만 접근이 가능하다는 이야기이다.

자바스크립트는 변수를 찾을 때 내 현재 위치에서 바깥쪽으로 차례로 검색해나가는데 이것을 바로 스코프 체인이라고 하며, 바로 여기서 사용되는 것이 아까 말한 outer - EnvironmentReference이다.

아래 코드를 예시로 설명해보면.

```jsx
var a = 1;
var outer = function () {
	var inner = function () {
		console.log(a);
		var a = 3;
	};
	inner();
	console.log(a);
};
outer();
console.log(a);
```

inner() 컨텍스트의 LexicalEnvironment 에 outer-EnvironmentReference는

outer() 컨텍스트의 LexicalEnvironment 를 참조한다.

그리고 outer()의 outer-EnvironmentReference는

전역 컨텍스트의 LexicalEnvironment 를 참조한다.

## 🧐후기

---

JavaScript 의 호이스팅이 실행 컨텍스트의 Environment Record 때문에 발생한다는 사실을 알게 되었고, 호이스팅에 대해 한번 더 깊게 생각해 볼 수 있었다.

그리고 outer-EnvironmentReference 를 공부하며, 식별자를 유효한 범위부터 바깥으로 순서대로 검색해 나가는 것을 그냥 원래 그런거라고 알고 있었는데, 근본적인 구조를 통해 이해할 수 있었다.