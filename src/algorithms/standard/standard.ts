import type { CommitCreate } from "@skyware/jetstream";

const BLOCK_LIST = ["porn" ,"gore", "spam", "sexual", "nudity"];
const ALLOWED_REGEX = /\b(javascript|js|react\.?js|node\.?js|typescript|ts|html5|css3?|web\s*dev(elopment)?|frontend|front-end|backend|back-end|npm|yarn|webpack|vite|babel|eslint|docker|kubernetes|angular|vue\.?js|svelte|next\.?js|nuxt\.?js|express\.?js|deno|graphql|rest\s*api|typescript|tailwind\.?css|redux|mobx|storybook|jest|cypress|playwright|webpack|parcel|gulp|electron|pwa|progressive\s*web\s*app|websockets?|ssr|server\s*side\s*rendering|spa|single\s*page\s*application|es6|es2015|es2016|es2017|es2018|es2019|es2020|es2021|es2022|es2023|async|functional\s*programming|reactjs|reactnative|typescript|ts|angular\.?js|vuejs|emberjs|backbone\.?js|3\.?js|d3\.?js|rxjs|cli|html\s*css|web\s*standards|browser\s*api|web\s*components|alpine\.?js|solid\.?js)\b/i;

type StandardAlgoArgs = {
  record: CommitCreate<"app.bsky.feed.post">["record"];
};
export function standardAlgo({ record }: StandardAlgoArgs) {
  let score = 0;
  let denied = false;

  switch (record.$type) {
    case "app.bsky.feed.post": {
      record.labels?.values.forEach((value) => {
        if (BLOCK_LIST.includes(value.val)) {
          denied = true;
        }
      });

      if (denied) {
        return 0;
      }

      const isAboutWebdev = ALLOWED_REGEX.test(record.text);
      if (isAboutWebdev) {
        score = score + 1;

        if (record.embed) {
          score = score + 1;
        }
      }

      break;
    }

    default:
      break;
  }

  return score;
}