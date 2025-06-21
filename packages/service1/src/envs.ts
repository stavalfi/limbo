import { z } from "zod";

const envSchema = z.object({
  SERVICE1_PORT: z.coerce.number().int().min(0).max(65535),
});

export const processEnv = envSchema.parse(process.env);
