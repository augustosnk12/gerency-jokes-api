import 'dotenv/config';
import {z} from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    DATABASE_NAME: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format());

    throw new Error('Invalid enviornment variables.');
}

export const env = _env.data;