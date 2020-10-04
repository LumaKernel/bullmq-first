import { Job, QueueScheduler, Worker } from "bullmq";
import { QueuePaintData, connection, QueuePaint } from "@/lib/const";
import { wait } from "@/lib/utils";

console.log("Worker started.");

const paint = async (job: Job<QueuePaintData>, isPowerful: boolean) => {
  const {color} = job.data;
  console.log(`Starting...`);
  console.log({jobId: job.id, jobPriority: job.opts.priority, isPowerful});
  await wait(2000);
  job.updateProgress(20);
  if (Math.random() < 0.2) {
    console.error("Oops! Something wrong! Throwing...");
    await wait(500);
    throw new Error("OUT OF INK.");
  }
  console.log(`Painting ${color}...`)
  if(color === "blue") {
    console.log("This may take longer time...")
    await wait(10000);
    job.updateProgress(95);
  } else {
    await wait(500);
    job.updateProgress(40);
    await wait(500);
    job.updateProgress(60);
    await wait(500);
    job.updateProgress(80);
    await wait(500);
    job.updateProgress(95);
  }
  console.log(`Finish painting ${color}!`)
};

const workerCount = 1;

Array.apply(null, {length: workerCount} as any).map((_, i) => {
  const worker = new Worker(QueuePaint, async job => paint(job, false), {
    connection,
    concurrency: 3,
    limiter: {
      max: workerCount,
      duration: 1000,
    }
  });
  return worker;
});

// const powerfulWorker = new Worker(QueuePaint, async job => paint(job, true), {
//   connection,
//   limiter: {
//     max: 3,
//     duration: 1000,
//   }
// });
