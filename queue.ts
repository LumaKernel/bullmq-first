import { Queue } from 'bullmq';
import { connection, QueuePaint, QueuePaintData } from '@/lib/const.ts'
import { wait } from './lib/utils';

const queuePaint = new Queue<QueuePaintData>(QueuePaint, { connection });
console.log("Queue started.");

const makePriority = () => {
    return Math.floor(Math.random() * 10);
};

async function addJobs(){
    while(true) {
        const count = await queuePaint.count();
        console.log({count});
        await wait(3 * 1000);
        if (count < 100) {
            await queuePaint.add('Paint', { color: 'green' }, { priority: makePriority(), attempts: 100 });
            await queuePaint.add('Paint', { color: 'blue' }, { priority: makePriority(), attempts: 100 });
        }
    }
}

(async() => {
    await addJobs();
})();
