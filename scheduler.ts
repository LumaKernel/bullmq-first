import { connection, QueuePaint } from "@/lib/const";
import { QueueScheduler } from "bullmq";

const scheduler = new QueueScheduler(QueuePaint, {connection});
