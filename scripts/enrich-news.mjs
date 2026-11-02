import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const seedPath=path.join(root,'data','seed.json');const seed=JSON.parse(await fs.readFile(seedPath,'utf8'));
for(const article of seed.news||[]){const filename=path.basename(article.page||'');if(!filename.endsWith('.html'))continue;try{let html=await fs.readFile(path.join(root,'public','legacy',filename),'utf8');const main=/<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html);html=main?.[1]||html;html=html.replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();article.body=html.slice(0,15000);if(!article.summary)article.summary=article.body.slice(0,220)}catch{}}
await fs.writeFile(seedPath,JSON.stringify(seed,null,2)+'\n');console.log('Rozszerzono treść istniejących artykułów: '+seed.news.length);

