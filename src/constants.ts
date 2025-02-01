export const FEED_GENERATOR = {
    did: 'did:web:' + (process.env.HOSTNAME as string),
  } as const
  
  export const WEB_DEV_FEED = {
    name: 'My feed name displayed to users',
    description: 'This is my feed description that is visible in Bluesky',
    rkey: 'web-dev',
  } as const
  