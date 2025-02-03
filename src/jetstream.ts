import { db } from './database/database.js'
import { postsTable } from './database/schemas.js';
import type { CommitCreate } from "@skyware/jetstream";
import { Jetstream } from "@skyware/jetstream";
import WebSocket from "ws";
import { standardAlgo } from './algorithms/standard/standard.js';

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
