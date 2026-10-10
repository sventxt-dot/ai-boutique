# Datenmodell des Reports

Der Report wird vollständig aus einer Konstante gerendert. Sie ersetzt im Template die
Stelle `/*__DATEN__*/` und heißt dort `const D = {…};`. Die Datei entsteht als
`reportdaten.json`.

## Gerüst

```json
{
  "stand": "2026-08-25",
  "url": "https://beispiel.de",
  "score": 61,
  "kennzahlen": [{"n": "61", "l": "von 100 Punkten"}],
  "seiten": [ … ],
  "zielgruppe": { … },
  "dimensionen": [ … ],
  "saetze": { … },
  "massnahmen": [ … ],
  "grenzen": [ … ]
}
```

`score` wird nicht frei gesetzt, sondern ist die Summe der vier Dimensionspunkte. Der
Report rechnet sie beim Rendern nach und meldet eine Abweichung sichtbar, statt sie still
zu übernehmen.

`kennzahlen`: vier Stück für den Kopf. Bewährt: Gesamtscore, Zahl der geprüften Seiten,
Zahl der ausgewerteten Zitate, Zahl der unbearbeiteten Bremsen.

## seiten

Jede tatsächlich abgerufene Seite, in der Reihenfolge ihrer Wichtigkeit.

```json
{"u": "https://beispiel.de/", "t": "Startseite", "d": "2026-08-25", "g": "hoch",
 "b": "Wofür diese Seite im Check steht."}
```

`g` ist hoch, mittel oder niedrig und steuert das Gewicht bei der Leiterstufe. Was in der
Hauptüberschrift der Startseite steht, zählt schwerer als ein Satz auf einer Unterseite.
Ohne `d` darf keine Seite in die Liste, weil eine Website über Nacht wechselt.

## zielgruppe

Die aus der Seite erschlossene Zielgruppe. Nur aus Sichtbarem, nie aus Vorwissen.

```json
{"wer": "Wer hier angesprochen wird, in einem Satz.",
 "woran": "An welchen Stellen der Seite man das erkennt, mit Zitat.",
 "sicherheit": "mittel",
 "luecke": "Was sich aus der Seite NICHT erschließen lässt und was das für den Leser bedeutet."}
```

`sicherheit` ist hoch, mittel oder niedrig. Das Feld `luecke` ist Pflicht und darf nicht
leer bleiben: Wo sich die Zielgruppe nicht erschließen lässt, ist das ein Befund über die
Seite und keine fehlende Eingabe.

## dimensionen

Genau vier Einträge in dieser Reihenfolge und mit diesen ids.

```json
{"id": "leiter", "name": "Leiterstufe", "max": 30, "punkte": 14,
 "kurz": "Der Text steht im Schnitt auf Stufe 3, dem Ergebnis.",
 "b": "Begründung in zwei bis drei Sätzen.",
 "f": "S"}
```

`f` steuert die Farbe: `S` blau, `T` gelb, `E` grün, `P` violett. Feste Zuordnung:
leiter `S`, antrieb `T`, formel `E`, bremsen `P`.

Dazu trägt jede Dimension ihren eigenen Detailblock:

### leiter

```json
"bloecke": [
  {"ort": "Hauptüberschrift", "seite": "Startseite", "zitat": "wörtlich von der Seite",
   "stufe": 2, "gewicht": "hoch", "b": "Warum diese Stufe."}
]
```

`stufe` ist 1 bis 5 (Produkt, Funktion, Ergebnis, Zustand, Gefühl). Mindestens vier Blöcke:
Hauptüberschrift, Unterzeile, ein Angebotsblock, die Handlungsaufforderung.

### antrieb

```json
"antriebe": [
  {"name": "Seelenfrieden", "wert": 45,
   "b": "Woran man den Wert festmacht, zwei bis drei Sätze.",
   "belege": [
     {"zitat": "wörtlich von der Seite", "seite": "Startseite", "wirkt": "teilweise",
      "b": "Was dieses Zitat für diesen Antrieb leistet und was nicht."}
   ],
   "potential": "Was diesen Antrieb heben würde, hergeleitet aus der erschlossenen Zielgruppe.",
   "hebel": "hoch"}
],
"richtung": "nach innen",
"richtungB": "Nur ausfüllen, wenn Status einen nennenswerten Wert hat, sonst leer.",
"konsistenz": "Ob der stärkste Antrieb über die Seite hinweg derselbe bleibt."
```

`antriebe` hat genau drei Einträge in der Reihenfolge Zugehörigkeit, Status, Seelenfrieden.

- `wert` ist 0 bis 100 und wird im Report als Barometer gezeichnet. Die Bänder stehen in
  `pruefraster.md`.
- `belege` hat mindestens einen Eintrag, sobald `wert` über 0 liegt. `wirkt` ist ja,
  teilweise oder nein und färbt das Zitat: auch ein Beleg, der den Antrieb gerade **nicht**
  herstellt, gehört hierher, weil er zeigt, woran es liegt.
- `potential` ist Pflicht und wird aus der Zielgruppe hergeleitet, nicht aus einer
  allgemeinen Textregel. Der Report zeigt es im aufgeklappten Zustand unter den Belegen.
- `hebel` ist hoch, mittel oder niedrig und sagt, wie viel bei diesem Antrieb noch zu holen
  ist. Ein Antrieb mit hohem Wert kann trotzdem einen niedrigen Hebel haben, weil oben wenig
  Luft ist, und ein Antrieb mit niedrigem Wert einen niedrigen, weil er zur Zielgruppe
  ohnehin nicht passt. Genau diese Unterscheidung ist der Ertrag des Abschnitts.
- `punkte` der Dimension folgen dem Barometer: Erkennbarkeit ist 15 mal dem höchsten `wert`
  geteilt durch 100, dazu 0 bis 10 für Passung und Konsistenz. Der Report rechnet den ersten
  Teil nach und meldet eine Abweichung.
- `richtung` ist `nach oben`, `nach innen` oder leer.

### formel

```json
"beziehung": {"wert": 3, "b": "Begründung.",
              "belege": [{"zitat": "…", "seite": "…", "traegt": "ja"}]},
"pain": {"wert": 2, "b": "Begründung.", "belege": [ … ]},
"verstaerker": "weg-von",
"verstaerkerB": "Woran man das erkennt.",
"nullstelle": ""
```

`wert` ist jeweils 0 bis 5. Die Punkte folgen der Multiplikation und werden im Report
nachgerechnet. Steht ein Faktor auf 0, trägt `nullstelle` einen ausformulierten Satz, der
benennt, welcher Faktor fehlt und warum das die ganze Dimension auf null zieht. Sonst bleibt
das Feld leer.

`verstaerker` ist `weg-von`, `hin-zu`, `gemischt` oder `keiner`.

### bremsen

```json
"bremsen": [
  {"name": "Kein Vertrauen", "bearbeitet": "ja",
   "zitat": "wörtlich oder leer", "seite": "Startseite",
   "b": "Was der Text konkret tut.",
   "hilft": "Was laut Lektion hilft, wenn die Bremse offen ist."}
]
```

Genau sechs Einträge in der festen Reihenfolge Kein Bedarf, Kein Vertrauen, Kein Wert,
Keine Eile, Zu viel Risiko, Zu viel Reibung. `bearbeitet` ist ja, teilweise oder nein.
Das Feld `hilft` wird bei `nein` und `teilweise` gefüllt und bleibt bei `ja` leer.

## saetze

Der praktisch wertvollste Teil des Reports.

```json
{"stark": [{"zitat": "…", "seite": "…", "warum": "Warum dieser Satz trägt."}],
 "schwach": [{"zitat": "…", "seite": "…", "warum": "Woran er scheitert.",
              "besser": "Eine konkrete Umformulierung, die auf der Seite stehen könnte."}]}
```

Drei bis fünf je Gruppe. Jeder Eintrag in `schwach` braucht ein gefülltes `besser`, sonst
ist es Kritik ohne Angebot. Die Umformulierung muss zum Angebot passen und darf nichts
versprechen, was die Seite nicht belegt.

## massnahmen

Genau drei, in der Reihenfolge, in der sie angegangen werden sollten.

```json
{"titel": "Kurz und als Handlung formuliert.",
 "warum": "Welche Dimension das hebt und um wie viele Punkte ungefähr.",
 "wie": "Was konkret zu tun ist, ohne Beratersprache.",
 "aufwand": "eine Stunde"}
```

Nicht mehr als drei. Wer aus jeder Dimension eine Maßnahme ableitet, bekommt am Ende keine.

## grenzen

```json
"Satz, der eine Grenze dieses Durchlaufs konkret benennt."
```

Die vier Punkte aus `pruefraster.md`, Abschnitt "Was der Check nicht kann", jeweils auf
diesen Fall bezogen. Dazu alles, was beim Abruf nicht erreichbar war.

## Prüfung vor dem Einsetzen

- Das JSON parst.
- Keine Gedankenstriche in irgendeinem Feld.
- `dimensionen` hat genau vier Einträge mit den ids leiter, antrieb, formel, bremsen.
- `punkte` liegt je Dimension zwischen 0 und `max`.
- `score` ist die Summe der vier `punkte`.
- `antriebe` hat drei Einträge, jeder mit `wert` zwischen 0 und 100, gefülltem
  `potential` und mindestens einem Beleg, sobald `wert` über 0 liegt.
- `bremsen` hat genau sechs Einträge.
- Jede Bewertung hängt an einem Zitat mit Seitenangabe.
- Jeder Eintrag in `saetze.schwach` hat ein gefülltes `besser`.
- `massnahmen` hat genau drei Einträge.
- `zielgruppe.luecke` ist gefüllt.
