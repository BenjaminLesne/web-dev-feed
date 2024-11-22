import { Agent } from "@atproto/api";
import { env } from "../src/env";
import { client } from "../src/auth/auth";
import axios from "axios";
import z from "zod";
import type { CallOptions } from "@atproto/api/dist/client/types/com/atproto/admin/deleteAccount";

const run = async () => {
  const session = await client.restore(env.PUBLISHER_DID);
  // const session = await client.
  const agent = new Agent(session);

  const url = "https://bsky.social/xrpc/com.atproto.server.createSession";
  const payload = {
    identifier: env.PUBLISHER_DID,
    password: env.APP_PASSWORD,
  };

  const response = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  type test = CallOptions;
  const accessJwt = z.string().parse(response.data.accessJwt);

  // com.atproto.repo.putRecord
  agent.com.atproto.repo.putRecord({
    repo: agent.session?.did ?? "",
    collection: "app.bsky.feed.generator",
    rkey: recordName,
    record: {
      did: feedGenDid,
      displayName: displayName,
      description: description,
      avatar: avatarRef,
      createdAt: new Date().toISOString(),
    },
  });
  // const result = await agent.app.bsky.feed.generator.create(
  //   {},
  //   {
  //     createdAt: new Date().toUTCString(),
  //     did: env.PUBLISHER_DID,
  //     displayName: env.FEED_NAME,
  //   },
  // );

  // console.log(result);
};

run();
