# Report bauen, prüfen, ausliefern

## Zusammenbau

```bash
python3 .claude/skills/amm-quick-emotioncheck/assets/qa-js.py "<pfad>/emotions-check-<slug>.html"
bash   .claude/skills/amm-quick-emotioncheck/assets/qa-umbruch.sh "<pfad>/emotions-check-<slug>.html"
bash   .claude/skills/amm-quick-emotioncheck/assets/qa-visual.sh  "<pfad>/emotions-check-<slug>.html"
```

Zusätzlich mit temporären Kopien prüfen:

- alle Karten aufgeklappt, weil die Zitate erst dort sichtbar werden
- heller Modus über `document.body.classList.add('hell')`
- ein Datensatz mit einem Faktor der Kauf-Formel auf null, weil dann die Nullstelle und die
  Rechnung mit Ergebnis null erscheinen
- ein Datensatz mit Score 0 und einer mit Score 100, weil dabei alle vier Urteilsbänder
  und die Randbreiten des Balkens auftreten

Danach auf JavaScript-Fehler und leere Sektionscontainer prüfen. Die IDs: `stats`, `dims`,
`dimtext`, `leiterstufen`, `leiterbloecke`, `antriebe`, `faktoren`, `rechnung`,
`formeltext`, `bremstab`, `saetzelisten`, `massn`, `seitentab`, `zielg`, `warn`.

Temporäre Dateien und Screenshots danach löschen.

## Bekannte Fallen

**Zitate sind der Inhalt, nicht die Dekoration.** Sie stehen in `.zit` mit typografischen
Anführungszeichen und der Seitenangabe darunter. Wer sie kürzt, um Platz zu sparen,
entwertet den ganzen Report, denn ohne Zitat ist jede Bewertung eine Behauptung.

**Typografische Zeichen brauchen eine WinAnsi-Tabelle.** Helvetica mit WinAnsiEncoding
kennt Anführungszeichen, Gedankenstrich und Aufzählungspunkt, legt sie aber auf Bytes
zwischen 128 und 159 und nicht auf ihren Unicode-Punkt. Die geerbte Fassung von `toLatin`
filterte alles über 255 weg, wodurch aus jedem Anführungszeichen ein Fragezeichen wurde.
In einem Report, dessen Inhalt aus Zitaten besteht, verschwanden damit sämtliche
Anführungszeichen. `toLatin` trägt deshalb eine Ersetzungstabelle, und Zeichen ohne
WinAnsi-Entsprechung wie der Pfeil werden lesbar ersetzt statt weggeworfen. Nach jeder
Änderung am PDF mit `pdftotext` gegenprüfen: die Zahl der Fragezeichen muss null sein.

**Umlaute niemals umschreiben**, auch nicht im JavaScript und nicht im PDF. "Stärke", nie
"Staerke". Im PDF trägt WinAnsi, Umlaute funktionieren dort, das Aufzählungszeichen aber
nicht: dafür steht `String.fromCharCode(149)`.

**Der auto-Track eines Grids bemisst ein Flex-Kind ohne dessen Abstände.** Die rechte
Spalte einer Kartenüberschrift wird dadurch zu schmal und der Aufklapp-Pfeil fällt aus dem
Kasten. Der Abstand liegt deshalb als `padding-left` im Pfeil selbst. Diese Regel ist aus
dem Porter-Report übernommen und gilt für jede Karte mit `.sig-right`.

**Lange URLs brauchen `word-break: break-all`** in der Seitentabelle, sonst schiebt eine
einzige Adresse die Tabelle über die Seitenbreite hinaus.

**Der Zeilenumbruch-Guard muss wortgleich sein.** Er wird aus `_guard.html` eingesetzt, nie
abgetippt. Im Quelltext darf kein literales geschütztes Leerzeichen stehen.

## Exporte prüfen

Nicht auf Existenz, sondern auf Inhalt. Temporäre Kopie, die beim Laden `buildPdf()` und
`buildMarkdown()` aufruft und das Ergebnis in den DOM schreibt, dann per Headless-Browser
auslesen. Beim PDF mit `pdftotext` die Zeichenkodierung prüfen: es darf kein Fragezeichen
aus verlorenen Umlauten geben.

Zwei Exporte, zwei Zwecke: das PDF zum Weitergeben, das Markdown zur Weiterverarbeitung.
Einen Workspace-Export gibt es nicht und soll es nicht geben.

## Übergabe

Report im Browser öffnen und berichten:

- der Score mit Urteilsband, und ausdrücklich dazu, auf welchen Seiten er erhoben wurde
- die schwächste Dimension und woran das liegt
- ob ein Faktor der Kauf-Formel auf null steht, denn das ist der Befund mit der größten
  Hebelwirkung
- zwei bis drei der schwachen Sätze mit ihrer Umformulierung, weil das der Teil ist, den
  jemand sofort übernehmen kann
- die erste der drei Maßnahmen mit ihrem Aufwand
- was sich über die Zielgruppe aus der Seite nicht erschließen ließ

Der letzte Punkt gehört ausgesprochen und nicht nur in den Report. Er ist für den Betreiber
oft überraschend, weil er sein eigenes Wissen beim Lesen der Seite unbewusst ergänzt.
