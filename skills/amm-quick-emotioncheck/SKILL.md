---
name: amm-quick-emotioncheck
description: >
  Schneller Check der Werbetexte einer Website gegen die vier Dimensionen der
  Kaufpsychologie: auf welcher Stufe der Text steht (Produkt, Funktion, Ergebnis, Zustand,
  Gefühl), welchen der drei Antriebe er bedient (Zugehörigkeit, Status, Seelenfrieden), ob
  Beziehung und Problembewusstsein zusammenkommen, und welche der sechs Kaufbremsen er
  stehen lässt. Ergebnis ist ein Gesamtscore von 0 bis 100 und ein interaktiver
  HTML-Report mit wörtlichen Belegzitaten, konkreten Umformulierungen und drei Maßnahmen.
  Nutze diesen Skill IMMER, wenn es darum geht, Werbetexte, eine Website, eine Landingpage
  oder eine Verkaufsseite auf Emotion, Kaufmotive, Kaufpsychologie, Nutzenargumentation
  oder Kaufbremsen zu prüfen, und ebenso, wenn jemand sinngemäß fragt, ob seine Texte zu
  produktlastig sind, ob sie den Kunden emotional abholen, warum die Seite nicht
  konvertiert, oder was er an seiner Startseite zuerst ändern sollte. Auch dann anwenden,
  wenn nur eine URL geschickt wird mit der Bitte, die Texte anzuschauen.
  Braucht als Eingabe ausschließlich eine URL, sonst nichts.
---

# Emotions-Check

Menschen kaufen kein Produkt, sie kaufen das Gefühl danach. Dieser Skill prüft, ob die
Texte einer Website das berücksichtigen, und macht daraus eine Zahl.

Er ist bewusst ein Quick Win: eine Eingabe, ein Durchlauf, ein Report. **Du führst ihn
selbst aus, ohne Subagenten und ohne Agenten-Team.** Er liest keine Datei aus dem Marketing
Workspace, verlangt keine Zielgruppenbeschreibung und stellt keine Rückfragen außer der
nach der URL.

## Das Grundprinzip

**Bewertet wird ausschließlich, was auf der Website sichtbar ist.** Kein Vorwissen über
die Firma, keine Zielgruppe aus einer anderen Datei, keine Quelle außerhalb der
abgerufenen Seiten.

Das ist keine Sparmaßnahme, sondern die Methode. Ein echter Interessent sieht auch nichts
anderes. Was der Anbieter über seine Kunden weiß, ohne es hinzuschreiben, wirkt beim Leser
nicht. Deshalb ist ein Befund wie "die Zielgruppe ist auf der Seite nicht erkennbar" ein
vollwertiges Ergebnis und kein fehlender Input.

Daraus folgt die härteste Regel des Skills: **Jede Bewertung hängt an einem wörtlichen
Zitat von der Seite, mit Angabe der Seite. Ohne Zitat keine Punkte und kein Abzug.**

## Die vier Dimensionen

Alle vier stammen aus Lektionen des Kurses, die vor diesem Quick Win stehen. Es wird
bewusst kein eigenes Modell erfunden, sonst lernen Teilnehmer zwei Raster für dieselbe
Sache.

| Dimension | Punkte | Was sie prüft |
|---|---|---|
| Leiterstufe | 30 | Auf welcher der fünf Stufen der Text im Schnitt steht |
| Antrieb | 25 | Welcher der drei Kaufgründe bedient wird und ob er passt |
| Kauf-Formel | 25 | Beziehung mal Pain, nicht plus |
| Bremsen | 20 | Welche der sechs Kaufbremsen der Text bearbeitet |

Details und die genaue Punktvergabe in `references/pruefraster.md`.

**Zwei Regeln aus dem Raster, die den Score prägen:**

Die Leiterstufe wird nach Sichtbarkeit gewichtet, nicht nach Vorhandensein. Ein
Gefühlssatz im Fußbereich hebt einen Produktprospekt nicht auf Stufe 5.

Die Kauf-Formel multipliziert. Steht Beziehung oder Pain auf null, sind es null Punkte,
auch wenn der andere Faktor bei 5 liegt. Das ist genau die Aussage der Lektion: Faktoren,
die multipliziert werden, können sich nicht gegenseitig retten. Der Report zeigt die
Rechnung offen, damit die Null nicht wie ein Fehler aussieht.

## Der Score

Summe der vier Dimensionen, dazu ein Urteilsband:

| Score | Urteil |
|---|---|
| 0 bis 24 | Produktprospekt |
| 25 bis 49 | Nutzen angedeutet |
| 50 bis 74 | Nutzen belegt |
| 75 bis 100 | Kaufmotiv getroffen |

**Ein hoher Score ist kein Ziel an sich.** Es gibt Seiten, bei denen ein nüchterner
Produkttext richtig ist, etwa wenn der Leser bereits entschieden hat und nur noch
vergleicht. Der Report nennt den Score deshalb immer zusammen mit den Seiten, auf denen er
erhoben wurde.

## Voraussetzungen

- **Python 3** für die Bau- und Prüfskripte. Keine Fremdpakete nötig.
- **Google Chrome** unter `/Applications/Google Chrome.app` für die drei Prüfläufe.
  Fehlt Chrome, entfällt nur die QA, nicht der Bau.

Der Skill ist eigenständig: alles, was er braucht, liegt in `assets/` und
`references/`. Er setzt kein bestimmtes Projekt und keine Dateien außerhalb
seines eigenen Ordners voraus.

## Ablauf

### Schritt 0: URL holen

Liegt keine URL vor, per AskUserQuestion danach fragen.

**Den Ablageort suchst du, du fragst nur im Notfall danach.** Dieser Check füllt als
einziger keine Datei einer Strategie: er prüft einen Ist-Zustand. Deshalb sucht er keine
Ergebnisdatei, sondern nur einen Ort für seinen eigenen Ordner. Durchsuche das aktuelle
Verzeichnis rekursiv, höchstens vier Ebenen tief, nach einem Ordner, dessen Name
normalisiert `emotions-check`, `emotionscheck` oder `daten` lautet. Der erste Treffer
gewinnt, in dieser Reihenfolge. Findest du keinen, frage per AskUserQuestion nach dem
Zielordner, im selben Zug wie nach der URL.

Der Arbeitsordner heißt `<JJMMTT>-emotions-check`, wenn er in einem gefundenen Ordner liegt,
und `<JJMMTT>-emotions-check-<slug>`, wenn du nach dem Zielordner fragen musstest.

Mehr Eingaben braucht dieser Skill nicht, und er soll auch keine mehr verlangen:
Sobald er nach Zielgruppe, Angebot oder
Positionierung fragt, ist er kein Quick Win mehr und beantwortet außerdem eine andere
Frage als die, um die es geht.

### Schritt 1: Selbst abrufen und bewerten

Anleitung in `references/durchfuehrung.md`. Du rufst die Startseite und bis zu vier weitere
Seiten mit WebFetch ab, bewertest die vier Dimensionen und schreibst `reportdaten.json`
nach dem Schema in `references/datenmodell.md`.

**Kein Subagent.** Ein Agent lohnt sich, wenn viel Recherchematerial anfällt, das den
Hauptlauf zumüllen würde. Hier fällt keins an: eine Quelle, höchstens fünf Abrufe. Der
Umweg kostet mehr, als er spart, und nimmt dir die Möglichkeit, beim Lesen der Seite
nachzufassen.

Verlange beim Abruf ausdrücklich **wörtliche** Formulierungen für Hauptüberschrift,
Unterzeile, Handlungsaufforderungen, Vertrauenselemente und Preisangaben. Eine
Zusammenfassung ist für diesen Check wertlos, weil jede Bewertung an einem Zitat hängt.

### Schritt 2: Report bauen

```bash
python3 .claude/skills/amm-quick-emotioncheck/assets/qa-js.py "<pfad>/emotions-check-<slug>.html"
bash   .claude/skills/amm-quick-emotioncheck/assets/qa-umbruch.sh "<pfad>/emotions-check-<slug>.html"
bash   .claude/skills/amm-quick-emotioncheck/assets/qa-visual.sh  "<pfad>/emotions-check-<slug>.html"
```

Details in `references/report-bauplan.md`.

## Der Report

Zehn Sektionen: Score im Kopf, die vier Dimensionen als Balken, dann je Dimension ein
eigener Abschnitt mit den Belegzitaten, danach die starken und schwachen Sätze mit
Umformulierung, drei Maßnahmen, die geprüften Seiten samt erschlossener Zielgruppe, und
die Grenzen. Dazu Export als PDF und als Markdown.

**Es gibt keinen Workspace-Export.** Der Check liest nichts aus dem Workspace und schreibt
auch nichts hinein. Wer die Erkenntnisse dort ablegen will, tut das von Hand, und genau das
ist der Punkt an einem Quick Win.

Die aussagekräftigste Sektion ist nicht der Score, sondern die Liste der schwachen Sätze
mit ihrer Umformulierung. Sie ist der Teil, den jemand direkt übernehmen kann.

## Was der Check nicht kann

Gehört in jeden Report, konkret auf den Fall bezogen und nicht als Floskel:

- **Er misst den Text, nicht die Wirkung.** Ob eine Seite verkauft, zeigt nur eine Messung
  am Markt.
- **Er kennt die Zielgruppe nur aus der Seite.** Wo der Anbieter mehr weiß, als dort steht,
  bewertet der Check die Lücke und nicht das Wissen. Das ist beabsichtigt.
- **Er sieht keinen Kontext vor dem Klick.** Wer über eine Anzeige mit klarem Versprechen
  kommt, liest dieselbe Seite anders als jemand aus der Suche.
- **Er bewertet eine Momentaufnahme** der abgerufenen Seiten mit Datum.

## Schreibregeln

- Keine Gedankenstriche, weder em-dash noch en-dash.
- Umlaute und ß korrekt ausschreiben, auch in PDF-Texten und in JavaScript-Strings.
  "Stärke", nie "Staerke". Nur Bezeichner im Code bleiben ASCII.
- Deutsch, sachlich, in der dritten Person über die geprüfte Seite. Keine Du-Ansprache an
  den Betreiber, keine Beratersprache, keine Lobhudelei und keine Herabsetzung.
- Zitate werden nicht geglättet und nicht sinngemäß wiedergegeben. Gekürzt wird nur mit
  Auslassungszeichen.
- Überschriften benennen das Thema fachlich, nie eine Pointe.

## Dateien im Arbeitsordner

```
<JJMMTT>-emotions-check/
├── reportdaten.json
└── emotions-check-<slug>.html
```

Der Ordnername folgt dem Ablageort aus Schritt 0: wurde ein Themenordner gefunden, heißt er
`<JJMMTT>-emotions-check` und liegt darin; ohne Themenordner kommt der Firmen-Slug dazu. Der
Inhalt ist in beiden Fällen derselbe.

Zwei Dateien, mehr nicht. Das ist der Unterschied zu den großen Analyse-Skills und der
Grund, warum dieser hier in Minuten fertig ist.

## Referenzen

- `references/pruefraster.md`: die vier Dimensionen, die Punktvergabe, die Urteilsbänder.
- `references/durchfuehrung.md`: wie du abrufst und bewertest. Vor Schritt 1 lesen.
- `references/datenmodell.md`: das Schema von `reportdaten.json`.
- `references/report-bauplan.md`: Zusammenbau, QA, bekannte Fallen.
- `assets/bau.py`: Zusammenbau samt Datenprüfung.
- Das vollständige Prüfraster steht in `references/pruefraster.md` und trägt sich selbst.
  Der Skill braucht dafür nichts außerhalb seines Ordners.
- Herkunft der Fachlogik sind die Kurs-Lektionen `bohrmaschinen-prinzip`,
  `drei-kaufgruende`, `kauf-formel` und `kauf-bremsen` aus dem Modul Marketing-Grundlagen.
  Wer das Raster inhaltlich ändert, ändert es dort zuerst und zieht `pruefraster.md` nach.
  Für einen Durchlauf werden die Lektionen nicht gebraucht.
