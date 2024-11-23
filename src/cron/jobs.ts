import { CronJob } from "cron";
import { deleteLast48hoursPosts } from "../../scripts/deleteLast48hours.js";

export const garbageCollectExpiredPostsJob = new CronJob(
  "0 0 */2 * *", // cronTime
  deleteLast48hoursPosts, // onTick
);
