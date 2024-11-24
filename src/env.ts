import z from "zod";

const message = "❌ wrong env variable";

const EnvSchema = z.object({
  DATABASE_URL: z.string({ message }).min(1).url(),
  SERVER_PORT: z.coerce.number(),
  HOSTNAME: z.string({ message }).min(1),
  PUBLISHER_DID: z.string({ message }).min(1),
  API_URL: z.string({ message }).url(),
  FEED_NAME: z.string({ message }).min(1),
  APP_PASSWORD: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
