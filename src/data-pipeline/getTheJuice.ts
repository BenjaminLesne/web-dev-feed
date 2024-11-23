import { Jetstream } from "@skyware/jetstream";
import { WANTED_COLLECTIONS } from "../lib/contants.js";

const jetstream = new Jetstream({
  wantedCollections: WANTED_COLLECTIONS,
});

jetstream.onCreate("app.bsky.feed.post", (event) => {
  console.log(`New post: ${event.commit.record.text}`);
});

jetstream.onCreate("app.bsky.feed.like", (event) => {
  console.log(`New post: ${event.commit.record.subject.uri}`);
  // db call, if record exist update interestScore
});

jetstream.onCreate("app.bsky.feed.repost", (event) => {
  console.log(`New post: ${event.commit.record.subject.uri}`);
  // db call, if record exist update interestScore
});
