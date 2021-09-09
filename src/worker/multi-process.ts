import cluster from 'cluster';
import process from 'process';
import { JSUtil } from "../common/js-util";

const workers = []
if (cluster.isPrimary) {
    console.log("Iniciando o programa...")
    for (const id of JSUtil.range(0, 9)) {
        const worker = cluster.fork({ id })
        workers.push(worker);
    }
} else {
    job(Number(process.env.id))
}

function job(id: number) {
    const time = JSUtil.randomIntInclusive(1, 6) * 1000
    setTimeout(_ => {
        console.log(`Hello from ${id}`)
    }, time)
}