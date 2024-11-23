import express from "express";
import { env } from "./env.js";
import "./data-pipeline/getTheJuice.js";
import { jetstream } from "./data-pipeline/getTheJuice.js";
import { db } from "./database/index.js";
import { postsTable } from "./database/schemas.js";
import { desc } from "drizzle-orm";

const app = express();
const port = env.SERVER_PORT;

jetstream.start();

app.get("/.well-known/did.json", (req, res) => {
  res.json({
    "@context": ["https://www.w3.org/ns/did/v1"],
    id: env.PUBLISHER_DID,
    service: [
      {
        id: "#bsky_fg",
        serviceEndpoint: env.API_URL,
        type: "BskyFeedGenerator",
      },
    ],
  });
});

app.get("/xrpc/app.bsky.feed.describeFeedGenerator", (req, res) => {
  res.json({
    did: env.PUBLISHER_DID,
    feeds: [
      {
        uri: `at://${env.PUBLISHER_DID}/app.bsky.feed.generator/webDev`,
      },
    ],
  });
});

app.get("/xrpc/app.bsky.feed.getFeedSkeleton", async (req, res) => {
  const feed = await db
    .select({
      post: postsTable.uri,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.interestScore))
    .limit(10);

  res.json({
    feed,
  });
});

app.listen(port, () => {
  console.log(`Feed app listening on port ${port}`);
});
