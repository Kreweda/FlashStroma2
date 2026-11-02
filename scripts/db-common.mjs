import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';
if (process.env.NODE_ENV !== 'production') { try { process.loadEnvFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','.env')); } catch {} }
if (!process.env.DATABASE_URL) throw new Error('Ustaw DATABASE_URL w pliku .env.');
export const sql=neon(process.env.DATABASE_URL);
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function migrate(){const content=await fs.readFile(path.join(root,'db','schema.sql'),'utf8');for(const statement of content.split(';').map(x=>x.trim()).filter(Boolean))await sql.query(statement)}
export const configs={
 teams:{table:'teams',columns:['id','name','short_name','crest','stadium','capacity','description','extras'],json:['extras']},
 players:{table:'players',columns:['id','name','photo','age','position','value','club','season','average_rating','stats','extras'],json:['stats','extras']},
 competitions:{table:'competitions',columns:['id','name','season','kind','details'],json:['details']},
 matches:{table:'matches',columns:['id','season','kickoff','competition','home_team','home_score','away_team','away_score','page','note','status','date','details'],json:['details']},
 news:{table:'news',columns:['id','title','category','summary','image','page','published_at','body']},
 transfers:{table:'transfers',columns:['id','player','photo','type','status','from_club','to_club','fee','date','note','details'],json:['details']},
 injuries:{table:'injuries',columns:['id','player','photo','injury','club','position','return_date','status','note']},
 events:{table:'match_events',columns:['id','match_id','minute','team','type','player','note','score']},
 playerStats:{table:'match_player_stats',columns:['id','match_id','team','player','position','rating','goals','assists','minutes','details'],json:['details']}
};
export async function upsert(resource,item){const c=configs[resource];if(!c)throw new Error('Nieznany zasób');const cols=c.columns;const values=cols.map(k=>c.json.includes(k)?JSON.stringify(item[k]??(k==='stats'?[]:{})):item[k]??null);const slots=cols.map((k,i)=>'$'+(i+1)+(c.json.includes(k)?'::jsonb':''));const updates=cols.filter(k=>k!=='id').map(k=>`${k}=EXCLUDED.${k}`).join(',');await sql.query(`INSERT INTO ${c.table} (${cols.join(',')}) VALUES (${slots.join(',')}) ON CONFLICT (id) DO UPDATE SET ${updates}, updated_at=now()`,values)}
export async function upsertMany(resource,items){if(!items?.length)return;const c=configs[resource];if(!c)throw new Error('Nieznany zasób');const columns=c.columns.filter(k=>items.some(item=>Object.hasOwn(item,k)));const json=JSON.stringify(items);const updates=columns.filter(k=>k!=='id').map(k=>`${k}=EXCLUDED.${k}`).join(',');await sql.query(`INSERT INTO ${c.table} (${columns.join(',')}) SELECT ${columns.join(',')} FROM jsonb_populate_recordset(NULL::${c.table},$1::jsonb) ON CONFLICT (id) DO UPDATE SET ${updates}${!['match_events','match_player_stats'].includes(c.table)?', updated_at=now()':''}`,[json])}


