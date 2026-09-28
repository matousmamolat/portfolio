/* ==========================================================================
   silk.js — živě generované vlny pro celý web
   Každý <figure data-silk="číslo"> dostane vlastní animaci.
   Číslo (seed) určuje, jak vlna vypadá — stejný seed = vždy stejný obrázek.
   Bez JavaScriptu se zobrazí statický obrázek <img>, který je uvnitř figure.
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
    kontrast: mezi(0.8, 1.6),
    tabulka: new Float32Array(256),
  };
  // kontrast předpočítaný pro 256 odstínů (Math.pow je pomalý)
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
  const DELKA_SMYCKY = 14; // sekund na jednu celou smyčku
  const polozky = [];

  figury.forEach((figura) => {
    const canvas = document.createElement("canvas");
    canvas.className = "silk__canvas";
    canvas.setAttribute("aria-hidden", "true"); // popis nese <img alt> pod ním
    figura.prepend(canvas);
    figura.classList.add("silk--live");

    polozky.push({
      figura,
      canvas,
      ctx: canvas.getContext("2d"),
      P: parametryZeSeedu(Number(figura.dataset.silk)),
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

  function nakresli(p, t) {
    vykresliSilk(p.obraz.data, p.canvas.width, p.canvas.height, p.P, t, 0);
    p.ctx.putImageData(p.obraz, 0, 0);
  }

  // Animujeme jen obrázky, které jsou právě vidět (šetří procesor).
  const pozorovatel = new IntersectionObserver((zaznamy) => {
    zaznamy.forEach((z) => {
      const p = polozky.find((q) => q.figura === z.target);
      p.viditelna = z.isIntersecting;
    });
  });

  polozky.forEach((p) => {
    nastavVelikost(p);
    nakresli(p, 0);
    pozorovatel.observe(p.figura);
  });

  window.addEventListener("resize", () => {
    polozky.forEach((p) => { nastavVelikost(p); nakresli(p, 0); });
  });

  if (bezPohybu) return; // uživatel si v systému vypnul animace → jen statický snímek

  const start = performance.now();
  function snimek(ted) {
    const t = (((ted - start) / 1000) / DELKA_SMYCKY) * Math.PI * 2;
    polozky.forEach((p) => { if (p.viditelna) nakresli(p, t); });
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
