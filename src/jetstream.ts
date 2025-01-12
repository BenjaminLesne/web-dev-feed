import { db } from './database/database.js'
import { postsTable } from './database/schemas.js';
import type { CommitCreate } from "@skyware/jetstream";
import { Jetstream } from "@skyware/jetstream";
import WebSocket from "ws";

const BLOCK_LIST = ["check doc for NSFW labels", "label2", "label3"];
const ALLOWED_REGEX = /\bjavascript\b/i;

type StandardAlgoArgs = {
  record: CommitCreate<"app.bsky.feed.post">["record"];
};
export function standardAlgo({ record }: StandardAlgoArgs) {
  let score = 0;
  let denied = false;

  switch (record.$type) {
    case "app.bsky.feed.post": {
      record.labels?.values.forEach((value) => {
        if (BLOCK_LIST.includes(value.val)) {
          denied = true;
        }
      });

      if (denied) {
        return 0;
      }

      const isAboutWebdev = ALLOWED_REGEX.test(record.text);
      if (isAboutWebdev) {
        score = score + 1;

        if (record.embed) {
          score = score + 1;
        }
      }

      break;
    }

    default:
      break;
  }

  return score;
}

export const jetstream = new Jetstream({
  wantedCollections: ["app.bsky.feed.post"],
  ws: WebSocket,
});

jetstream.onCreate('app.bsky.feed.post', async (event) => {
    const record = event.commit.record
    const interestScore = standardAlgo({ record })
  
    if (interestScore > 0) {
      const did = event.did
      const recordKey = event.commit.rkey
  
      await db.insert(postsTable).values({
        interestScore,
        uri: `at://${did}/app.bsky.feed.post/${recordKey}`,
      })

      console.log("added post to db!!!")
    }
})
