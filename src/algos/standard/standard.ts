import type { CommitCreate } from "@skyware/jetstream";
import type { WantedCollection } from "../../lib/types.js";
import { BLACKLIST, KEYWORDS_REGEX } from "./constants.js";

type CheckTrustedKeywordsArgs = {
  text: string;
};
function checkTrustedKeywords({ text }) {
  const isAboutWebdev = KEYWORDS_REGEX.trusted.test(text);
}

type StandardAlgoArgs = {
  record: CommitCreate<WantedCollection>["record"];
};
export function standardAlgo({ record }: StandardAlgoArgs) {
  let score = 0;
  let denied = false;

  switch (record.$type) {
    case "app.bsky.feed.post": {
      record.labels?.values.forEach((value) => {
        if (BLACKLIST.labels.includes(value.val)) {
          denied = true;
        }
      });
      if (denied) {
        return 0;
      }

      const isAboutWebdev = KEYWORDS_REGEX.trusted.test(record.text);
      if (isAboutWebdev) {
        score = score + 1;
      }

      if (record.embed) {
        score = score + 1;
      }

      break;
    }

    // case "app.bsky.feed.like": {
    //   record.subject.uri
    // }

    default:
      break;
  }

  return score;
}
