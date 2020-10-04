import { RedisOptions } from "bullmq";

export const connection: RedisOptions = {
  host: "redis",
  port: 6379,
};

export const QueuePaint = "Paint";
export type QueuePaintData = {
  color: string;
};
