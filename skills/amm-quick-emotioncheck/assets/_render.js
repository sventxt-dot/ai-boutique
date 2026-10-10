/* ══════════════════════════════════════════════════════════════
   DARSTELLUNG
   ══════════════════════════════════════════════════════════════ */
var FARBE   = {S:'var(--f-s)', T:'var(--f-t)', E:'var(--f-e)', P:'var(--f-p)'};
var FARBE_A = {S:'var(--f-s-a)', T:'var(--f-t-a)', E:'var(--f-e-a)', P:'var(--f-p-a)'};
var FARBE_PDF = {S:'#70B8FA', T:'#FAEF70', E:'#70FAA0', P:'#A78BFA'};
var JA   = {ja:'var(--f-e)', teilweise:'var(--q-a)', nein:'var(--q-b)'};
var JA_A = {ja:'var(--f-e-a)', teilweise:'var(--q-a-a)', nein:'var(--q-b-a)'};
/* Der Hebel sagt, wie viel bei diesem Antrieb noch zu holen ist. Viel Luft
   wird betont, wenig Luft bleibt zurueckhaltend. */
var HEB   = {hoch:'var(--q-b)', mittel:'var(--q-a)', niedrig:'var(--dim)'};
var HEB_A = {hoch:'var(--q-b-a)', mittel:'var(--q-a-a)', niedrig:'var(--line-2)'};
function hebF(v){ return HEB[v]||'var(--dim)'; }
function hebA(v){ return HEB_A[v]||'var(--line-2)'; }
var STUFEN = [
  {nr:1, t:'Produkt',  b:'Merkmale, Ausstattung, Umfang, Technik. Die Ebene, auf der die meisten Werbetexte stehen bleiben.'},
  {nr:2, t:'Funktion', b:'Was das Angebot tut, die Leistung als Vorgang beschrieben.'},
  {nr:3, t:'Ergebnis', b:'Was danach vorliegt, das messbare Resultat beim Kunden.'},
  {nr:4, t:'Zustand',  b:'Wie der Alltag des Kunden aussieht, wenn das Ergebnis da ist.'},
  {nr:5, t:'Gefühl',   b:'Wie der Kunde sich danach fühlt, also der eigentliche Kaufgrund.'}
];

function esc(s){return String(s==null?'':s).replace(/&(?![a-z#]+;)/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function attr(s){return esc(s).replace(/"/g,'&quot;')}
function dim(id){ for(var i=0;i<D.dimensionen.length;i++) if(D.dimensionen[i].id===id) return D.dimensionen[i]; return null; }
function jaF(v){ return JA[v]||'var(--dim)'; }
function jaA(v){ return JA_A[v]||'var(--line-2)'; }
function zitat(z, seite, klasse){
  if(!z) return '';
  return '<div class="zit'+(klasse?' '+klasse:'')+'">&bdquo;'+esc(z)+'&ldquo;'+
    (seite?'<i data-guard="off">'+esc(seite)+'</i>':'')+'</div>';
}

/* Der Score wird nachgerechnet, nicht aus dem Feld uebernommen. Eine Abweichung
   ist ein Datenfehler und wird sichtbar gemeldet statt still geschluckt. */
function punktsumme(){
  var s=0; D.dimensionen.forEach(function(d){ s+=d.punkte; }); return s;
}
function urteil(s){
  if(s<=24) return ['Produktprospekt','Der Text beschreibt, was das Angebot ist. Warum jemand kaufen sollte, steht nicht da.'];
  if(s<=49) return ['Nutzen angedeutet','Der Nutzen kommt vor, aber als Behauptung. Die Übersetzung muss der Leser selbst leisten.'];
  if(s<=74) return ['Nutzen belegt','Der Text arbeitet mit Ergebnissen und Belegen. Zum Kaufmotiv fehlt der letzte Schritt.'];
  return ['Kaufmotiv getroffen','Der Text spricht den Antrieb an, belegt ihn und räumt die Bremsen weg.'];
}

/* Farbmodus */
(function(){
  var KEY='{{FIRMA_SLUG}}-emotion-farbmodus', b=document.getElementById('btnModus');
  function setze(hell,merken){
    document.body.classList.toggle('hell',hell);
    b.textContent = hell ? '☽' : '☀';
    b.setAttribute('title', hell ? 'Auf dunkel wechseln' : 'Auf hell wechseln');
    if(merken){ try{ localStorage.setItem(KEY, hell?'hell':'dunkel'); }catch(e){} }
    window.dispatchEvent(new Event('resize'));
  }
  var g=null; try{ g=localStorage.getItem(KEY); }catch(e){}
  var sys = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  setze(g ? g==='hell' : sys, false);
  b.addEventListener('click',function(){ setze(!document.body.classList.contains('hell'), true); });
})();

/* Abschnitts-Leiste */
(function(){
  var A=[['start','Start'],['dimensionen','Der Score'],['leiter','Leiterstufe'],
         ['antrieb','Antrieb'],['formel','Kauf-Formel'],['bremsen','Bremsen'],
         ['saetze','Die Sätze'],['massnahmen','Maßnahmen'],['basis','Grundlage'],['grenzen','Grenzen']];
  var rail=document.getElementById('rail');
  rail.innerHTML=A.map(function(a){
    return '<a class="rail-item" href="#'+a[0]+'" title="'+a[1]+'"><span class="rail-dot"></span><span class="rail-label">'+a[1]+'</span></a>';
  }).join('');
  var items=Array.prototype.slice.call(rail.querySelectorAll('.rail-item'));
  var ziele=items.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  function sync(){
    var linie=window.scrollY+window.innerHeight*0.34, akt=0;
    for(var i=0;i<ziele.length;i++){ if(ziele[i] && ziele[i].offsetTop<=linie) akt=i; }
    if(window.innerHeight+window.scrollY>=document.body.scrollHeight-4) akt=items.length-1;
    for(var k=0;k<items.length;k++) items[k].classList.toggle('active',k===akt);
  }
  var l=false;
  window.addEventListener('scroll',function(){ if(l) return; l=true; requestAnimationFrame(function(){sync();l=false;}); });
  window.addEventListener('resize',sync); sync();
})();

/* Aufklappbare Karten */
function bindeKlapp(wurzel){
  (wurzel||document).querySelectorAll('.wb-head, .th-head').forEach(function(h){
    if(h.dataset.geb) return; h.dataset.geb='1';
    h.addEventListener('click',function(){ h.parentNode.classList.toggle('auf'); window.dispatchEvent(new Event('resize')); });
  });
  (wurzel||document).querySelectorAll('.sa-head').forEach(function(h){
    if(h.dataset.geb) return; h.dataset.geb='1';
    h.addEventListener('click',function(){ h.parentNode.classList.toggle('zu'); window.dispatchEvent(new Event('resize')); });
  });
}

/* ══════════════════════════════════════════════════════════════
   KOPF: Score und Kennzahlen
   ══════════════════════════════════════════════════════════════ */
var SCORE = punktsumme();
(function(){
  var u=urteil(SCORE);
  document.getElementById('scN').textContent = SCORE;
  document.getElementById('scT').textContent = u[0];
  document.getElementById('scB').textContent = u[1];
  document.getElementById('scG').style.width = Math.max(2,Math.min(100,SCORE))+'%';
  document.getElementById('stats').innerHTML = D.kennzahlen.map(function(k){
    return '<div class="stat"><span class="stat-n">'+esc(k.n)+'</span><span class="stat-l">'+esc(k.l)+'</span></div>';
  }).join('');
})();

/* ══════════════════════════════════════════════════════════════
   DIMENSIONEN
   ══════════════════════════════════════════════════════════════ */
document.getElementById('dims').innerHTML = D.dimensionen.map(function(d){
  return '<div class="mg-z">'+
    '<div class="mg-l" data-guard="off">'+esc(d.name)+'</div>'+
    '<div class="mg-bar"><div class="mg-fill" style="width:'+Math.max(2,Math.round(d.punkte/d.max*100))+'%;background:'+FARBE[d.f]+';opacity:.85"></div></div>'+
    '<div class="mg-w" data-guard="off">'+d.punkte+' von '+d.max+'</div></div>';
}).join('');

(function(){
  var abw = (D.score!=null && D.score!==SCORE)
    ? '<div class="hinweis">Der Datensatz nennt '+esc(D.score)+' Punkte, die Summe der vier Dimensionen ergibt '+SCORE+'. Angezeigt wird die Summe.</div>' : '';
  var schwach = D.dimensionen.slice().sort(function(a,b){ return (a.punkte/a.max)-(b.punkte/b.max); })[0];
  document.getElementById('dimtext').innerHTML = D.dimensionen.map(function(d,i){
    return '<div class="sa">'+
      '<div class="sa-head"><span class="sa-caret">&#9662;</span><div class="sa-id">'+
        '<div class="sa-num" style="border-color:'+FARBE_A[d.f]+';color:'+FARBE[d.f]+'">'+(i+1)+'</div>'+
        '<div><div class="sa-name">'+esc(d.name)+'</div>'+
        '<div class="sa-sub" data-guard="off">'+d.punkte+' von '+d.max+' Punkten'+(d===schwach?', schwächste Dimension':'')+'</div></div>'+
      '</div></div>'+
      '<div class="sa-body">'+
        '<div class="row"><div class="row-l">Befund</div><div class="row-v">'+esc(d.kurz)+'</div></div>'+
        '<div class="row" style="margin-bottom:0"><div class="row-l">Begründung</div><div class="row-v">'+esc(d.b)+'</div></div>'+
      '</div></div>';
  }).join('') + abw;
})();

/* ══════════════════════════════════════════════════════════════
   DIMENSION 1: Leiterstufe
   ══════════════════════════════════════════════════════════════ */
(function(){
  var d=dim('leiter'); if(!d) return;
  var bl=d.bloecke||[];
  var treffer={};
  bl.forEach(function(b){ treffer[b.stufe]=(treffer[b.stufe]||0)+1; });
  var schwer=0, summe=0, gew={hoch:3, mittel:2, niedrig:1};
  bl.forEach(function(b){ var g=gew[b.gewicht]||1; schwer+=g; summe+=b.stufe*g; });
  var mittel = schwer ? summe/schwer : 0;
  var hier = Math.max(1, Math.min(5, Math.round(mittel)));

  document.getElementById('leiterstufen').innerHTML = STUFEN.map(function(s){
    var n=treffer[s.nr]||0;
    return '<div class="lt'+(s.nr===hier?' hier':'')+'">'+
      '<div class="lt-n">'+s.nr+'</div>'+
      '<div class="lt-t" data-guard="off">'+esc(s.t)+(n?' &middot; '+n:'')+'</div>'+
      '<div class="lt-b">'+esc(s.b)+'</div></div>';
  }).join('');

  document.getElementById('leiterbloecke').innerHTML =
    '<div class="rechnung" data-guard="off">Gewichteter Schnitt <b>'+mittel.toFixed(1)+'</b> von 5, das entspricht Stufe <b>'+hier+'</b>: '+esc(STUFEN[hier-1].t)+'</div>'+
    bl.map(function(b){
      return '<div class="wb" style="border-left-color:'+FARBE.S+'">'+
        '<div class="wb-head">'+
          '<div><div class="wb-n">'+esc(b.ort)+'</div><div class="wb-s">'+esc(b.seite)+' &middot; Gewicht '+esc(b.gewicht)+'</div></div>'+
          '<div class="sig-right"><span class="bed" style="border-color:'+FARBE_A.S+';color:'+FARBE.S+'">Stufe '+b.stufe+' &middot; '+esc(STUFEN[b.stufe-1]?STUFEN[b.stufe-1].t:'')+'</span><span class="caret">&#9656;</span></div>'+
        '</div>'+
        '<div class="wb-body">'+zitat(b.zitat,b.seite)+
          '<div class="row" style="margin-bottom:0"><div class="row-l">Einordnung</div><div class="row-v">'+esc(b.b)+'</div></div>'+
        '</div></div>';
    }).join('');
})();

/* ══════════════════════════════════════════════════════════════
   DIMENSION 2: Antrieb
   ══════════════════════════════════════════════════════════════ */
/* Die Baender des Barometers, wortgleich aus dem Pruefraster. */
function baroBand(w){
  if(w<=19) return ['kommt nicht vor','var(--q-b)'];
  if(w<=39) return ['angedeutet','var(--q-b)'];
  if(w<=59) return ['als Eigenschaft','var(--q-a)'];
  if(w<=79) return ['getragen','var(--f-e)'];
  return ['tragende Achse','var(--f-e)'];
}
(function(){
  var d=dim('antrieb'); if(!d) return;
  var liste=d.antriebe||[];
  var hoechst=0; liste.forEach(function(a){ if(a.wert>hoechst) hoechst=a.wert; });
  var karten=liste.map(function(a){
    var band=baroBand(a.wert), c=band[1];
    var belege=(a.belege||[]).map(function(z){
      return zitat(z.zitat, z.seite, z.wirkt==='ja'?'gut':(z.wirkt==='nein'?'schwach':''))+
        (z.b?'<p style="margin:0 0 14px 0">'+esc(z.b)+'</p>':'');
    }).join('');
    return '<div class="wb" style="border-left-color:'+c+'">'+
      '<div class="wb-head">'+
        '<div class="baro">'+
          '<div class="baro-n">'+esc(a.name)+'</div>'+
          '<div class="baro-bar"><i style="width:'+Math.max(2,Math.min(100,a.wert))+'%;background:'+c+'"></i></div>'+
          '<div class="baro-w" data-guard="off" style="color:'+c+'">'+a.wert+'</div>'+
        '</div>'+
        '<div class="sig-right"><span class="bed" style="border-color:'+hebA(a.hebel)+';color:'+hebF(a.hebel)+'">Hebel '+esc(a.hebel||'offen')+'</span><span class="caret">&#9656;</span></div>'+
      '</div>'+
      '<div class="wb-body">'+
        '<div class="row"><div class="row-l">Einordnung</div><div class="row-v">'+esc(a.b)+' Damit steht dieser Antrieb im Band '+esc(band[0])+'.</div></div>'+
        (belege?'<div style="margin-top:16px">'+belege+'</div>':'')+
        (a.potential?'<div class="pot"><b>Potential</b>'+esc(a.potential)+'</div>':'')+
      '</div></div>';
  }).join('');
  var soll=Math.round(15*hoechst/100);
  karten='<div class="rechnung" data-guard="off">Stärkster Antrieb <b>'+hoechst+'</b> von 100, das ergibt <b>'+soll+'</b> von 15 Punkten für die Erkennbarkeit, dazu '+(d.punkte-soll)+' von 10 für Passung und Konsistenz'+
    ((soll+(d.punkte-soll))!==d.punkte?' (im Datensatz stehen '+d.punkte+')':'')+'</div>'+karten;
  var extra='';
  if(d.richtung){
    extra+='<div class="row" style="margin-top:18px"><div class="row-l">Richtung des Status</div>'+
      '<div class="row-v"><span class="form-b" style="border-color:'+FARBE_A.T+';color:'+FARBE.T+'">'+esc(d.richtung)+'</span>'+
      '<br><span style="display:inline-block;margin-top:9px">'+esc(d.richtungB||'')+'</span></div></div>';
  }
  if(d.konsistenz){
    extra+='<div class="row" style="margin-bottom:0'+(d.richtung?'':';margin-top:18px')+'"><div class="row-l">Konsistenz</div><div class="row-v">'+esc(d.konsistenz)+'</div></div>';
  }
  document.getElementById('antriebe').innerHTML = karten + extra;
})();

/* ══════════════════════════════════════════════════════════════
   DIMENSION 3: Kauf-Formel
   ══════════════════════════════════════════════════════════════ */
(function(){
  var d=dim('formel'); if(!d) return;
  var b=d.beziehung||{wert:0}, p=d.pain||{wert:0};
  var gerechnet = Math.round(25*(b.wert/5)*(p.wert/5));
  function karte(l,o){
    return '<div class="fk"><div class="fk-l" data-guard="off">'+esc(l)+'</div>'+
      '<div class="fk-n" data-guard="off">'+o.wert+'<s>von 5</s></div>'+
      '<div class="fk-b">'+esc(o.b)+'</div></div>';
  }
  document.getElementById('faktoren').innerHTML = karte('Beziehung, Vertrauen zu dieser Firma',b)+karte('Pain, das bewusste Problem',p);
  document.getElementById('rechnung').innerHTML =
    '25 &times; <b>'+b.wert+'</b>/5 &times; <b>'+p.wert+'</b>/5 = <b>'+gerechnet+'</b> Punkte'+
    (gerechnet!==d.punkte ? ' (im Datensatz stehen '+d.punkte+')' : '');
  var belege=[].concat(b.belege||[]).concat(p.belege||[]);
  var out='';
  if(d.nullstelle){
    out+='<div class="hinweis">'+esc(d.nullstelle)+'</div>';
  }
  if(belege.length){
    out+='<div style="margin-top:18px">'+belege.map(function(z){
      return zitat(z.zitat, z.seite, z.traegt==='ja'?'gut':'schwach');
    }).join('')+'</div>';
  }
  if(d.verstaerker){
    out+='<div class="row" style="margin-top:18px;margin-bottom:0"><div class="row-l">Verstärker</div>'+
      '<div class="row-v"><span class="form-b" style="border-color:'+FARBE_A.E+';color:'+FARBE.E+'">'+esc(d.verstaerker)+'</span>'+
      '<br><span style="display:inline-block;margin-top:9px">'+esc(d.verstaerkerB||'')+'</span></div></div>';
  }
  document.getElementById('formeltext').innerHTML = out;
})();

/* ══════════════════════════════════════════════════════════════
   DIMENSION 4: Bremsen
   ══════════════════════════════════════════════════════════════ */
(function(){
  var d=dim('bremsen'); if(!d) return;
  var rows=(d.bremsen||[]).map(function(x){
    return '<tr><td style="white-space:nowrap">'+esc(x.name)+'</td>'+
      '<td><span class="bed" style="border-color:'+jaA(x.bearbeitet)+';color:'+jaF(x.bearbeitet)+'">'+esc(x.bearbeitet)+'</span></td>'+
      '<td style="min-width:280px">'+esc(x.b)+(x.zitat?zitat(x.zitat,x.seite):'')+'</td>'+
      '<td style="min-width:230px">'+esc(x.hilft||'')+'</td></tr>';
  }).join('');
  document.getElementById('bremstab').innerHTML =
    '<thead><tr><th>Bremse</th><th>Bearbeitet</th><th>Was der Text tut</th><th>Was helfen würde</th></tr></thead><tbody>'+rows+'</tbody>';
})();

/* ══════════════════════════════════════════════════════════════
   SÄTZE
   ══════════════════════════════════════════════════════════════ */
(function(){
  var s=D.saetze||{stark:[],schwach:[]};
  function liste(titel, arr, klasse, mitBesser){
    return '<div class="card"><h3>'+esc(titel)+'</h3>'+
      (arr||[]).map(function(x){
        return '<div style="margin-bottom:18px">'+zitat(x.zitat,x.seite,klasse)+
          '<p style="margin-top:8px">'+esc(x.warum)+'</p>'+
          (mitBesser&&x.besser ? '<div class="besser"><b>So könnte es stehen</b>'+esc(x.besser)+'</div>' : '')+
        '</div>';
      }).join('')+'</div>';
  }
  document.getElementById('saetzelisten').innerHTML =
    liste('Sätze, die tragen', s.stark, 'gut', false)+
    liste('Sätze, die umgeschrieben gehören', s.schwach, 'schwach', true);
})();

/* ══════════════════════════════════════════════════════════════
   MASSNAHMEN
   ══════════════════════════════════════════════════════════════ */
document.getElementById('massn').innerHTML = (D.massnahmen||[]).map(function(m,i){
  return '<div class="th auf" style="border-left-color:var(--brand)">'+
    '<div class="th-head">'+
      '<div><div class="th-t">'+(i+1)+'. '+esc(m.titel)+'</div><div class="wb-s">'+esc(m.warum)+'</div></div>'+
      '<div class="sig-right"><span class="bed" style="border-color:var(--q-a-a);color:var(--q-a)">'+esc(m.aufwand)+'</span><span class="caret">&#9656;</span></div>'+
    '</div>'+
    '<div class="th-body"><div class="row" style="margin-bottom:0"><div class="row-l">Was zu tun ist</div><div class="row-v">'+esc(m.wie)+'</div></div></div>'+
  '</div>';
}).join('');

/* ══════════════════════════════════════════════════════════════
   GRUNDLAGE UND GRENZEN
   ══════════════════════════════════════════════════════════════ */
document.getElementById('seitentab').innerHTML =
  '<thead><tr><th>Seite</th><th>Adresse</th><th>Gewicht</th><th>Wofür sie steht</th><th>Abruf</th></tr></thead><tbody>'+
  (D.seiten||[]).map(function(s){
    return '<tr><td style="white-space:nowrap">'+esc(s.t)+'</td>'+
      '<td style="word-break:break-all">'+esc(s.u)+'</td>'+
      '<td>'+esc(s.g)+'</td><td style="min-width:240px">'+esc(s.b)+'</td>'+
      '<td style="white-space:nowrap"><span class="src-tag" data-guard="off">'+esc(s.d)+'</span></td></tr>';
  }).join('')+'</tbody>';

(function(){
  var z=D.zielgruppe||{};
  document.getElementById('zielg').innerHTML = '<div class="sa">'+
    '<div class="sa-head"><span class="sa-caret">&#9662;</span><div class="sa-id">'+
      '<div class="sa-num" style="border-color:'+FARBE_A.P+';color:'+FARBE.P+'">Z</div>'+
      '<div><div class="sa-name">Die erschlossene Zielgruppe</div>'+
      '<div class="sa-sub" data-guard="off">Sicherheit '+esc(z.sicherheit||'offen')+'</div></div>'+
    '</div></div>'+
    '<div class="sa-body">'+
      '<div class="row"><div class="row-l">Wer angesprochen wird</div><div class="row-v">'+esc(z.wer)+'</div></div>'+
      '<div class="row"><div class="row-l">Woran man das erkennt</div><div class="row-v">'+esc(z.woran)+'</div></div>'+
      '<div class="row" style="margin-bottom:0"><div class="row-l">Was offen bleibt</div><div class="row-v">'+esc(z.luecke)+'</div></div>'+
    '</div></div>';
})();

document.getElementById('warn').innerHTML = '<h3>Grenzen dieses Durchlaufs</h3><ul>'+
  (D.grenzen||[]).map(function(g){return '<li>'+esc(g)+'</li>'}).join('')+'</ul>';

bindeKlapp();

var io=new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.05});
document.querySelectorAll('.fade').forEach(function(el){io.observe(el)});
