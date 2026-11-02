import fs from 'node:fs/promises';
import path from 'node:path';
import { root, migrate, sql, upsertMany } from './db-common.mjs';
await migrate();
const seed=JSON.parse(await fs.readFile(path.join(root,'data','seed.json'),'utf8'));
for(const resource of ['teams','players','competitions','matches','news','transfers','injuries','events','playerStats'])await upsertMany(resource,seed[resource]||[]);
await sql.query("INSERT INTO app_settings (key,value) VALUES ('initial_data_imported','true'::jsonb) ON CONFLICT (key) DO UPDATE SET value='true'::jsonb,updated_at=now()");
console.log('Zaimportowano zachowane dane FlashStromy.');
