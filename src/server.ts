import 'dotenv/config'
import express from 'express'
import { db } from './database/database.js'
import { postsTable } from './database/schemas.js'
import { jetstream } from './jetstream.js'
import { desc } from 'drizzle-orm'
import { FEED_GENERATOR, WEB_DEV_FEED } from './constants.js'

jetstream.start()

const app = express()

app.get('/xrpc/app.bsky.feed.getFeedSkeleton', async (req, res) => {
  const feed = await db
    .select({
      post: postsTable.uri,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.interestScore))
    .limit(10)

  res.json({
    feed,
  })
})

app.get('/.well-known/did.json', (req, res) => {
  res.json({
    '@context': ['https://www.w3.org/ns/did/v1'],
    id: FEED_GENERATOR.did,
    service: [
      {
        id: '#bsky_fg',
        serviceEndpoint: FEED_GENERATOR.endpoint,
        type: 'BskyFeedGenerator',
      },
    ],
  })
})

app.get('/xrpc/app.bsky.feed.describeFeedGenerator', (req, res) => {
  res.json({
    did: FEED_GENERATOR.did,
    feeds: [
      {
        uri: `at://${process.env.PUBLISHER_DID as string}/app.bsky.feed.generator/${
          WEB_DEV_FEED.rkey
        }`,
      },
    ],
  })
})

app.listen(3000, () => {
  console.log(`Feed app listening on port 3000`)
})
