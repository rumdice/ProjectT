// 어떤 코드든 테스트

// const myData = {
//     age: 11,
//     name: "abcd"
// }

// console.log(myData)
// myData.name = "cccc" // const 인데 값 대입?
// console.log(myData) // cccc로 변환되서 잘 나옴 왜? - 리터럴 "abcd"가 아닌 string으로 추론했기 때문 age의 경우 11이 아닌 number로 추론 된다. 그래서 바꿀 수 있음.

// 기본 타입(bool, number, bigint, string, symbol)과 달리 객채를 const로 선언해도 더 좁은 타입으로 추론하지 않음.
// 타입 스크립트도 자바스크립트와 마찬가지로 객체를 만든 후 필드값을 바꿀 수 있다는 사실을 알기 때문

import * as a from 'async'


const doWork = async () => {
    // 작업 3개가 동시에 시작됨 (시작 순서는 보장)
    // await func1()
    // dawait func2()
    // await func3()


    // 위에랑 같음
    // await Promise.all([func1(), func2(), func3()])

    // 같음
    // await func1().then(func2)

    // 작업 함수에서 리턴하는 경우
    // const r1 = await func1()
    // const r2 = await func2()
    // console.log(r1)
    // console.log(r2)


    // 하고자 하는 것 func1함수가 완료되면 func2,3 실행
    a.eachSeries([func1, func2, func3], async (err, result) => { console.log(err, result) })
}

async function func1(cb: any) {
    console.log("func1 start")
    setTimeout(() => outlog("func1"), 3000)
    cb(null, "1")
}

async function func2(cb: any) {
    console.log("func2 start")
    setTimeout(() => outlog("func2"), 2000)
    cb(null, "2")
}

async function func3(cb: any) {
    console.log("func3 start")
    setTimeout(() => outlog("func3"), 1000)
    cb(null, "2")
}

function outlog(logstr: string) {
    console.log(`${logstr} done`)
}


doWork()



// const { eachSeries } = require('async')

// eachSeries( 
//   [1,2,3], 
//   async (item: any) => {
//     console.log( 'item:', item )
//     console.log()
//     Promise.resolve() // <-- instead of callback
//   }, 
//   (  err: any) => {
//     console.log('err:', err)
//   }
// )

// eachSeries()