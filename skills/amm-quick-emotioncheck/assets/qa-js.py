#!/usr/bin/env python3
"""Prueft den Emotions-Check-Report auf JavaScript-Fehler und leere Sektionen.

Der Report rendert vollstaendig aus Daten. Ein Tippfehler laesst dann eine ganze
Sektion leer, ohne dass die statische QA anschlaegt. Dieses Skript findet das.

    python3 qa-js.py <report.html> [zustand ...]

Ohne Angabe laufen alle Zustaende: Start, heller Modus, alle Karten aufgeklappt.
Zulaessige Zustaende: hell, auf, zu, sowie "" fuer den Startzustand. Exit 1,
sobald ein Zustand nicht SAUBER meldet.

Der Zustand auf ist Pflicht: die Belegzitate werden erst im aufgeklappten
Zustand gerendert, und sie sind der eigentliche Inhalt dieses Reports.
"""
import html
import os
import re
import subprocess
import sys
import tempfile

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
IDS = ["stats", "dims", "dimtext", "leiterstufen", "leiterbloecke", "antriebe",
       "faktoren", "rechnung", "formeltext", "bremstab", "saetzelisten", "massn",
       "seitentab", "zielg", "warn"]

VOR = {
    "hell": "document.body.classList.add('hell');",
    "auf": "document.querySelectorAll('.wb-head,.th-head').forEach(function(h){h.click()});",
    "zu": "document.querySelectorAll('.sa-head').forEach(function(h){h.click()});",
    "": "",
}

HORCHER = """<script>
window.__err=[];
window.addEventListener('error',function(e){window.__err.push(e.message+' @ Zeile '+e.lineno)});
</script>
"""

REPORTER = """
<script>
setTimeout(function(){ try{ %%VOR%% }catch(e){ window.__err.push('Vorbereitung: '+e.message) } },900);
setTimeout(function(){
  var out=[];
  (window.__err||[]).forEach(function(m){out.push('JS-FEHLER   '+m)});
  var ids=%%IDS%%;
  ids.forEach(function(id){
    var el=document.getElementById(id);
    if(!el) out.push('FEHLT       #'+id);
    else if(!el.children.length && !el.textContent.trim()) out.push('LEER        #'+id);
  });
  out.push('Score       ' + document.getElementById('scN').textContent +
           ' | ' + document.getElementById('scT').textContent);
  out.push('Zitate      ' + document.querySelectorAll('.zit').length +
           ', Umformulierungen ' + document.querySelectorAll('.besser').length +
           ', Leiterstufen ' + document.querySelectorAll('.lt').length +
           ', Massnahmen ' + document.querySelectorAll('#massn .th').length);
  out.push('Rechnung    ' + document.getElementById('rechnung').textContent);
  if(!out.filter(function(x){return x.indexOf('JS-FEHLER')===0||x.indexOf('LEER')===0||x.indexOf('FEHLT')===0}).length)
    out.unshift('SAUBER');
  var pre=document.createElement('pre'); pre.id='qa'; pre.textContent=out.join('\\n');
  document.body.appendChild(pre);
},2400);
</script>"""


def pruefe(pfad, zustand=""):
    quelle = open(pfad, encoding="utf-8").read()
    rep = (REPORTER
           .replace("%%VOR%%", VOR.get(zustand, ""))
           .replace("%%IDS%%", repr(IDS).replace("'", '"')))
    tmp = os.path.join(os.path.dirname(os.path.abspath(pfad)), ".qa-tmp.html")
    # Der Horcher gehoert in den Kopf: ein Fehler beim ersten Rendern passiert,
    # bevor ein Skript am Seitenende ueberhaupt geladen ist. Ohne das meldet die
    # Pruefung nur leere Sektionen und nicht ihre Ursache.
    if "</head>" in quelle:
        mit_horcher = quelle.replace("</head>", HORCHER + "</head>", 1)
    else:
        # Ohne geschlossenen Kopf vor den Anfang des Koerpers haengen.
        mit_horcher = quelle.replace("<body", HORCHER + "<body", 1)
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(mit_horcher.replace("</body>", rep + "</body>"))
    try:
        dom = subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--window-size=1440,1200",
             "--virtual-time-budget=9000", "--dump-dom", "file://" + tmp],
            capture_output=True, text=True, timeout=120).stdout
    finally:
        os.remove(tmp)
    m = re.search(r'<pre id="qa">(.*?)</pre>', dom, re.S)
    return html.unescape(m.group(1)) if m else "KEIN REPORT"


if __name__ == "__main__":
    ziel = sys.argv[1]
    zustaende = sys.argv[2:] or ["", "hell", "auf"]
    schlecht = 0
    for z in zustaende:
        print("── Zustand: " + (z or "start") + " " + "─" * 40)
        e = pruefe(ziel, z)
        print(e)
        if "SAUBER" not in e:
            schlecht += 1
    sys.exit(1 if schlecht else 0)
