import { migrate } from './db-common.mjs';
await migrate();
console.log('Schemat FlashStromy gotowy w Neon PostgreSQL.');
