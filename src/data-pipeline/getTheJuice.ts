import { Jetstream } from "@skyware/jetstream";
import { WANTED_COLLECTIONS } from "../lib/contants.js";
import { updateInterest } from "../database/queries.js";

const jetstream = new Jetstream({
  wantedCollections: WANTED_COLLECTIONS,
});

jetstream.onCreate("app.bsky.feed.post", (event) => {
  console.log(`New post: ${event.commit.record.text}`);
});

jetstream.onCreate("app.bsky.feed.like", async (event) => {
  const record = event.commit.record;
  await updateInterest({ type: "like", uri: record.subject.uri });
});

jetstream.onCreate("app.bsky.feed.repost", async (event) => {
  const record = event.commit.record;
  await updateInterest({ type: "repost", uri: record.subject.uri });
});
