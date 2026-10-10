#!/usr/bin/env python3
"""Baut den Emotions-Check-Report aus den Bausteinen und den Reportdaten.

    python3 bau.py --daten reportdaten.json \
                   --ziel emotions-check-<slug>.html \
                   --name "Firma AG" --marke "FIRMA AG" \
                   --slug "firma" --footer "Firma AG"

Das Skript prueft die Daten, bevor es sie einsetzt. Ein Syntaxfehler im JSON
laesst sonst die halbe Seite leer, und das faellt im Browser nicht sofort auf,
weil das Grundgeruest trotzdem rendert.
"""
import argparse
import json
import os
import re
import sys

HIER = os.path.dirname(os.path.abspath(__file__))

DIMENSIONEN = [("leiter", 30), ("antrieb", 25), ("formel", 25), ("bremsen", 20)]
BREMSEN = ["Kein Bedarf", "Kein Vertrauen", "Kein Wert", "Keine Eile",
           "Zu viel Risiko", "Zu viel Reibung"]
ANTRIEBE = ["Zugehörigkeit", "Status", "Seelenfrieden"]


def lies(name):
    with open(os.path.join(HIER, name), encoding="utf-8") as f:
        return f.read()


def pruefe(d):
    """Harte Fehler brechen ab, weiche warnen. Der Unterschied: ein harter Fehler
    macht den Report falsch, ein weicher nur duenn."""
    hart, weich = [], []

    ids = [x.get("id") for x in d.get("dimensionen", [])]
    if ids != [i for i, _ in DIMENSIONEN]:
        hart.append("dimensionen muss genau leiter, antrieb, formel, bremsen sein, ist: " + str(ids))
    else:
        for x, (i, m) in zip(d["dimensionen"], DIMENSIONEN):
            if x.get("max") != m:
                hart.append("Dimension " + i + " hat max " + str(x.get("max")) + " statt " + str(m))
            if not (0 <= x.get("punkte", -1) <= m):
                hart.append("Dimension " + i + " hat punkte " + str(x.get("punkte")) + " ausserhalb 0 bis " + str(m))

    summe = sum(x.get("punkte", 0) for x in d.get("dimensionen", []))
    if d.get("score") is not None and d["score"] != summe:
        weich.append("score im Datensatz ist " + str(d["score"]) + ", die Summe ergibt " + str(summe) +
                     ". Der Report zeigt die Summe und meldet die Abweichung.")

    def hol(i):
        for x in d.get("dimensionen", []):
            if x.get("id") == i:
                return x
        return {}

    an = hol("antrieb")
    a = an.get("antriebe", [])
    if [x.get("name") for x in a] != ANTRIEBE:
        weich.append("antriebe sollten " + ", ".join(ANTRIEBE) + " in dieser Reihenfolge sein")
    for x in a:
        w = x.get("wert")
        if not isinstance(w, int) or not (0 <= w <= 100):
            hart.append("Antrieb " + str(x.get("name")) + " hat wert " + str(w) + ", zulaessig ist 0 bis 100")
            continue
        if w > 0 and not x.get("belege"):
            weich.append("Antrieb " + x.get("name") + " hat wert " + str(w) + ", aber keinen Beleg")
        if not x.get("potential"):
            weich.append("Antrieb " + x.get("name") + " hat kein Potential, das Feld ist Pflicht")
    if a and all(isinstance(x.get("wert"), int) for x in a):
        hoechst = max(x["wert"] for x in a)
        erk = round(15 * hoechst / 100)
        passung = an.get("punkte", 0) - erk
        if not (0 <= passung <= 10):
            weich.append("antrieb: der hoechste Barometerwert " + str(hoechst) + " ergibt " + str(erk) +
                         " Punkte Erkennbarkeit, damit blieben " + str(passung) +
                         " fuer Passung und Konsistenz, zulaessig sind 0 bis 10")
    b = hol("bremsen").get("bremsen", [])
    if [x.get("name") for x in b] != BREMSEN:
        weich.append("bremsen sollten die sechs Kauf-Bremsen in der Reihenfolge der Lektion sein")

    f = hol("formel")
    bw, pw = f.get("beziehung", {}).get("wert"), f.get("pain", {}).get("wert")
    if bw is not None and pw is not None:
        soll = round(25 * (bw / 5) * (pw / 5))
        if f.get("punkte") != soll:
            weich.append("formel: 25 mal " + str(bw) + "/5 mal " + str(pw) + "/5 ergibt " +
                         str(soll) + ", im Datensatz stehen " + str(f.get("punkte")))
        if (bw == 0 or pw == 0) and not f.get("nullstelle"):
            weich.append("ein Faktor der Kauf-Formel steht auf null, das Feld nullstelle ist aber leer")

    bl = hol("leiter").get("bloecke", [])
    if len(bl) < 4:
        weich.append("leiter hat nur " + str(len(bl)) + " Bloecke, empfohlen sind mindestens 4")
    ohne = [x.get("ort", "?") for x in bl if not x.get("zitat")]
    if ohne:
        weich.append("Leiter-Bloecke ohne Zitat: " + ", ".join(ohne))

    schwach = d.get("saetze", {}).get("schwach", [])
    ohneB = [x.get("zitat", "?")[:40] for x in schwach if not x.get("besser")]
    if ohneB:
        weich.append("schwache Saetze ohne Umformulierung: " + "; ".join(ohneB))

    if len(d.get("massnahmen", [])) != 3:
        weich.append("massnahmen hat " + str(len(d.get("massnahmen", []))) + " Eintraege statt genau 3")
    if len(d.get("seiten", [])) < 2:
        weich.append("es wurden nur " + str(len(d.get("seiten", []))) + " Seiten geprueft")
    if not d.get("zielgruppe", {}).get("luecke"):
        weich.append("zielgruppe.luecke ist leer, das Feld ist Pflicht")

    return hart, weich


def main():
    a = argparse.ArgumentParser(description="Emotions-Check-Report bauen")
    a.add_argument("--daten", required=True)
    a.add_argument("--ziel", required=True)
    a.add_argument("--name", help="Firmen- oder Seitenname, sonst aus den Daten (firma)")
    a.add_argument("--kurz", help="Kurzform fuer den Fliesstext, sonst aus den Daten (firma_kurz)")
    a.add_argument("--marke", help="Versalien fuer den PDF-Kopf, sonst aus --name")
    a.add_argument("--slug", help="klein, ohne Leerzeichen, sonst aus den Daten (slug)")
    a.add_argument("--footer", help="Rechteinhaber im Fuss, sonst aus den Daten (footer)")
    o = a.parse_args()

    with open(o.daten, encoding="utf-8") as f:
        daten = json.load(f)

    hart, weich = pruefe(daten)
    for w in weich:
        print("WARNUNG: " + w)
    if hart:
        sys.exit("\n".join("FEHLER: " + h for h in hart))

    teile = [
        lies("_kopf.html"),
        lies("_koerper.html"),
        "\n<script>\nconst D = " + json.dumps(daten, ensure_ascii=False, indent=1) + ";\n</script>\n",
        "\n<script>\n" + lies("_render.js") + "\n" + lies("_exports.js") + "\n</script>\n",
        lies("_guard.html"),
    ]
    html = "\n".join(teile)


    name = o.name or daten.get("firma")
    if not name:
        sys.exit("Kein Firmenname: weder --name noch das Feld firma in den Daten.")
    kurz = o.kurz or daten.get("firma_kurz") or name
    marke = o.marke or name.upper()
    slug = o.slug or daten.get("slug") or re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    footer = o.footer or daten.get("footer") or "Everlast Consulting GmbH"

    for k, v in [("{{FIRMA_NAME}}", name), ("{{FIRMA_KURZ}}", kurz),
                 ("{{FIRMA_MARKE}}", marke), ("{{FIRMA_SLUG}}", slug),
                 ("{{FOOTER}}", footer)]:
        html = html.replace(k, v)

    offen = sorted(set(re.findall(r"\{\{[A-Z_]+\}\}", html)))
    if offen:
        sys.exit("Nicht ersetzte Platzhalter: " + ", ".join(offen))

    for zeichen, name in [("—", "em-dash"), ("–", "en-dash"),
                          ("\u00a0", "literales geschuetztes Leerzeichen")]:
        if zeichen in html:
            print("WARNUNG: " + str(html.count(zeichen)) + " mal " + name + " im Dokument")

    os.makedirs(os.path.dirname(os.path.abspath(o.ziel)), exist_ok=True)
    with open(o.ziel, "w", encoding="utf-8") as f:
        f.write(html)

    summe = sum(x.get("punkte", 0) for x in daten["dimensionen"])
    print("geschrieben: " + o.ziel)
    print("  " + str(len(html)) + " Zeichen, " + str(html.count("\n") + 1) + " Zeilen")
    print("  Score " + str(summe) + " von 100, " + str(len(daten.get("seiten", []))) + " Seiten geprueft")


if __name__ == "__main__":
    main()
