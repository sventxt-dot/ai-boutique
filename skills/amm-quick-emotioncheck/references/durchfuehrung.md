# Die Durchführung

**Diesen Check führst du selbst aus. Kein Subagent, kein Agenten-Team.**

Das ist der Unterschied zu den großen Analyse-Skills und der Grund, warum dieser hier in
Minuten fertig ist. Ein Subagent lohnt sich, wenn viel Recherchematerial anfällt, das den
Hauptlauf zumüllen würde. Hier fällt keins an: Es gibt eine Quelle, nämlich die Seite, und
höchstens fünf Abrufe. Der Umweg über einen Agenten kostet mehr, als er spart, und nimmt
dir die Möglichkeit, beim Lesen der Seite nachzufassen.

## Schritt 1: Die Seiten abrufen

Rufe die genannte URL mit WebFetch ab. Folge von dort höchstens vier weiteren Seiten, und
zwar denen, die ein Interessent als Nächstes ansteuern würde:

- das Angebot oder die Leistungen
- die Preise
- die Referenzen oder Fallstudien
- die Kontakt- oder Buchungsseite

Existiert eine davon nicht, ist ihr Fehlen selbst ein Befund und gehört in die Grenzen. Auf
einer Seite ohne Preisangabe steht die Bremse "Kein Wert" praktisch immer offen.

**Fasse beim Abruf wörtliche Formulierungen ab.** Der Prompt an WebFetch soll ausdrücklich
die Hauptüberschrift, die Unterzeile, die Handlungsaufforderungen, Vertrauenselemente und
Preisangaben **im Wortlaut** zurückgeben, nicht zusammengefasst. Eine Zusammenfassung ist
für diesen Check wertlos, weil jede Bewertung an einem Zitat hängt.

Halte je Seite fest: URL, ein sprechender Titel, das Abrufdatum, und wie schwer sie wiegt
(hoch, mittel, niedrig).

## Schritt 2: Bewerten

Arbeite die vier Dimensionen nach `pruefraster.md` ab. Für jede Bewertung gilt:

- Sie hängt an einem **wörtlichen Zitat** von der Seite, mit Angabe der Seite.
- Ohne Zitat gibt es keine Punkte und keinen Abzug.
- Zitate werden nicht geglättet, nicht ohne Auslassungszeichen gekürzt und nicht sinngemäß
  wiedergegeben.

**Das Grundprinzip, es gilt für jede einzelne Bewertung:** Du bewertest ausschließlich, was
auf der Website steht. Kein Vorwissen über die Firma, keine Annahme über die Zielgruppe,
die sich nicht aus dem Sichtbaren erschließen lässt, keine Quelle außerhalb der abgerufenen
Seiten.

Das ist bei einem Durchlauf ohne Subagenten die schwerste Stelle: Wenn im Arbeitsverzeichnis
Dateien über dieses Unternehmen liegen oder du das Unternehmen aus dem Gespräch kennst,
sickert dieses Wissen leicht in die Bewertung ein. Es darf nicht. Ein echter Interessent
sieht auch nichts anderes als die Seite. Was der Text nicht sagt, weiß der Kunde nicht.

**Drei Stellen, an denen diese Bewertung erfahrungsgemäß zu milde ausfällt:**

- Ein Gefühlssatz im Fußbereich hebt einen Produktprospekt nicht auf Stufe 5. Gewichte nach
  Sichtbarkeit, nicht nach Vorhandensein.
- Ein Logo-Balken ist kein Vertrauensbeleg. Ein Ergebnis mit Zahl und Kundenname ist einer.
- Eine Kategorie ist kein Pain. "Digitalisierung" ist eine Kategorie, "Ihr einziger
  Mitarbeiter, der die Anlage kennt, geht in zwei Jahren in Rente" ist einer.

## Schritt 3: Die Datendatei schreiben

Schreibe `reportdaten.json` nach dem Schema in `datenmodell.md`. Reines JSON, keine
Code-Fences.

Neben den vier Dimensionen gehören hinein:

- Die aus der Seite erschlossene Zielgruppe, woran man sie erkennt, wie sicher das ist, und
  ausdrücklich die **Lücke**: was sich nicht erschließen lässt und was das für den Leser
  bedeutet. Das Feld darf nicht leer bleiben.
- Drei bis fünf starke und drei bis fünf schwache Sätze, jeweils wörtlich. Zu jedem
  schwachen Satz eine konkrete Umformulierung, die so auf der Seite stehen könnte. Sie muss
  zum Angebot passen und darf nichts versprechen, was die Seite nicht belegt.
- Genau drei Maßnahmen in der Reihenfolge, in der man sie angehen sollte, je mit
  geschätztem Aufwand und der Angabe, welche Dimension sie um wie viele Punkte hebt.
- Die Grenzen dieses Durchlaufs, konkret auf diesen Fall bezogen.

**Schreibe die Datei mit Write, nicht mit einem Editier-Werkzeug**, und prüfe danach:

```bash
python3 -c "import json;json.load(open('<pfad>/reportdaten.json'))"
grep -c "—\|–" "<pfad>/reportdaten.json"
```

Das JSON muss parsen, der Gedankenstrich-Zähler muss null ergeben. `bau.py` prüft im
nächsten Schritt den Rest, also Summe, Rechnung, Anzahl der Einträge und die Pflichtfelder.

## Schreibregeln

- Niemals Gedankenstriche (em-dash, en-dash). Doppelpunkt, Komma, Klammern, Punkt.
- Umlaute und ß korrekt ausschreiben, auch in JSON-Strings, nie als Unicode-Escape.
- Deutsch, sachlich, in der dritten Person über die Seite. Keine Du-Ansprache an den
  Betreiber, keine Beratersprache, keine Lobhudelei und keine Herabsetzung.
- Bezeichner und Überschriften benennen das Thema fachlich, nie eine Pointe.

## Wenn keine URL vorliegt

Frage sie per AskUserQuestion ab. Mehr Eingaben braucht dieser Skill nicht, und er soll
auch keine mehr verlangen: Sobald er nach Zielgruppe, Angebot oder Positionierung fragt,
ist er kein Quick Win mehr und beantwortet außerdem eine andere Frage als die, um die es
geht.
