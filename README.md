# Portfolio — Matouš Mamolat (4IZ268, statické stránky)

Ručně psané HTML + CSS, bez frameworku, bez šablony, bez JavaScriptu.

## Struktura
```
index.html      Úvod (claim, výběr prací, jak pracuji)
about.html      O mně (zkušenosti, vzdělání, toolkit)
projects.html   Projekty (5 projektů)
interests.html  Zájmy (4 karty + „Currently“)
contact.html    Kontakt
css/style.css   Veškeré styly vč. responzivity a @media print
fonts/          Inter Tight (self-hosted, latin + latin-ext kvůli „š“)
img/            ZÁSTUPNÉ obrázky — vyměnit za vlastní
favicon.ico / favicon.svg / apple-touch-icon.png
```

## Co musíš doplnit (TODO)
- [ ] `[TODO: company]` — název firmy (index.html, about.html)
- [ ] `[TODO: level]` — úroveň angličtiny (about.html)
- [ ] LinkedIn URL — nahradit `https://www.linkedin.com/in/TODO` ve všech 5 stránkách (najdi a nahraď)
- [ ] Vyměnit obrázky v `img/` za vlastní — **stejné názvy souborů**, pak upravit `alt` a `width`/`height` v HTML podle skutečných rozměrů
  - `portrait.jpg` tvoje fotka (4:5), `hero-1/2/3.jpg` 3:2, `project-*.jpg` 3:2, `interest-*.jpg` 1:1
  - optimalizovat velikost: šířka max ~1200 px, JPG kvalita ~75–80 (např. squoosh.app)
- [ ] Projít texty a přepsat, co nesedí — obsah webu je tvůj

## Kontrola před odevzdáním (požadavky předmětu)
- [x] 5 stránek s navigací, zvýrazněná aktivní položka (`aria-current="page"`)
- [x] Validní HTML5 + CSS (ověřeno W3C Nu validátorem) — **po každé úpravě ověř znovu všechny stránky** na validator.w3.org
- [x] Sémantické značky (header, nav, main, section, article, figure, footer, address, dl)
- [x] CSS odděleno od obsahu, žádný JS → funguje bez JS
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
