import * as csv from "./csv"
import * as shell from "./shell"
import * as xlsx from "./xlsx"

// 이렇게 하면 3개가 동시에 실행됨. 당연함.
// csv.start()
// shell.start()
// xlsx.start()


// 이렇게 해도 각 작업을 기다리는것이 아님. 각 작업을 던져놓음. 만약 아래코드에서 쓰는 부분이 있다면 그 부분을 보장
// 작업 자체를 비동기로 여러개 던지니 빠름
doWork()
async function doWork() {
    shell.start()

    // csv.start()
    // await xlsx.start()

    // 데이터 확인 - 없음
    // let row = csvRow
    // console.log(`row:${row}`)
}

// // // 각단계의 resolve여부 판단.
// doWork2()
// async function doWork2() {
//     await Promise.all([shell.start(), csv.start(), xlsx.start()])

//     // 데이터 확인 - 없음
//     let row = csvRow
//     console.log(`row:${row}`)
// }