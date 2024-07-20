에러 핸들링 방법 (1)
try catch

try{
// 소스코드를 쓴다
// 이 안에서 에러가 발생하면

}catch(){
//catch가 에러를 잡아준다
}

> > catch는 자연스럽게 error를 매개변수로 가짐

let weight = 45

try{
if(weight<30){
throw new Error("당신은 너무 말랐엉")
//throw == 에러를 강제로 발생시키는 것
}
}catch(error){
console.log("내가 잡은 에러는", error.message)
}

에러 객체 Error
try 에서 에러가생기면 catch 블락에 error정보를 error객체안에 넣어서 매개변수로 전달해준다.
Error객체를 살펴보면 안에 name, message등 여러 이용가능한 속성값이 있지만 에러를 보기위해선 Error.message만 기억해도 좋다
