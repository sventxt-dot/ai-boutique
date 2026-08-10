# Design Tokens Reference — studio-sven.de
> Extracted 2026-06-19 from CSS source (post-15.css, Elementor Global Kit)
> Purpose: visual re-skin of ai-boutique.de only — NO content transfer

---

## 1. Colors

All values from `--e-global-color-*` variables in the Elementor kit.

| Role | Token Name | Hex | Notes |
|------|-----------|-----|-------|
| **Primary text / dark bg** | `primary` | `#3A3A3A` | Almost-black charcoal, not pure #000 |
| **Text default** | `text` | `#3A3A3A` | Same as primary — unified |
| **Accent / CTA** | `secondary` | `#FF6666` | Coral-red, strong pop color |
| **Accent 2 (purple-blue)** | `accent` | `#6F77F4` | Indigo-lavender, secondary accent |
| **Highlight yellow** | `a33f1c6` | `#FFF56E` | Warm lemon — used for emphasis/hover |
| **Muted / subtle text** | `96b4960` | `#B5B5B5` | Medium gray for secondary text |
| **White** | `4907308` | `#FFFFFF` | Pure white |
| **Off-white (page bg)** | `9591e0e` | `#FBFBFB` | Near-white background base |
| **Transparent** | `1393cfb` | `#00000000` | Fully transparent |
| **White 80% (overlay)** | `024b7a8` | `#FFFFFFCC` | Semi-transparent white (~80%) |
| **Card / section bg** | `cc8cbfb` | `#FFFFFF` | White card/section background |
| **Light section bg** | `e0519b9` | `#F5F5F5` | Very light gray — alternating sections |
| **Page transition** | —          | `#FFBC7D` | Warm peach/orange — transition overlay |

### Color Palette Summary
```
Background (main):   #FBFBFB  (warm near-white, not pure white)
Background (alt):    #F5F5F5  (light gray for section alternation)
Background (dark):   none — site is predominantly light
Text (primary):      #3A3A3A  (charcoal, NOT #000000)
Text (muted):        #B5B5B5
Accent 1 (coral):    #FF6666  → CTAs, highlights, hover states
Accent 2 (indigo):   #6F77F4  → secondary links, badge borders
Accent 3 (yellow):   #FFF56E  → emphasis, active states
Border:              implied ~#E0E0E0 (derived from #F5F5F5 context)
```

**Key insight for ai-boutique.de mapping:**
The site runs **light with charcoal text** — NOT white-on-dark. The "dark" feel comes from Anton font weight and large scale, not from dark backgrounds. ai-boutique.de will stay dark-theme but should use `#3A3A3A`-derived tokens for card surfaces and adopt the coral/indigo accent system.

---

## 2. Typography

### Font Families
| Role | Family | Style |
|------|--------|-------|
| **Display / Headlines** | `Anton` | Regular weight (400), ALL CAPS, tight line-height |
| **Body / UI** | `Montserrat` | 400 (regular) and 700 (bold) |

Anton is a condensed display typeface — very wide glyphs at large sizes, ultra-tight line-height (`1em`). Acts as the visual "muscle" of the design.
Montserrat handles all readable text — same font ai-boutique.de already uses.

### Type Scale (desktop / tablet / mobile)

| Style | Family | Desktop | Tablet (≤1024px) | Mobile (≤767px) | Weight | Transform | Line-Height |
|-------|--------|---------|----------|--------|--------|-----------|-------------|
| **Hero XL** | Anton | 140px | 65px | 40px | 400 | uppercase | 1em |
| **Display Giant** | Anton | 500px (decorative) | 300px | 145px | 400 | uppercase | 1em |
| **H1 / Primary** | Anton | 85px | 50px | 45px | 400 | uppercase | 1em |
| **H2 / Secondary** | Anton | 65px | 40px | 30px | 400 | uppercase | 1em |
| **H3 / Subheading** | Anton | 30px | 25px | 20px | 400 | uppercase | 0.8–1em |
| **Section label** | Anton | 18px | 18px | 14px | 400 | uppercase | — | letter-spacing: 0.3px |
| **Body large** | Montserrat | 24px | — | 16px | 400 | none | 0.8–1.5em |
| **Body medium** | Montserrat | 18px | — | 16px | 400/700 | none | 1.2–1.5em |
| **Body small / caption** | Montserrat | 14px | — | 14px | 400/700 | none | 1.2–1.5em |
| **CTA / Button** | Montserrat | 18–20px | — | — | 700 | none | 1em |
| **Section heading (Montserrat)** | Montserrat | 30–40px | 22–35px | 18–30px | 700 | none | 1.0–1.2em |

### Letter-Spacing
- Anton labels (small sizes ~18–30px): `0.3–0.6px` — minimal, not wide tracking
- Montserrat body/UI: `0px` default — no extra tracking
- No wide uppercase tracking (not the Swiss grid school approach — more raw/direct)

### Line-Height Summary
- Anton display: `1em` (very tight, glyphs touch)
- Montserrat body: `1.2em` (compact) to `1.5em` (reading text)
- Montserrat small labels: `0.8em` (very tight — used decoratively)

---

## 3. Spacing

### Container
```
Max-width desktop:   1440px
Max-width tablet:    1024px
Max-width mobile:    767px
Content max-width:   800px  (WP preset for text columns)
Wide content:        1200px (WP preset for images/full sections)
```

### Section Padding
- Default container padding: `0px` all sides (Elementor resets)
- Widget spacing (gap between widgets): `20px` row + `20px` column
- Section-level padding is set per-element in Elementor (not globally) → inferred from visual inspection: sections use approximately **80–120px vertical padding** on desktop

### Gap Rhythm
- Widget gap: `20px` (global kit default)
- Layout gap: `24px` (WordPress block default)
- Custom two-column layout uses sticky positioning (no fixed gap value)

---

## 4. Layout Patterns

### Numbered List Style (e.g. "01. POSITIONIERUNG & STRATEGIE")
- Prefix: zero-padded two-digit number `01.`
- Font: Anton, ~30px, uppercase, `letter-spacing: 0.6px`, line-height `0.8em`
- Label after number: same Anton size, same case
- NOT used as `<ol>` — styled as decorative text prefix
- Spacing between items: tight (0.8em line-height suggests they're closely stacked)

### Heading Structure Pattern
- **Eyebrow/category label**: Anton 18px uppercase, muted or accent color
- **Main headline**: Anton 65–85px uppercase, charcoal `#3A3A3A`, `line-height: 1em`
- **Sub-text/descriptor**: Montserrat 18–24px regular, muted `#B5B5B5` or charcoal/80
- No eyebrow with rule/line above — purely typographic separation

### Section Separation
- Alternating backgrounds: `#FBFBFB` ↔ `#F5F5F5` (very subtle)
- NO decorative horizontal rules between sections visible in CSS
- Whitespace is the primary separator (large vertical padding)

### Two-Column Sticky Pattern
- Left: sticky text column (`position: sticky`, `align-self: flex-start`)
- Right: scrolling media/content column
- Used for services/skills section

### CTA / Buttons
- Text: Montserrat 18–20px, weight 700
- Style from HTML: `elementor-button` class — shaped as pill or rounded rect
- Border-radius: NOT found in computed CSS (Elementor default = no radius or very small)
- CTA text examples: "JETZT ANFRAGEN", "Let's go!", "Kontakt" — direct, imperative
- Hover: no data in static CSS (likely JS-driven color swap)
- Primary CTA: coral `#FF6666` background — high contrast
- Secondary: ghost/outline style

### Navigation
- Header: sticky (`position: sticky; top: 0; z-index: 40`)
- Navigation font: Anton uppercase (inferred from site style)

### Micro-Typography
- **Uppercase usage**: pervasive in headings (all Anton usage is uppercase)
- **Monospace**: NOT used on studio-sven.de — Montserrat handles all UI text
- **Text alignment**: largely left-aligned; centered only for specific callout sections
- **Separator chars**: numbered prefixes `01.` — no pipe `|` or dot `·` separators visible

---

## 5. Components

### Cards / Tiles
- Background: `#FFFFFF` or `#F5F5F5`
- Border: not prominent (no explicit border-color in kit)
- Border-radius: not defined in kit → likely `0` or very small (≤4px)
- Shadow: none evident — flat design

### Badges / Labels
- Not a separate component — text labels in Anton uppercase at small sizes serve this role
- No rounded badge pill pattern visible

### Dividers / Separators
- Not used as visual elements — whitespace only

### Icons
- Remix Icons / Elementor icons (SVG inline)
- Arrow: long right arrow `→` for CTAs
- LinkedIn icon in footer
- Minimal icon usage overall

---

## 6. Mapping to ai-boutique.de

### What to adopt
| studio-sven.de pattern | ai-boutique.de mapping |
|------------------------|----------------------|
| Anton as display font | Add Anton for large hero headline only |
| `#3A3A3A` charcoal as "dark" | Use as card surface text in dark sections |
| `#FF6666` coral accent | Map to primary CTA / hover accent |
| `#FFF56E` yellow highlight | Optional hover-line or active state |
| `#6F77F4` indigo | Badge borders, secondary links |
| `#FBFBFB` / `#F5F5F5` alternation | Not applicable (site stays dark) |
| Numbered `01.` prefix style | Apply to service list items or G.R.O.W. cards |
| Tight `line-height: 1em` on display | Apply to hero headline and GROW letter cards |
| `letter-spacing: 0.3–0.6px` on labels | Reduce current tracking from `tracking-widest` to subtle |
| 1440px max container | Align site container to 1440px max |
| `font-weight: 700` Montserrat for subheadings | Already in use — confirm |

### What NOT to adopt
- Light backgrounds (ai-boutique.de stays dark)
- Photo-hero layout
- Accordion/FAQ pattern (studio-sven.de uses `+/-` accordion)
- Any content, copy, or section labels from studio-sven.de

### Recommended accent color for dark theme
Since the site inverts (dark bg), the coral `#FF6666` still works as accent.
For text on dark: use `#FBFBFB` instead of `#3A3A3A` as foreground.
Charcoal `#3A3A3A` can serve as card/tile surface color in the dark theme.
