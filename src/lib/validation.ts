import { AppBskyFeedPost } from "@atproto/api";

const post = {};
if (AppBskyFeedPost.isRecord(post)) {
  // typescript now recognizes `post` as a AppBskyFeedPost.Record
  // however -- we still need to validate it
  const res = AppBskyFeedPost.validateRecord(post);
  if (res.success) {
    // a valid record
  } else {
    // something is wrong
    console.log(res.error);
  }
}
