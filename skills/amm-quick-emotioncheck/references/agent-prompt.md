# Der Analyse-Prompt

Ein Agent, ein Durchlauf. Das ist Absicht: Der Check ist ein Quick Win und soll in Minuten
fertig sein, nicht in einer Stunde. Platzhalter in `{{...}}` vor dem Start ersetzen.

Platzhalter: `{{HEUTE}}` (YYYY-MM-DD), `{{URL}}`, `{{ORDNER}}` (absoluter Pfad),
`{{SKILL}}` (absoluter Pfad des Skill-Ordners).

## Warum ein Agent und nicht fünf

Die vier Dimensionen bewerten denselben Text. Wer sie auf vier Agenten verteilt, bekommt
vier verschiedene Lesarten desselben Satzes und muss sie hinterher zusammenführen. Bei einer
Marktanalyse lohnt sich das, weil dort jede Kraft eigene Quellen hat. Hier gibt es nur eine
Quelle: die Seite.

## Der Prompt

```
Heutiges Datum: {{HEUTE}}.

Du prüfst die Werbetexte einer Website gegen vier Dimensionen der Kaufpsychologie und
erzeugst daraus eine Datendatei für einen Report.

LIES ZUERST VOLLSTÄNDIG:
- {{SKILL}}/references/pruefraster.md   (die vier Dimensionen und die Punktvergabe)
- {{SKILL}}/references/datenmodell.md   (das Schema deiner Ausgabe)

DAS GRUNDPRINZIP, es gilt für jede einzelne Bewertung:
Du bewertest ausschließlich, was auf der Website steht. Kein Vorwissen über die Firma,
keine Annahme über die Zielgruppe, die sich nicht aus dem Sichtbaren erschließen lässt,
keine Quelle außerhalb der abgerufenen Seiten. Ein echter Interessent sieht auch nichts
anderes. Was der Text nicht sagt, weiß der Kunde nicht.
Wo dir etwas fehlt, ist das ein Befund über die Seite und keine fehlende Eingabe.

ABRUF:
Rufe {{URL}} tatsächlich ab. Folge von dort aus höchstens vier weiteren Seiten, und zwar
denen, die ein Interessent als Nächstes ansteuern würde: das Angebot oder die Leistungen,
die Preise, die Referenzen oder Fallstudien, die Kontakt- oder Buchungsseite. Wenn eine
davon nicht existiert, ist ihr Fehlen selbst ein Befund und gehört in die Grenzen.
Halte je Seite fest: URL, ein sprechender Titel, das Abrufdatum, und wie schwer sie wiegt.

ERHEBUNG:
Arbeite die vier Dimensionen genau nach pruefraster.md ab. Für jede Bewertung gilt:
- Sie hängt an einem WÖRTLICHEN Zitat von der Seite, mit Angabe der Seite.
- Ohne Zitat gibt es keine Punkte und keinen Abzug.
- Zitate werden nicht geglättet, nicht gekürzt ohne Auslassungszeichen und nicht
  sinngemäß wiedergegeben.

Die vier Dimensionen und ihre Höchstpunktzahl:
1. Leiterstufe, 30 Punkte. Auf welcher der fünf Stufen (Produkt, Funktion, Ergebnis,
   Zustand, Gefühl) der Text im Schnitt steht, gewichtet nach Sichtbarkeit.
2. Antrieb, 25 Punkte. Ob Zugehörigkeit, Status oder Seelenfrieden bedient wird, ob der
   Antrieb zur erschließbaren Zielgruppe passt und über die Seite konsistent bleibt.
   Wo Status bedient wird, ist die Richtung Pflicht: nach oben oder nach innen.
3. Kauf-Formel, 25 Punkte. Beziehung und Pain je 0 bis 5, die Punkte folgen der
   Multiplikation. Steht ein Faktor auf null, sind es null Punkte, und du schreibst in
   das Feld nullstelle einen Satz, der benennt welcher Faktor fehlt.
4. Bremsen, 20 Punkte. Die sechs Kauf-Bremsen, je Bremse ob der Text sie auf der Seite
   selbst bearbeitet. Bearbeitet heißt: der Text tut das Gegenmittel, nicht nur dass das
   Thema vorkommt.

DREI STELLEN, AN DENEN DIESE ANALYSE ERFAHRUNGSGEMÄSS ZU MILDE AUSFÄLLT:
- Ein Gefühlssatz im Fußbereich hebt einen Produktprospekt nicht auf Stufe 5. Gewichte
  nach Sichtbarkeit, nicht nach Vorhandensein.
- Ein Logo-Balken ist kein Vertrauensbeleg. Ein Ergebnis mit Zahl und Kundenname ist einer.
- Eine Kategorie ist kein Pain. "Digitalisierung" ist eine Kategorie, "Ihr einziger
  Mitarbeiter, der die Anlage kennt, geht in zwei Jahren in Rente" ist ein Pain.

AUSSERDEM ZU LIEFERN:
- Die aus der Seite erschlossene Zielgruppe, woran man sie erkennt, wie sicher das ist,
  und ausdrücklich die Lücke: was sich NICHT erschließen lässt und was das für den Leser
  bedeutet. Das Feld darf nicht leer bleiben.
- Drei bis fünf starke und drei bis fünf schwache Sätze, jeweils wörtlich. Zu jedem
  schwachen Satz eine konkrete Umformulierung, die so auf der Seite stehen könnte. Sie
  muss zum Angebot passen und darf nichts versprechen, was die Seite nicht belegt.
- Genau drei Maßnahmen in der Reihenfolge, in der man sie angehen sollte, je mit
  geschätztem Aufwand und der Angabe, welche Dimension sie um wie viele Punkte hebt.
- Die Grenzen dieses Durchlaufs, konkret auf diesen Fall bezogen.

SCHREIBREGELN:
- Niemals Gedankenstriche (em-dash, en-dash). Doppelpunkt, Komma, Klammern, Punkt.
- Umlaute und ß korrekt ausschreiben, auch in JSON-Strings.
- Deutsch, sachlich, in der dritten Person über die Seite. Keine Du-Ansprache an den
  Websitebetreiber, keine Beratersprache, keine Lobhudelei und keine Herabsetzung.
- Überschriften und Bezeichner benennen das Thema fachlich, nie eine Pointe.

AUSGABE:
Schreibe reines JSON nach dem Schema in datenmodell.md mit dem Write-Tool nach
{{ORDNER}}/reportdaten.json. Kein Markdown, keine Code-Fences, kein Text drumherum.

SELBSTPRÜFUNG, führe sie tatsächlich aus:
- Das JSON parst: python3 -c "import json;json.load(open('{{ORDNER}}/reportdaten.json'))"
- grep auf Gedankenstriche, es darf keinen Treffer geben.
- score ist exakt die Summe der vier Dimensionspunkte.
- dimensionen hat vier Einträge, antriebe drei, bremsen sechs, massnahmen drei.
- Jeder schwache Satz hat ein gefülltes Feld besser.
Korrigiere und prüfe erneut, bis alles stimmt.

Deine finale Textantwort ist der Rückgabewert an den Hauptlauf: gib nur den Score, die
vier Dimensionspunkte, die schwächste Dimension und die erste Maßnahme zurück.
```

## Wenn keine URL vorliegt

Frage sie per AskUserQuestion ab. Mehr Eingaben braucht dieser Skill nicht, und er soll
auch keine mehr verlangen: Sobald er nach Zielgruppe, Angebot oder Positionierung fragt,
ist er kein Quick Win mehr und beantwortet außerdem eine andere Frage als die, um die es
geht.
