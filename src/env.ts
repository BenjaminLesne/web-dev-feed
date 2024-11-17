import z from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1).url(),
  SERVER_PORT: z.coerce.number(),
  HOSTNAME: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
