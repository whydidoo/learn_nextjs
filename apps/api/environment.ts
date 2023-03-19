import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_PORT: z.string(),
  PORT: z.string(),
  REDIS_URL: z.string(),
  REDIS_PORT: z.string(),
  JWT_SECRET: z.string(),
  JWT_COOKIE_NAME: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  MODE: z.string(),
  RUN_MIGRATIONS: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (parsed.success !== true) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.format(), null, 4),
  );

  process.exit(1);
}

export const env = parsed.data;
export type Environment = z.infer<typeof envSchema>;
