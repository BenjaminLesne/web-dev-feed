import { Jetstream } from "@skyware/jetstream";
import { WANTED_COLLECTIONS } from "../lib/contants.js";
import { createPost, updateInterest } from "../database/queries.js";
import { standardAlgo } from "../algos/standard/standard.js";

export const jetstream = new Jetstream({
  wantedCollections: WANTED_COLLECTIONS,
});

jetstream.onCreate("app.bsky.feed.post", async (event) => {
  // console.dir(event, { depth: Infinity });
  // return;

  const record = event.commit.record;
  const did = event.did;
  const recordKey = event.commit.rkey;
  const uri = `at://${did}/app.bsky.feed.post/${recordKey}`;
  const temp_url = `https://bsky.app/profile/${did}/post/${recordKey}`;
  //did:plc:eppiv4du322umyddkvlnvgjp/app.bsky.feed.post/3lbmdyz3kss2e
  const interestScore = standardAlgo({ record });
  if (interestScore > 0) {
    console.log(
      "========================created a post!========================",
    );
    console.log(`New post: ${event.commit.record.text}`);
    console.log(temp_url);
    await createPost({ interestScore, uri });
  }
});

jetstream.onCreate("app.bsky.feed.like", async (event) => {
  const record = event.commit.record;
  await updateInterest({ type: "like", uri: record.subject.uri });
});

jetstream.onCreate("app.bsky.feed.repost", async (event) => {
  const record = event.commit.record;
  await updateInterest({ type: "repost", uri: record.subject.uri });
});
