자바 스크립트 기본 동작 원리
console.log(1);
console.log(2);
console.log(3);

1
2
3

위에서부터 아래로 차례로 코드 실행
: 동기적 프로그래밍
하나하나 순서대로 실행하는 것

javascript Engine

- Memory Heap
  : 내가 저장하고 싶은 변수들의 값이나 기타 값들을 두서없이 저장해 놓은 메모리 공간
  낙서장이라 생각하면 됨

- Call Stack
  : 실행을 하는 것
  "Stack" 자료형 중 하나 (자료구조)
  > LIFO last in first out 구조
  > 실행이 되면서 콜 스택에서 바로 빠져나가기 때문에 console.log(1)은 하나씩 들어와서 실행되며 나가게 됨

console.log(1);
function test(){
console.log(2);
console.log(3);
}
test();

1
2
3

> > 첫 번째 console.log(1)이 call stack에 들어가고 실행되면서 빠져나감
> > 실제 함수가 실행되는 부분 test()가 call stack으로!!!
> > console.log(2)는 바로 프린트할 수 있기 때문에 차례대로 하나씩 빠져나가게 됨
> > 그러다가 함수 안에 남아있는 게 없기 때문에 test()도 콜 스택에서 빠져나오게 됨

console.log(1);
setTimeout(()=> console.log(2),5000);
//setTimeout == delay
//실행하고 싶은 코드 넣고, 몇 초 뒤에 실행하고 싶은지 초 정보를 넣으면 됨. 단위: ms / 1초 == 1000ms
console.log(3);

1
3
2

이게 call stack에 들어가게 되면

1. console.log(1) 스택에 들어오자마자 실행되면서 빠져나옴
   > > 1 출력
2. setTimeout(()=> console.log(2),5000); 코드 스택에 들어오고 5초 기다림
3. console.log(3); 스택에 들어오자마자 실행되면서 빠져나옴
4. 이후!!! 2번 코드 실행
   > > 비동기적인 프로그래밍 (순차적이지 못함)

쓰레드 : 작업을 실행시켜 주는 애 (알바생)
알바생 1명 == 싱글 쓰레드

자바스크립트에는 call stack이 하나밖에 없어서 작업이 오래 걸리는 게 오면 뒤에 있는 애들도 전부 밀림!!!

> > 작업이 느림

그래서 자바스크립트가 브라우저를 부름!!!!
보통 우리가 쓰는 자바스크립트는 웹브라우저에서 돌아감
:: 웹브라우저에서 쓰레드를 제공해 줌

브라우저 쓰레드에서 지원하는 것들
Ajax, fetch (api 호출하거나 네트워크 통신같이 시간이 오래 걸리는 것들 도와줌)
setTimeout (기다리는 것)
eventhandler(버튼 클릭하는 이벤트들)

1. console.log(1) 들어오고 출력
2. Timeout 코드 call stack에 들어갔다가 브라우저에 있는 쓰레드에 넘기게 됨. 브라우저 쓰레드에서 이 코드가 5초 기다리고 있는 것!!!
3. 그동안에 자바스크립트 쓰레드에서는 console.log(3);을 실행하는 것
4. 5초 기다리고 난 이후 브라우저 쓰레드에서 setTimeout(()=> console.log(2),5000); 코드가 console.log(2);가 됨
5. console.log(2)가 task queue로 감!! (브라우저에서 제공하는 쓰레드) queue : FIFO first in first out 구조
6. Task Queue의 역할: 브라우저에서 처리했던 결과를 큐에 쌓아놓고 자바스크립트 call stack이 일을 하고 있다면 코드를 넘기지 않음
   > > call stack이 작업을 완료해 비어있을 때 task queue에 쌓아 뒀떤 결과값을 자바스크립트 call stack에 보냄

결론
:: 브라우저도 쓰레드를 가지고 있고 여기서 시간이 걸리는 작업을 처리해 줌 >> Web Api
:: 브라우저에서 작업이 끝나도 call stack이 비어있을 때까지 task queue에서 가지고 있는 것
--> 요걸 Event Loop이 해 줌

pending : 기다려 달라는 의미!!

> > 아직 데이터가 안 왔다는 의미

1. url 세팅 call stack (1) :: 변수 세팅하는 거라 실행되고 완료
2. Fetch(url) call stack (2) :: 시간이 걸리는 것!! 네트워크 통신하는 것. 상대 네트워크에 따라 바로 받을 수 있는 게 아니기 때문에 브라우저로 넘김
3. 여기서 받은 Data 보여 줌 call stack (3) :: fetch가 끝나서 url이 오지 않았기 때문에 실행이 안 됨
   > > task queue를 통해 fetch의 값이 와야 데이터를 보여 줄 수 있음!!!

:: 그렇기 때문에 가끔씩은 시간이 걸린다고 전부 브라우저로 넘기는 게 아니라!!! 기다려 줘야 할 때도 있음

> > 요걸 async (비동기처리) / await (기다려 줭) 로 처리할 수 있음

call stack

1. getNews() 함수
2. let url = 'asdf.com' >> 바로 실행됨
3. const response = await fetch(url);
   : fetch(url) 떼서 브라우저에 보냄!!
   await 전체 함수를 일시 정지
   > > 그래서 getNews() 함수가 Task Queue에 들어가게 되고 함수 안에 있는 console.log(response) 코드 또한 실행을 안 하게 됨
4. 함수가 없기 때문에 for() 들어와서 바로 실행됨
5. 그다음 call stack 비었기 때문에 다시 getNews() 시작할 수 있음!! await 했던 부분부터 다시 시작
6. getNews() 다시 시작되면서 fetch()가 데이터를 받아서 response 출력할 수 있게 됨

::자바스크립트는 동기적인 언어다. (순차적)
그러나 몇 개의 코드에는 시간이 걸린다
이걸 처리해 주는 것이 쓰레드!! web api에서 처리해 줌

> > 그런데 시간이 걸리는 작업이 처리돼야 아래의 코드가 실행될 수 있는 경우 강제적으로 async나 await이란 코드를 통해서 강제로 기다려 줄 수 있음

async()를 통해서 비동기 형식을 만들 수 있음
await()을 통해서 잠시 기다려 줄 수 있다
: 비동기 함수 내에서 쓸 수 있기 때문에 함수 코드 위에 비동기 함수라는 표현을 해 줘야 함
그래야~!!! await을 쓸 수 있음

Promsie는 이렇게 생겼다

function delayP(sec){
return new Promise((resolve, reject) => {  
 setTimeout(() => {  
 resolve("success");  
 }, sec \* 1000);  
 });
}
new Promise를 이용해서 promise를 생성하고
promise 안에서는 resolve와 reject함수를 자동으로 갖는다.
reslove는 결과가 문제없이 성공적으로 수행될때 호출하는 함수, reject는 중간에 에러가나면 에러를 처리할 수 있는 함수이다.
resolve가 호출이되면 죽음의 콜백대신 .then()이나 async/await을 이용하여(둘다 하는 일이 비슷하다.) 그 결과값을 받아서 다른 일을 할수있다(결과를 보여준다던가 그런것들)

async/await🚦
async와 await은 동기적인 자바스크립트를 비동기적으로 처리하기위해쓴다. fetch는 promise를 리턴을한다. 그리고 우리가 필요한건 그 promise 속에서 api호출이 잘 이루어져 데이터를 받은다음 promise가 성공적으로 resolve 함수를 호출하기를 기다리는것이다. 이걸 해주는게 await이다. await은 promise가 resolve또는 reject를 호출할때 까지 기다려준다.
await이 없으면 그냥 날것 그대로의 promise가 리턴된다(우리가 영상에서 본것처럼)
await을 쓰려면 함수를 async로 선언해줘야한다, 둘은 세트라고 보면된다.
그것외에도 async로 함수를 선언하면 그함수는 자동으로 promise를 반환한다(그말의 뜻은 또 이함수를 받아다가 다른 비동기 작업이 가능하다는 뜻이다)

json
서버 클라이언트 통신에서 많이 쓰이는 데이터 타입 (png, jpg이런것과 같이 어떤 그냥 데이터 타입임). 객체랑 똑같이생긴 텍스트라고 이해하면 좋음. 간단한 텍스트인데 객체랑 똑같애서 나중에 읽어오기도 편함. 그래서 json타입을 서버통신시 많이 사용함.
fetch를 쓸때 항상 이 패턴

let response = await fetch(url)
let daa = await response.json()
은 세트로 많이쓰이니 외워두면 좋음

API호출하고 싶을 때

const callAPI = async() =>{
let url = new URL(`url주소`)
let header = new Headers({헤더내용}) // 이건 필요한 경우만
let response = await fetch(url,{headers:header})
let data = await response.json()
}
