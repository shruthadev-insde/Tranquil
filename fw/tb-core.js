/* Tranquil Bay · shared helpers. Requires tranquil_bay_data.js (window.TB) loaded first. */
(function () {
  const TB = window.TB;
  if (!TB) { console.error('tranquil_bay_data.js not loaded'); return; }
  const base = window.TB_ASSET_BASE || TB.meta.asset_base;

  const TBX = {
    data: TB,
    asset: p => base + p,
    types: () => ['cove', 'lagoon', 'estuary'].map(k => TB.villa_types[k]),
    allTypes: () => [...['cove', 'lagoon', 'estuary'].map(k => TB.villa_types[k]), TB.moorings],
    type: id => TB.villa_types[id] || (id === 'moorings' ? TB.moorings : null),
    typeColor: id => getComputedStyle(document.documentElement).getPropertyValue('--type-' + id).trim() || '#56706B',
    plot: no => TB.plots.find(p => p.no === +no),
    from: id => TB.pricing.starting_from[id],
    sqft: m2 => Math.round(m2 * 10.7639),
    fmtInt: n => Math.round(n).toLocaleString('en-IN'),
    /* INR in Indian units: 1,85,00,000 -> "₹ 1.85 Cr" */
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
    svg(tag, attrs = {}) {
      const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
      return n;
    },
    pts: arr => arr.map(p => p.join(',')).join(' '),
    /* minimal rich text: **bold**, with \* for a literal asterisk (for [INSD]e\*) */
    rich(str) {
      const frag = document.createDocumentFragment();
      String(str).split(/(\*\*(?:\\\*|[^*])+?\*\*)/).forEach(part => {
        if (!part) return;
        const bold = part.startsWith('**') && part.endsWith('**');
        const txt = (bold ? part.slice(2, -2) : part).replace(/\\\*/g, '*');
        frag.append(bold ? TBX.el('b', {}, txt) : document.createTextNode(txt));
      });
      return frag;
    },
    /* image with graceful fallback to a 'pending render' panel */
    img(src, alt, pendingLabel) {
      const wrap = TBX.el('div', { class: 'tb-imgwrap', style: { position: 'absolute', inset: 0 } });
      const i = TBX.el('img', { src: TBX.asset(src), alt: alt || '', loading: 'lazy', style: { width: '100%', height: '100%', objectFit: 'cover' } });
      i.onerror = () => { wrap.innerHTML = ''; wrap.append(TBX.el('div', { class: 'tb-pending' }, TBX.el('span', {}, pendingLabel || 'Render pending'))); };
      wrap.append(i); return wrap;
    },
    /* lightweight masterplan for secondary modules (amenities, reference dock).
       returns {world, pins:{id:g}, plots:{no:polygon}} */
    drawPlan(svgEl, {rotate = -72, pins = true, typeColors = true} = {}) {
      const G = TB.geometry, S = TBX.svg, P = TBX.pts;
      const world = S('g', {}); svgEl.append(world);
      world.append(S('polygon', {points: P(G.lookout_parcel), fill: 'rgba(0,0,0,.05)'}));
      world.append(S('polygon', {points: P(G.lookout_tower), fill: 'rgba(0,0,0,.25)'}));
      G.open_spaces.forEach(o => world.append(S('polygon', {points: P(o.pts), fill: 'var(--tb-grove)', opacity: .22})));
      G.roads.forEach(r => world.append(S('polyline', {points: P(r.pts), fill: 'none', stroke: 'rgba(0,0,0,.12)', 'stroke-width': r.width * 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'})));
      world.append(S('polygon', {points: P(G.boundary), fill: 'none', stroke: 'currentColor', 'stroke-opacity': .4, 'stroke-width': 2, 'stroke-dasharray': '12 8'}));
      const plots = {};
      TB.plots.forEach(p => { const e = S('polygon', {points: P(G.plots[p.no]), fill: typeColors ? TBX.typeColor(p.default_type) : 'rgba(0,0,0,.18)', stroke: '#F2EEE6', 'stroke-width': 3, opacity: .55}); world.append(e); plots[p.no] = e; });
      const pinEls = {};
      if (pins) TB.amenities.filter(a => !a.service && a.map).forEach((a, i) => {
        const g = S('g', {transform: `translate(${a.map[0]},${a.map[1]})`, 'data-id': a.id, style: 'cursor:pointer'});
        const c = S('circle', {r: 26, fill: a.phase === 2 ? '#F2EEE6' : 'var(--tb-ink)', stroke: a.phase === 2 ? 'var(--tb-ink)' : '#F2EEE6', 'stroke-width': 3});
        const t = S('text', {'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 20, fill: a.phase === 2 ? 'var(--tb-ink)' : '#F2EEE6', transform: `rotate(${-rotate})`});
        t.textContent = String(i + 1).padStart(2, '0'); g.append(c, t); world.append(g); pinEls[a.id] = g;
      });
      world.setAttribute('transform', `rotate(${rotate} 450 800)`);
      requestAnimationFrame(() => { const b = world.getBBox(); const m = 60;
        // compute rotated bounds
        const rad = rotate * Math.PI / 180, cx = 450, cy = 800;
        const pts = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) =>
          [cx + (x - cx) * Math.cos(rad) - (y - cy) * Math.sin(rad), cy + (x - cx) * Math.sin(rad) + (y - cy) * Math.cos(rad)]);
        const X = pts.map(p => p[0]), Y = pts.map(p => p[1]);
        svgEl.setAttribute('viewBox', `${Math.min(...X) - m} ${Math.min(...Y) - m} ${Math.max(...X) - Math.min(...X) + 2 * m} ${Math.max(...Y) - Math.min(...Y) + 2 * m}`); });
      return {world, pins: pinEls, plots};
    },
    /* cross-module events: modules broadcast and listen on window + parent (for iframes) */
    emit(type, detail) {
      window.dispatchEvent(new CustomEvent('tb:' + type, { detail }));
      try { if (window.parent !== window) window.parent.postMessage({ tb: type, detail }, '*'); } catch (e) {}
    },
    on(type, fn) {
      window.addEventListener('tb:' + type, e => fn(e.detail));
      window.addEventListener('message', e => { if (e.data && e.data.tb === type) fn(e.data.detail); });
    },
  };
  /* inside the brochure (iframe preview, or a page that loads tb-chrome.js) reserve room for the fixed header/footer */
  try { if (window.parent !== window || window.TB_CHROME) document.documentElement.classList.add('tb-chrome'); } catch (e) {}
  /* when a module runs inside an iframe, report which ground (dark/light) sits under the header */
  if (window.parent !== window) {
    let last = null;
    const report = () => { const s = [...document.querySelectorAll('[data-tb-theme]')].find(x => { const r = x.getBoundingClientRect(); return r.top <= 40 && r.bottom > 40; });
      const t = s ? s.dataset.tbTheme : null; if (t && t !== last) { last = t; TBX.emit('theme', {theme: t}); } };
    addEventListener('scroll', report, {passive: true}); addEventListener('load', report);
    TBX.on('scroll-to', d => scrollTo(0, d.y));
    /* the preview page tells each iframe the real viewport height, so vh-based layouts don't feed back into the iframe size */
    const size = () => TBX.emit('size', {h: document.documentElement.scrollHeight});
    TBX.on('vh', d => { document.documentElement.style.setProperty('--tb-vh', d.h + 'px'); requestAnimationFrame(() => requestAnimationFrame(size)); });
  }
  window.TBX = TBX;
})();
