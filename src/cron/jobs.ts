import { CronJob } from "cron";
import { deleteLast48hoursPosts } from "../database/queries.js";

export const garbageCollectExpiredPostsJob = new CronJob(
  "0 0 */2 * *",
  deleteLast48hoursPosts,
);
