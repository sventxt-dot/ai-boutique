#!/bin/zsh
# Visuelle QA: findet Text, der aus seinem Container laeuft, und rendert Screenshots.
#
#   .claude/skills/amm-quick-emotioncheck/assets/qa-visual.sh "<slide.html>" [ausgabeordner]
#
# Teil 1  GEOMETRIE (headless Chrome, --dump-dom)
#   UEBERLAUF  ein HTML-Element ist breiter oder hoeher als sein Kasten
#   RAUSGEFALLEN  ein Kind ragt seitlich aus dem Elternelement heraus
#   PASST-NICHT  ein SVG-Text mit data-fit="<id-eines-kreises>" passt nicht in
#                diesen Kreis (Sicherheitsabstand 10 Nutzereinheiten)
#
# Teil 2  SCREENSHOTS (playwright) in 1440, 1024 und 620 Pixel Breite.
#         Danach die PNGs ansehen: der Geometrie-Check findet nur harte Fehler,
#         nicht haessliche Abstaende.
SLIDE="$1"
case "$SLIDE" in /*) ;; *) SLIDE="$PWD/$SLIDE";; esac
DIR=$(dirname "$SLIDE")
BASE=$(basename "$SLIDE" .html)
OUT="${2:-$DIR}"
TMP="$DIR/.qv-$BASE.html"

REPORTER='
<script>
setTimeout(function(){
  var out=[];
  var SKIP=/^(SCRIPT|STYLE|IFRAME|VIDEO|IMG|INPUT|TEXTAREA|SELECT|OPTION)$/;

  // 1. HTML: Inhalt breiter oder hoeher als der eigene Kasten
  var all=document.body.querySelectorAll("*");
  for(var i=0;i<all.length;i++){
    var el=all[i];
    if(SKIP.test(el.tagName)||el.namespaceURI!=="http://www.w3.org/1999/xhtml")continue;
    var cs=getComputedStyle(el);
    if(cs.display==="none"||cs.overflow!=="visible")continue;
    var txt=(el.textContent||"").trim().replace(/\s+/g," ").slice(0,42);
    if(el.scrollWidth>el.clientWidth+1&&el.clientWidth>0)
      out.push("UEBERLAUF     ["+el.scrollWidth+">"+el.clientWidth+"] "+(el.className||el.tagName)+" :: "+txt);
    var r=el.getBoundingClientRect(), pr=el.parentElement?el.parentElement.getBoundingClientRect():null;
    if(pr&&pr.width>0&&getComputedStyle(el.parentElement).overflow==="visible"){
      if(r.left<pr.left-1.5||r.right>pr.right+1.5)
        out.push("RAUSGEFALLEN  "+(el.className||el.tagName)+" :: "+txt);
    }
  }

  // 2. SVG-Text, der in einen Kreis passen muss: data-fit="<id des Kreises>"
  var fits=document.querySelectorAll("[data-fit]");
  for(var f=0;f<fits.length;f++){
    var t=fits[f], circ=document.getElementById(t.getAttribute("data-fit"));
    if(!circ)continue;
    var b=t.getBBox();
    var cx=parseFloat(circ.getAttribute("cx")), cy=parseFloat(circ.getAttribute("cy"));
    var rr=parseFloat(circ.getAttribute("r"))-10;
    var pts=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]];
    var worst=0;
    for(var k=0;k<4;k++){
      var d=Math.hypot(pts[k][0]-cx,pts[k][1]-cy);
      if(d>worst)worst=d;
    }
    if(worst>rr)
      out.push("PASST-NICHT   ["+Math.round(worst)+" von "+Math.round(rr)+"] "+(t.textContent||"").trim());
  }

  var pre=document.createElement("pre"); pre.id="qv";
  pre.textContent = out.length ? out.join("\n") : "SAUBER";
  document.body.appendChild(pre);
},1800);
</script>
'

python3 - "$SLIDE" "$TMP" "$REPORTER" <<'PY'
import io,sys,re
src,dst,rep=sys.argv[1],sys.argv[2],sys.argv[3]
h=io.open(src,encoding="utf-8").read()
h=re.sub(r'<video[^>]*>\s*</video>','',h)
io.open(dst,"w",encoding="utf-8").write(h.replace("</body>",rep+"</body>"))
PY

for W in 1440 1024 620; do
  RES=$("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
    --window-size=$W,1000 --virtual-time-budget=6000 --dump-dom "file://$TMP" 2>/dev/null \
    | python3 -c "
import sys,re,html
s=sys.stdin.read()
m=re.search(r'<pre id=\"qv\">(.*?)</pre>', s, re.S)
print(html.unescape(m.group(1)) if m else 'KEIN REPORT')
")
  echo "── ${W}px ──"
  echo "$RES"
done
rm -f "$TMP"

# Screenshots immer mit hohem Fenster aufnehmen, nie mit --full-page:
# die Sektionen starten auf opacity 0 und werden erst vom IntersectionObserver
# eingeblendet. Ein Full-Page-Shot mit kleinem Viewport liefert leere Flaechen.
for W in 1440 1024 620; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
    --hide-scrollbars --window-size=$W,7000 --virtual-time-budget=5000 \
    --screenshot="$OUT/.shot-$W.png" "file://$SLIDE" >/dev/null 2>&1
done
echo "Screenshots: $OUT/.shot-1440.png, .shot-1024.png, .shot-620.png"
