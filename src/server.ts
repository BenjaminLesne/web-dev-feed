import express from "express";
import { env } from "./env.js";

const app = express();
const port = env.SERVER_PORT;

app.get("/.well-known/did.json", (req, res) => {
  res.json({
    "@context": ["https://www.w3.org/ns/did/v1"],
    id: env.PUBLISHER_DID,
    service: [
      {
        id: "#bsky_fg",
        serviceEndpoint: env.API_URL,
        type: "BskyFeedGenerator",
      },
    ],
  });
});

app.get("/xrpc/app.bsky.feed.describeFeedGenerator", (req, res) => {
  res.json({
    did: env.PUBLISHER_DID,
    feeds: [
      {
        uri: `at://${env.PUBLISHER_DID}/app.bsky.feed.generator/webDev`,
      },
    ],
  });
});

app.get("/xrpc/app.bsky.feed.getFeedSkeleton", (req, res) => {
  res.json({
    feed: [
      {
        post: "at://did:plc:2ouk4ptm336l2lcce6qxs3ar/app.bsky.feed.post/3kaoxdbnvwv2y",
      },
      {
        post: "at://did:plc:y5zzasijmapifytqvhxnwsrm/app.bsky.feed.post/3kaoxbtnw7n2x",
      },
      {
        post: "at://did:plc:jqdbfqiyyne7jkxpqlfacray/app.bsky.feed.post/3kaoxal4n3n2m",
      },
      {
        post: "at://did:plc:hlxobkvuv64wghyltgbgz6f3/app.bsky.feed.post/3kaoxafag2y2s",
      },
      {
        post: "at://did:plc:b66g2f6utk25ppjzsujhhqgt/app.bsky.feed.post/3kaox5gojov2q",
      },
    ],
    cursor: "2482",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("client-metadata.json", (req, res) => {
//   res.json(client.clientMetadata);
// });
// app.get("jwks.json", (req, res) => {
//   res.json(client.jwks);
// });

// app.get("/login", async (req, res, next) => {
//   try {
//     const handle = HANDLE; // eg. from query string
//     // const state = "434321";

//     // Revoke any pending authentication requests if the connection is closed (optional)
//     const ac = new AbortController();
//     req.on("close", () => ac.abort());

//     const url = await client.authorize(handle);

//     res.redirect(url.toString());
//   } catch (err) {
//     next(err);
//   }
// });

// // Create an endpoint to handle the OAuth callback
// app.get("/atproto-oauth-callback", async (req, res, next) => {
//   try {
//     const params = new URLSearchParams(req.url.split("?")[1]);

//     const { session, state } = await client.callback(params);

//     // Process successful authentication here
//     console.log("authorize() was called with state:", state);

//     console.log("User authenticated as:", session.did);

//     const agent = new Agent(session);

//     if (agent.did == null) {
//       throw Error("did undefined");
//     }
//     // Make Authenticated API calls
//     const profile = await agent.getProfile({ actor: agent.did });
//     console.log("Bsky profile:", profile.data);

//     res.json({ ok: true });
//   } catch (err) {
//     next(err);
//   }
// });

// import { createServer } from "http";
// import { env } from "./env";

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// const port = env.SERVER_PORT;
// const hostname = env.HOSTNAME;

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
