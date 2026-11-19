/* ==========================================================================
   silk.js — živě generované vlny pro celý web
   Každý <figure data-silk="číslo"> dostane vlastní animaci, která se pořád
   plynule proměňuje do nových, náhodných tvarů.
   Číslo (seed) určuje jen statický náhled pro prohlížeče bez JavaScriptu.
   ========================================================================== */

// ===== 1. Náhoda se seedem =====
// Math.random() dává pokaždé jiná čísla. My chceme, aby seed 7 vypadal
// vždy stejně, proto použijeme malý generátor, který jde "nastartovat" číslem.
function generatorNahody(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // číslo 0–1
  };
}

// ===== 2. Parametry jedné vlny =====
function parametryZeSeedu(seed) {
  const nahoda = generatorNahody(seed);
  const mezi = (min, max) => min + nahoda() * (max - min);
  const P = {
    a: mezi(2, 6), b: mezi(2, 6), c: mezi(2, 6), d: mezi(2, 6),
    p0: mezi(0, 6.28), p1: mezi(0, 6.28), p2: mezi(0, 6.28),
    kontrast: mezi(1.2, 2.4), // vyšší = ostřejší přechody, pohyb je lépe vidět
    tabulka: new Float32Array(256),
  };
  // kontrast předpočítaný pro 256 odstínů (Math.pow je pomalý)
  for (let i = 0; i < 256; i++) P.tabulka[i] = Math.pow(i / 255, P.kontrast);
  return P;
}

// Plynulý přechod mezi dvěma sadami parametrů: k = 0 → A, k = 1 → B
function smichej(A, B, k) {
  const m = (x, y) => x + (y - x) * k;
  const P = {
    a: m(A.a, B.a), b: m(A.b, B.b), c: m(A.c, B.c), d: m(A.d, B.d),
    p0: m(A.p0, B.p0), p1: m(A.p1, B.p1), p2: m(A.p2, B.p2),
    kontrast: m(A.kontrast, B.kontrast),
    tabulka: new Float32Array(256),
  };
  for (let i = 0; i < 256; i++) P.tabulka[i] = Math.pow(i / 255, P.kontrast);
  return P;
}

// ===== 3. Vykreslení jednoho snímku do pole pixelů =====
// data = pole RGBA, W × H = rozměr, t = čas 0 až 2π, zrno = síla šumu
function vykresliSilk(data, W, H, P, t, zrno) {
  const s = Math.max(W, H);
  const radky = new Float32Array(H);
  const sloupce = new Float32Array(W);
  for (let y = 0; y < H; y++) radky[y] = Math.sin((y / s) * P.b * 2 + P.p0 + t) * P.c;
  for (let x = 0; x < W; x++) sloupce[x] = Math.sin((x / s) * P.b * 2 + P.p2 - t) * 2;

  for (let y = 0; y < H; y++) {
    const ny = y / s;
    for (let x = 0; x < W; x++) {
      const nx = x / s;
      const vlna1 = Math.sin(nx * P.a * 3 + radky[y] + P.p1 + t);
      const vlna2 = Math.sin(ny * P.d * 3 + sloupce[x]);
      let v = (vlna1 + 0.6 * vlna2 + 1.6) / 3.2;       // 0–1
      v = P.tabulka[(v * 255) | 0];                     // kontrast
      v = v * 0.85 + 0.08 + (Math.random() - 0.5) * zrno;
      const sed = Math.max(0, Math.min(1, v)) * 255;
      const i = (y * W + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = sed;
      data[i + 3] = 255;
    }
  }
}

// ===== 4. Oživení všech obrázků na stránce =====
function spustSilk() {
  const figury = document.querySelectorAll("[data-silk]");
  const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RYCHLOST = 1.4;   // jak rychle vlny plynou (vyšší = rychlejší)
  const PROMENA = 5;      // za kolik sekund se vlna promění v nový tvar
  const nahodnySeed = () => Math.floor(Math.random() * 1e9);
  const polozky = [];

  figury.forEach((figura) => {
    // Bez CSS (styly se nenačetly) nemá plátno kam se položit, tak ho nepřidáváme
    // a necháme jen statický obrázek.
    if (getComputedStyle(figura).position === "static") return;

    const canvas = document.createElement("canvas");
    canvas.className = "silk__canvas";
    canvas.setAttribute("aria-hidden", "true"); // popis nese <img alt> pod ním
    figura.prepend(canvas);
    figura.classList.add("silk--live");

    polozky.push({
      figura,
      canvas,
      ctx: canvas.getContext("2d"),
      odkud: parametryZeSeedu(nahodnySeed()), // při každém načtení jiný tvar
      kam: parametryZeSeedu(nahodnySeed()),   // tvar, do kterého se mění
      posun: Math.random() * PROMENA,         // ať se nemění všechny naráz
      viditelna: false,
      obraz: null,
    });
  });

  // Plátno kreslíme v nízkém rozlišení (¼) — vlny jsou měkké, takže
  // zvětšení v prohlížeči nevadí a je to 16× rychlejší. Zrno přidává CSS.
  function nastavVelikost(p) {
    const r = p.figura.getBoundingClientRect();
    const w = Math.max(40, Math.round(r.width / 4));
    const h = Math.max(40, Math.round(r.height / 4));
    if (p.canvas.width !== w || p.canvas.height !== h) {
      p.canvas.width = w;
      p.canvas.height = h;
      p.obraz = p.ctx.createImageData(w, h);
    }
  }

  // Jeden snímek: spočítá, jak daleko je proměna, smíchá parametry a nakreslí
  function nakresli(p, sekundy) {
    const cas = sekundy + p.posun;
    const cyklus = Math.floor(cas / PROMENA);
    if (p.cyklus === undefined) p.cyklus = cyklus;
    if (cyklus !== p.cyklus) {           // proměna dokončena → vylosuj další tvar
      p.cyklus = cyklus;
      p.odkud = p.kam;
      p.kam = parametryZeSeedu(nahodnySeed());
    }
    let k = (cas % PROMENA) / PROMENA;   // 0 → 1 během jedné proměny
    k = k * k * (3 - 2 * k);             // "smoothstep": pomalý rozjezd i dojezd
    const P = smichej(p.odkud, p.kam, k);
    vykresliSilk(p.obraz.data, p.canvas.width, p.canvas.height, P, sekundy * RYCHLOST, 0);
    p.ctx.putImageData(p.obraz, 0, 0);
  }

  // Animujeme jen obrázky, které jsou právě vidět (šetří procesor).
  const pozorovatel = new IntersectionObserver((zaznamy) => {
    zaznamy.forEach((z) => {
      const p = polozky.find((q) => q.figura === z.target);
      p.viditelna = z.isIntersecting;
    });
  });

  const start = performance.now();
  const ted = () => (performance.now() - start) / 1000;

  polozky.forEach((p) => {
    nastavVelikost(p);
    nakresli(p, 0);
    pozorovatel.observe(p.figura);
  });

  window.addEventListener("resize", () => {
    polozky.forEach((p) => { nastavVelikost(p); nakresli(p, ted()); });
  });

  if (bezPohybu) return; // uživatel si v systému vypnul animace → jen statický snímek

  function snimek() {
    const sekundy = ted();
    polozky.forEach((p) => { if (p.viditelna) nakresli(p, sekundy); });
    requestAnimationFrame(snimek);
  }
  requestAnimationFrame(snimek);
}

// Spustit v prohlížeči; v Node.js jen zpřístupnit funkce (pro generování náhledů)
if (typeof document !== "undefined") {
  spustSilk();
} else if (typeof module !== "undefined") {
  module.exports = { parametryZeSeedu, vykresliSilk };
}
