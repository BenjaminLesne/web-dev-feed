import { Jetstream } from "@skyware/jetstream";
import { WANTED_COLLECTIONS } from "../lib/contants.js";

const jetstream = new Jetstream({
  wantedCollections: WANTED_COLLECTIONS, // omit to receive all collections
  // wantedDids: ["did:web:example.com"], // omit to receive events from all dids
});

jetstream.onCreate("app.bsky.feed.post", (event) => {
  console.log(`New post: ${event.commit.record.text}`);
});

// jetstream.onCreate("app.bsky.feed.like")
