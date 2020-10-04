import { QueuePaint, connection } from "@/lib/const";
import { QueueEvents } from "bullmq";

console.log("Watcher started.")

const paintEvents = new QueueEvents(QueuePaint, {connection});

paintEvents.on('progress', ({jobId, data}) => {
    console.log(`[Progress] ${jobId} is progress in ${data}% ...`);
});

paintEvents.on('completed', ({jobId}) => {
    console.log(`[Progress] ${jobId} is progress in 100%!`);
});
