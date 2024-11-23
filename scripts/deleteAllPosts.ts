import { db } from "../src/database/index.js";
import { postsTable } from "../src/database/schemas.js";

try {
  // Deleting all rows in the "posts" table
  await db.delete(postsTable);
  console.log("All rows deleted from the posts table.");
} catch (error) {
  console.error("Error deleting rows:", error);
}
