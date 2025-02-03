import { gte } from "drizzle-orm";
import { db } from "./database.js";
import { postsTable } from "./schemas.js";

export const deleteOldPosts = async () => {
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  await db
    .delete(postsTable)
    .where(gte(postsTable.createdAt, fortyEightHoursAgo));
};
