import z from "zod";

const EnvSchema = z.object({
})

    const test = ""

export const env = EnvSchema.parse(process.env);

