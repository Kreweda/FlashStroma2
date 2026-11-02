const articles={
  // Dodawaj kolejne wpisy w tym miejscu. Każdy nowy wpis sam pojawi się na stronie głównej.
  // Skopiuj przykład i nadaj mu własny, unikalny klucz:
  // 'nowy-artykul':{title:'Tytuł wiadomości',category:'Piłka nożna · Polska',time:'5 min temu',lead:'Krótki wstęp do artykułu.',paragraphs:['Pierwszy akapit.','Drugi akapit.'],color:'#c92545',image:'images/zdjecie.jpg'},
  urban:{title:'Kreweda: ,,To mój ostatni sezon, chcę wygrać wszystko”',category:'Piłka nożna · Polska',time:'27.09.2026, 20:00',lead:'Kreweda (Jugosławianka) zapewnia że to jego ostatni sezon przed emeryturą w piłce, i że chce wygrać wszystko.',image: 'kredken.png',paragraphs:['Kreweda na konferencji przed meczem towarzyskim zauważył dobrą formę każdego z zawodników.','Zdobywca złotego koteua za rok 2026 zapewnił że chcę walczyć o potrójną koronę w przyszłym sezonie.','Zapewnił że zarówno w defensywie jak i ofensywie da z siebie 100%.'],color:'#c92545'},
  puchacz:{title:'Selekcjoner Reprezentacji Stromej ogłosił powołania. ,,Nie ma kompromisu"',category:'Piłka nożna · Polska',time:'27.09.2026, 19:35',lead:'Psiepauch Krewedkowski ogłosił powołania do Reprezentacji Ulicy Stromej, uwadze nie umkło brak kluczowego zawodnika.',image: 'rep.jpeg',paragraphs:['Powołani do reprezentacji na najbliższe zgrupowanie: Bramkarze: Kitkisana Lulsuiowata, Obrońcy: Psiepauch Krewedkowski, Pomocnicy: Pero, Ola, Napastnicy: Vienna','Uwadze komentatorów nie umknął fakt nieobecności Koteua na zgrupowaniu, Selekcjoner jednak odpowiedział że jeśli ktoś nie gra regularnie to nie dostanie powołania.','Najbliższe zgrupowanie odbędzie się w maju.'],color:'#d51f35'},
  // garcia:{title:'Eric García musiał opuścić zgrupowanie reprezentacji Hiszpanii, ma już zastępcę',category:'Piłka nożna · Hiszpania',time:'27.09.2026, 18:50',lead:'Eric García nie dokończy zgrupowania reprezentacji Hiszpanii. Sztab powołał już zawodnika, który uzupełni kadrę.',paragraphs:['Obrońca opuścił zespół po konsultacji ze sztabem medycznym. Trener nie chciał ryzykować pogłębienia urazu.','Do kadry dołączy nowy zawodnik, który będzie trenował z drużyną przed nadchodzącymi meczami.','Zmiana koryguje dostępne opcje w defensywie, ale nie wpływa na pozostałą część zgrupowania.'],color:'#1785aa'},
  // potter:{title:'Graham Potter: Polska to „przeciwnik grający inteligentny futbol na wysokim poziomie”',category:'Piłka nożna · Europa',time:'27.09.2026, 18:20',lead:'Graham Potter z szacunkiem wypowiedział się o reprezentacji Polski przed nadchodzącym spotkaniem.',paragraphs:['Szkoleniowiec zwrócił uwagę na inteligentne poruszanie się polskich zawodników i ich umiejętność wykorzystywania wolnych przestrzeni.','Drużyna Pottera pracowała nad ustawieniem bez piłki i szybkim odbiorem po stracie.','Trener spodziewa się wymagającego meczu, który może rozstrzygnąć się w detalach.'],color:'#245a42'}
};
const story=articles[new URLSearchParams(location.search).get('article')];
if(story){
  document.title=story.title+' — Flashscore';
  document.querySelector('.title').textContent=story.title;
  document.querySelector('.crumb').textContent='Flashscore Wiadomości › '+story.category+' › '+story.title;
  document.querySelector('.byline').innerHTML='Autor: <b>Flashscore Wiadomości</b> · '+story.time;
  const body=document.querySelector('.article');
  body.innerHTML='<p class="lead"></p>'+story.paragraphs.map(()=>'<p></p>').join('');
  body.querySelector('.lead').textContent=story.lead;
  body.querySelectorAll('p:not(.lead)').forEach((p,i)=>p.textContent=story.paragraphs[i]);
  document.querySelector('.match').remove();
  document.querySelector('.caption span:first-child').textContent=story.category+' · materiał Flashscore Wiadomości';
  const illustration=document.querySelector('.hero svg');
  illustration.innerHTML='<rect width="960" height="540" fill="#d5e0e2"/><path fill="#4f795f" d="M0 390h960v150H0z"/><path fill="'+story.color+'" d="M330 260l120-70 120 60 50 290H270z"/><circle cx="450" cy="155" r="65" fill="#c79675"/><path fill="#24323c" d="M385 155q0-80 65-80 62 0 65 74l-130 6z"/><circle cx="790" cy="428" r="30" fill="#fff" opacity=".8"/>';
  if(story.image){const photo=document.createElement('img');photo.src=story.image;photo.alt=story.title;photo.style.cssText='display:block;width:100%;height:100%;object-fit:cover';illustration.replaceWith(photo);}
}
if(document.querySelector('.feed')){
  const alreadyOnHome=new Set(['urban','puchacz','garcia','potter']);
  const feed=document.querySelector('.feed');
  Object.entries(articles).filter(([id])=>!alreadyOnHome.has(id)).forEach(([id,item])=>{
    const card=document.createElement('article');card.className='news';
    card.dataset.category=item.category.toLocaleLowerCase('pl').includes('polska')?'Polska':'Świat';
    const thumb=document.createElement('div');thumb.className='thumb';
    if(item.image){const photo=document.createElement('img');photo.src=item.image;photo.alt=item.title;photo.style.cssText='display:block;width:100%;height:100%;object-fit:cover';thumb.append(photo);}else{thumb.innerHTML='<svg viewBox="0 0 360 216" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="216" fill="#d5e0e2"/><path fill="#738a8f" d="M0 0h360v75H0z"/><path fill="#4f795f" d="M0 150h360v66H0z"/><path fill="'+item.color+'" d="M112 103l58-35 60 30 28 118H94z"/><circle cx="169" cy="66" r="23" fill="#c79675"/><path fill="#24323c" d="M145 65q1-30 25-30 24 1 24 27z"/></svg>';}
    const tag=document.createElement('span');tag.className='tag';tag.textContent=item.category;thumb.append(tag);
    const copy=document.createElement('div');const headline=document.createElement('a');headline.className='headline';headline.href='flashstroma-artykul.html?article='+encodeURIComponent(id);headline.textContent=item.title;
    const meta=document.createElement('div');meta.className='meta';meta.innerHTML='<span class="source-icon">◉</span><b>Flashscore Wiadomości</b><span class="sep">·</span><span></span>';meta.lastElementChild.textContent=item.time;
    copy.append(headline,meta);card.append(thumb,copy);feed.insertBefore(card,document.getElementById('empty'));
  });
}
