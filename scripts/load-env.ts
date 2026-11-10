import { config } from 'dotenv';
import { resolve } from 'path';

/**
 * Match Next.js local env loading: `.env` then `.env.local` (local wins).
 */
export function loadEnv() {
  const root = process.cwd();
  config({ path: resolve(root, '.env') });
  config({ path: resolve(root, '.env.local'), override: true });
}
