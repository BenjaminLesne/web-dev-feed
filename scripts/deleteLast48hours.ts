import { lt } from "drizzle-orm";
import { db } from "../src/database/index.js";
import { postsTable } from "../src/database/schemas.js";

export async function deleteLast48hoursPosts() {
  const today = new Date();
  const twoDaysAgo = new Date(today.setDate(today.getDate() - 2));

  try {
    await db.delete(postsTable).where(lt(postsTable.createdAt, twoDaysAgo));
    console.log("All posts older than 48 hours have been deleted");
  } catch (error) {
    console.error("Error deleting rows:", error);
  }
}
