// 어떤 코드든 테스트

const myData = {
    age: 11,
    name: "abcd"
}

console.log(myData)

myData.name = "cccc" // const 인데 값 대입?

console.log(myData) // cccc로 변환되서 잘 나옴 왜? - 리터럴 "abcd"가 아닌 string으로 추론했기 때문 age의 경우 11이 아닌 number로 추론 된다. 그래서 바꿀 수 있음.

// 기본 타입(bool, number, bigint, string, symbol)과 달리 객채를 const로 선언해도 더 좁은 타입으로 추론하지 않음.
// 타입 스크립트도 자바스크립트와 마찬가지로 객체를 만든 후 필드값을 바꿀 수 있다는 사실을 알기 때문