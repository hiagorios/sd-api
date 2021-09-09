import { JSUtil } from "../common/js-util";
const { Worker, isMainThread, workerData } = require('worker_threads');

const workers = []
if (isMainThread) {
    console.log("Iniciando o programa...")
    for (const id of JSUtil.range(0, 9)) {
        workers.push(new Worker('./build/worker/multi-thread-sem-lock.js', { workerData: id }))
    }
} else {
    job(workerData)
}

function job(id: number) {
    const time = JSUtil.randomIntInclusive(1, 6) * 1000
    setTimeout(_ => {
        console.log(`Hello from ${id}`)
    }, time)
}