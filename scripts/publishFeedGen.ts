import { AtpAgent, BlobRef } from "@atproto/api";
import fs from "fs/promises";
import { FEED, FEED_GENERATOR, HANDLE } from "../src/lib/contants.js";
import { env } from "../src/env.js";
// import { ids } from "../src/lexicon/lexicons";

const run = async () => {
  // if (!process.env.FEEDGEN_SERVICE_DID && !process.env.FEEDGEN_HOSTNAME) {
  //   throw new Error("Please provide a hostname in the .env file");
  // }

  // const answers = await inquirer.prompt([
  //   {
  //     type: "input",
  //     name: "handle",
  //     message: "Enter your Bluesky handle:",
  //     required: true,
  //   },
  //   {
  //     type: "password",
  //     name: "password",
  //     message: "Enter your Bluesky password (preferably an App Password):",
  //   },
  //   {
  //     type: "input",
  //     name: "service",
  //     message: "Optionally, enter a custom PDS service to sign in with:",
  //     default: "https://bsky.social",
  //     required: false,
  //   },
  //   {
  //     type: "input",
  //     name: "recordName",
  //     message:
  //       "Enter a short name or the record. This will be shown in the feed's URL:",
  //     required: true,
  //   },
  //   {
  //     type: "input",
  //     name: "displayName",
  //     message: "Enter a display name for your feed:",
  //     required: true,
  //   },
  //   {
  //     type: "input",
  //     name: "description",
  //     message: "Optionally, enter a brief description of your feed:",
  //     required: false,
  //   },
  //   {
  //     type: "input",
  //     name: "avatar",
  //     message:
  //       "Optionally, enter a local path to an avatar that will be used for the feed:",
  //     required: false,
  //   },
  // ]);

  // const {
  //   handle,
  //   password,
  //   recordName,
  //   displayName,
  //   description,
  //   avatar,
  //   service,
  // } = answers;

  const handle = HANDLE;
  const password = env.APP_PASSWORD;
  // const recordName = FEED.rkey;
  // const displayName = FEED.name;
  // const description = FEED.description;
  const avatar = undefined;
  const service = undefined;

  // const feedGenDid = `did:web:${env.HOSTNAME}`;
  // const feedGenDid =
  //   "did:web:http://boc48gookcswcoo884o0owck.167.114.2.165.sslip.io";

  // const feedGenDid =
  //   process.env.FEEDGEN_SERVICE_DID ??
  //   `did:web:${process.env.FEEDGEN_HOSTNAME}`;

  // only update this if in a test environment
  const agent = new AtpAgent({
    service: service ? service : "https://bsky.social",
  });
  await agent.login({ identifier: handle, password });

  let avatarRef: BlobRef | undefined;
  if (avatar) {
    let encoding: string;
    if (avatar.endsWith("png")) {
      encoding = "image/png";
    } else if (avatar.endsWith("jpg") || avatar.endsWith("jpeg")) {
      encoding = "image/jpeg";
    } else {
      throw new Error("expected png or jpeg");
    }
    const img = await fs.readFile(avatar);
    const blobRes = await agent.api.com.atproto.repo.uploadBlob(img, {
      encoding,
    });
    avatarRef = blobRes.data.blob;
  }

  // LAST UPDATE:
  // {
  //   repo: 'did:plc:biu6jolqrtpjfazvekg6zrah',
  //   collection: 'app.bsky.feed.generator',
  //   rkey: 'web-dev',
  //   record: {
  //     did: 'did:web:api.webdevfeed.online',
  //     displayName: 'Web dev testi',
  //     description: 'Open-source web dev feed, showcasing posts based on keywords, likes, and reposts from the last 48 hours. source code: https://github.com/BenjaminLesne/web-dev-feed',
  //     avatar: undefined,
  //     createdAt: '2024-11-28T13:29:18.526Z'
  //   }
  // }

  // await agent.api.com.atproto.repo.putRecord({
  //   repo: "did:plc:biu6jolqrtpjfazvekg6zrah",
  //   collection: "app.bsky.feed.generator",
  //   rkey: "web-dev",
  //   record: {
  //     did: "did:web:boc48gookcswcoo884o0owck.167.114.2.165.sslip.io",
  //     displayName: "Web dev testi",
  //     description:
  //       "Open-source web dev feed, showcasing posts based on keywords, likes, and reposts from the last 48 hours. source code: https://github.com/BenjaminLesne/web-dev-feed",
  //     avatar: undefined,
  //     createdAt: "2024-11-25T21:13:32.869Z",
  //   },
  // });
  const data = {
    repo: agent.session?.did ?? handle,
    collection: "app.bsky.feed.generator",
    rkey: FEED.rkey,
    record: {
      did: FEED_GENERATOR.did,
      displayName: FEED.name,
      description: FEED.description,
      avatar: avatarRef,
      createdAt: new Date().toISOString(),
    },
  };
  console.log(data);
  await agent.api.com.atproto.repo.putRecord(data);
  // await agent.api.com.atproto.repo.putRecord({
  //   repo: agent.session?.did ?? handle,
  //   collection: "app.bsky.feed.generator",
  //   rkey: recordName,
  //   record: {
  //     did: feedGenDid,
  //     displayName: displayName,
  //     description: description,
  //     avatar: avatarRef,
  //     createdAt: new Date().toISOString(),
  //   },
  // });

  console.log("All done 🎉");
};

run();
