import { eq, sql } from "drizzle-orm";
import { db } from "./index.js";
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
