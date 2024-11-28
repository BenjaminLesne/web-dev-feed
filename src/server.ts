import express from "express";
import { env } from "./env.js";
import "./data-pipeline/getTheJuice.js";
import { jetstream } from "./data-pipeline/getTheJuice.js";
import { db } from "./database/database.js";
import { postsTable } from "./database/schemas.js";
import { desc } from "drizzle-orm";
import { garbageCollectExpiredPostsJob } from "./cron/jobs.js";
import { FEED, FEED_GENERATOR } from "./lib/contants.js";

const app = express();
const port = env.SERVER_PORT;

jetstream.start();
garbageCollectExpiredPostsJob.start();

app.get("/health", (req, res) => {
  res.send("Hello world");
});
// https://boc48gookcswcoo884o0owck.167.114.2.165.sslip.io/.well-known/did.json
app.get("/.well-known/did.json", (req, res) => {
  res.json({
    "@context": ["https://www.w3.org/ns/did/v1"],
    id: FEED_GENERATOR.did,
    service: [
      {
        id: "#bsky_fg",
        serviceEndpoint: env.API_URL,
        type: "BskyFeedGenerator",
      },
    ],
  });
});

// app.get("/.well-known/atproto-did", (req, res) => {
//   res.send({
//     "@context": ["https://www.w3.org/ns/did/v1"],
//     id: FEED_GENERATOR.did,
//     service: [
//       {
//         id: FEED.rkey,
//         serviceEndpoint: env.API_URL,
//         type: "BskyFeedGenerator",
//       },
//     ],
//   });
// });

// atproto-did

app.get("/xrpc/app.bsky.feed.describeFeedGenerator", (req, res) => {
  res.json({
    did: FEED_GENERATOR.did,
    feeds: [
      {
        uri: `at://${FEED_GENERATOR.did}/app.bsky.feed.generator/${FEED.rkey}`,
        // uri: `at://${env.PUBLISHER_DID}/app.bsky.feed.generator/${FEED.rkey}`,
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
