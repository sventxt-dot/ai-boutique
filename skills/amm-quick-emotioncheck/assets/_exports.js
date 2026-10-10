/* ══════════════════════════════════════════════════════════════
   EXPORT: Markdown und PDF, beides direkt im Browser gebaut
   ══════════════════════════════════════════════════════════════ */
function stamp(){
  var d=new Date(), p=function(n){return String(n).padStart(2,'0')};
  return {
    file: String(d.getFullYear()).slice(2)+p(d.getMonth()+1)+p(d.getDate()),
    nice: p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear(),
    iso: d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())
  };
}

/* Zellentext fuer Markdown-Tabellen: Trennstriche der Tabelle schuetzen. */
function mz(t){ return String(t==null?'':t).replace(/\|/g,'/').replace(/\s+/g,' ').trim(); }
/* Einzeiliger Fliesstext, damit Zitate eine Blockquote-Zeile bleiben. */
function ez(t){ return String(t==null?'':t).replace(/\s+/g,' ').trim(); }
/* Name einer Leiterstufe. */
function stufenName(n){ var s=STUFEN[n-1]; return s?s.t:''; }
/* Gewichteter Schnitt der Leiterstufe, wie im Report gerechnet. */
function leiterSchnitt(d){
  var gew={hoch:3, mittel:2, niedrig:1}, schwer=0, summe=0;
  (d.bloecke||[]).forEach(function(b){ var g=gew[b.gewicht]||1; schwer+=g; summe+=b.stufe*g; });
  var mittel = schwer ? summe/schwer : 0;
  return {mittel:mittel, stufe:Math.max(1,Math.min(5,Math.round(mittel)))};
}
/* Punkte der Kauf-Formel aus der Multiplikation, nicht aus dem Feld. */
function formelPunkte(d){
  var b=d.beziehung||{wert:0}, p=d.pain||{wert:0};
  return Math.round(25*(b.wert/5)*(p.wert/5));
}
/* Die Rechnung als Zeile, in beiden Exporten gleich. */
function formelZeile(d){
  var b=d.beziehung||{wert:0}, p=d.pain||{wert:0};
  return '25 × '+b.wert+'/5 × '+p.wert+'/5 = '+formelPunkte(d)+' Punkte';
}

function buildMarkdown(){
  var L=[], st=stamp(), u=urteil(SCORE);
  L.push('# Emotions-Check: {{FIRMA_NAME}}');
  L.push('');
  L.push('Geprüfte Adresse: '+D.url);
  L.push('Stand der Erhebung: '+D.stand);
  L.push('Erstellt am '+st.nice+'.');
  L.push('');
  L.push('Bewertet wird ausschließlich, was auf den geprüften Seiten steht. Jede Bewertung hängt an einem wörtlichen Zitat mit Angabe der Seite.');
  L.push('');

  L.push('## Der Score');
  L.push('');
  L.push('**'+SCORE+' von 100 Punkten.** Urteilsband: **'+u[0]+'**');
  L.push('');
  L.push(u[1]);
  L.push('');
  if(D.score!=null && D.score!==SCORE){
    L.push('Hinweis: Der Datensatz nennt '+D.score+' Punkte, die Summe der vier Dimensionen ergibt '+SCORE+'. Maßgeblich ist die Summe.');
    L.push('');
  }
  L.push('| Dimension | Punkte | Maximum | Befund |');
  L.push('|---|---|---|---|');
  D.dimensionen.forEach(function(d){
    L.push('| '+mz(d.name)+' | '+d.punkte+' | '+d.max+' | '+mz(d.kurz)+' |');
  });
  L.push('');

  /* Dimension 1: Leiterstufe */
  var dl=dim('leiter');
  if(dl){
    var ls=leiterSchnitt(dl);
    L.push('## Leiterstufe');
    L.push('');
    L.push(dl.punkte+' von '+dl.max+' Punkten. '+dl.kurz);
    L.push('');
    L.push(dl.b);
    L.push('');
    L.push('Gewichteter Schnitt: **'+ls.mittel.toFixed(1)+' von 5**, das entspricht Stufe **'+ls.stufe+'**: '+stufenName(ls.stufe)+'.');
    L.push('');
    (dl.bloecke||[]).forEach(function(b){
      L.push('### '+b.ort);
      L.push('');
      L.push('Seite: '+b.seite+'. Stufe '+b.stufe+' ('+stufenName(b.stufe)+'). Gewicht: '+b.gewicht+'.');
      L.push('');
      if(b.zitat){
        L.push('> '+ez(b.zitat));
        L.push('>');
        L.push('> Quelle: '+b.seite);
        L.push('');
      }
      L.push('Einordnung: '+b.b);
      L.push('');
    });
  }

  /* Dimension 2: Antrieb */
  var da=dim('antrieb');
  if(da){
    L.push('## Antrieb');
    L.push('');
    L.push(da.punkte+' von '+da.max+' Punkten. '+da.kurz);
    L.push('');
    L.push(da.b);
    L.push('');
    (da.antriebe||[]).forEach(function(a){
      L.push('### '+a.name+': '+a.wert+' von 100');
      L.push('');
      L.push('Barometer: '+a.wert+' von 100, Hebel '+(a.hebel||'offen')+'.');
      L.push('');
      L.push('Einordnung: '+a.b);
      L.push('');
      (a.belege||[]).forEach(function(z){
        L.push('> '+ez(z.zitat));
        L.push('>');
        L.push('> Quelle: '+(z.seite||'')+', wirkt: '+(z.wirkt||''));
        L.push('');
        if(z.b){ L.push(z.b); L.push(''); }
      });
      if(a.potential){
        L.push('**Potential:** '+a.potential);
        L.push('');
      }
    });
    if(da.richtung){
      L.push('Richtung des Status: **'+da.richtung+'**. '+(da.richtungB||''));
      L.push('');
    }
    if(da.konsistenz){
      L.push('Konsistenz: '+da.konsistenz);
      L.push('');
    }
  }

  /* Dimension 3: Kauf-Formel */
  var df=dim('formel');
  if(df){
    var fb=df.beziehung||{wert:0}, fp=df.pain||{wert:0};
    L.push('## Kauf-Formel');
    L.push('');
    L.push(df.punkte+' von '+df.max+' Punkten. '+df.kurz);
    L.push('');
    L.push(df.b);
    L.push('');
    L.push('- **Beziehung: '+fb.wert+' von 5.** '+(fb.b||''));
    L.push('- **Pain: '+fp.wert+' von 5.** '+(fp.b||''));
    L.push('');
    L.push('Rechnung: '+formelZeile(df));
    if(formelPunkte(df)!==df.punkte){
      L.push('');
      L.push('Hinweis: Im Datensatz stehen '+df.punkte+' Punkte, die Multiplikation ergibt '+formelPunkte(df)+'.');
    }
    L.push('');
    if(df.nullstelle){
      L.push('Nullstelle: '+df.nullstelle);
      L.push('');
    }
    var belege=[].concat(fb.belege||[]).concat(fp.belege||[]);
    if(belege.length){
      L.push('### Belege');
      L.push('');
      belege.forEach(function(z){
        L.push('> '+ez(z.zitat));
        L.push('>');
        L.push('> Quelle: '+(z.seite||'')+'. Trägt: '+(z.traegt||''));
        L.push('');
      });
    }
    if(df.verstaerker){
      L.push('Verstärker: **'+df.verstaerker+'**. '+(df.verstaerkerB||''));
      L.push('');
    }
  }

  /* Dimension 4: Bremsen */
  var db=dim('bremsen');
  if(db){
    L.push('## Bremsen');
    L.push('');
    L.push(db.punkte+' von '+db.max+' Punkten. '+db.kurz);
    L.push('');
    L.push(db.b);
    L.push('');
    L.push('| Bremse | Bearbeitet | Was der Text tut | Was helfen würde |');
    L.push('|---|---|---|---|');
    (db.bremsen||[]).forEach(function(x){
      var tut=mz(x.b)+(x.zitat ? ' Zitat: „'+mz(x.zitat)+'“ ('+mz(x.seite||'')+')' : '');
      L.push('| '+mz(x.name)+' | '+mz(x.bearbeitet)+' | '+tut+' | '+mz(x.hilft||'')+' |');
    });
    L.push('');
  }

  /* Die Sätze */
  var sa=D.saetze||{stark:[],schwach:[]};
  L.push('## Die Sätze');
  L.push('');
  L.push('### Sätze, die tragen');
  L.push('');
  (sa.stark||[]).forEach(function(x){
    L.push('> '+ez(x.zitat));
    L.push('>');
    L.push('> Quelle: '+(x.seite||''));
    L.push('');
    L.push(x.warum);
    L.push('');
  });
  L.push('### Sätze, die umgeschrieben gehören');
  L.push('');
  (sa.schwach||[]).forEach(function(x){
    L.push('> '+ez(x.zitat));
    L.push('>');
    L.push('> Quelle: '+(x.seite||''));
    L.push('');
    L.push(x.warum);
    L.push('');
    if(x.besser){
      L.push('So könnte es stehen: '+x.besser);
      L.push('');
    }
  });

  /* Maßnahmen */
  L.push('## Maßnahmen');
  L.push('');
  (D.massnahmen||[]).forEach(function(m,i){
    L.push('### '+(i+1)+'. '+m.titel);
    L.push('');
    L.push('- Warum: '+m.warum);
    L.push('- Wie: '+m.wie);
    L.push('- Aufwand: '+m.aufwand);
    L.push('');
  });

  /* Grundlage */
  L.push('## Die geprüften Seiten');
  L.push('');
  L.push('| Seite | Adresse | Gewicht | Wofür sie steht | Abruf |');
  L.push('|---|---|---|---|---|');
  (D.seiten||[]).forEach(function(s){
    L.push('| '+mz(s.t)+' | '+mz(s.u)+' | '+mz(s.g)+' | '+mz(s.b)+' | '+mz(s.d)+' |');
  });
  L.push('');

  var z=D.zielgruppe||{};
  L.push('## Die erschlossene Zielgruppe');
  L.push('');
  L.push('- Wer angesprochen wird: '+(z.wer||''));
  L.push('- Woran man das erkennt: '+(z.woran||''));
  L.push('- Sicherheit: '+(z.sicherheit||'offen'));
  L.push('- Was offen bleibt: '+(z.luecke||''));
  L.push('');

  L.push('## Grenzen dieses Durchlaufs');
  L.push('');
  (D.grenzen||[]).forEach(function(g){ L.push('- '+g); });
  L.push('');
  L.push('---');
  L.push('');
  L.push('(c) {{FOOTER}}. Alle Rechte vorbehalten.');
  return L.join('\n');
}

/* Minimaler PDF-1.4-Writer: Helvetica mit WinAnsiEncoding traegt ae/oe/ue/ss. */
function buildPdf(){
  var W=595.28, H=841.89, M=54;
  var pages=[], ops=[], y=H-M;
  function hex2rgb(h){return [parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255]}
  function pesc(s){return s.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
  /* WinAnsi kennt die typografischen Zeichen, sie liegen dort aber auf Bytes
     zwischen 128 und 159 und nicht auf ihrem Unicode-Punkt. Ohne diese Tabelle
     wird aus jedem Anfuehrungszeichen ein Fragezeichen, und ein Report, der aus
     Zitaten besteht, verliert seine Anfuehrungszeichen komplett. Zeichen ohne
     WinAnsi-Entsprechung werden lesbar ersetzt statt weggeworfen. */
  var WA={'\u201a':'\u0082','\u201e':'\u0084','\u2026':'\u0085',
          '\u2020':'\u0086','\u2021':'\u0087','\u2030':'\u0089',
          '\u2039':'\u008b','\u2018':'\u0091','\u2019':'\u0092',
          '\u201c':'\u0093','\u201d':'\u0094','\u2022':'\u0095',
          '\u2013':'\u0096','\u2014':'\u0097','\u203a':'\u009b',
          '\u20ac':'\u0080','\u2192':'->','\u2190':'<-','\u2265':'>=',
          '\u2264':'<=','\u00d7':'x','\u2011':'-','\u00ad':''};
  function toLatin(s){
    var o='';s=String(s==null?'':s);
    for(var i=0;i<s.length;i++){
      var z=s[i]; if(WA[z]!==undefined){o+=WA[z];continue}
      var c=s.charCodeAt(i); o+=(c>=32&&c<=255)?z:'?';
    }
    return o
  }
  function newPage(){if(ops.length)pages.push(ops);ops=[];y=H-M}
  function need(h){if(y-h<M+26)newPage()}
  function text(str,x,size,font,rgb){
    ops.push(rgb[0].toFixed(3)+' '+rgb[1].toFixed(3)+' '+rgb[2].toFixed(3)+' rg');
    ops.push('BT /'+font+' '+size+' Tf 1 0 0 1 '+x.toFixed(2)+' '+y.toFixed(2)+' Tm ('+pesc(toLatin(str))+') Tj ET');
  }
  function rect(x,ry,w,h,rgb){
    ops.push(rgb[0].toFixed(3)+' '+rgb[1].toFixed(3)+' '+rgb[2].toFixed(3)+' rg');
    ops.push(x.toFixed(2)+' '+ry.toFixed(2)+' '+w.toFixed(2)+' '+h.toFixed(2)+' re f');
  }
  function wrap(str,size,width){
    var words=toLatin(str).split(/\s+/), lines=[], line='';
    var maxChars=Math.max(8,Math.floor(width/(size*0.5)));
    for(var i=0;i<words.length;i++){
      var t=line?line+' '+words[i]:words[i];
      if(t.length>maxChars&&line){lines.push(line);line=words[i]}else line=t;
    }
    if(line)lines.push(line);
    return lines;
  }
  function para(str,x,size,font,rgb,lh,width){
    var lines=wrap(str,size,width);
    for(var i=0;i<lines.length;i++){ need(lh); text(lines[i],x,size,font,rgb); y-=lh; }
  }
  var BLACK=[.07,.07,.07], DARK=[.2,.2,.2], GREY=[.45,.45,.45], GOLD=[.54,.48,0], YELLOW=hex2rgb('#FAEF70');
  var BUL=String.fromCharCode(149)+'  ';
  var CW=W-2*M, st=stamp();
  var u=urteil(SCORE);

  text('{{FIRMA_MARKE}}',M,24,'FB',BLACK); y-=15;
  text('EMOTIONS-CHECK  ·  WERBETEXTE',M,8,'FB',GOLD);
  text('kilernen.de  ·  Agentic Marketing Masterclass',W-M-200,8.5,'F',GREY); y-=12;
  text('Erstellt am '+st.nice,W-M-200,8.5,'F',GREY); y-=14;
  rect(M,y,CW,3,YELLOW); y-=30;

  text(SCORE+' von 100 Punkten: '+u[0],M,20,'FB',BLACK); y-=20;
  para(u[1],M,9.5,'F',DARK,13,CW); y-=6;
  para('Geprüfte Adresse: '+D.url+'.  Stand der Erhebung: '+D.stand+'.',M,8.5,'F',GREY,11,CW);
  para('Bewertet wird ausschließlich, was auf den geprüften Seiten steht. Jede Bewertung hängt an '+
       'einem wörtlichen Zitat mit Angabe der Seite.',M,8.5,'FI',GREY,11,CW); y-=10;
  if(D.score!=null && D.score!==SCORE){
    para('Hinweis: Der Datensatz nennt '+D.score+' Punkte, die Summe der vier Dimensionen ergibt '+SCORE+'. Maßgeblich ist die Summe.',M,8.5,'FB',DARK,11,CW);
    y-=8;
  }

  need(60); text('DIE VIER DIMENSIONEN',M,8,'FB',GOLD); y-=13;
  D.dimensionen.forEach(function(d){
    need(24);
    rect(M,y-1.5,8,8,hex2rgb(FARBE_PDF[d.f]));
    para(d.name+': '+d.punkte+' von '+d.max+' Punkten',M+15,8.5,'FB',BLACK,11,CW-15);
    para(d.kurz,M+15,8.5,'F',DARK,11,CW-15);
    y-=4;
  });

  /* Dimension 1: Leiterstufe */
  var dl=dim('leiter');
  if(dl){
    newPage();
    rect(M,y-1.5,8,8,hex2rgb(FARBE_PDF[dl.f]));
    text('LEITERSTUFE',M+15,11,'FB',BLACK); y-=8;
    rect(M,y,CW,1,[.85,.85,.85]); y-=18;
    var ls=leiterSchnitt(dl);
    para(dl.punkte+' von '+dl.max+' Punkten. '+dl.kurz,M,9.5,'FB',BLACK,12,CW);
    para(dl.b,M,8.5,'F',DARK,11,CW);
    para('Gewichteter Schnitt '+ls.mittel.toFixed(1)+' von 5, das entspricht Stufe '+ls.stufe+': '+stufenName(ls.stufe)+'.',M,8.5,'FB',DARK,11,CW);
    y-=8;
    (dl.bloecke||[]).forEach(function(b){
      need(50);
      text(String(b.ort).toUpperCase()+'  (STUFE '+b.stufe+')',M,8,'FB',GOLD); y-=13;
      para(b.seite+', Gewicht '+b.gewicht+', Stufe '+b.stufe+': '+stufenName(b.stufe),M,8,'FI',GREY,10,CW);
      if(b.zitat) para('„'+ez(b.zitat)+'“',M+11,8.5,'FI',DARK,11,CW-11);
      para('Einordnung: '+b.b,M+11,8.5,'F',DARK,11,CW-11);
      y-=6;
    });
  }

  /* Dimension 2: Antrieb */
  var da=dim('antrieb');
  if(da){
    newPage();
    rect(M,y-1.5,8,8,hex2rgb(FARBE_PDF[da.f]));
    text('ANTRIEB',M+15,11,'FB',BLACK); y-=8;
    rect(M,y,CW,1,[.85,.85,.85]); y-=18;
    para(da.punkte+' von '+da.max+' Punkten. '+da.kurz,M,9.5,'FB',BLACK,12,CW);
    para(da.b,M,8.5,'F',DARK,11,CW);
    y-=8;
    (da.antriebe||[]).forEach(function(a){
      need(56);
      text(String(a.name).toUpperCase()+'  '+a.wert+' VON 100  ·  HEBEL '+String(a.hebel||'offen').toUpperCase(),M,8,'FB',GOLD); y-=11;
      // Das Barometer als Balken, damit das PDF dieselbe Aussage traegt wie der Report.
      rect(M,y,CW,5,[.86,.86,.88]);
      rect(M,y,CW*Math.max(2,Math.min(100,a.wert))/100,5,YELLOW); y-=13;
      para('Einordnung: '+a.b,M+11,8.5,'F',DARK,11,CW-11);
      (a.belege||[]).forEach(function(z){
        need(30);
        para('„'+ez(z.zitat)+'“',M+11,8.5,'FI',DARK,11,CW-11);
        para(String(z.seite||'')+', wirkt: '+String(z.wirkt||''),M+11,7.5,'F',GREY,10,CW-11);
        if(z.b) para(z.b,M+11,8.5,'F',DARK,11,CW-11);
        y-=3;
      });
      if(a.potential){
        need(30);
        para(BUL+'Potential: '+a.potential,M+11,8.5,'F',DARK,11,CW-11);
      }
      y-=8;
    });
    if(da.richtung){
      need(34);
      para(BUL+'Richtung des Status: '+da.richtung,M,8.5,'FB',BLACK,11,CW);
      if(da.richtungB) para(da.richtungB,M+11,8.5,'F',DARK,11,CW-11);
      y-=4;
    }
    if(da.konsistenz){
      need(28);
      para(BUL+'Konsistenz: '+da.konsistenz,M,8.5,'F',DARK,11,CW);
      y-=4;
    }
  }

  /* Dimension 3: Kauf-Formel */
  var df=dim('formel');
  if(df){
    newPage();
    rect(M,y-1.5,8,8,hex2rgb(FARBE_PDF[df.f]));
    text('KAUF-FORMEL',M+15,11,'FB',BLACK); y-=8;
    rect(M,y,CW,1,[.85,.85,.85]); y-=18;
    var fb=df.beziehung||{wert:0}, fp=df.pain||{wert:0};
    para(df.punkte+' von '+df.max+' Punkten. '+df.kurz,M,9.5,'FB',BLACK,12,CW);
    para(df.b,M,8.5,'F',DARK,11,CW);
    y-=6;
    need(40);
    para(BUL+'Beziehung, Vertrauen zu dieser Firma: '+fb.wert+' von 5',M,8.5,'FB',BLACK,11,CW);
    para(fb.b||'',M+11,8.5,'F',DARK,11,CW-11);
    para(BUL+'Pain, das bewusste Problem: '+fp.wert+' von 5',M,8.5,'FB',BLACK,11,CW);
    para(fp.b||'',M+11,8.5,'F',DARK,11,CW-11);
    y-=4;
    need(24);
    para('Rechnung: '+formelZeile(df),M,9.5,'FB',BLACK,12,CW);
    if(formelPunkte(df)!==df.punkte){
      para('Im Datensatz stehen '+df.punkte+' Punkte, die Multiplikation ergibt '+formelPunkte(df)+'.',M,8,'FI',GREY,11,CW);
    }
    y-=4;
    if(df.nullstelle){
      need(26);
      para('Nullstelle: '+df.nullstelle,M,8.5,'FB',DARK,11,CW);
      y-=4;
    }
    var belege=[].concat(fb.belege||[]).concat(fp.belege||[]);
    if(belege.length){
      need(40); text('BELEGE',M,8,'FB',GOLD); y-=13;
      belege.forEach(function(z){
        need(26);
        para('„'+ez(z.zitat)+'“',M+11,8.5,'FI',DARK,11,CW-11);
        para((z.seite||'')+', trägt: '+(z.traegt||''),M+22,7.5,'F',GREY,10,CW-22);
        y-=3;
      });
      y-=4;
    }
    if(df.verstaerker){
      need(28);
      para(BUL+'Verstärker: '+df.verstaerker,M,8.5,'FB',BLACK,11,CW);
      if(df.verstaerkerB) para(df.verstaerkerB,M+11,8.5,'F',DARK,11,CW-11);
      y-=4;
    }
  }

  /* Dimension 4: Bremsen */
  var db=dim('bremsen');
  if(db){
    newPage();
    rect(M,y-1.5,8,8,hex2rgb(FARBE_PDF[db.f]));
    text('BREMSEN',M+15,11,'FB',BLACK); y-=8;
    rect(M,y,CW,1,[.85,.85,.85]); y-=18;
    para(db.punkte+' von '+db.max+' Punkten. '+db.kurz,M,9.5,'FB',BLACK,12,CW);
    para(db.b,M,8.5,'F',DARK,11,CW);
    y-=8;
    (db.bremsen||[]).forEach(function(x){
      need(40);
      para(BUL+x.name+'  (bearbeitet '+x.bearbeitet+')',M,8.5,'FB',BLACK,11,CW);
      para('Was der Text tut: '+x.b,M+11,8.5,'F',DARK,11,CW-11);
      if(x.zitat) para('„'+ez(x.zitat)+'“  ('+(x.seite||'')+')',M+11,8,'FI',GREY,10.5,CW-11);
      if(x.hilft) para('Was helfen würde: '+x.hilft,M+11,8.5,'F',DARK,11,CW-11);
      y-=5;
    });
  }

  /* Die Sätze */
  var sa=D.saetze||{stark:[],schwach:[]};
  newPage();
  text('DIE SÄTZE',M,11,'FB',BLACK); y-=6;
  rect(M,y,CW,1,[.85,.85,.85]); y-=18;
  need(30); text('SÄTZE, DIE TRAGEN',M,8,'FB',GOLD); y-=13;
  (sa.stark||[]).forEach(function(x){
    need(34);
    para('„'+ez(x.zitat)+'“',M+11,9,'FI',BLACK,11.5,CW-11);
    para((x.seite||''),M+22,7.5,'F',GREY,10,CW-22);
    para(x.warum,M+11,8.5,'F',DARK,11,CW-11);
    y-=5;
  });
  y-=4;
  need(30); text('SÄTZE, DIE UMGESCHRIEBEN GEHÖREN',M,8,'FB',GOLD); y-=13;
  (sa.schwach||[]).forEach(function(x){
    need(46);
    para('„'+ez(x.zitat)+'“',M+11,9,'FI',BLACK,11.5,CW-11);
    para((x.seite||''),M+22,7.5,'F',GREY,10,CW-22);
    para(x.warum,M+11,8.5,'F',DARK,11,CW-11);
    if(x.besser) para('So könnte es stehen: '+x.besser,M+11,8.5,'FB',DARK,11,CW-11);
    y-=6;
  });

  /* Maßnahmen */
  newPage();
  text('MASSNAHMEN',M,11,'FB',BLACK); y-=6;
  rect(M,y,CW,1,[.85,.85,.85]); y-=18;
  (D.massnahmen||[]).forEach(function(m,i){
    need(46);
    para((i+1)+'. '+m.titel,M,9.5,'FB',BLACK,12,CW);
    para('Warum: '+m.warum,M+11,8.5,'F',DARK,11,CW-11);
    para('Wie: '+m.wie,M+11,8.5,'F',DARK,11,CW-11);
    para('Aufwand: '+m.aufwand,M+11,8,'FI',GREY,10.5,CW-11);
    y-=6;
  });

  /* Grundlage und Grenzen */
  y-=6;
  need(40); text('DIE GEPRÜFTEN SEITEN',M,11,'FB',BLACK); y-=6;
  rect(M,y,CW,1,[.85,.85,.85]); y-=18;
  (D.seiten||[]).forEach(function(s){
    need(32);
    para(BUL+s.t+'  (Gewicht '+s.g+', Abruf '+s.d+')',M,8.5,'FB',BLACK,11,CW);
    para(s.u,M+11,7.5,'F',GREY,10,CW-11);
    para(s.b,M+11,8.5,'F',DARK,11,CW-11);
    y-=3;
  });
  y-=8;

  var z=D.zielgruppe||{};
  need(60); text('DIE ERSCHLOSSENE ZIELGRUPPE',M,11,'FB',BLACK); y-=6;
  rect(M,y,CW,1,[.85,.85,.85]); y-=18;
  para(BUL+'Wer angesprochen wird: '+(z.wer||''),M,8.5,'F',DARK,11,CW);
  para(BUL+'Woran man das erkennt: '+(z.woran||''),M,8.5,'F',DARK,11,CW);
  para(BUL+'Sicherheit: '+(z.sicherheit||'offen'),M,8.5,'F',DARK,11,CW);
  para(BUL+'Was offen bleibt: '+(z.luecke||''),M,8.5,'FB',DARK,11,CW);
  y-=10;

  need(50); text('GRENZEN DIESES DURCHLAUFS',M,11,'FB',BLACK); y-=6;
  rect(M,y,CW,1,[.85,.85,.85]); y-=18;
  (D.grenzen||[]).forEach(function(g){ need(24); para(BUL+g,M,8.5,'F',DARK,11,CW); y-=5; });
  newPage();

  var objs=[];
  objs.push('<< /Type /Catalog /Pages 2 0 R >>');
  var kids=[];
  for(var p=0;p<pages.length;p++) kids.push((6+p*2)+' 0 R');
  objs.push('<< /Type /Pages /Count '+pages.length+' /Kids ['+kids.join(' ')+'] >>');
  objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');
  for(var p2=0;p2<pages.length;p2++){
    var foot=[];
    foot.push('0.55 0.55 0.55 rg');
    foot.push('BT /F 8 Tf 1 0 0 1 '+M+' '+(M-14)+' Tm ('+pesc(toLatin('© {{FOOTER}}  ·  Alle Rechte vorbehalten'))+') Tj ET');
    foot.push('BT /F 8 Tf 1 0 0 1 '+(W-M-52)+' '+(M-14)+' Tm ('+pesc('Seite '+(p2+1)+'/'+pages.length)+') Tj ET');
    var stream=pages[p2].concat(foot).join('\n');
    objs.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+W+' '+H+'] '+
      '/Resources << /Font << /F 3 0 R /FB 4 0 R /FI 5 0 R >> >> /Contents '+(7+p2*2)+' 0 R >>');
    objs.push('<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream');
  }
  var out='%PDF-1.4\n', offsets=[];
  for(var o=0;o<objs.length;o++){ offsets.push(out.length); out+=(o+1)+' 0 obj\n'+objs[o]+'\nendobj\n'; }
  var xref=out.length;
  out+='xref\n0 '+(objs.length+1)+'\n0000000000 65535 f \n';
  for(var x=0;x<offsets.length;x++) out+=String(offsets[x]).padStart(10,'0')+' 00000 n \n';
  out+='trailer\n<< /Size '+(objs.length+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
  var bytes=new Uint8Array(out.length);
  for(var b=0;b<out.length;b++) bytes[b]=out.charCodeAt(b)&0xFF;
  return bytes;
}

function lade(blob,name){
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){URL.revokeObjectURL(a.href)},2000);
}
document.getElementById('btnPdf').addEventListener('click',function(){
  lade(new Blob([buildPdf()],{type:'application/pdf'}), stamp().file+' emotions-check-{{FIRMA_SLUG}}.pdf');
});
document.getElementById('btnMd').addEventListener('click',function(){
  lade(new Blob([buildMarkdown()],{type:'text/markdown;charset=utf-8'}), stamp().file+' emotions-check-{{FIRMA_SLUG}}.md');
});
document.getElementById('btnCopy').addEventListener('click',function(){
  var b=this, l=b.textContent;
  navigator.clipboard.writeText(buildMarkdown()).then(function(){
    b.textContent='Kopiert'; setTimeout(function(){b.textContent=l},1800);
  });
});
