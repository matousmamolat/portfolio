# Portfolio: Matouš Mamolat

Semestrální práce **4IZ268 Webové technologie: statické stránky** (VŠE, ZS 2026/2027).
Osobní portfolio, které slouží i jako moje CV při hledání práce.

- Web: https://matousmamolat.github.io/portfolio/
- Zdrojový kód: https://github.com/matousmamolat/portfolio

Ručně psané HTML a CSS, bez frameworku, bez CMS a bez šablony. Vizuální styl je inspirovaný
minimalistickým webem studia Inertia: velká typografie, černobílá paleta, tenké linky a popisky v závorkách.

## Stránky

| Soubor | Obsah |
|---|---|
| `index.html` | Úvod: claim, krátké představení, výběr prací, jak pracuji |
| `about.html` | O mně: fotka na živém pozadí, praxe, vzdělání, jazyky, toolkit |
| `projects.html` | 6 projektů (SpellBattle, Fivefold, School dashboard, databáze, tento web, Generative studies) a další školní práce |
| `interests.html` | Zájmy jako otázky: Art, Physics, Information, Philosophy, a co právě dělám |
| `contact.html` | Kontakty a noční fotka, kde místo oblohy plynou živé vlny |

## Struktura souborů

```
css/style.css       Všechny styly: layout, responzivita, animované zrno, tisková verze
js/silk.js          Živé generativní vlny pro všechny obrázky (jediný JavaScript na webu)
fonts/              Písmo Inter Tight (uložené lokálně, latin + latin-ext kvůli češtině)
img/silk/           Statické náhledy vln, zobrazí se, když neběží JavaScript
img/shots/          Černobílé screenshoty projektů (odhalí se po najetí myší)
img/portrait.*      Fotka bez pozadí (About), WebP + PNG jako záloha
img/contact-night.* Fotka s průhlednou oblohou (Contact), WebP + PNG
img/grain.png       Textura filmového zrna
favicon.ico, favicon.svg, apple-touch-icon.png
tools/posters.html  Pomocný generátor náhledů, jen pro mě, na web nepatří
```

## Jak to funguje

**Generativní vlny (`js/silk.js`).** Každý `<figure data-silk="číslo">` dostane `<canvas>`, do kterého
se kreslí vlna. Jas pixelu je sinus vnořený do dalšího sinu, parametry jsou náhodné, takže je vlna
při každé návštěvě jiná a každých pár sekund se plynule promění v nový tvar.
- Kreslí se ve čtvrtinovém rozlišení (16× méně výpočtů), prohlížeč obraz zvětší.
- `IntersectionObserver` animuje jen obrázky, které jsou právě vidět.
- `prefers-reduced-motion`: kdo má v systému vypnuté animace, uvidí statický snímek.
- Bez JavaScriptu nebo bez CSS zůstane vidět obyčejný `<img>` s náhledem a `alt` textem.

**Screenshoty projektů.** Pod vlnou je schovaný skutečný screenshot, který se objeví po najetí myší,
po klepnutí na mobilu nebo při fokusu z klávesnice (`:hover`, `:focus`, `tabindex="0"`). Čistě CSS, bez JS.

**Šipky u odkazů** jsou kreslené přes CSS masku se SVG, ne jako znak písma. Safari na iPhonu jinak
znaky jako ↗ zobrazuje jako barevné emoji.

## Splnění požadavků předmětu

| Požadavek | Jak je splněn |
|---|---|
| Reálná entita, vlastní obsah i vzhled | Osobní web o mně, žádné CMS, šablona ani Bootstrap |
| Dostupné na internetu | GitHub Pages |
| Minimálně 5 stránek se smysluplnou navigací | 5 stránek, stejná navigace všude |
| Validní HTML5 | Všechny stránky i CSS ověřené W3C validátorem bez chyb |
| Sémantické značky HTML5 | `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `footer`, `address`, `dl` |
| CSS a JS oddělené od obsahu | Jeden soubor `css/style.css` a jeden `js/silk.js`, žádné inline styly |
| Funguje bez CSS a JS | Bez JS statické náhledy, bez CSS čitelný dokument v logickém pořadí |
| Vícesloupcový layout bez tabulek | CSS Grid, na stránce Interests 4 sloupce, jinde 2–3 |
| Verze pro tisk | `@media print`: skrytá navigace a dekorace, u odkazů vypsaná URL, místo vln se tisknou screenshoty |
| Identifikace webu i při tisku a bez obrázků | Textové logo „matouš mamolat“ na každé stránce, v tisku doplněné „portfolio“ |
| Neduplikovat URL | Odkazy na úvod vedou na `./`, ne na `index.html`, a každá stránka má `rel="canonical"` |
| Odlišené odkazy | Podtržení v textu, šipky u odkazů ven, inverzní zvýraznění v menu |
| Zvýrazněná aktivní položka menu | `aria-current="page"`, černý štítek |
| Každá stránka: vlastní `h1` a `title` | Titulek ve tvaru „Stránka \| Matouš Mamolat“ |
| Vhodné písmo a barvy | Inter Tight, text min. 16 px, popisky 13 px, kontrast textu 7:1 a víc |
| Obrázky s `alt`, optimalizované | Všechny `img` mají `alt` (dekorativní `alt=""`), JPG/WebP zmenšené pro web |
| Meta informace a favicon | `charset`, `viewport`, `description`, `author`, `theme-color`, favicon ICO/SVG/PNG |
| Použitelné v 800×600 | Jméno, menu a hlavní nadpis jsou vždy nad přehybem |
| Běžné prohlížeče | Otestováno v Chromiu a Brave, na mobilu v Safari |

## Kontrola před odevzdáním

- [ ] Po poslední úpravě znovu projít všech 5 stránek na https://validator.w3.org/ (i CSS)
- [ ] Vypnout CSS (Firefox: Zobrazit → Styl stránky → Bez stylu) a projít obsah
- [ ] Vypnout JavaScript a zkontrolovat, že jsou vidět obrázky
- [ ] Náhled tisku (Ctrl+P) u všech stránek
- [ ] Zmenšit okno na 800×600
- [ ] Vyzkoušet na mobilu
- [ ] Odevzdat odkaz do odevzdávárny v InSIS **do konce 9. týdne výuky**

## Úpravy

- **Jiný statický náhled:** změnit číslo v `data-silk`, v `tools/posters.html` vygenerovat nový náhled a uložit ho do `img/silk/`.
- **Rychlost animace:** konstanty `RYCHLOST` a `PROMENA` v `js/silk.js`.
- **Nový screenshot projektu:** černobílý obrázek 1200×800 do `img/shots/`.
