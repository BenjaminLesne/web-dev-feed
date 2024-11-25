import { env } from "../env.js";

export const HANDLE = "benjaminlesne.bsky.social";
export const WANTED_COLLECTIONS = [
  "app.bsky.feed.post" as const,
  "app.bsky.feed.like" as const,
  "app.bsky.feed.repost" as const,
];
export const FEED = {
  id: "web-dev",
  did: "did:web:" + env.HOSTNAME,
  name: "Web dev testi",
  description:
    "Open-source web dev feed, showcasing posts based on keywords, likes, and reposts from the last 48 hours. source code: https://github.com/BenjaminLesne/web-dev-feed",
  rkey: "web-dev",
} as const;

export const FEED_GENERATOR = {
  did: "did:web:" + env.HOSTNAME,
};
