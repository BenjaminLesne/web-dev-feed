import 'dotenv/config'
import express from 'express'
import { db } from './database/database.js'
import { postsTable } from './database/schemas.js'
import { jetstream } from './jetstream.js'
import { desc } from 'drizzle-orm'

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

app.listen(3000, () => {
  console.log(`Feed app listening on port 3000`)
})
