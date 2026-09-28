# Portfolio — Matouš Mamolat (4IZ268, statické stránky)

Ručně psané HTML + CSS, bez frameworku a bez šablony. Všechny obrázky kreslí živě `js/silk.js`; bez JavaScriptu se zobrazí statické náhledy z `img/silk/`.

## Struktura
```
index.html      Úvod (claim, výběr prací, jak pracuji)
about.html      O mně (zkušenosti, vzdělání, toolkit)
projects.html   Projekty (6 projektů)
interests.html  Zájmy (4 karty + „Currently“)
contact.html    Kontakt
css/style.css   Veškeré styly vč. responzivity a @media print
fonts/          Inter Tight (self-hosted, latin + latin-ext kvůli „š“)
js/silk.js      Živé generativní vlny: každý <figure data-silk="seed"> dostane animaci
img/silk/       Statické náhledy (fallback bez JS) — generuj přes tools/posters.html
img/portrait.*  Fotka bez pozadí (About)
img/shots/      Černobílé screenshoty projektů (odhalí se při najetí myší)
tools/          Pomocný generátor náhledů (na web ho nahrávat nemusíš)
favicon.ico / favicon.svg / apple-touch-icon.png
```

## Co musíš doplnit (TODO)
- [ ] Změnit seedy podle chuti (atribut `data-silk`) a přegenerovat náhledy přes `tools/posters.html`
- [ ] Projít texty a přepsat, co nesedí — obsah webu je tvůj

## Kontrola před odevzdáním (požadavky předmětu)
- [x] 5 stránek s navigací, zvýrazněná aktivní položka (`aria-current="page"`)
- [x] Validní HTML5 + CSS (ověřeno W3C Nu validátorem) — **po každé úpravě ověř znovu všechny stránky** na validator.w3.org
- [x] Sémantické značky (header, nav, main, section, article, figure, footer, address, dl)
- [x] CSS a JS odděleny od obsahu; bez JS web funguje (statické náhledy)
- [x] Vícesloupcový layout bez tabulek (CSS Grid), na starších prohlížečích se sloupce jen seřadí pod sebe
- [x] Verze pro tisk (skrytá navigace a dekorace, u odkazů se vypíše URL)
- [x] Identifikace webu na všech stránkách, i bez obrázků a při tisku (textové logo)
- [x] Každá stránka: vlastní `h1`, `title` ve tvaru „Stránka — Matouš Mamolat“, meta description, favicon
- [x] Podtržené odkazy, kontrast ≥ 7:1, písmo min. 13 px (popisky) / 16 px (text)
- [x] Použitelné v 800×600 (jméno, navigace a claim nad přehybem)
- [ ] `alt` texty odpovídají skutečným obrázkům (po výměně!)
- [ ] Test: vypnout CSS v prohlížeči (Firefox: Zobrazit → Styl stránky → Bez stylu) — obsah musí být čitelný
- [ ] Test v Chrome, Firefoxu, Safari/Edge + na mobilu

## Nasazení
1. Nahrát **celou složku** (včetně `css/`, `fonts/`, `img/`) na eso.vse.cz podle návodu z cvičení.
2. Záloha: GitHub repozitář + GitHub Pages (Settings → Pages → branch `main`, root).
3. Odkaz odevzdat v odevzdávárně InSIS do konce 9. týdne výuky.
