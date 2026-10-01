/* Tranquil Bay · brochure modules (M00, M01 weekend, M02–M08) as custom elements.
   Ported from 04_Interactive_Modules; event names unchanged. Requires window.TB (tranquil_bay_data.js). */
(function () {
  if (window.TBX && window.TBX.__brochure) return;
  const TB = window.TB;
  const base = window.TB_ASSET_BASE || 'assets/';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* re-renders from 02_TranquilBay_Image_Generation_Guide land in Rerenders/ and are tried first */
  const RR = {
    'Villas/cove_2bhk_front.jpg': 'Rerenders/TB_IMG01_Cove_front_16x9.jpg',
    'Villas/lagoon_3bhk_front.jpg': 'Rerenders/TB_IMG02_Lagoon_front_16x9.jpg',
    'Villas/estuary_4bhk_front.jpg': 'Rerenders/TB_IMG03_Estuary_front_16x9.jpg',
    'Cluster/moorings_street.jpg': 'Rerenders/TB_IMG04_Moorings_street_16x9.jpg',
    'Cluster/moorings_aerial_court.jpg': 'Rerenders/TB_IMG05_Moorings_aerial_court_16x9.jpg',
    'Cluster/moorings_court_eye.jpg': 'Rerenders/TB_IMG06_Moorings_court_16x9.jpg',
  };
  /* amenity illustrations as delivered (file names carry a descriptor) */
  const AMF = {AM01: 'Arrival_Court_Gatehouse', AM02: 'Shaded_Walk', AM03: 'Neighbourhood_Verandah', AM04: 'Tree_Circle', AM05: 'Play_Garden_Sand_Court', AM06: 'Quiet_Lawn',
    AM07: 'Rain_Garden_South_Gate', AM08: 'Kitchen_Garden_Orchard', AM09: 'Moorings_Court_Event', AM10: 'Clubhouse_Lap_Pool_Phase2', AM11: 'Home_Keeper'};
  const amFile = id => { const k = (id || '').replace('-', ''); return AMF[k] ? `Rerenders/TB_${k}_${AMF[k]}_16x9.jpg` : null; };
  /* until WK-01..09 are delivered, each weekend beat borrows the amenity watercolour of the same moment (same family, same paper edge) */
  const WK_STANDIN = ['AM06', 'AM11', 'AM01', 'AM03', 'AM02', 'AM09', 'AM05', 'AM07', 'AM08'];
  const TBX = {
    __brochure: true, data: TB, RR, amFile,
    asset: p => base + p,
    types: () => ['cove', 'lagoon', 'estuary'].map(k => TB.villa_types[k]),
    allTypes: () => [...['cove', 'lagoon', 'estuary'].map(k => TB.villa_types[k]), TB.moorings],
    type: id => TB.villa_types[id] || (id === 'moorings' ? TB.moorings : null),
    typeColor: id => ({cove: '#8FAAA1', lagoon: '#4E7C74', estuary: '#1F4A52', moorings: '#A9502F'})[id] || '#56706B',
    plot: no => TB.plots.find(p => p.no === +no),
    from: id => TB.pricing.starting_from[id],
    excl: () => 'Excludes ' + TB.pricing.exclusions.map(x => /^[A-Z][a-z]/.test(x) ? x[0].toLowerCase() + x.slice(1) : x).join(', ') + '.',
    sqft: m2 => Math.round(m2 * 10.7639),
    rich(str) { const f = document.createDocumentFragment(); String(str).split(/(\*\*(?:\\\*|[^*])+?\*\*)/).forEach(p => { if (!p) return; const b = p.startsWith('**') && p.endsWith('**') && p.length > 4; const t = (b ? p.slice(2, -2) : p).replace(/\\\*/g, '*'); if (b) { const n = document.createElement('b'); n.textContent = t; f.append(n); } else f.append(t); }); return f; },
    fmtInt: n => Math.round(n).toLocaleString('en-IN'),
    inr: (n, short = true) => {
      if (!short) return '₹ ' + Math.round(n).toLocaleString('en-IN');
      if (n >= 1e7) return '₹ ' + (n / 1e7).toFixed(2) + ' Cr';
      if (n >= 1e5) return '₹ ' + (n / 1e5).toFixed(1) + ' L';
      return '₹ ' + Math.round(n).toLocaleString('en-IN');
    },
    el(tag, attrs = {}, ...kids) {
      const n = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs || {})) {
        if (k === 'class') n.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
        else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
        else if (v !== false && v != null) n.setAttribute(k, v === true ? '' : v);
      }
      for (const c of kids.flat()) if (c != null) n.append(c.nodeType ? c : document.createTextNode(c));
      return n;
    },
    svg(tag, attrs = {}) { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v); return n; },
    pts: arr => arr.map(p => p.join(',')).join(' '),
    /* image with fallback chain: re-render -> current asset -> quiet 'pending' panel */
    img(src, alt, pendingLabel, tries) {
      const wrap = TBX.el('div', {class: 'tb-imgwrap', style: {position: 'absolute', inset: 0}});
      const list = tries || [RR[src], src].filter(Boolean);
      const i = TBX.el('img', {alt: alt || '', loading: 'lazy', decoding: 'async', style: {width: '100%', height: '100%', objectFit: 'cover'}});
      let k = 0; const next = () => { if (k < list.length) i.src = TBX.asset(list[k++]); else { wrap.innerHTML = ''; wrap.append(TBX.el('div', {class: 'tb-pending'}, TBX.el('span', {}, pendingLabel || 'Render pending'))); } };
      i.onerror = next; next(); wrap.append(i); return wrap;
    },
    drawPlan(svgEl, {rotate = -72, pins = true} = {}) {
      const G = TB.geometry, S = TBX.svg, P = TBX.pts;
      const world = S('g', {}); svgEl.append(world);
      world.append(S('polygon', {points: P(G.lookout_parcel), fill: 'rgba(0,0,0,.05)'}));
      world.append(S('polygon', {points: P(G.lookout_tower), fill: 'rgba(0,0,0,.25)'}));
      G.open_spaces.forEach(o => world.append(S('polygon', {points: P(o.pts), fill: '#2E4636', opacity: .22})));
      G.roads.forEach(r => world.append(S('polyline', {points: P(r.pts), fill: 'none', stroke: 'rgba(0,0,0,.12)', 'stroke-width': r.width * 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'})));
      world.append(S('polygon', {points: P(G.boundary), fill: 'none', stroke: 'currentColor', 'stroke-opacity': .4, 'stroke-width': 2, 'stroke-dasharray': '12 8'}));
      TB.plots.forEach(p => world.append(S('polygon', {points: P(G.plots[p.no]), fill: TBX.typeColor(p.default_type), stroke: '#F2EEE6', 'stroke-width': 3, opacity: .55})));
      const pinEls = {};
      if (pins) TB.amenities.filter(a => !a.service && a.map).forEach((a, i) => {
        const g = S('g', {transform: `translate(${a.map[0]},${a.map[1]})`, 'data-id': a.id, style: 'cursor:pointer'});
        const c = S('circle', {r: 26, fill: a.phase === 2 ? '#F2EEE6' : '#1C2321', stroke: a.phase === 2 ? '#1C2321' : '#F2EEE6', 'stroke-width': 3, 'stroke-dasharray': a.phase === 2 ? '6 4' : 'none'});
        const t = S('text', {'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 20, fill: a.phase === 2 ? '#1C2321' : '#F2EEE6', transform: `rotate(${-rotate})`});
        t.textContent = String(i + 1).padStart(2, '0'); g.append(c, t); world.append(g); pinEls[a.id] = g;
      });
      world.setAttribute('transform', `rotate(${rotate} 450 800)`);
      requestAnimationFrame(() => { const b = world.getBBox(); const m = 60, rad = rotate * Math.PI / 180, cx = 450, cy = 800;
        const q = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) =>
          [cx + (x - cx) * Math.cos(rad) - (y - cy) * Math.sin(rad), cy + (x - cx) * Math.sin(rad) + (y - cy) * Math.cos(rad)]);
        const X = q.map(p => p[0]), Y = q.map(p => p[1]);
        svgEl.setAttribute('viewBox', `${Math.min(...X) - m} ${Math.min(...Y) - m} ${Math.max(...X) - Math.min(...X) + 2 * m} ${Math.max(...Y) - Math.min(...Y) + 2 * m}`); });
      return {world, pins: pinEls};
    },
    /* one page: events stay on window */
    emit(type, detail) { window.dispatchEvent(new CustomEvent('tb:' + type, {detail})); },
    on(type, fn) { window.addEventListener('tb:' + type, e => fn(e.detail || {})); },
    section: name => document.querySelector(`[data-tb-section="${name}"]`),
    scrollTo(t, offset = 0) {
      const e = typeof t === 'string' ? TBX.section(t) : t; if (!e) return;
      window.scrollTo({top: e.getBoundingClientRect().top + window.scrollY + offset, behavior: reduced ? 'auto' : 'smooth'});
    },
    store: {
      get(k) { try { return JSON.parse(localStorage.getItem('tb:' + k)); } catch (e) { return null; } },
      set(k, v) { try { localStorage.setItem('tb:' + k, JSON.stringify(v)); } catch (e) {} },
    },
  };
  window.TBX = TBX;
  const {el, svg, pts} = TBX; const D = TB;

  /* ---------- shared primitives (from tb-core.css) ---------- */
  const baseCSS = `
  :root{--tb-ink:#1C2321;--tb-ink-2:#3A4441;--tb-paper:#F2EEE6;--tb-paper-2:#E6E0D4;--tb-mist:#C7CDC5;--tb-river:#56706B;--tb-grove:#2E4636;--tb-clay:#A9502F;--tb-lamp:#D8A657;
    --tb-line:rgba(28,35,33,.16);--tb-line-light:rgba(242,238,230,.28);--type-cove:#8FAAA1;--type-lagoon:#4E7C74;--type-estuary:#1F4A52;--type-moorings:#A9502F;
    --f-display:'Cormorant Garamond','Cormorant',Garamond,'Times New Roman',serif;--f-ui:'Manrope','Segoe UI',system-ui,sans-serif;--f-data:'IBM Plex Mono',ui-monospace,monospace;--gutter:clamp(16px,4vw,64px);--ease:cubic-bezier(.2,.7,.1,1);--chrome-top:0px;--chrome-foot:0px}
  html.tb-chrome{--chrome-top:76px;--chrome-foot:30px}
  @media (max-width:760px){html.tb-chrome{--chrome-top:60px;--chrome-foot:38px}}
  .tbm{display:block;position:relative;font-family:var(--f-ui);letter-spacing:.005em;font-variant-numeric:lining-nums}
  .tbm img{max-width:100%;display:block}
  .tbm button{font:inherit;color:inherit;cursor:pointer}
  .tbm :focus-visible{outline:2px solid var(--tb-lamp);outline-offset:3px}
  .tb-eyebrow{font-family:var(--f-data);font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;opacity:.72}
  .tb-display{font-family:var(--f-display);font-weight:400;line-height:1.02;letter-spacing:.01em}
  .tb-display-sm{font-family:var(--f-display);font-weight:500;letter-spacing:.01em;line-height:1.1}
  .tb-num{font-family:var(--f-data);font-variant-numeric:tabular-nums}
  .tb-muted{opacity:.66}
  .tb-chips{display:flex;flex-wrap:wrap;gap:6px 18px}
  .tb-chip{background:none;border:0;padding:10px 0 6px;min-height:44px;border-bottom:1px solid transparent;font-size:14px;opacity:.7;transition:opacity .2s,border-color .2s;display:inline-flex;align-items:center}
  .tb-chip:hover{opacity:1}
  .tb-chip[aria-pressed="true"]{opacity:1;border-color:currentColor}
  .tb-chip .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:8px}
  .tb-btn{display:inline-flex;align-items:center;gap:10px;background:var(--tb-ink);color:var(--tb-paper);border:0;padding:12px 20px;min-height:44px;border-radius:999px;font-size:14px;letter-spacing:.01em;transition:background .2s;text-decoration:none;cursor:pointer}
  .tb-btn:hover{background:var(--tb-river)}
  .tb-btn.ghost{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}
  .tb-btn.ghost:hover{background:rgba(127,127,127,.12)}
  .tb-btn.lamp{background:var(--tb-lamp);color:var(--tb-ink)}
  .tb-disclaimer{font-family:var(--f-data);font-size:10.5px;letter-spacing:.04em;opacity:.7;line-height:1.5}
  .tb-pending{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(120% 90% at 70% 40%,#6d847e 0%,#3c4f4a 55%,#1f2927 100%);color:var(--tb-paper)}
  .tb-pending span{font-family:var(--f-data);font-size:11px;letter-spacing:.12em;opacity:.8;border-top:1px solid var(--tb-line-light);padding-top:8px}
  @keyframes tb-draw{to{stroke-dashoffset:0}}
  @keyframes tb-pulse{0%{r:8;opacity:1}100%{r:34;opacity:0}}
  @media (prefers-reduced-motion:reduce){.tbm *{transition:none!important;animation:none!important}}`;
  function injectCSS(id, text) { if (document.getElementById(id)) return; const s = document.createElement('style'); s.id = id; s.textContent = text; document.head.append(s); }
  injectCSS('tb-base', baseCSS);
  function define(tag, css, build) {
    if (customElements.get(tag)) return;
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() { if (this._built) return; this._built = true; this.classList.add('tbm'); injectCSS('css-' + tag, `${tag}{${css}}`);
        const $ = k => this.querySelector(`[data-r="${k}"]`); try { build(this, $); } catch (e) { console.error(tag, e); } }
    });
  }
  const pad2 = i => String(i).padStart(2, '0');
  const noOnwards = s => s.replace(' onwards', '');

  /* ---------- router: scroll to the chapter that responds ---------- */
  TBX.on('filter-type', () => TBX.scrollTo('Masterplan'));
  TBX.on('focus-plot', () => TBX.scrollTo('Masterplan'));
  TBX.on('amenity', d => { if (d.scroll !== false) TBX.scrollTo('Shared ground'); });
  TBX.on('lead', d => { const ep = window.TB_FORM_ENDPOINT; if (ep) fetch(ep, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(d)}).catch(() => {}); else console.info('[Tranquil Bay] lead (no endpoint set)', d); });

  /* =================== 03 · A weekend here (M01 bottom) · paper ground, WK-01..09 illustrations =================== */
  define('tb-weekend', `
    position:relative;background:var(--tb-paper);color:var(--tb-ink);
    .pin{position:sticky;top:0;height:100vh;min-height:560px;overflow:hidden}
    .bg{position:absolute;inset:0;opacity:0;transition:opacity .9s var(--ease)}
    .bg.on{opacity:1}
    .bg .tb-pending{left:34%;background:radial-gradient(90% 80% at 62% 45%,#e9e2d3 0%,#ddd4c2 60%,#cfc5b1 100%);color:var(--tb-ink)}
    .bg .tb-pending span{border-color:var(--tb-line)}
    .shade{position:absolute;inset:0;background:linear-gradient(90deg,var(--tb-paper) 0%,rgba(242,238,230,.92) 26%,rgba(242,238,230,0) 50%);pointer-events:none}
    .wkid{position:absolute;right:var(--gutter);top:calc(var(--chrome-top) + 20px);font-family:var(--f-data);font-size:10.5px;letter-spacing:.12em;opacity:.6}
    .head{position:absolute;left:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));display:flex;flex-direction:column;gap:10px}
    .clock .t{font-family:var(--f-data);font-variant-numeric:tabular-nums;font-size:clamp(56px,8vw,120px);letter-spacing:-.02em;line-height:1}
    .clock .d{font-family:var(--f-data);font-size:12px;letter-spacing:.14em;opacity:.72;margin-top:6px}
    .chap{margin-top:clamp(12px,3vh,32px);max-width:min(420px,80vw)}
    .chap b{font-family:var(--f-display);font-weight:500;letter-spacing:.01em;font-size:clamp(34px,4vw,60px);display:block;line-height:1.05}
    .chap span{opacity:.8;max-width:34ch;display:inline-block;line-height:1.45;margin-top:8px}
    .ev{position:absolute;left:var(--gutter);bottom:calc(var(--chrome-foot) + clamp(110px,17vh,170px));max-width:min(560px,86vw);font-family:var(--f-display);font-weight:500;letter-spacing:.01em;font-size:clamp(30px,3.6vw,54px);line-height:1.1;transition:opacity .4s}
    .rail{position:absolute;left:var(--gutter);right:var(--gutter);bottom:calc(var(--chrome-foot) + clamp(64px,10vh,96px));display:grid;gap:6px}
    .rail .seg{display:flex;flex-direction:column;gap:8px}
    .rail .bars{display:flex;gap:3px}
    .rail i{flex:1;height:2px;background:rgba(28,35,33,.18)}
    .rail i.done{background:var(--tb-lamp)}
    .rail small{font-family:var(--f-data);font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.55}
    .rail .seg.on small{opacity:1}
    .fine{position:absolute;right:var(--gutter);bottom:calc(var(--chrome-foot) + clamp(64px,10vh,96px) + 26px)}
    @media (max-width:760px){.chap span{display:none}.rail small{font-size:9px}.bg .tb-pending{left:0}
      .shade{background:linear-gradient(0deg,var(--tb-paper) 0%,rgba(242,238,230,.9) 38%,rgba(242,238,230,0) 62%),linear-gradient(180deg,rgba(242,238,230,.9) 0%,rgba(242,238,230,0) 34%)}}`,
  (root, $) => {
    const N = D.narrative, W = N.weekend_illustrations;
    const beats = N.weekend_timeline.map(([time, text], i) => ({time, text, wk: W[i], chapter: W[i].chapter}));
    root.style.height = `calc(${beats.length} * 70vh + 100vh)`;
    root.innerHTML = `<div class="pin"><div data-r="bgs"></div><div class="shade"></div><div class="wkid" data-r="wkid"></div>
      <div class="head"><div class="tb-eyebrow">03 · A weekend here</div><div class="clock"><div class="t" data-r="t"></div><div class="d" data-r="d"></div></div>
      <div class="chap" data-r="chap"><b></b><span></span></div></div>
      <div class="ev" data-r="ev" aria-live="polite"></div><div class="rail" data-r="rail"></div><div class="fine tb-disclaimer" data-r="fine"></div></div>`;
    beats.forEach((b, i) => $('bgs').append(el('div', {class: 'bg' + (i === 0 ? ' on' : '')}, TBX.img(b.wk.file, b.wk.subject + ' (illustration)', b.wk.id + ' · illustration pending', [b.wk.file, amFile(WK_STANDIN[i])].filter(Boolean)))));
    const rail = $('rail'); const segs = {};
    N.chapters.forEach(c => { const n = beats.filter(b => b.chapter === c.id).length; const s = el('div', {class: 'seg'}, el('div', {class: 'bars'}, ...Array.from({length: n}, () => el('i'))), el('small', {}, c.title)); segs[c.id] = s; rail.append(s); });
    rail.style.gridTemplateColumns = N.chapters.map(c => beats.filter(b => b.chapter === c.id).length + 'fr').join(' ');
    const bars = [...rail.querySelectorAll('i')];
    $('fine').textContent = N.timeline_disclaimer;
    let cur = -1;
    function set(i) {
      if (i === cur) return; cur = i; const b = beats[i];
      root.querySelectorAll('.bg').forEach((e, j) => e.classList.toggle('on', j === i));
      const [day, hm] = b.time.split(' ');
      $('t').textContent = hm; $('d').textContent = {Fri: 'FRIDAY', Sat: 'SATURDAY', Sun: 'SUNDAY', Mon: 'MONDAY'}[day] || day;
      $('wkid').textContent = b.wk.id;
      $('ev').style.opacity = 0; setTimeout(() => { $('ev').textContent = b.text; $('ev').style.opacity = 1; }, 200);
      const ch = N.chapters.find(c => c.id === b.chapter); $('chap').querySelector('b').textContent = ch.title; $('chap').querySelector('span').textContent = ch.line;
      bars.forEach((r, j) => r.classList.toggle('done', j <= i));
      Object.entries(segs).forEach(([k, s]) => s.classList.toggle('on', k === b.chapter));
    }
    function onScroll() { const r = root.getBoundingClientRect(), total = root.offsetHeight - innerHeight; const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total))); set(Math.min(beats.length - 1, Math.floor(p * beats.length))); }
    addEventListener('scroll', onScroll, {passive: true}); onScroll();
  });

  /* =================== 04 · Minutes from arrivals (M02) =================== */
  define('tb-location', `
    position:relative;height:100vh;min-height:620px;background:#111;color:var(--tb-paper);overflow:hidden;
    .map{position:absolute;inset:0;overflow:hidden;cursor:grab;touch-action:pan-y}
    .world{position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;transition:transform .9s var(--ease)}
    .world.drag{transition:none}
    .world img{position:absolute;inset:0;width:1920px;height:1080px;max-width:none;filter:grayscale(1) contrast(1.05) brightness(.82)}
    .world svg{position:absolute;inset:0;width:1920px;height:1080px}
    .lyr{transition:opacity .45s var(--ease)}
    .lyr.off{opacity:0;pointer-events:none}
    #access_primary{stroke:var(--tb-lamp)!important;stroke-opacity:.85!important;stroke-width:22px!important}
    #access_link{fill:var(--tb-lamp)!important;fill-opacity:.95!important}
    #site{fill:var(--tb-paper)!important;fill-opacity:.22!important;stroke:var(--tb-paper)!important;stroke-width:2.5px!important}
    .parcel{fill:var(--tb-clay)!important;fill-opacity:.62!important;stroke:var(--tb-paper)!important;stroke-width:1.5px!important;cursor:pointer;transition:fill-opacity .2s}
    .parcel:hover{fill-opacity:.9!important}
    .draw{stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:tb-draw 2.4s var(--ease) forwards}
    .lab{font-family:var(--f-data);font-size:15px;letter-spacing:.08em;fill:var(--tb-paper);paint-order:stroke;stroke:rgba(0,0,0,.6);stroke-width:4px}
    .lab.big{font-size:20px}
    .pulse{fill:var(--tb-lamp);animation:tb-pulse 2.2s infinite}
    .shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(12,16,15,.88) 0%,rgba(12,16,15,.55) 30%,rgba(12,16,15,0) 55%)}
    .panel{position:absolute;left:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));bottom:calc(var(--chrome-foot) + clamp(24px,5vh,48px));width:min(430px,86vw);display:flex;flex-direction:column;gap:16px;overflow:auto;scrollbar-width:none}
    .panel h2{font-size:clamp(48px,6.5vw,96px);margin:.05em 0 0}
    .panel p{line-height:1.55;opacity:.88;margin:0;max-width:38ch}
    .layers{display:flex;flex-direction:column;border-top:1px solid var(--tb-line-light)}
    .layer{display:grid;grid-template-columns:28px 1fr auto;gap:12px;align-items:center;background:none;border:0;border-bottom:1px solid var(--tb-line-light);color:var(--tb-paper);padding:10px 0;min-height:44px;text-align:left}
    .layer .sw{width:28px;height:10px;border-radius:2px}
    .layer .st{font-family:var(--f-data);font-size:11px;opacity:.65}
    .layer[aria-pressed="false"]{opacity:.45}
    .drive div{display:flex;justify-content:space-between;gap:14px;padding:8px 0;border-bottom:1px dashed var(--tb-line-light);font-size:14px}
    .drive b{font-family:var(--f-data);font-weight:400;white-space:nowrap;font-variant-numeric:tabular-nums}
    .views .tb-chip{color:var(--tb-paper)}
    .spacer{flex:1}
    .scale{position:absolute;right:var(--gutter);bottom:calc(var(--chrome-foot) + 28px);font-family:var(--f-data);font-size:11px;opacity:.75;display:flex;gap:14px;align-items:center}
    .scale i{display:inline-block;width:60px;height:2px;background:var(--tb-paper);transition:width .9s var(--ease)}
    .north{position:absolute;right:var(--gutter);top:calc(var(--chrome-top) + 24px);font-family:var(--f-data);font-size:12px;text-align:center;opacity:.8}
    .credit{position:absolute;right:var(--gutter);bottom:calc(var(--chrome-foot) + 8px);font-size:10px;opacity:.5;font-family:var(--f-data)}
    @media (max-width:760px){.panel{top:auto;bottom:0;left:0;right:0;width:auto;padding:18px 16px 84px;background:linear-gradient(0deg,rgba(12,16,15,.96) 70%,rgba(12,16,15,0));gap:10px;overflow:visible}
      .panel h2{font-size:40px}.panel p,.drive,.panel .tb-disclaimer{display:none}.shade{display:none}.scale{display:none}}`,
  (root, $) => {
    const S = D.satellite;
    root.innerHTML = `<div class="map" data-r="map"><div class="world" data-r="world"><img data-r="base" alt="Satellite view of the Tranquil Bay site, Airport Road and the river reach"><svg data-r="ov" viewBox="0 0 1920 1080"></svg></div></div>
      <div class="shade"></div><div class="north">▲<br>N</div>
      <div class="panel"><div class="tb-eyebrow">04 · Location</div><h2 class="tb-display">Minutes from arrivals</h2>
        <p>Tranquil Bay sits on the quiet side of Kavoor, off Airport Road, with the Phalguni's still reach just to the north. Close enough to the terminal to land and be home before dark, far enough to hear the rain.</p>
        <div class="views tb-chips" data-r="views" role="group" aria-label="Map views"></div><div class="layers" data-r="layers"></div><div class="spacer"></div>
        <div class="drive" data-r="drive"></div><div class="tb-disclaimer" data-r="disc"></div></div>
      <div class="scale"><i></i><span>100 m</span></div><div class="credit">Imagery © Google Earth / Airbus 2026</div>`;
    $('base').src = TBX.asset(S.base);
    const ov = $('ov');
    const groups = {access: svg('g', {class: 'lyr'}), site: svg('g', {class: 'lyr'}), parcels: svg('g', {class: 'lyr'}), labels: svg('g', {class: 'lyr'})};
    Object.values(groups).forEach(g => ov.append(g));
    S.paths.forEach(p => {
      const node = svg('path', {d: p.d, style: p.style, id: p.id});
      if (p.id.startsWith('access')) groups.access.append(node);
      else if (p.id === 'site') groups.site.append(node);
      else { node.classList.add('parcel'); const t = svg('title', {}); t.textContent = p.label; node.append(t); groups.parcels.append(node); node.addEventListener('click', () => TBX.emit('parcel', {id: p.id})); }
    });
    const prim = ov.querySelector('#access_primary');
    const drawIn = () => { const len = prim.getTotalLength(); prim.style.setProperty('--len', len); prim.classList.remove('draw'); void prim.getBBox(); prim.classList.add('draw'); };
    new IntersectionObserver(es => es.forEach(x => x.isIntersecting && drawIn()), {threshold: .4}).observe(root);
    S.labels.forEach(l => { const t = svg('text', {x: l.pt[0], y: l.pt[1], class: 'lab' + (l.text === 'Main entry' ? '' : ' big')}); t.textContent = l.text + (l.arrow === 'ne' ? '  ↗' : l.arrow === 'sw' ? '  ↙' : ''); groups.labels.append(t); });
    const pin = svg('g', {transform: 'translate(1162,378)'}); pin.append(svg('circle', {r: 8, class: 'pulse'}), svg('circle', {r: 6, fill: '#D8A657'})); groups.labels.append(pin);
    const siteLab = svg('text', {x: 1345, y: 700, class: 'lab big', style: 'font-size:26px;transition:opacity .5s'}); siteLab.textContent = 'TRANQUIL BAY'; groups.labels.append(siteLab);
    const plabs = svg('g', {style: 'opacity:0;transition:opacity .5s'}); groups.labels.append(plabs);
    const short = {parcel_lookout: 'THE LOOKOUT', parcel_d: 'BLOCK D', parcel_c: 'THE MOORINGS', parcel_a: 'BLOCK A', parcel_b: 'BLOCK B'};
    requestAnimationFrame(() => groups.parcels.querySelectorAll('.parcel').forEach(p => { const b = p.getBBox(); const t = svg('text', {x: b.x + b.width / 2, y: b.y + b.height / 2, class: 'lab', 'text-anchor': 'middle', style: 'font-size:8px;stroke-width:2px'}); t.textContent = short[p.id]; plabs.append(t); }));
    [['access', 'Access roads', '#D8A657', 'Airport Road and the link to the gate'], ['site', 'Site boundary', '#F2EEE6', D.site.total_land_acres + ' acres'],
     ['parcels', 'Development parcels', '#A9502F', 'Villa blocks A to D and The Lookout'], ['labels', 'Labels and directions', 'transparent', '']].forEach(([k, lab, c, st]) => {
      const b = el('button', {class: 'layer', 'aria-pressed': true, onclick: () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); groups[k].classList.toggle('off', !on); }},
        el('span', {class: 'sw', style: {background: c, border: c === 'transparent' ? '1px solid rgba(242,238,230,.28)' : 0}}), el('span', {}, lab), el('span', {class: 'st'}, st));
      $('layers').append(b);
    });
    const world = $('world'), map = $('map'); const cam = {x: 0, y: 0, k: 1};
    const presets = {region: {cx: 960, cy: 540, k: 1}, approach: {cx: 900, cy: 500, k: 1.2}, site: {cx: 1210, cy: 560, k: 2.6}};
    let curView = 'approach';
    function applyCam() { world.style.transform = `translate(${cam.x}px,${cam.y}px) scale(${cam.k})`; root.querySelector('.scale i').style.width = (170 * cam.k) + 'px'; }
    function clamp() { const r = map.getBoundingClientRect(); cam.x = Math.min(0, Math.max(r.width - 1920 * cam.k, cam.x)); cam.y = Math.min(0, Math.max(r.height - 1080 * cam.k, cam.y)); }
    function goto(name) {
      curView = name; const r = map.getBoundingClientRect(), p = presets[name]; if (!r.width) return;
      const b = Math.max(r.width / 1920, r.height / 1080); cam.k = b * p.k;
      const off = r.width > 760 ? r.width * 0.16 : 0;
      cam.x = r.width / 2 + off - p.cx * cam.k; cam.y = (r.width > 760 ? r.height / 2 : r.height * .33) - p.cy * cam.k; clamp(); applyCam();
      $('views').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x.dataset.v === name));
      plabs.style.opacity = name === 'site' ? 1 : 0; siteLab.style.opacity = name === 'site' ? 0 : 1;
    }
    [['region', 'Region'], ['approach', 'The approach'], ['site', 'The site']].forEach(([k, l]) => $('views').append(el('button', {class: 'tb-chip', 'data-v': k, onclick: () => goto(k)}, l)));
    let drag = null;
    map.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') return; drag = [e.clientX - cam.x, e.clientY - cam.y]; world.classList.add('drag'); map.setPointerCapture(e.pointerId); });
    map.addEventListener('pointermove', e => { if (!drag) return; cam.x = e.clientX - drag[0]; cam.y = e.clientY - drag[1]; clamp(); applyCam(); });
    map.addEventListener('pointerup', () => { drag = null; world.classList.remove('drag'); });
    map.addEventListener('wheel', e => { if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); const r = map.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
      const b = Math.max(r.width / 1920, r.height / 1080), nk = Math.max(b, Math.min(b * 4, cam.k * (e.deltaY < 0 ? 1.12 : 0.9)));
      cam.x = mx - (mx - cam.x) * nk / cam.k; cam.y = my - (my - cam.y) * nk / cam.k; cam.k = nk; world.classList.add('drag'); clamp(); applyCam(); setTimeout(() => world.classList.remove('drag'), 50); }, {passive: false});
    D.context.places.slice(0, 5).forEach(p => $('drive').append(el('div', {}, el('span', {}, p.name.replace(' (IXE), Bajpe', '')), el('b', {}, p.approx_drive))));
    $('disc').textContent = D.context.disclaimer;
    new ResizeObserver(() => goto(curView)).observe(root);
    TBX.on('location-view', d => goto(d.view));
  });

  /* =================== 05 · The land (M03) =================== */
  define('tb-film', `
    position:relative;height:100vh;min-height:560px;background:#0d1110;color:var(--tb-paper);overflow:hidden;
    video,.frames{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .frames .fr{position:absolute;inset:0;opacity:0;transition:opacity .9s var(--ease)}
    .frames .fr.on{opacity:1}
    .shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,13,12,.88) 0%,rgba(10,13,12,.1) 40%,rgba(10,13,12,0) 60%),linear-gradient(90deg,rgba(10,13,12,.6),rgba(10,13,12,0) 45%);pointer-events:none}
    .title{position:absolute;left:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));max-width:560px}
    .title h2{font-size:clamp(48px,7vw,120px);margin:.05em 0 .15em}
    .title p{opacity:.88;line-height:1.55;max-width:40ch;margin:0}
    .cap{position:absolute;left:var(--gutter);bottom:calc(var(--chrome-foot) + 136px);max-width:520px;transition:opacity .4s}
    .cap b{font-family:var(--f-display);font-weight:400;font-size:clamp(28px,3vw,44px);display:block}
    .cap span{opacity:.85}
    .bar{position:absolute;left:var(--gutter);right:var(--gutter);bottom:calc(var(--chrome-foot) + 44px)}
    .track{position:relative;height:3px;background:rgba(242,238,230,.22);cursor:pointer}
    .fill{position:absolute;left:0;top:0;bottom:0;background:var(--tb-lamp);width:0}
    .ticks{position:relative;height:56px}
    .tick{position:absolute;top:10px;background:none;border:0;color:var(--tb-paper);text-align:left;padding:0 0 0 8px;border-left:1px solid rgba(242,238,230,.35);font-size:12px;opacity:.6;width:calc(100% * 15 / 153 - 6px);max-width:150px;min-height:40px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    @media (max-width:1100px){.tick{font-size:0}.tick small{font-size:10px}}
    .tick small{display:block;font-family:var(--f-data);font-size:10px;letter-spacing:.1em}
    .tick.on{opacity:1;border-color:var(--tb-lamp)}
    .ctl{position:absolute;right:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));display:flex;gap:10px}
    .ctl button{height:44px;min-width:44px;padding:0 14px;border-radius:999px;border:1px solid rgba(242,238,230,.5);background:rgba(10,13,12,.3);color:var(--tb-paper);backdrop-filter:blur(6px);font-size:13px}
    .stills{position:absolute;inset:0;display:none;grid-template-columns:repeat(2,1fr);gap:4px;background:#0d1110;z-index:1}
    .stills.on{display:grid}
    .stills figure{margin:0;position:relative;overflow:hidden;cursor:zoom-in}
    .stills img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease)}
    .stills figure:hover img{transform:scale(1.04)}
    &.st .ctl{z-index:2}
    .lightbox{position:fixed;inset:0;background:#000;display:none;z-index:70;cursor:zoom-out}
    .lightbox.on{display:block}
    .lightbox img{width:100%;height:100%;object-fit:contain}
    @media (max-width:760px){.tick{font-size:0;padding:0 0 0 4px}.tick small{font-size:9px}.cap{bottom:calc(var(--chrome-foot) + 112px)}.title p{display:none}}`,
  (root, $) => {
    const F = D.drone, dur = F.duration_s;
    root.innerHTML = `<video data-r="v" muted playsinline preload="none" loop></video><div class="frames" data-r="frames" hidden></div><div class="stills" data-r="stills"></div><div class="shade"></div>
      <div class="title"><div class="tb-eyebrow">05 · The land</div><h2 class="tb-display">From above</h2><p>Filmed in August, at the height of the monsoon: the river reach, the groves around the site and the roads already cut for the villa lanes.</p></div>
      <div class="ctl"><button data-r="play" aria-label="Play or pause">Pause</button><button data-r="snd" aria-label="Sound on or off">Sound off</button><button data-r="mode" aria-label="Switch between film and stills">Stills</button></div>
      <div class="cap" data-r="cap" aria-live="polite"><b></b><span></span></div>
      <div class="bar"><div class="track" data-r="track"><div class="fill" data-r="fill"></div></div><div class="ticks" data-r="ticks"></div></div>
      <div class="lightbox" data-r="lb"><img alt=""></div>`;
    const v = $('v'); v.muted = true; v.poster = TBX.asset(F.stills[1]);
    /* the 84 MB film is CDN-hosted on the live site: set window.TB_FILM_URL. Without it, chapter frames play as a slideshow. */
    const frameFor = t => 'Drone/video_frames/frame_' + String([5, 20, 35, 50, 65, 80, 125][F.chapters.findIndex(c => c.t === t)] || 5).padStart(3, '0') + 's.jpg';
    let slideshow = false, ssT = 0, ssTimer = null, playing = true;
    const frames = $('frames');
    function toSlideshow() {
      if (slideshow) return; slideshow = true; v.style.display = 'none'; frames.hidden = false; $('snd').style.display = 'none';
      F.chapters.forEach((c, i) => frames.append(el('div', {class: 'fr' + (i === 0 ? ' on' : '')}, TBX.img(frameFor(c.t), c.title + ', drone view'))));
    }
    const src = window.TB_FILM_URL || null;
    if (src) { v.src = src; v.addEventListener('error', toSlideshow); } else toSlideshow();
    const now = () => slideshow ? ssT : v.currentTime;
    const seek = t => { if (slideshow) { ssT = t; tick(); } else { v.currentTime = t; v.play().catch(() => {}); } };
    F.chapters.forEach((c, i) => $('ticks').append(el('button', {class: 'tick', style: {left: (c.t / dur * 100) + '%'}, onclick: () => seek(c.t)}, el('small', {}, pad2(i + 1)), c.title)));
    const cap = $('cap'); let curCh = -1;
    const chapterAt = t => { let k = 0; F.chapters.forEach((c, i) => { if (t >= c.t) k = i; }); return k; };
    function tick() {
      $('fill').style.width = (now() / (slideshow ? dur : (v.duration || dur)) * 100) + '%';
      const k = chapterAt(now());
      if (k !== curCh) { curCh = k; cap.style.opacity = 0; setTimeout(() => { cap.querySelector('b').textContent = F.chapters[k].title; cap.querySelector('span').textContent = F.chapters[k].desc; cap.style.opacity = 1; }, 250);
        $('ticks').querySelectorAll('.tick').forEach((t, i) => t.classList.toggle('on', i === k));
        frames.querySelectorAll('.fr').forEach((f, i) => f.classList.toggle('on', i === k)); }
    }
    v.addEventListener('timeupdate', tick);
    function ssPlay(on) { playing = on; clearInterval(ssTimer); if (on) ssTimer = setInterval(() => { ssT = (ssT + .25) % dur; tick(); }, 250); $('play').textContent = on ? 'Pause' : 'Play'; }
    $('track').addEventListener('click', e => { const r = e.currentTarget.getBoundingClientRect(); seek((e.clientX - r.left) / r.width * (slideshow ? dur : (v.duration || dur))); });
    $('play').onclick = () => slideshow ? ssPlay(!playing) : (v.paused ? v.play() : v.pause());
    v.addEventListener('play', () => $('play').textContent = 'Pause'); v.addEventListener('pause', () => $('play').textContent = 'Play');
    $('snd').onclick = e => { v.muted = !v.muted; e.currentTarget.textContent = v.muted ? 'Sound off' : 'Sound on'; };
    new IntersectionObserver(es => es.forEach(x => { if (slideshow) ssPlay(x.isIntersecting && !root.classList.contains('st')); else x.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), {threshold: .5}).observe(root);
    const stills = $('stills'), lb = $('lb');
    F.stills.forEach((s, i) => stills.append(el('figure', {onclick: () => { lb.querySelector('img').src = TBX.asset(s); lb.classList.add('on'); }}, el('img', {src: TBX.asset(s), alt: `Drone still ${i + 1} of the site and surroundings`, loading: 'lazy'}))));
    lb.onclick = () => lb.classList.remove('on');
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });
    $('mode').onclick = e => { const on = stills.classList.toggle('on'); root.classList.toggle('st', on); e.currentTarget.textContent = on ? 'Film' : 'Stills';
      if (slideshow) ssPlay(!on); else on ? v.pause() : v.play(); cap.style.display = on ? 'none' : ''; };
    tick();
  });

  /* =================== 06 · Masterplan (M04) =================== */
  define('tb-masterplan', `
    position:relative;height:100vh;min-height:640px;overflow:hidden;color:var(--tb-ink);background:radial-gradient(90% 80% at 55% 45%,#F2EEE6 0%,#E9E3D7 70%,#DED7C9 100%);
    >svg{position:absolute;inset:0;width:100%;height:100%}
    .l-boundary{fill:none;stroke:var(--tb-ink);stroke-width:2.2;stroke-dasharray:14 9;opacity:.55}
    .l-west{fill:none;stroke:var(--tb-ink);stroke-width:1.2;stroke-dasharray:4 8;opacity:.3}
    .l-road{fill:none;stroke:#D2CCBF;stroke-linecap:round;stroke-linejoin:round}
    .l-road-c{fill:none;stroke:#fff;stroke-width:1.4;stroke-dasharray:10 12;opacity:.8}
    .l-os{fill:var(--tb-grove);opacity:.22}
    .l-lookout{fill:var(--tb-paper-2);stroke:var(--tb-ink);stroke-width:1;stroke-opacity:.25}
    .l-tower{fill:var(--tb-ink-2);opacity:.85}
    >svg{transition:opacity .6s var(--ease)}
    .plot{stroke:var(--tb-paper);stroke-width:3;cursor:pointer;transition:opacity .25s var(--ease),filter .25s,fill .4s}
    .plot:hover,.plot:focus{filter:brightness(1.12);outline:none}
    .plot:focus-visible{stroke:var(--tb-lamp);stroke-width:5}
    .plot.dim{opacity:.18}
    .plot.sel{stroke:var(--tb-lamp);stroke-width:6}
    .plot.booked{fill:url(#tb-hatch)!important}
    .plab{font-family:var(--f-data);font-size:22px;fill:var(--tb-paper);text-anchor:middle;dominant-baseline:central;pointer-events:none}
    .pin circle{fill:var(--tb-ink);stroke:var(--tb-paper);stroke-width:3}
    .pin text{font-family:var(--f-data);font-size:19px;fill:var(--tb-paper);text-anchor:middle;dominant-baseline:central}
    .pin{cursor:pointer}
    .pin:hover circle,.pin.hot circle,.pin:focus circle{fill:var(--tb-lamp)}
    .pin.phase2 circle{fill:var(--tb-paper);stroke:var(--tb-ink);stroke-dasharray:4 3}
    .pin.phase2 text{fill:var(--tb-ink)}
    .entry text{font-family:var(--f-data);font-size:16px;letter-spacing:.1em;fill:var(--tb-ink);text-anchor:middle}
    .hidden-layer{display:none}
    .illus{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .8s var(--ease);background:var(--tb-paper)}
    .illus.on{opacity:1}
    .illus::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(242,238,230,.94) 0%,rgba(242,238,230,.7) 30%,rgba(242,238,230,0) 56%)}
    .illus-note{position:absolute;right:var(--gutter);bottom:calc(var(--chrome-foot) + 84px);font-family:var(--f-data);font-size:10.5px;letter-spacing:.06em;background:rgba(242,238,230,.9);padding:6px 10px;border-radius:999px;opacity:0;transition:opacity .4s}
    .illus.on~.illus-note{opacity:1}
    .hud{position:absolute;left:var(--gutter);top:calc(var(--chrome-top) + clamp(20px,5vh,56px));max-width:min(560px,80vw);pointer-events:none}
    .hud *{pointer-events:auto}
    .hud h2{font-size:clamp(48px,7vw,120px);margin:.1em 0 .2em}
    .hud p{max-width:40ch;line-height:1.55;margin:0 0 14px;opacity:.85}
    .layers{position:absolute;left:var(--gutter);bottom:calc(var(--chrome-foot) + clamp(84px,12vh,110px));display:flex;flex-direction:column;gap:10px;max-width:min(560px,90vw)}
    .legend{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:13px}
    .legend i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:8px;vertical-align:-2px}
    .tip{position:fixed;pointer-events:none;background:var(--tb-ink);color:var(--tb-paper);padding:8px 12px;border-radius:6px;font-size:13px;white-space:nowrap;transform:translate(-50%,-130%);opacity:0;transition:opacity .15s;z-index:5;font-variant-numeric:tabular-nums}
    .tip.on{opacity:1}
    .sheet{position:absolute;top:var(--chrome-top);right:0;height:calc(100% - var(--chrome-top) - var(--chrome-foot));width:min(460px,100%);background:rgba(242,238,230,.96);backdrop-filter:blur(10px);border-left:1px solid var(--tb-line);transform:translateX(102%);transition:transform .5s var(--ease);display:flex;flex-direction:column;overflow:auto;z-index:4}
    .sheet.open{transform:none}
    .sheet .hero{position:relative;aspect-ratio:16/9;flex:none;background:var(--tb-ink)}
    .sheet .body{padding:24px 28px 110px}
    .sheet .close{position:absolute;top:14px;right:14px;z-index:2;background:rgba(28,35,33,.72);color:var(--tb-paper);border:0;width:44px;height:44px;border-radius:50%}
    .facts{display:grid;grid-template-columns:1fr 1fr;gap:14px 20px;margin:18px 0 22px}
    .facts span{display:block}
    .facts .v{font-family:var(--f-data);font-size:18px;font-variant-numeric:tabular-nums}
    .choose{display:flex;flex-direction:column;border-top:1px solid var(--tb-line)}
    .opt{display:grid;grid-template-columns:14px 1fr auto;gap:14px;align-items:center;text-align:left;background:none;border:0;border-bottom:1px solid var(--tb-line);padding:14px 0;min-height:44px}
    .opt i{width:14px;height:14px;border-radius:50%}
    .opt b{font-weight:500;font-size:16px}
    .opt small{display:block;opacity:.7;font-size:12.5px;margin-top:2px}
    .opt .pr{font-family:var(--f-data);font-size:13px;text-align:right}
    .opt[aria-pressed="true"] b{text-decoration:underline;text-underline-offset:5px;text-decoration-color:var(--tb-lamp);text-decoration-thickness:2px}
    .opt:disabled{opacity:.4;cursor:not-allowed}
    .ctas{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
    .share{display:flex;gap:18px;margin-top:14px;font-size:13px}
    .share button{background:none;border:0;padding:8px 0;border-bottom:1px solid currentColor;min-height:36px}
    @media (max-width:760px){
      .sheet{top:auto;bottom:var(--chrome-foot);height:78%;width:100%;border-left:0;border-top:1px solid var(--tb-line);transform:translateY(102%);border-radius:16px 16px 0 0}
      .hud h2{font-size:44px}.hud p{display:none}.legend{display:none}.layers{bottom:calc(var(--chrome-foot) + 84px)}}`,
  (root, $) => {
    const G = D.geometry;
    root.innerHTML = `<svg data-r="plan" role="img" aria-label="Schematic masterplan of Tranquil Bay with sixteen villa plots"><defs><pattern id="tb-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#9aa39f"></rect><line x1="0" y1="0" x2="0" y2="10" stroke="#F2EEE6" stroke-width="3"></line></pattern></defs><g data-r="world"></g></svg><div class="illus" data-r="illus"></div><div class="illus-note">Illustrated view · artist's impression, not to scale</div>
      <div class="hud"><div class="tb-eyebrow">06 · Masterplan</div><h2 class="tb-display">Choose your plot</h2>
        <p>Sixteen villa plots on ${D.site.total_land_acres} acres. Tap a plot to see its size and the villa types that fit it.</p>
        <div class="tb-chips" data-r="filters" role="group" aria-label="Filter plots by villa type"></div></div>
      <div class="layers"><div class="legend" data-r="legend"></div><div class="tb-chips" data-r="toggles" role="group" aria-label="Map layers"></div>
        <div class="tb-disclaimer">Schematic layout based on the sanctioned plan. Not to scale. Final plot boundaries as per survey.</div></div>
      <div class="tip" data-r="tip"></div><aside class="sheet" data-r="sheet" aria-live="polite" aria-label="Plot details"></aside>`;
    const world = $('world'), planSvg = $('plan');
    const state = {filter: 'all', sel: null, choice: TBX.store.get('choice') || {}, layers: {amenities: true, openspace: true, lookout: true}};
    const L = name => { const g = svg('g', {}); world.append(g); return g; };
    const gWest = L(), gLook = L(), gOS = L(), gRoads = L(), gB = L(), gPlots = L(), gLab = L(), gAm = L(), gEnt = L();
    gWest.append(svg('polyline', {points: pts(G.boundary_west), class: 'l-west'}));
    gLook.append(svg('polygon', {points: pts(G.lookout_parcel), class: 'l-lookout'}), svg('polygon', {points: pts(G.lookout_tower), class: 'l-tower'}));
    const lc = G.lookout_tower.reduce((a, p) => [a[0] + p[0] / 4, a[1] + p[1] / 4], [0, 0]);
    const lookLab = svg('text', {x: lc[0], y: lc[1] + 90, class: 'plab', style: 'fill:#1C2321;font-size:18px;letter-spacing:.12em', 'data-rot': 1}); lookLab.textContent = 'THE LOOKOUT'; gLook.append(lookLab);
    G.open_spaces.forEach(o => gOS.append(svg('polygon', {points: pts(o.pts), class: 'l-os'})));
    G.roads.forEach(r => { gRoads.append(svg('polyline', {points: pts(r.pts), class: 'l-road', 'stroke-width': r.width * 3.2}), svg('polyline', {points: pts(r.pts), class: 'l-road-c'})); });
    gB.append(svg('polygon', {points: pts(G.boundary), class: 'l-boundary'}));
    const plotEls = {};
    D.plots.forEach(p => {
      const poly = svg('polygon', {points: pts(G.plots[p.no]), class: 'plot' + (p.status === 'booked' ? ' booked' : ''), tabindex: 0, role: 'button', 'aria-label': `Plot ${p.no}, ${TBX.fmtInt(p.area_sqft)} square feet, ${p.cents} cents`, 'data-no': p.no});
      gPlots.append(poly); plotEls[p.no] = poly;
      const [x, y] = G.plot_labels[p.no]; const t = svg('text', {x, y, class: 'plab', 'data-rot': 1}); t.textContent = p.no; gLab.append(t);
    });
    D.amenities.filter(a => !a.service && a.map).forEach((a, i) => {
      const g = svg('g', {class: 'pin' + (a.phase === 2 ? ' phase2' : ''), transform: `translate(${a.map[0]},${a.map[1]})`, 'data-id': a.id, tabindex: 0, role: 'button', 'aria-label': a.name});
      g.append(svg('circle', {r: 24})); const t = svg('text', {'data-rot': 1, x: 0, y: 0}); t.textContent = pad2(i + 1); g.append(t);
      const ti = svg('title', {}); ti.textContent = a.name; g.append(ti);
      const go = () => TBX.emit('amenity', {id: a.id}); g.addEventListener('click', go); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      gAm.append(g);
    });
    G.entries.forEach(e => { const t = svg('text', {x: e.pt[0], y: e.pt[1] + (e.id === 'main' ? -26 : 40), 'data-rot': 1}); t.textContent = e.label.toUpperCase(); const g = svg('g', {class: 'entry'}); g.append(t); gEnt.append(g); });
    const typeOf = p => state.choice[p.no] || p.default_type;
    function paint() {
      D.plots.forEach(p => { const e = plotEls[p.no]; e.style.fill = TBX.typeColor(typeOf(p));
        e.classList.toggle('dim', !(state.filter === 'all' || p.allowed_types.includes(state.filter))); e.classList.toggle('sel', state.sel === p.no); });
      gAm.classList.toggle('hidden-layer', !state.layers.amenities); gOS.classList.toggle('hidden-layer', !state.layers.openspace); gLook.classList.toggle('hidden-layer', !state.layers.lookout);
    }
    function orient() {
      const r = planSvg.getBoundingClientRect(); if (!r.width) return;
      const rot = r.width / r.height > 1.1 ? -72 : 0;
      world.setAttribute('transform', `rotate(${rot} 450 800)`);
      world.querySelectorAll('[data-rot]').forEach(t => { const x = +t.getAttribute('x') || 0, y = +t.getAttribute('y') || 0; t.setAttribute('transform', `rotate(${-rot} ${x} ${y})`); });
      const b = world.getBBox(), inv = planSvg.getScreenCTM().inverse(), m = world.getScreenCTM();
      const c = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) => { const p = planSvg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(m).matrixTransform(inv); });
      const xs = c.map(q => q.x), ys = c.map(q => q.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys), w = maxX - minX, h = maxY - minY, pd = .05;
      const shiftX = rot ? w * .34 : 0, shiftY = rot ? 0 : h * .22;
      planSvg.setAttribute('viewBox', `${minX - w * pd - shiftX} ${minY - h * pd - shiftY} ${w * (1 + 2 * pd) + shiftX} ${h * (1 + 2 * pd) + shiftY + h * .12}`);
    }
    const filterKeys = ['all', 'cove', 'lagoon', 'estuary', 'moorings'];
    function setFilter(k) { state.filter = k; $('filters').querySelectorAll('button').forEach((x, i) => x.setAttribute('aria-pressed', filterKeys[i] === k)); paint(); }
    [['all', 'All plots'], ['cove', 'Fits The Cove'], ['lagoon', 'Fits The Lagoon'], ['estuary', 'Fits The Estuary'], ['moorings', 'The Moorings']].forEach(([k, lab]) =>
      $('filters').append(el('button', {class: 'tb-chip', 'aria-pressed': k === 'all', onclick: () => setFilter(k)}, k !== 'all' ? el('span', {class: 'dot', style: {background: TBX.typeColor(k)}}) : null, lab)));
    TBX.allTypes().forEach(t => $('legend').append(el('span', {}, el('i', {style: {background: TBX.typeColor(t.id)}}), `${t.name} · ${t.bhk} BHK`)));
    $('legend').append(el('span', {}, el('i', {style: {background: '#2E4636', opacity: .35}}), 'Open space'));
    [['amenities', 'Amenities'], ['openspace', 'Open spaces'], ['lookout', 'The Lookout']].forEach(([k, lab]) => {
      const b = el('button', {class: 'tb-chip', 'aria-pressed': true, onclick: () => { state.layers[k] = !state.layers[k]; b.setAttribute('aria-pressed', state.layers[k]); paint(); }}, lab); $('toggles').append(b); });
    /* IMG-07 is a perspective watercolour, so it is shown as its own view rather than traced under the plots */
    const illus = $('illus'); illus.append(TBX.img('Rerenders/TB_IMG07_Masterplan_illustrated_16x9.jpg', 'Illustrated masterplan of Tranquil Bay, the villas along one shaded lane', 'IMG-07 · render pending', ['Rerenders/TB_IMG07_Masterplan_illustrated_16x9.jpg']));
    const ib = el('button', {class: 'tb-chip', 'aria-pressed': false, onclick: () => { const on = !illus.classList.contains('on'); illus.classList.toggle('on', on); ib.setAttribute('aria-pressed', on); planSvg.style.opacity = on ? 0 : 1; planSvg.style.pointerEvents = on ? 'none' : ''; }}, 'Illustrated view');
    $('toggles').append(ib);
    const tip = $('tip');
    gPlots.addEventListener('mousemove', e => { const no = e.target.dataset.no; if (!no) return; const p = TBX.plot(no);
      tip.textContent = `Plot ${p.no} · ${TBX.fmtInt(p.area_sqft)} sq.ft · ${p.cents} cents`; tip.style.left = e.clientX + 'px'; tip.style.top = e.clientY + 'px'; tip.classList.add('on'); });
    gPlots.addEventListener('mouseleave', () => tip.classList.remove('on'));
    const sheet = $('sheet');
    function shareUrl(no) { const u = new URL(location.href); u.search = ''; u.hash = ''; u.searchParams.set('plot', no); return u.toString(); }
    function openPlot(no) {
      const p = TBX.plot(no); if (!p) return; state.sel = p.no; paint();
      const cur = typeOf(p), t = TBX.type(cur);
      sheet.innerHTML = '';
      sheet.append(el('button', {class: 'close', 'aria-label': 'Close plot details', onclick: close}, '✕'), el('div', {class: 'hero'}, TBX.img(t.render || t.renders[0], `${t.name}, front elevation`)));
      const body = el('div', {class: 'body'},
        el('div', {class: 'tb-eyebrow'}, `Block ${p.block} · ${p.edge || 'Villa plot'}`),
        el('h3', {class: 'tb-display', style: {fontSize: '56px', margin: '8px 0 0'}}, `Plot ${p.no}`),
        el('div', {class: 'facts'},
          el('div', {}, el('span', {class: 'tb-eyebrow'}, 'Plot area'), el('span', {class: 'v'}, `${TBX.fmtInt(p.area_sqft)} sq.ft`), el('span', {class: 'tb-muted tb-num'}, `${p.area_sqm} sq.m`)),
          el('div', {}, el('span', {class: 'tb-eyebrow'}, 'Cents'), el('span', {class: 'v'}, p.cents)),
          el('div', {}, el('span', {class: 'tb-eyebrow'}, 'Size'), el('span', {}, p.dims)),
          el('div', {}, el('span', {class: 'tb-eyebrow'}, 'Status'), el('span', {}, D.meta.status_legend[p.status]))),
        el('div', {class: 'tb-eyebrow', style: {marginBottom: '6px'}}, p.block === 'C' ? 'Part of The Moorings cluster' : 'Choose a villa for this plot'));
      const choose = el('div', {class: 'choose'});
      (p.block === 'C' ? ['moorings'] : ['cove', 'lagoon', 'estuary']).forEach(k => {
        const ty = TBX.type(k), ok = p.allowed_types.includes(k);
        const reason = ok ? `${ty.bhk} BHK · ${TBX.fmtInt(ty.builtup_sqft)} sq.ft built-up` : `Needs a plot of ${TBX.fmtInt(TBX.sqft(ty.min_plot_sqm))} sq.ft or more`;
        choose.append(el('button', {class: 'opt', disabled: !ok, 'aria-pressed': k === cur, onclick: () => { state.choice[p.no] = k; TBX.store.set('choice', state.choice); openPlot(p.no); TBX.emit('plot-type', {plot: p.no, type: k}); }},
          el('i', {style: {background: TBX.typeColor(k)}}), el('span', {}, el('b', {}, ty.name), el('small', {}, reason)), el('span', {class: 'pr'}, ok ? 'from ' + noOnwards(TBX.from(k).display) : '')));
      });
      const copyBtn = el('button', {onclick: e => { const u = shareUrl(p.no); (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => e.target.textContent = 'Link copied').catch(() => prompt('Copy this link', u)); }}, 'Copy link to this plot');
      body.append(choose,
        el('div', {class: 'ctas'},
          el('button', {class: 'tb-btn', onclick: () => TBX.emit('compare', {type: cur})}, `See ${t.name} plans`),
          el('button', {class: 'tb-btn ghost', onclick: () => TBX.emit('enquire', {plot: p.no, type: cur})}, `Enquire about plot ${p.no}`)),
        el('div', {class: 'share'}, copyBtn, el('button', {onclick: () => window.open('https://wa.me/?text=' + encodeURIComponent(`Plot ${p.no} at Tranquil Bay: ${shareUrl(p.no)}`), '_blank', 'noopener')}, 'Share on WhatsApp')),
        el('p', {class: 'tb-disclaimer', style: {marginTop: '18px'}}, 'Prices are for the villa type: Construction and interiors at ₹ 4,200 per sq.ft of built-up area, plus the ₹ 3.5 L infrastructure and amenity charge (and ₹ 8.5 L for the Estuary plunge pool). Land price is not included. ' + TBX.excl()));
      sheet.append(body); sheet.classList.add('open'); TBX.emit('plot', {plot: p.no});
    }
    function close() { if (!sheet.classList.contains('open')) return; sheet.classList.remove('open'); state.sel = null; paint(); }
    gPlots.addEventListener('click', e => e.target.dataset.no && openPlot(e.target.dataset.no));
    gPlots.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset.no) { e.preventDefault(); openPlot(e.target.dataset.no); } });
    document.addEventListener('keydown', e => e.key === 'Escape' && close());
    TBX.on('focus-plot', d => openPlot(d.plot));
    TBX.on('filter-type', d => setFilter(filterKeys.includes(d.type) ? d.type : 'all'));
    TBX.on('amenity-hover', d => gAm.querySelectorAll('.pin').forEach(p => p.classList.toggle('hot', p.dataset.id === d.id)));
    paint(); requestAnimationFrame(orient); new ResizeObserver(orient).observe(root);
    const q = new URLSearchParams(location.search);
    if (q.get('filter')) setTimeout(() => TBX.emit('filter-type', {type: q.get('filter')}), 600);
    if (q.get('plot')) setTimeout(() => { TBX.emit('focus-plot', {plot: q.get('plot')}); }, 700);
  });

  /* =================== 07 · The homes (M05) =================== */
  define('tb-homes', `
    color:var(--tb-ink);
    .stage{position:relative;height:100vh;min-height:680px;color:var(--tb-paper);overflow:hidden;background:var(--tb-ink)}
    .stage .img{position:absolute;inset:0;transition:opacity .8s var(--ease)}
    .stage .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,24,22,.86) 0%,rgba(18,24,22,.5) 38%,rgba(18,24,22,0) 64%),linear-gradient(0deg,rgba(18,24,22,.6) 0%,rgba(18,24,22,0) 30%)}
    .copy{position:absolute;left:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));bottom:calc(var(--chrome-foot) + clamp(24px,6vh,56px));width:min(470px,88vw);display:flex;flex-direction:column}
    .copy h2{font-size:clamp(56px,8vw,120px);margin:.08em 0 .1em}
    .idea{font-size:17px;line-height:1.55;opacity:.9;max-width:38ch;margin:0}
    .stats{display:grid;grid-template-columns:repeat(3,auto);gap:10px 34px;margin:24px 0 20px;justify-content:start}
    .stats .v{font-family:var(--f-data);font-variant-numeric:tabular-nums;font-size:22px;display:block}
    .stats .k{font-size:12px;opacity:.75}
    .price{font-family:var(--f-display);font-size:38px;margin:4px 0 2px}
    .spacer{flex:1}
    .tabs{display:flex;gap:28px;margin-top:18px}
    .tab{background:none;border:0;color:var(--tb-paper);padding:10px 0 8px;border-bottom:2px solid transparent;opacity:.6;text-align:left;min-height:44px}
    .tab b{display:block;font-weight:500;font-size:16px}
    .tab small{font-family:var(--f-data);font-size:11px;letter-spacing:.1em}
    .tab[aria-selected="true"]{opacity:1;border-color:var(--tb-lamp)}
    .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
    .actions .tb-btn.solid{background:var(--tb-paper);color:var(--tb-ink)}
    .actions .tb-btn.solid:hover{background:var(--tb-lamp)}
    .plan{position:absolute;top:0;right:0;height:100%;width:min(50%,720px);background:#FBFAF7;color:var(--tb-ink);transform:translateX(101%);transition:transform .6s var(--ease);display:flex;flex-direction:column;z-index:3}
    .stage.plan-open .plan{transform:none}
    .plan header{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 24px;border-bottom:1px solid var(--tb-line)}
    .pv{flex:1;position:relative;overflow:hidden;cursor:grab;background:#fff;touch-action:none}
    .pv img{position:absolute;left:50%;top:50%;max-width:none;transform-origin:0 0;user-select:none;-webkit-user-drag:none}
    .rooms{padding:14px 24px 20px;border-top:1px solid var(--tb-line);font-size:13.5px;line-height:1.6;max-height:28%;overflow:auto}
    .zoom{position:absolute;right:16px;bottom:calc(var(--chrome-foot) + 16px);display:flex;gap:6px}
    .zoom button{width:44px;height:44px;border-radius:50%;border:1px solid var(--tb-line);background:#fff}
    .note{font-family:var(--f-data);font-size:11px;opacity:.65;padding:8px 24px 0}
    .pending-plan{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:40px;color:var(--tb-ink-2)}
    .compare{background:var(--tb-paper);padding:clamp(56px,10vh,120px) var(--gutter) 120px}
    .compare h3{font-size:clamp(48px,7vw,120px);margin:.1em 0 .35em}
    .cmp-tools{display:flex;gap:10px 28px;align-items:center;flex-wrap:wrap;margin-bottom:22px}
    .cmp-tools label{display:inline-flex;gap:8px;align-items:center;font-size:14px;min-height:44px;cursor:pointer}
    .cmpwrap{position:relative}
    .cmp-head{display:grid;grid-template-columns:minmax(160px,1.1fr) repeat(var(--n),1fr);gap:0 22px;position:sticky;top:var(--chrome-top);background:var(--tb-paper);z-index:2;padding:14px 0 10px;border-bottom:1px solid var(--tb-ink)}
    .cmp-col .thumb{position:relative;aspect-ratio:16/10;border-radius:4px;overflow:hidden;margin-bottom:10px;background:var(--tb-ink)}
    .cmp-col b{font-family:var(--f-display);font-weight:400;font-size:30px;display:block}
    .cmp-col small{font-family:var(--f-data);font-size:11px;opacity:.7}
    .row{display:grid;grid-template-columns:minmax(160px,1.1fr) repeat(var(--n),1fr);gap:0 22px;padding:14px 0;border-bottom:1px solid var(--tb-line);align-items:start}
    .row .lab{font-size:14px;opacity:.8}
    .row .grp{font-family:var(--f-data);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.55;display:block;margin-bottom:2px}
    .row .cell{font-size:14.5px;line-height:1.45}
    .row .yes{color:var(--tb-river);font-size:18px}
    .row .no{opacity:.3}
    .bar{height:6px;border-radius:3px;background:var(--tb-paper-2);margin-top:8px;overflow:hidden}
    .bar i{display:block;height:100%;border-radius:3px;transition:width .9s var(--ease)}
    .row.hl{background:linear-gradient(90deg,rgba(216,166,87,0),rgba(216,166,87,.14) 18%,rgba(216,166,87,.14) 82%,rgba(216,166,87,0))}
    .cmp-plans{display:grid;grid-template-columns:minmax(160px,1.1fr) repeat(var(--n),1fr);gap:22px;margin-top:40px}
    .cmp-plans figure{margin:0;background:#fff;border-radius:4px;padding:12px;position:relative;aspect-ratio:1/1.13}
    .cmp-plans img{width:100%;height:100%;object-fit:contain}
    .cmp-plans figcaption{position:absolute;left:14px;top:12px;font-family:var(--f-data);font-size:11px;opacity:.7}
    @media (max-width:900px){.plan{width:100%}}
    @media (max-width:800px){
      .stage .shade{background:linear-gradient(0deg,rgba(18,24,22,.9),rgba(18,24,22,.55) 60%,rgba(18,24,22,.75))}
      .stats{grid-template-columns:repeat(3,1fr);gap:8px 14px;margin:16px 0}.stats .v{font-size:18px}
      .copy{top:calc(var(--chrome-top) + 20px);bottom:calc(var(--chrome-foot) + 84px)}.idea{font-size:15px}.copy h2{font-size:52px}
      .cmpwrap{overflow-x:auto}.cmpin{min-width:calc(120px + var(--n) * 150px)}
      .cmp-head,.row,.cmp-plans{grid-template-columns:120px repeat(var(--n),1fr);gap:0 12px}
      .cmp-head>div:first-child,.row .lab,.cmp-plans>div:first-child{position:sticky;left:0;background:var(--tb-paper);z-index:1}
      .cmp-col b{font-size:20px}.row .cell{font-size:12.5px}}`,
  (root, $) => {
    const types = TBX.types();
    const S = {cur: 'lagoon', level: 'ground', cmp: ['cove', 'lagoon', 'estuary'], unit: 'sqft', diffOnly: false};
    root.innerHTML = `<div class="stage" data-r="stage" data-tb-theme="dark" aria-label="Villa types"><div data-r="imgs"></div><div class="shade"></div>
      <div class="copy"><div class="tb-eyebrow" data-r="eyebrow">07 · The homes</div><h2 class="tb-display" data-r="name"></h2><p class="idea" data-r="idea"></p>
        <div class="stats" data-r="stats"></div><div class="tb-eyebrow">Starting from</div><div class="price" data-r="price"></div>
        <div class="tb-disclaimer" data-r="excl"></div>
        <div class="actions"><button class="tb-btn solid" data-r="openPlan">View plans</button><button class="tb-btn ghost" data-r="toCompare">Compare the homes</button><button class="tb-btn ghost" data-r="toPlots">See plots that fit</button></div>
        <div class="spacer"></div><div class="tabs" role="tablist" data-r="tabs" aria-label="Villa type"></div></div>
      <aside class="plan" data-r="plan" aria-label="Floor plan"><header><div><div class="tb-eyebrow" data-r="planType"></div><div class="tb-chips" data-r="levels"></div></div>
        <button class="tb-btn ghost" data-r="closePlan" style="padding:8px 14px">Back to elevation</button></header>
        <div class="note" data-r="planNote"></div><div class="pv" data-r="pv"></div><div class="rooms" data-r="rooms"></div></aside></div>
      <div class="compare" data-r="compare" data-tb-theme="light" aria-label="Compare villa types"><div class="tb-eyebrow">Side by side</div><h3 class="tb-display">Compare the homes</h3>
        <div class="cmp-tools"><div class="tb-chips" data-r="cmpPick" role="group" aria-label="Types to compare"></div><label><input type="checkbox" data-r="diffOnly"> Show differences only</label><div class="tb-chips" data-r="unit" role="group" aria-label="Units"></div></div>
        <div class="cmpwrap"><div class="cmpin" data-r="cmpin"><div data-r="cmp"></div><div class="cmp-plans" data-r="cmpPlans"></div></div></div>
        <p class="tb-disclaimer" data-r="cmpNote" style="margin-top:24px"></p></div>`;
    $('excl').textContent = 'Ready to move in. Construction and interiors at ₹ 4,200 per sq.ft of built-up area, plus the ₹ 3.5 L infrastructure and amenity charge; The Estuary adds ₹ 8.5 L for the plunge pool. Land price is not included. ' + TBX.excl();
    $('cmpNote').textContent = 'Areas are approximate. Built-up area includes walls; carpet area estimated at 80% of built-up. Upper-floor areas for The Lagoon and The Estuary are indicative until drawings are complete. Renders show the front elevation only. ' + TBX.excl();
    const area = m2 => S.unit === 'sqft' ? TBX.fmtInt(TBX.sqft(m2)) + ' sq.ft' : (Math.round(m2 * 10) / 10) + ' sq.m';
    const plotsFit = id => D.plots.filter(p => p.allowed_types.includes(id)).length;
    types.forEach(t => $('imgs').append(el('div', {class: 'img', 'data-id': t.id, style: {opacity: 0}}, TBX.img(t.render, `${t.name}, front elevation`, 'Render pending'))));
    types.forEach(t => $('tabs').append(el('button', {class: 'tab', role: 'tab', 'data-id': t.id, onclick: () => show(t.id)}, el('small', {}, `${t.bhk} BHK`), el('b', {}, t.name))));
    function show(id) {
      S.cur = id; const t = TBX.type(id);
      $('imgs').querySelectorAll('.img').forEach(d => d.style.opacity = d.dataset.id === id ? 1 : 0);
      $('tabs').querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', b.dataset.id === id));
      $('name').textContent = t.name; $('eyebrow').textContent = `07 · The homes · ${t.label}`; $('idea').textContent = t.idea;
      $('stats').innerHTML = '';
      [[TBX.fmtInt(t.builtup_sqft), 'sq.ft built-up'], [t.bhk, 'bedrooms'], [t.parking, t.parking > 1 ? 'car bays' : 'car bay'],
       [TBX.fmtInt(t.open_areas_sqft), 'sq.ft court + terraces'], [t.floors.split(' ')[0], t.rooms.roof ? 'floors + roof room' : (t.floors.includes('terrace') ? 'floors + roof terrace' : 'floors')], [plotsFit(id), 'plots it fits']]
        .forEach(([v, k]) => $('stats').append(el('div', {}, el('span', {class: 'v'}, v), el('span', {class: 'k'}, k))));
      $('price').textContent = TBX.from(id).display;
      S.level = 'ground'; renderPlan(); TBX.emit('type', {type: id});
    }
    let z = 1, px = 0, py = 0, pimg;
    function renderPlan() {
      const t = TBX.type(S.cur); $('planType').textContent = `${t.name} · floor plan`;
      const lv = $('levels'); lv.innerHTML = '';
      ['ground', 'first', t.rooms.roof ? 'roof' : null].filter(Boolean).forEach(l => lv.append(el('button', {class: 'tb-chip', 'aria-pressed': l === S.level, onclick: () => { S.level = l; renderPlan(); }}, l[0].toUpperCase() + l.slice(1))));
      const pv = $('pv'); pv.innerHTML = ''; pimg = null;
      const src = t.plans[S.level];
      if (src) { pimg = el('img', {src: TBX.asset(src), alt: `${t.name} ${S.level} floor plan`, draggable: false}); pimg.onload = fit;
        pv.append(pimg, el('div', {class: 'zoom'}, el('button', {onclick: () => zoom(1.25), 'aria-label': 'Zoom in'}, '+'), el('button', {onclick: () => zoom(.8), 'aria-label': 'Zoom out'}, '−'), el('button', {onclick: fit, 'aria-label': 'Fit to view'}, '⤢')));
      } else pv.append(el('div', {class: 'pending-plan'}, el('div', {}, el('div', {class: 'tb-eyebrow'}, 'Drawing in progress'),
        el('p', {style: {maxWidth: '34ch', lineHeight: 1.5}}, `The ${S.level} floor of ${t.name} is being detailed. The room list below describes what it will hold.`))));
      $('planNote').textContent = t.plan_status;
      $('rooms').innerHTML = ''; $('rooms').append(el('div', {class: 'tb-eyebrow', style: {marginBottom: '6px'}}, `${S.level} floor`), el('div', {}, (t.rooms[S.level] || []).join(' · ')));
    }
    const apply = () => { if (pimg) pimg.style.transform = `translate(${px}px,${py}px) scale(${z})`; };
    function fit() { if (!pimg || !pimg.naturalWidth) return; const r = $('pv').getBoundingClientRect(); z = Math.min(r.width / pimg.naturalWidth, r.height / pimg.naturalHeight) * 1.1; px = -pimg.naturalWidth * z / 2; py = -pimg.naturalHeight * z / 2; apply(); }
    function zoom(f) { const nz = Math.max(.2, Math.min(5, z * f)); px *= nz / z; py *= nz / z; z = nz; apply(); }
    (() => { const pv = $('pv'); const ptrs = new Map(); let drag = null, pinch = null;
      pv.addEventListener('pointerdown', e => { ptrs.set(e.pointerId, [e.clientX, e.clientY]); pv.setPointerCapture(e.pointerId);
        if (ptrs.size === 1) drag = [e.clientX - px, e.clientY - py]; else { const [a, b] = [...ptrs.values()]; pinch = Math.hypot(a[0] - b[0], a[1] - b[1]); drag = null; } });
      pv.addEventListener('pointermove', e => { if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]);
        if (ptrs.size === 2 && pinch) { const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); zoom(d / pinch); pinch = d; }
        else if (drag) { px = e.clientX - drag[0]; py = e.clientY - drag[1]; apply(); } });
      const up = e => { ptrs.delete(e.pointerId); pinch = null; drag = ptrs.size === 1 ? (() => { const [q] = [...ptrs.values()]; return [q[0] - px, q[1] - py]; })() : null; };
      pv.addEventListener('pointerup', up); pv.addEventListener('pointercancel', up);
      pv.addEventListener('wheel', e => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.1 : .9); }, {passive: false}); })();
    const openPlan = () => { $('stage').classList.add('plan-open'); setTimeout(fit, 620); };
    const closePlan = () => $('stage').classList.remove('plan-open');
    $('openPlan').onclick = openPlan; $('closePlan').onclick = closePlan;
    document.addEventListener('keydown', e => e.key === 'Escape' && closePlan());
    $('toCompare').onclick = () => TBX.scrollTo($('compare'));
    $('toPlots').onclick = () => TBX.emit('filter-type', {type: S.cur});
    const all = TBX.allTypes();
    all.forEach(t => $('cmpPick').append(el('button', {class: 'tb-chip', 'aria-pressed': S.cmp.includes(t.id), onclick: () => {
      const i = S.cmp.indexOf(t.id); if (i > -1 && S.cmp.length > 2) S.cmp.splice(i, 1); else if (i === -1) S.cmp.push(t.id);
      S.cmp.sort((a, b) => all.findIndex(x => x.id === a) - all.findIndex(x => x.id === b));
      $('cmpPick').querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', S.cmp.includes(all[j].id))); renderCmp();
    }}, el('span', {class: 'dot', style: {background: TBX.typeColor(t.id)}}), t.name)));
    [['sqft', 'sq.ft'], ['sqm', 'sq.m']].forEach(([k, l]) => $('unit').append(el('button', {class: 'tb-chip', 'data-u': k, 'aria-pressed': S.unit === k, onclick: () => {
      S.unit = k; $('unit').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.u === k)); renderCmp(); }}, l)));
    $('diffOnly').onchange = e => { S.diffOnly = e.target.checked; renderCmp(); };
    function renderCmp() {
      const box = $('cmp'); box.innerHTML = ''; const n = S.cmp.length; $('cmpin').style.setProperty('--n', n);
      const T = S.cmp.map(TBX.type);
      const head = el('div', {class: 'cmp-head'}, el('div', {}));
      T.forEach(t => head.append(el('div', {class: 'cmp-col'}, el('div', {class: 'thumb'}, TBX.img(t.render || t.renders[0], t.name)), el('small', {}, t.label.toUpperCase()), el('b', {}, t.name))));
      box.append(head);
      const maxBU = Math.max(...T.map(t => t.builtup_sqm));
      const num = (label, f, bar) => { const vals = T.map(f); if (S.diffOnly && vals.every(v => v.txt === vals[0].txt)) return;
        const r = el('div', {class: 'row'}, el('div', {class: 'lab'}, label));
        T.forEach((t, i) => { const v = vals[i]; const c = el('div', {class: 'cell tb-num'}, v.txt);
          if (bar) c.append(el('div', {class: 'bar'}, el('i', {style: {width: (v.val / maxBU * 100) + '%', background: TBX.typeColor(t.id)}}))); r.append(c); });
        box.append(r); };
      num('Starting from', t => ({txt: TBX.from(t.id).display}));
      num('Built-up area', t => ({txt: area(t.builtup_sqm), val: t.builtup_sqm}), true);
      num('Approx. carpet area', t => ({txt: S.unit === 'sqft' ? TBX.fmtInt(t.carpet_sqft_approx) + ' sq.ft' : Math.round(t.carpet_sqft_approx / 10.7639) + ' sq.m'}));
      num('Court, terraces and pool', t => ({txt: S.unit === 'sqft' ? TBX.fmtInt(t.open_areas_sqft) + ' sq.ft' : Math.round(t.open_areas_sqft / 10.7639) + ' sq.m'}));
      num('Footprint', t => ({txt: t.footprint_m ? `${t.footprint_m[0]} × ${t.footprint_m[1]} m` : 'Cluster of four'}));
      num('Floors', t => ({txt: t.floors || 'G+1'}));
      num('Plots available', t => ({txt: t.id === 'moorings' ? '4 (Block C)' : plotsFit(t.id) + ' of ' + D.site.villa_plots}));
      ['Architecture', 'Premium', 'Everyday', 'Sustainability', 'Technology'].forEach(gname => D.feature_tiers.filter(f => f.group === gname).forEach(f => {
        const vals = S.cmp.map(id => f[id]); if (S.diffOnly && vals.every(v => JSON.stringify(v) === JSON.stringify(vals[0]))) return;
        const r = el('div', {class: 'row' + (f.group === 'Premium' ? ' hl' : '')}, el('div', {class: 'lab'}, el('span', {class: 'grp'}, f.group), f.feature));
        vals.forEach(v => r.append(el('div', {class: 'cell'}, v === true ? el('span', {class: 'yes', 'aria-label': 'Included'}, '●') : v === false ? el('span', {class: 'no', 'aria-label': 'Not included'}, '—') : v)));
        box.append(r); }));
      const pl = $('cmpPlans'); pl.innerHTML = ''; pl.append(el('div', {class: 'tb-eyebrow', style: {paddingTop: '6px'}}, 'Ground floor'));
      T.forEach(t => { const src = (t.plans || {}).ground; pl.append(el('figure', {}, src ? el('img', {src: TBX.asset(src), alt: t.name + ' ground floor plan', loading: 'lazy'}) : el('div', {class: 'pending-plan'}, 'Unit plans in progress'), el('figcaption', {}, t.name.toUpperCase()))); });
    }
    TBX.on('compare', d => { const id = ['cove', 'lagoon', 'estuary'].includes(d.type) ? d.type : null;
      if (!id) { TBX.scrollTo($('compare')); return; } show(id); TBX.scrollTo($('stage')); setTimeout(openPlan, 500); });
    show('lagoon'); renderCmp();
  });

  /* =================== 08 · The Moorings (M06) =================== */
  define('tb-moorings', `
    position:relative;min-height:100vh;display:grid;grid-template-columns:1.35fr 1fr;background:var(--tb-ink);color:var(--tb-paper);
    .pics{position:relative;min-height:100vh;overflow:hidden}
    .slide{position:absolute;inset:0;opacity:0;transition:opacity .9s var(--ease)}
    .slide.on{opacity:1}
    .dots{position:absolute;left:var(--gutter);bottom:calc(var(--chrome-foot) + 28px);display:flex;gap:18px;z-index:2}
    .dots button{background:none;border:0;color:var(--tb-paper);font-family:var(--f-data);font-size:11px;letter-spacing:.1em;opacity:.65;padding:10px 0 6px;min-height:44px;border-bottom:1px solid transparent}
    .dots button.on{opacity:1;border-color:var(--tb-lamp)}
    .pics::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(18,24,22,.65),rgba(18,24,22,0) 30%);pointer-events:none}
    .side{padding:clamp(28px,7vh,72px) var(--gutter) 110px clamp(24px,3vw,48px);display:flex;flex-direction:column;gap:18px}
    .side h2{font-size:clamp(52px,6vw,104px);margin:.05em 0 0}
    .side p{line-height:1.55;opacity:.88;margin:0;max-width:44ch}
    .modes{display:flex;gap:22px;border-bottom:1px solid var(--tb-line-light)}
    .modes button{background:none;border:0;color:var(--tb-paper);padding:10px 0;min-height:44px;border-bottom:2px solid transparent;opacity:.6;font-size:15px}
    .modes button[aria-selected="true"]{opacity:1;border-color:var(--tb-lamp)}
    .diagram{position:relative;aspect-ratio:1/1;max-height:34vh;width:100%;max-width:34vh}
    .diagram svg{width:100%;height:100%}
    .u{stroke:var(--tb-ink);stroke-width:.8;transition:fill .5s,opacity .5s}
    .court{fill:var(--tb-lamp);transition:opacity .5s}
    .ulab{font-family:var(--f-data);font-size:3.6px;letter-spacing:.08em;fill:var(--tb-paper);text-anchor:middle;dominant-baseline:central}
    .kv{display:grid;grid-template-columns:1fr 1fr;gap:12px 22px}
    .kv .v{font-family:var(--f-data);font-variant-numeric:tabular-nums;font-size:20px;display:block}
    .kv .k{font-size:12px;opacity:.75}
    .price{font-family:var(--f-display);font-size:38px}
    .btns{display:flex;gap:10px;flex-wrap:wrap}
    @media (max-width:900px){grid-template-columns:1fr;.pics{min-height:62vh}}`,
  (root, $) => {
    const M = D.moorings;
    root.innerHTML = `<div class="pics" data-r="pics"><div class="dots" data-r="dots"></div></div>
      <div class="side"><div class="tb-eyebrow">08 · Block C · Four homes, one court</div><h2 class="tb-display">The Moorings</h2><p data-r="idea"></p>
        <div class="modes" role="tablist" data-r="modes" aria-label="Ways to live in The Moorings"></div>
        <div class="diagram"><svg data-r="dg" viewBox="0 0 100 100" role="img" aria-label="Diagram of four homes around a shared court"></svg></div>
        <p data-r="modeCopy" aria-live="polite"></p><div class="kv" data-r="kv"></div>
        <div><div class="tb-eyebrow">Starting from</div><div class="price" data-r="price"></div><div class="tb-disclaimer" data-r="excl"></div></div>
        <div class="btns"><button class="tb-btn lamp" data-r="enq">Enquire about The Moorings</button><button class="tb-btn ghost" data-r="onmap">Show on masterplan</button></div>
        <p class="tb-disclaimer" data-r="status"></p></div>`;
    $('idea').textContent = M.idea; $('status').textContent = M.plan_status + '.';
    $('excl').textContent = "Per home unless stated. Construction and interiors at ₹ 4,200 per sq.ft of built-up area, plus the ₹ 3.5 L infrastructure and amenity charge and ₹ 4 L for each home's share of the court and pavilion. Land price is not included. " + TBX.excl();
    const labels = ['From the lane', 'Into the court', 'Under the tree'];
    M.renders.forEach((r, i) => { $('pics').insertBefore(el('div', {class: 'slide' + (i === 0 ? ' on' : '')}, TBX.img(r, 'The Moorings, ' + labels[i].toLowerCase())), $('dots'));
      $('dots').append(el('button', {class: i === 0 ? 'on' : '', onclick: () => go(i)}, labels[i])); });
    let cur = 0, timer;
    function go(i) { cur = i; root.querySelectorAll('.slide').forEach((s, j) => s.classList.toggle('on', j === i)); $('dots').querySelectorAll('button').forEach((b, j) => b.classList.toggle('on', j === i)); clearInterval(timer); if (!reduced) timer = setInterval(() => go((cur + 1) % M.renders.length), 6000); }
    go(0);
    const polys = M.plots.map(n => D.geometry.plots[n]); const allp = polys.flat(); const xs = allp.map(p => p[0]), ys = allp.map(p => p[1]);
    const minX = Math.min(...xs), minY = Math.min(...ys), sc = 84 / Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY);
    const norm = poly => poly.map(([x, y]) => [8 + (x - minX) * sc, 8 + (y - minY) * sc]);
    const g = svg('g', {}); $('dg').append(g);
    const center = [8 + ((Math.max(...xs) + minX) / 2 - minX) * sc, 8 + ((Math.max(...ys) + minY) / 2 - minY) * sc];
    const U = polys.map((p, i) => { const e = svg('polygon', {points: pts(norm(p)), class: 'u'}); g.append(e);
      const c = norm(p).reduce((a, q) => [a[0] + q[0] / 4, a[1] + q[1] / 4], [0, 0]);
      const t = svg('text', {x: c[0] + (c[0] - center[0]) * .15, y: c[1] + (c[1] - center[1]) * .15, class: 'ulab'}); t.textContent = 'HOME ' + (i + 1); g.append(t); return e; });
    const court = svg('circle', {cx: center[0], cy: center[1], r: 14, class: 'court'}); g.append(court, svg('circle', {cx: center[0], cy: center[1], r: 5, fill: '#2E4636'}));
    const modes = [
      {id: 'homes', label: 'Four homes', copy: 'Each home is independent, with its own entrance from the lane, parking and a private court. The four share one larger court and pavilion behind a single gate.',
        paint: () => { U.forEach((u, i) => u.style.fill = ['#6f8f88', '#4E7C74', '#6f8f88', '#4E7C74'][i]); court.style.opacity = .3; }},
      {id: 'compound', label: 'One family', copy: 'Buy all four as a family compound. Grandparents on the ground floor of one home, siblings in the others, children in the court. One gate, one address, room for everyone.',
        paint: () => { U.forEach(u => u.style.fill = '#A9502F'); court.style.opacity = .45; }},
      {id: 'event', label: 'Event day', copy: 'The court and pavilion are set up for gatherings: a service kitchen, power and lighting points, space for long tables under the tree. Weddings, naming ceremonies, reunions.',
        paint: () => { U.forEach(u => u.style.fill = '#3b4643'); court.style.opacity = .95; }},
    ];
    modes.forEach(m => $('modes').append(el('button', {role: 'tab', 'data-id': m.id, onclick: () => setMode(m.id)}, m.label)));
    function setMode(id) {
      const m = modes.find(x => x.id === id); m.paint(); $('modeCopy').textContent = m.copy;
      $('modes').querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.id === id));
      $('price').textContent = id === 'compound' ? TBX.from('moorings_compound').display : TBX.from('moorings').display;
      $('kv').innerHTML = '';
      const rows = id === 'compound'
        ? [[M.homes, `homes, ${M.homes * M.bhk} bedrooms`], [TBX.fmtInt(M.builtup_sqft * M.homes), 'sq.ft built-up in all'], [TBX.fmtInt(TBX.sqft(M.shared.court_sqm)), 'sq.ft shared court'], [M.parking * M.homes, 'car bays']]
        : id === 'event'
        ? [[TBX.fmtInt(TBX.sqft(M.shared.court_sqm)), 'sq.ft court under the tree'], [TBX.fmtInt(TBX.sqft(M.shared.pavilion_sqm)), 'sq.ft dining pavilion'], ['Service', 'kitchen + event power'], ['Bookable', 'by the four owners']]
        : [[M.bhk, 'bedrooms per home'], [TBX.fmtInt(M.builtup_sqft), 'sq.ft built-up'], [TBX.fmtInt(M.open_areas_sqft), 'sq.ft private court + terraces'], [M.parking, 'car bays per home']];
      rows.forEach(([v, k]) => $('kv').append(el('div', {}, el('span', {class: 'v'}, v), el('span', {class: 'k'}, k))));
      TBX.emit('moorings-mode', {mode: id});
    }
    setMode('homes');
    $('enq').onclick = () => TBX.emit('enquire', {type: 'moorings'});
    $('onmap').onclick = () => TBX.emit('filter-type', {type: 'moorings'});
  });

  /* =================== 10 · Shared ground (M07) =================== */
  define('tb-amenities', `
    position:relative;height:100vh;min-height:680px;background:var(--tb-ink);color:var(--tb-paper);overflow:hidden;
    .art{position:absolute;inset:0;transition:opacity .7s var(--ease)}
    .art.fade{opacity:0}
    .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,24,22,.9) 0%,rgba(18,24,22,.6) 34%,rgba(18,24,22,0) 60%),linear-gradient(0deg,rgba(18,24,22,.6),rgba(18,24,22,0) 35%);pointer-events:none}
    .col{position:absolute;left:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));bottom:calc(var(--chrome-foot) + clamp(84px,11vh,110px));width:min(430px,86vw);display:flex;flex-direction:column;gap:12px}
    .col h2{font-size:clamp(48px,6.5vw,110px);margin:.05em 0 0}
    .groups .tb-chip{color:var(--tb-paper)}
    .list{flex:1;overflow:auto;border-top:1px solid var(--tb-line-light);scrollbar-width:thin}
    .item{display:grid;grid-template-columns:34px 1fr;gap:12px;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid var(--tb-line-light);color:var(--tb-paper);padding:12px 0;opacity:.65;transition:opacity .2s}
    .item:hover{opacity:.9}
    .item[aria-current="true"]{opacity:1}
    .item .n{font-family:var(--f-data);font-size:12px;padding-top:3px}
    .item b{font-weight:500;font-size:16px;display:block}
    .item small{font-family:var(--f-data);font-size:10.5px;letter-spacing:.08em;opacity:.75}
    .item .d{display:none;font-size:14px;line-height:1.5;opacity:.9;margin-top:6px}
    .item[aria-current="true"] .d{display:block}
    .item[aria-current="true"] .n{color:var(--tb-lamp)}
    .mini{position:absolute;right:var(--gutter);bottom:calc(var(--chrome-foot) + clamp(84px,11vh,110px));width:min(360px,34vw);aspect-ratio:1.5;background:rgba(242,238,230,.94);border-radius:8px;color:var(--tb-ink);padding:6px}
    .mini svg{width:100%;height:100%}
    .mini .cap{position:absolute;left:12px;top:8px;font-family:var(--f-data);font-size:10px;letter-spacing:.1em;opacity:.65}
    .tag{position:absolute;right:var(--gutter);top:calc(var(--chrome-top) + clamp(24px,6vh,64px));font-family:var(--f-data);font-size:11px;letter-spacing:.1em;background:rgba(18,24,22,.6);padding:8px 12px;border-radius:999px;backdrop-filter:blur(6px)}
    .fine{color:var(--tb-paper)}
    @media (max-width:800px){.mini{display:none}.col{width:auto;right:var(--gutter)}.tag{display:none}}`,
  (root, $) => {
    const A = D.amenities.filter(a => !a.service && a.map);
    root.innerHTML = `<div class="art" data-r="art"></div><div class="shade"></div><div class="tag" data-r="tag"></div>
      <div class="col"><div class="tb-eyebrow">10 · Shared ground</div><h2 class="tb-display">Shared ground</h2>
        <div class="groups tb-chips" data-r="groups" role="group" aria-label="Filter amenities"></div><div class="list" data-r="list"></div>
        <div class="tb-disclaimer fine">Illustrations are artistic impressions. Phase 2 amenities subject to approvals.</div></div>
      <div class="mini"><span class="cap">WHERE IT IS</span><svg data-r="mini" aria-hidden="true"></svg></div>`;
    const plan = TBX.drawPlan($('mini'));
    const S = {group: 'All', cur: A[0].id};
    const art = a => { const tries = [TBX.amFile(a.illustration), a.illustration ? `Rerenders/TB_${a.illustration.replace('-', '')}_16x9.jpg` : null, a.existing_image].filter(Boolean);
      return TBX.img(null, a.name + ', illustration', `${a.illustration || 'Image'} · illustration pending`, tries); };
    function select(id) {
      S.cur = id; const a = A.find(x => x.id === id); const artEl = $('art'); artEl.classList.add('fade');
      setTimeout(() => { artEl.innerHTML = ''; artEl.append(art(a)); artEl.classList.remove('fade'); }, 300);
      $('tag').textContent = `${a.group.toUpperCase()} · ${a.tier.toUpperCase()}`;
      $('list').querySelectorAll('.item').forEach(b => b.setAttribute('aria-current', b.dataset.id === id));
      Object.entries(plan.pins).forEach(([k, g]) => { const c = g.querySelector('circle'); const on = k === id; c.setAttribute('r', on ? 38 : 26); c.style.fill = on ? '#D8A657' : ''; });
      TBX.emit('amenity-hover', {id});
    }
    function renderList() {
      $('list').innerHTML = '';
      A.forEach((a, i) => { if (S.group !== 'All' && a.group !== S.group) return;
        $('list').append(el('button', {class: 'item', 'data-id': a.id, onclick: () => select(a.id), onmouseenter: () => TBX.emit('amenity-hover', {id: a.id})},
          el('span', {class: 'n'}, pad2(i + 1)), el('span', {}, el('small', {}, a.group.toUpperCase() + (a.phase === 2 ? ' · PHASE 2' : '')), el('b', {}, a.name), el('span', {class: 'd'}, a.desc + (a.note ? ' ' + a.note + '.' : ''))))); });
      select(S.group === 'All' || A.find(a => a.id === S.cur && a.group === S.group) ? S.cur : A.find(a => a.group === S.group).id);
    }
    ['All', ...new Set(A.map(a => a.group))].forEach(gr => $('groups').append(el('button', {class: 'tb-chip', 'aria-pressed': gr === 'All', onclick: e => {
      S.group = gr; $('groups').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === e.currentTarget)); renderList(); }}, gr)));
    Object.entries(plan.pins).forEach(([k, g]) => g.addEventListener('click', () => { S.group = 'All'; $('groups').querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', i === 0)); renderList(); select(k); }));
    renderList();
    TBX.on('amenity', d => { S.group = 'All'; $('groups').querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', i === 0)); renderList(); select(d.id); });
  });

  /* =================== 13 · Visit (M08) =================== */
  define('tb-visit', `
    position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:var(--tb-paper);color:var(--tb-ink);
    .left{position:relative;min-height:100vh;color:var(--tb-paper);overflow:clip;background:var(--tb-ink)}
    .left .wrap{position:sticky;top:0;height:100vh}
    .left .wrap::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(12,16,15,.85),rgba(12,16,15,.1) 60%)}
    .words{position:absolute;left:var(--gutter);right:var(--gutter);bottom:calc(var(--chrome-foot) + clamp(40px,10vh,100px));z-index:2}
    .words h2{font-size:clamp(52px,6.5vw,110px);margin:0 0 .2em}
    .words p{max-width:40ch;line-height:1.55;opacity:.9;margin:0}
    form{padding:clamp(40px,8vh,96px) var(--gutter) 120px;display:flex;flex-direction:column;gap:28px}
    .step>.tb-eyebrow{margin-bottom:12px;display:block}
    .pick{display:flex;flex-wrap:wrap;gap:10px}
    .pick button{background:none;border:1px solid var(--tb-line);border-radius:999px;padding:10px 16px;min-height:44px;font-size:14px;display:inline-flex;gap:8px;align-items:center;color:var(--tb-ink)}
    .pick button[aria-pressed="true"]{background:var(--tb-ink);color:var(--tb-paper);border-color:var(--tb-ink)}
    .pick i{width:9px;height:9px;border-radius:50%}
    .pick .none{font-size:14px;opacity:.7}
    input,select,textarea{font:inherit;font-size:16px;width:100%;padding:12px 0;border:0;border-bottom:1px solid var(--tb-line);background:transparent;color:var(--tb-ink);border-radius:0}
    input:focus,select:focus,textarea:focus{outline:none;border-bottom-color:var(--tb-river)}
    textarea{resize:vertical;min-height:60px}
    label>.tb-eyebrow{display:block}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px 24px}
    .summary{border-top:1px solid var(--tb-ink);padding-top:18px;display:grid;grid-template-columns:1fr auto;gap:8px 20px;align-items:baseline}
    .summary .big{font-family:var(--f-display);font-size:44px;line-height:1}
    .sched{display:flex;height:44px;border-radius:4px;overflow:hidden;margin-top:6px}
    .sched div{background:var(--tb-river);border-right:2px solid var(--tb-paper);color:var(--tb-paper);font-family:var(--f-data);font-variant-numeric:tabular-nums;font-size:10.5px;display:flex;align-items:center;justify-content:center;white-space:nowrap;overflow:hidden}
    .sched div:nth-child(odd){background:#4E7C74}
    .sched-lab{display:flex;margin-top:6px}
    .sched-lab span{font-size:10.5px;opacity:.7;line-height:1.25;padding-right:4px}
    .ok{display:none;padding:18px 0;border-top:2px solid var(--tb-lamp)}
    .ok.on{display:block}
    .btns{display:flex;gap:10px;flex-wrap:wrap}
    .err{color:var(--tb-clay);font-size:13px;min-height:1em}
    @media (max-width:900px){grid-template-columns:1fr;.left{min-height:60vh}.left .wrap{height:60vh;position:relative}.grid2{grid-template-columns:1fr}.sched div{font-size:0}}`,
  (root, $) => {
    root.innerHTML = `<div class="left"><div class="wrap" data-r="img"><div class="words"><div class="tb-eyebrow">13 · Visit</div><h2 class="tb-display">Come and stand on the land</h2>
        <p>Tell us what you are looking for and when you are next flying in. We will meet you at the airport, walk you through the site and show you the plots that suit you.</p></div></div></div>
      <form data-r="f" novalidate aria-label="Plan a site visit">
        <div class="step"><span class="tb-eyebrow">01 · The home you have in mind</span><div class="pick" data-r="types"></div></div>
        <div class="step" data-r="plotsStep"><span class="tb-eyebrow">02 · Plots you like (optional)</span><div class="pick" data-r="plots"></div></div>
        <div class="summary" data-r="sum"></div>
        <div class="step" data-r="schedStep"><span class="tb-eyebrow">Indicative payment schedule</span><div class="sched" data-r="sched"></div><div class="sched-lab" data-r="schedLab"></div><p class="tb-disclaimer" data-r="schedNote"></p></div>
        <div class="step"><span class="tb-eyebrow">03 · Your details</span><div class="grid2">
          <label><span class="tb-eyebrow">Name</span><input name="name" autocomplete="name" required></label>
          <label><span class="tb-eyebrow">Phone / WhatsApp</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
          <label><span class="tb-eyebrow">Email</span><input name="email" type="email" autocomplete="email"></label>
          <label><span class="tb-eyebrow">Where you live</span><input name="city" placeholder="Bengaluru, Dubai, Mumbai…"></label>
          <label><span class="tb-eyebrow">Next visit to Mangaluru</span><input name="visit" type="month"></label>
          <label><span class="tb-eyebrow">Interested in rental management?</span><select name="rental"><option>Not sure yet</option><option>Yes</option><option>No</option></select></label></div>
          <label style="display:block;margin-top:14px"><span class="tb-eyebrow">Anything else</span><textarea name="msg"></textarea></label></div>
        <div class="err" data-r="err" aria-live="polite"></div>
        <div class="btns"><button class="tb-btn" type="submit">Request a site visit</button><a class="tb-btn ghost" data-r="wa" target="_blank" rel="noopener">Message on WhatsApp</a><button class="tb-btn ghost" type="button" data-r="dl">Download brochure PDF</button></div>
        <div class="ok" data-r="ok" role="status">Thank you. The N Developers team will call you within one working day to plan your visit.</div>
        <p class="tb-disclaimer" data-r="legal"></p></form>`;
    $('img').prepend(TBX.img('Renders/vis_09_rain_verandah_dusk.jpg', 'A verandah at dusk in the rain, lamps lit, tea on the table'));
    $('legal').textContent = 'Prices cover construction and interiors at ₹ 4,200 per sq.ft of built-up area, plus the infrastructure and amenity charge and type extras (Estuary plunge pool, Moorings court share). Land price is not included. ' + TBX.excl() + ' This brochure is not an offer or a contract. RERA registration: to be added.';
    const saved = TBX.store.get('shortlist') || {};
    const S = {type: saved.type || 'lagoon', plots: new Set(saved.plots || [])};
    const WA = window.TB_WHATSAPP || '';
    const opts = [...TBX.allTypes(), {id: 'lookout', name: D.lookout.name, bhk: null}];
    opts.forEach(t => $('types').append(el('button', {type: 'button', 'data-id': t.id, onclick: () => { S.type = t.id; S.plots.forEach(n => { const p = TBX.plot(n); if (!p || !p.allowed_types.includes(t.id)) S.plots.delete(n); }); render(); }},
      el('i', {style: {background: t.id === 'lookout' ? '#3A4441' : TBX.typeColor(t.id)}}), t.bhk ? `${t.name} · ${t.bhk} BHK` : `${t.name} · apartments`)));
    function render() {
      $('types').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === S.type));
      const isL = S.type === 'lookout';
      $('plotsStep').style.display = isL ? 'none' : ''; $('schedStep').style.display = isL ? 'none' : '';
      $('plots').innerHTML = '';
      if (!isL) D.plots.filter(p => p.allowed_types.includes(S.type)).forEach(p => $('plots').append(el('button', {type: 'button', 'aria-pressed': S.plots.has(p.no), onclick: () => { S.plots.has(p.no) ? S.plots.delete(p.no) : S.plots.add(p.no); render(); }},
        `Plot ${p.no} · ${TBX.fmtInt(p.area_sqft)} sq.ft`)));
      $('sum').innerHTML = '';
      const plotsTxt = S.plots.size ? ` · Plot${S.plots.size > 1 ? 's' : ''} ${[...S.plots].sort((a, b) => a - b).join(', ')}` : '';
      if (isL) {
        $('sum').append(el('div', {}, el('div', {class: 'tb-eyebrow'}, 'Your shortlist'), el('div', {}, `${D.lookout.name} · ${D.lookout.mix}`)), el('div', {style: {textAlign: 'right'}}, el('div', {class: 'tb-eyebrow'}, 'Status'), el('div', {style: {fontFamily: 'var(--f-display)', fontSize: '28px'}}, 'Launching later')));
      } else {
        const t = TBX.type(S.type), from = TBX.from(S.type);
        $('sum').append(el('div', {}, el('div', {class: 'tb-eyebrow'}, 'Your shortlist'), el('div', {}, `${t.name} · ${t.label}` + plotsTxt)),
          el('div', {style: {textAlign: 'right'}}, el('div', {class: 'tb-eyebrow'}, 'Starting from'), el('div', {class: 'big'}, noOnwards(from.display))));
        $('sched').innerHTML = ''; $('schedLab').innerHTML = '';
        D.payment_plan.stages.forEach(([name, pct]) => { $('sched').append(el('div', {style: {flex: pct}, title: `${name}: ${pct}%`}, TBX.inr(from.display_inr * pct / 100))); $('schedLab').append(el('span', {style: {flex: pct}}, name.replace(' (within 30 days)', ''))); });
        $('schedNote').textContent = `${D.payment_plan.status} Shown on the starting figure of ${noOnwards(from.display)}. ${TBX.excl()}`;
      }
      const name = isL ? D.lookout.name : TBX.type(S.type).name;
      const txt = encodeURIComponent(`Hello, I'm interested in ${name} at Tranquil Bay` + (S.plots.size ? ` (plots ${[...S.plots].join(', ')})` : '') + '.');
      $('wa').href = WA ? `https://wa.me/${WA}?text=${txt}` : `https://wa.me/?text=${txt}`;
      TBX.store.set('shortlist', {type: S.type, plots: [...S.plots]});
      TBX.emit('shortlist', {type: S.type, plots: [...S.plots]});
    }
    $('f').addEventListener('submit', e => { e.preventDefault(); const fd = Object.fromEntries(new FormData(e.target));
      if (!fd.name || !fd.phone) { $('err').textContent = !fd.name ? 'Please add your name.' : 'Please add a phone or WhatsApp number.'; e.target.querySelector(!fd.name ? '[name=name]' : '[name=phone]').focus(); return; }
      $('err').textContent = ''; TBX.emit('lead', {...fd, type: S.type, plots: [...S.plots], at: new Date().toISOString()}); $('ok').classList.add('on'); });
    $('dl').onclick = () => { TBX.emit('download-pdf', {}); if (window.TB_PDF_URL) window.open(window.TB_PDF_URL, '_blank', 'noopener'); };
    TBX.on('plot-type', d => { S.type = d.type; S.plots.add(+d.plot); render(); });
    TBX.on('enquire', d => { if (d.type) S.type = d.type; if (d.plot) S.plots.add(+d.plot); render(); TBX.scrollTo($('f')); });
    render();
  });


  /* =================== Fixed header + disclaimer footer (tb-chrome.js) =================== */
  define('tb-chrome', `
    .head{position:fixed;left:0;right:0;top:0;height:var(--chrome-top);z-index:60;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 var(--gutter);transition:background .4s var(--ease),color .4s,box-shadow .4s;color:var(--tb-paper);pointer-events:none}
    .head>*{pointer-events:auto}
    .head.light{background:rgba(242,238,230,.86);backdrop-filter:blur(12px) saturate(1.1);-webkit-backdrop-filter:blur(12px);color:var(--tb-ink);box-shadow:0 1px 0 var(--tb-line)}
    .head.dark{background:linear-gradient(180deg,rgba(12,16,15,.55),rgba(12,16,15,0))}
    .brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;min-height:44px}
    .lg{position:relative;display:block}
    .lg img{display:block;transition:opacity .5s var(--ease)}
    .lg img.alt{position:absolute;left:0;top:0}
    .n img{height:calc(var(--chrome-top) - 22px);width:auto}
    .i img{height:calc((var(--chrome-top) - 22px) * .42);width:auto}
    .i .lg img.alt{left:auto;right:0}
    .role{font-family:var(--f-data);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.72;line-height:1.3}
    .mid{font-family:var(--f-display);font-weight:500;font-size:24px;letter-spacing:.01em;opacity:0;transition:opacity .4s;white-space:nowrap}
    .head.scrolled .mid{opacity:1}
    .right{justify-self:end;display:flex;align-items:center;gap:clamp(14px,1.8vw,26px)}
    .sep{width:1px;height:calc(var(--chrome-top) - 40px);background:currentColor;opacity:.25}
    .p{flex-direction:column;align-items:flex-start;justify-content:center;gap:3px}
    .p img{height:calc((var(--chrome-top) - 22px) * .66);width:auto}
    .n{text-align:right}
    .i{flex-direction:row-reverse;text-align:right}
    .head.dark .on-light,.head.light .on-dark{opacity:0}
    .foot{position:fixed;left:0;right:0;bottom:0;z-index:58;display:flex;align-items:center;gap:16px;min-height:var(--chrome-foot);padding:6px var(--gutter);background:rgba(28,35,33,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:rgba(242,238,230,.86);font-family:var(--f-data);font-size:10.5px;letter-spacing:.02em;line-height:1.4}
    .foot p{margin:0;flex:1}
    .foot button{background:none;border:0;color:var(--tb-lamp);font:inherit;text-decoration:underline;text-underline-offset:3px;white-space:nowrap;padding:6px 0}
    .legal{position:fixed;left:0;right:0;bottom:0;z-index:70;max-height:70vh;overflow:auto;background:var(--tb-paper);color:var(--tb-ink);padding:28px var(--gutter) 40px;box-shadow:0 -20px 60px rgba(0,0,0,.25);transform:translateY(102%);transition:transform .45s var(--ease)}
    .legal.on{transform:none}
    .legal h3{font-family:var(--f-display);letter-spacing:.01em;font-weight:500;font-size:40px;margin:0 0 14px}
    .legal ol{margin:0;padding-left:20px;max-width:900px;font-size:14px;line-height:1.6}
    .legal li{margin-bottom:8px}
    .legal .x{position:absolute;right:var(--gutter);top:22px}
    .legal .cred{margin-top:18px;font-family:var(--f-data);font-size:11px;opacity:.72}
    @media (max-width:760px){.mid,.role{display:none}.head{grid-template-columns:auto 1fr}.p img{height:calc((var(--chrome-top) - 22px) * .6)}.right{gap:12px}.n img{height:calc(var(--chrome-top) - 26px)}.sep{height:24px}}
    @media (max-width:760px){.foot{font-size:9.5px}.foot p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}}
    @media print{.head,.foot{position:static}}`,
  (root) => {
    document.documentElement.classList.add('tb-chrome');
    const T = D.team;
    const logo = (onLight, onDark, alt) => el('span', {class: 'lg'}, el('img', {class: 'on-light', src: TBX.asset(onLight), alt}), el('img', {class: 'on-dark alt', src: TBX.asset(onDark), alt: '', 'aria-hidden': 'true'}));
    const P = T.promoter;
    const head = el('header', {class: 'head dark', role: 'banner'},
      el('div', {class: 'brand p', 'aria-label': 'A ' + P.name + ' project'}, el('span', {class: 'role'}, 'A project by'), logo(P.logo, P.logo_on_dark, P.name)),
      el('div', {class: 'mid'}, D.project.name),
      el('div', {class: 'right'},
        el('a', {class: 'brand n', href: T.developer.url, target: '_blank', rel: 'noopener', 'aria-label': T.developer.name + ' (opens in a new tab)'}, el('span', {class: 'role'}, 'Developed', el('br'), 'by'), logo(T.developer.logo, T.developer.logo_on_dark, T.developer.name)),
        el('span', {class: 'sep', 'aria-hidden': 'true'}),
        el('a', {class: 'brand i', href: T.consultant.url, target: '_blank', rel: 'noopener', 'aria-label': T.consultant.name + ' (opens in a new tab)'}, logo(T.consultant.logo, T.consultant.logo_on_dark, T.consultant.name), el('span', {class: 'role'}, 'Design', el('br'), 'consultancy'))));
    const legal = el('div', {class: 'legal', role: 'dialog', 'aria-label': 'Disclaimer'},
      el('button', {class: 'tb-btn ghost x', onclick: () => legal.classList.remove('on')}, 'Close'),
      el('h3', {}, 'Disclaimer'), el('ol', {}, D.disclaimers.full.map(x => el('li', {}, x))), el('div', {class: 'cred'}, D.brand.credit_line));
    const foot = el('footer', {class: 'foot', role: 'contentinfo'}, el('p', {}, D.disclaimers.footer_short), el('button', {onclick: () => legal.classList.add('on')}, 'Read full disclaimer'));
    root.append(head, foot, legal);
    TBX.on('legal', () => legal.classList.add('on'));
    document.addEventListener('keydown', e => e.key === 'Escape' && legal.classList.remove('on'));
    function update() {
      const y = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--chrome-top')) || 76) / 2;
      let theme = 'dark';
      for (const s of document.querySelectorAll('[data-tb-theme]')) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) theme = s.dataset.tbTheme; }
      head.classList.toggle('dark', theme === 'dark'); head.classList.toggle('light', theme === 'light');
      head.classList.toggle('scrolled', scrollY > innerHeight * 0.6);
    }
    addEventListener('scroll', update, {passive: true}); addEventListener('resize', update); update(); setTimeout(update, 400);
  });

  /* =================== M00 · Reference dock =================== */
  define('tb-dock', `
    .bar{position:fixed;left:50%;bottom:calc(var(--chrome-foot) + 18px);transform:translateX(-50%);z-index:50;display:flex;align-items:center;gap:2px;padding:6px;border-radius:999px;background:rgba(28,35,33,.78);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px);color:#F2EEE6;box-shadow:0 10px 40px rgba(0,0,0,.25);max-width:calc(100vw - 24px)}
    .bar button{background:none;border:0;color:inherit;padding:0 14px;height:44px;border-radius:999px;font-size:13px;letter-spacing:.01em;white-space:nowrap;display:inline-flex;align-items:center;gap:8px}
    .bar button:hover,.bar button[aria-expanded="true"]{background:rgba(242,238,230,.14)}
    .bar .cur{font-family:var(--f-data);font-size:11px;opacity:.7}
    .bar .enq{background:var(--tb-lamp)!important;color:var(--tb-ink)!important;font-weight:500}
    .prog{width:64px;height:2px;background:rgba(242,238,230,.25);margin:0 8px;border-radius:2px;overflow:hidden;flex:none}
    .prog i{display:block;height:100%;width:0;background:var(--tb-lamp)}
    .sheet{position:fixed;left:50%;bottom:calc(var(--chrome-foot) + 80px);transform:translate(-50%,16px);width:min(980px,calc(100vw - 24px));max-height:min(72vh,720px);overflow:auto;z-index:49;background:rgba(242,238,230,.97);backdrop-filter:blur(10px);color:var(--tb-ink);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .25s,transform .35s var(--ease);padding:22px 24px}
    .sheet.on{opacity:1;pointer-events:auto;transform:translate(-50%,0)}
    .sheet h4{font-family:var(--f-data);font-weight:400;font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin:0 0 12px}
    .secs{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0 24px}
    .secs a{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--tb-line);color:inherit;text-decoration:none;font-size:15px;min-height:44px}
    .secs a span{font-family:var(--f-data);font-size:11px;opacity:.6;padding-top:3px}
    .secs a.cur{color:var(--tb-river);font-weight:500}
    .plans{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
    .plans figure{margin:0;cursor:zoom-in}
    .plans .th{background:#fff;border-radius:6px;aspect-ratio:1/1.13;display:grid;place-items:center;overflow:hidden}
    .plans img{width:100%;height:100%;object-fit:contain}
    .plans figcaption{font-size:13px;margin-top:6px}
    .plans small{display:block;font-family:var(--f-data);font-size:10.5px;opacity:.65}
    .facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:18px 24px}
    .facts b{display:block;font-family:var(--f-data);font-weight:400;font-size:22px;font-variant-numeric:tabular-nums}
    .facts span{font-size:12px;opacity:.75}
    .zoom{position:fixed;inset:0;background:#fff;z-index:60;display:none;cursor:zoom-out}
    .zoom.on{display:block}.zoom img{width:100%;height:100%;object-fit:contain}
    .zoom button{position:absolute;top:16px;right:16px;width:44px;height:44px;border-radius:50%;border:0;background:var(--tb-ink);color:var(--tb-paper)}
    @media (max-width:760px){.prog,.lbl,.cur{display:none}.bar button{padding:0 11px;font-size:12.5px}.plans{grid-template-columns:1fr 1fr}.sheet{bottom:calc(var(--chrome-foot) + 76px)}}`,
  (root) => {
    const bar = el('nav', {class: 'bar', 'aria-label': 'Brochure navigation'});
    const sheet = el('div', {class: 'sheet', role: 'dialog', 'aria-label': 'Quick reference'});
    const zoom = el('div', {class: 'zoom', onclick: () => zoom.classList.remove('on')}, el('img', {alt: ''}), el('button', {'aria-label': 'Close'}, '✕'));
    const prog = el('div', {class: 'prog'}, el('i'));
    const sections = () => [...document.querySelectorAll('[data-tb-section]')];
    let curIdx = 0;
    const panels = {
      sections() { const g = el('div', {class: 'secs'});
        sections().forEach((s, i) => g.append(el('a', {href: '#', class: i === curIdx ? 'cur' : '', onclick: e => { e.preventDefault(); close(); TBX.scrollTo(s); }}, el('span', {}, pad2(i + 1)), s.dataset.tbSection)));
        return [el('h4', {}, 'Contents'), g]; },
      plans() { const g = el('div', {class: 'plans'});
        const add = (src, cap, small, alt) => g.append(el('figure', {onclick: () => { zoom.querySelector('img').src = src; zoom.querySelector('img').alt = alt; zoom.classList.add('on'); }},
          el('div', {class: 'th'}, el('img', {src, alt, loading: 'lazy'})), el('figcaption', {}, el('small', {}, small), cap)));
        TBX.types().forEach(t => Object.entries(t.plans).forEach(([lv, p]) => add(TBX.asset(p), t.name, `${t.bhk} BHK · ${lv} floor`, `${t.name} ${lv} floor plan`)));
        add(TBX.asset('Masterplan/sanctioned_layout_crop.jpg'), 'Plot numbers', 'Sanctioned layout', 'Sanctioned layout with plot numbers');
        return [el('h4', {}, 'Plans'), g]; },
      facts() { const s = D.site, g = el('div', {class: 'facts'});
        const airport = D.context.places[0].approx_drive;
        [[s.total_land_acres + ' acres', 'site area'], [s.villa_plots, 'villa plots'], ['2, 3, 4 BHK', 'villa types'], [D.moorings.homes, 'Moorings homes around one court'],
         [noOnwards(TBX.from('cove').display), 'homes from'], [airport, 'to the airport (approx.)'], ['Ready', 'to move in'], ['G+1 to G+2', 'villa heights'], [s.land_use[2].pct + '%', 'open area']]
          .forEach(([b, t]) => g.append(el('div', {}, el('b', {}, b), el('span', {}, t))));
        return [el('h4', {}, 'Key facts'), g, el('p', {class: 'tb-disclaimer', style: {marginTop: '16px'}}, 'Construction and interiors at ₹ 4,200 per sq.ft, plus infrastructure charge and type extras. Land price is not included. ' + TBX.excl())]; },
    };
    let open = null;
    function show(k, btn) { if (open === k) return close(); open = k; sheet.innerHTML = ''; sheet.append(...panels[k]()); sheet.classList.add('on');
      bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-expanded', b === btn)); }
    function close() { open = null; sheet.classList.remove('on'); bar.querySelectorAll('button').forEach(b => b.hasAttribute('aria-expanded') && b.setAttribute('aria-expanded', false)); }
    const curLab = el('span', {class: 'cur'}, '01');
    bar.append(
      el('button', {onclick: e => show('sections', e.currentTarget), 'aria-expanded': false, 'aria-label': 'Contents'}, '☰', el('span', {class: 'lbl'}, 'Contents'), curLab), prog,
      el('button', {onclick: e => show('plans', e.currentTarget), 'aria-expanded': false}, 'Plans'),
      el('button', {onclick: () => { close(); TBX.scrollTo('Masterplan'); }}, el('span', {class: 'lbl'}, 'Masterplan'), el('span', {class: 'lbl-s', style: {display: 'none'}}, 'Map')),
      el('button', {onclick: e => show('facts', e.currentTarget), 'aria-expanded': false}, 'Key facts'),
      el('button', {class: 'enq', onclick: () => { close(); TBX.emit('enquire', {}); }}, 'Enquire'));
    const mq = matchMedia('(max-width:760px)'); const swapMap = () => bar.querySelectorAll('.lbl-s').forEach(s => s.style.display = mq.matches ? '' : 'none'); mq.addEventListener('change', swapMap); swapMap();
    root.append(sheet, bar, zoom);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); zoom.classList.remove('on'); } });
    document.addEventListener('click', e => { if (open && !root.contains(e.target)) close(); });
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; prog.firstChild.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
      const ss = sections(); let k = 0; ss.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .4) k = i; }); curIdx = k; curLab.textContent = pad2(k + 1); };
    addEventListener('scroll', onScroll, {passive: true}); onScroll();
  });
})();
