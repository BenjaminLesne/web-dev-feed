import 'dotenv/config'
import { AtpAgent, BlobRef } from '@atproto/api'
import fs from 'fs/promises'
import { FEED_GENERATOR, WEB_DEV_FEED } from '../src/constants.js'

const run = async () => {
  const handle = "benjaminlesne.bsky.social"
  const avatar = undefined as string | undefined

  const agent = new AtpAgent({
    service: 'https://bsky.social',
  })

  await agent.login({ identifier: handle, password: process.env.APP_PASSWORD as string })

  let avatarRef: BlobRef | undefined
  if (avatar) {
    let encoding: string
    if (avatar.endsWith('png')) {
      encoding = 'image/png'
    } else if (avatar.endsWith('jpg') || avatar.endsWith('jpeg')) {
      encoding = 'image/jpeg'
    } else {
      throw new Error('expected png or jpeg')
    }
    const img = await fs.readFile(avatar)
    const blobRes = await agent.api.com.atproto.repo.uploadBlob(img, {
      encoding,
    })
    avatarRef = blobRes.data.blob
  }

  const data = {
    repo: agent.session?.did ?? handle,
    collection: 'app.bsky.feed.generator',
    rkey: WEB_DEV_FEED.rkey,
    record: {
      did: FEED_GENERATOR.did,
      displayName: WEB_DEV_FEED.name,
      description: WEB_DEV_FEED.description,
      avatar: avatarRef,
      createdAt: new Date().toISOString(),
    },
  }

  await agent.api.com.atproto.repo.putRecord(data)

  console.log('All done 🎉')
}

run()
