#!/bin/zsh
# QA: prueft eine Slide ueber mehrere Viewport-Breiten auf Umbruchfehler.
# Meldet: EINWORT (Zeile mit einem Wort), KURZ (Heading-Zeile unter drei Woertern),
#         TREPPE (letzte Zeile fuellt unter 30% der Breite),
#         DELLE  (eine Zeile mittendrin faellt unter 62% und zerreisst die rechte Kante).
# Prueft ALLE Textelemente der Seite, nicht nur eine Selektorliste.
# Aufruf: .claude/skills/amm-quick-emotioncheck/assets/qa-umbruch.sh "<pfad-zur-slide.html>"
SLIDE="$1"
case "$SLIDE" in /*) ;; *) SLIDE="$PWD/$SLIDE";; esac
DIR=$(dirname "$SLIDE")
BASE=$(basename "$SLIDE" .html)
TMP="$DIR/.qa-$BASE.html"

REPORTER='
<script>
setTimeout(function(){
  var SKIP=/^(SCRIPT|STYLE|SVG|PATH|CIRCLE|LINE|POLYLINE|RECT|CODE|PRE|IFRAME|VIDEO|IMG|INPUT|TEXTAREA|SELECT|OPTION)$/;
  function cands(){
    var out=[],all=document.body.querySelectorAll("*");
    for(var i=0;i<all.length;i++){var el=all[i];
      if(SKIP.test(el.tagName))continue;
      if(el.getAttribute("data-guard")==="off")continue;
      if(el.closest(".topbar")||el.closest(".site-footer"))continue;
      if(el.textContent.trim().length<24)continue;
      if(getComputedStyle(el).display==="inline")continue;
      var hasText=false,hasBlock=false;
      for(var c=0;c<el.childNodes.length;c++){var n=el.childNodes[c];
        if(n.nodeType===3&&n.nodeValue.trim())hasText=true;
        if(n.nodeType===1&&!SKIP.test(n.tagName)){var d=getComputedStyle(n).display;
          if(d!=="inline"&&d!=="inline-block"&&d!=="contents")hasBlock=true;}}
      if(hasText&&!hasBlock)out.push(el);}
    return out;
  }
  function lines(el){
    var w=[],tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),n;
    while((n=tw.nextNode())){ if(!n.nodeValue.trim())continue;
      var t=n.nodeValue,s=-1;
      for(var c=0;c<=t.length;c++){var sp=c===t.length||/[\s ]/.test(t[c]);
        if(!sp&&s===-1)s=c;
        if(sp&&s!==-1){var r=document.createRange();r.setStart(n,s);r.setEnd(n,c);
          var rc=r.getBoundingClientRect(); if(rc.width||rc.height)w.push({top:Math.round(rc.top),l:rc.left,r:rc.right}); s=-1;}}}
    var ls=[];
    for(var i=0;i<w.length;i++){var last=ls[ls.length-1];
      if(last&&Math.abs(last.top-w[i].top)<=3){last.n++;last.r=w[i].r;}
      else ls.push({top:w[i].top,n:1,l:w[i].l,r:w[i].r});}
    return ls;
  }
  var out=[],els=cands();
  for(var i=0;i<els.length;i++){
    var el=els[i],ls=lines(el); if(ls.length<2)continue;
    var isH=/^H[1-6]$/.test(el.tagName);
    var min=Infinity,widest=0;
    for(var k=0;k<ls.length;k++){min=Math.min(min,ls[k].n);widest=Math.max(widest,ls[k].r-ls[k].l);}
    var last=ls[ls.length-1], ratio=widest?(last.r-last.l)/widest:1;
    var mid=1;
    for(var m=0;m<ls.length-1;m++) mid=Math.min(mid,widest?(ls[m].r-ls[m].l)/widest:1);
    var counts=ls.map(function(x){return x.n;}).join(",");
    var txt=el.textContent.trim().replace(/\s+/g," ").slice(0,58);
    if(min<2) out.push("EINWORT ["+counts+"] "+txt);
    else if(isH&&min<3) out.push("KURZ    ["+counts+"] "+txt);
    else if(ratio<0.3) out.push("TREPPE  ["+Math.round(ratio*100)+"%] "+txt);
    else if(mid<0.62) out.push("DELLE   ["+Math.round(mid*100)+"%] "+txt);
  }
  var pre=document.createElement("pre"); pre.id="qa";
  pre.textContent = out.length ? out.join("\n") : "SAUBER";
  document.body.appendChild(pre);
},2200);
</script>
'
python3 - "$SLIDE" "$TMP" "$REPORTER" <<'PY'
import io,sys,re
src,dst,rep = sys.argv[1],sys.argv[2],sys.argv[3]
h = io.open(src,encoding="utf-8").read()
# Videos entfernen: sie halten die virtuelle Zeit im Headless-Chrome an
h = re.sub(r'<video[^>]*>\s*</video>', '', h)
io.open(dst,"w",encoding="utf-8").write(h.replace("</body>", rep+"</body>"))
PY

for W in 1440 1200 1024 860 620; do
  RES=$("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
    --window-size=$W,1000 --virtual-time-budget=7000 --dump-dom "file://$TMP" 2>/dev/null \
    | python3 -c "
import sys,re,html
s=sys.stdin.read()
m=re.search(r'<pre id=\"qa\">(.*?)</pre>', s, re.S)
print(html.unescape(m.group(1)) if m else 'KEIN REPORT')
")
  echo "── ${W}px ──"
  echo "$RES"
done
rm -f "$TMP"
