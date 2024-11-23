import { eq, lt, sql } from "drizzle-orm";
import { db } from "./database.js";
import { postsTable } from "./schemas.js";

type UpdateInterestArgs = {
  uri: string;
  type: "repost" | "like";
};
export async function updateInterest({ type, uri }: UpdateInterestArgs) {
  const increment = type === "like" ? 0.1 : 0.3;

  await db
    .update(postsTable)
    .set({
      interestScore: sql`${postsTable.interestScore} + ${increment}`,
    })
    .where(eq(postsTable.uri, uri));
}

type CreatePostArgs = {
  uri: string;
  interestScore: number;
};
export async function createPost({ interestScore, uri }: CreatePostArgs) {
  await db.insert(postsTable).values({
    interestScore,
    uri,
  });
}

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

export async function deleteAllPosts() {
  try {
    await db.delete(postsTable);
    console.log("All rows deleted from the posts table.");
  } catch (error) {
    console.error("Error deleting rows:", error);
  }
}
