export const FEED_GENERATOR = {
    did: 'did:web:' + (process.env.HOSTNAME as string),
  } as const
  
  export const WEB_DEV_FEED = {
    name: "Ben's web dev feed",
    description: 'This is my feed description that is visible in Bluesky',
    rkey: 'web-dev',
  } as const
  