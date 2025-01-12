import { AtpAgent, BlobRef } from '@atproto/api'
import fs from 'fs/promises'
import { FEED, FEED_GENERATOR, HANDLE } from '../src/lib/contants.js'
import { env } from '../src/env.js'

const run = async () => {
  const avatar = undefined

  const agent = new AtpAgent({
    service: 'https://bsky.social',
  })

  await agent.login({ identifier: HANDLE, password: env.APP_PASSWORD })

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
    rkey: FEED.rkey,
    record: {
      did: FEED_GENERATOR.did,
      displayName: FEED.name,
      description: FEED.description,
      avatar: avatarRef,
      createdAt: new Date().toISOString(),
    },
  }

  await agent.api.com.atproto.repo.putRecord(data)

  console.log('All done 🎉')
}

run()
