import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { env } from "../env";

export const client = new NodeOAuthClient({
  clientMetadata: {
    // Must be a URL that will be exposing this metadata
    // client_id: `${env.API_URL}/client-metadata.json`,
    client_id: `https://example.com/client-metadata.json`,
    scope: "atproto",
    client_name: "My App",
    client_uri: "https://my-app.com",
    logo_uri: "https://my-app.com/logo.png",
    tos_uri: "https://my-app.com/tos",
    policy_uri: "https://my-app.com/policy",
    redirect_uris: [`${env.API_URL}/callback`],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "private_key_jwt",
    dpop_bound_access_tokens: true,
    jwks_uri: "https://my-app.com/jwks.json",
    // jwks: {
    //   keys: [
    //     {
    //       ext,
    //     },
    //   ],
    // },
  },

  // Interface to store authorization state data (during authorization flows)
  stateStore: {
    async set(key: string, internalState: NodeSavedState): Promise<void> {},
    async get(key: string): Promise<NodeSavedState | undefined> {},
    async del(key: string): Promise<void> {},
  },

  // Interface to store authenticated session data
  sessionStore: {
    async set(sub: string, session: Session): Promise<void> {},
    async get(sub: string): Promise<Session | undefined> {},
    async del(sub: string): Promise<void> {},
  },
});
