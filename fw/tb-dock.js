/* Tranquil Bay · persistent navigation + quick-reference dock (M00).
   Drop <script src="tb-dock.js" defer></script> after tb-core.js on the brochure page.
   Reads section anchors from elements with [data-tb-section="Title"]. */
(function () {
  const {data: D, el} = window.TBX;
  const css = `
  .tbd-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:50;display:flex;align-items:center;gap:4px;padding:6px;border-radius:999px;
    background:rgba(28,35,33,.72);backdrop-filter:blur(14px) saturate(1.2);color:#F2EEE6;box-shadow:0 10px 40px rgba(0,0,0,.25);font-family:var(--f-ui)}
  .tbd-bar button{background:none;border:0;color:inherit;padding:10px 14px;border-radius:999px;font-size:13px;letter-spacing:.01em;white-space:nowrap}
  .tbd-bar button:hover,.tbd-bar button[aria-expanded="true"]{background:rgba(242,238,230,.14)}
  .tbd-bar .prog{width:64px;height:2px;background:rgba(242,238,230,.25);margin:0 8px;border-radius:2px;overflow:hidden}
  .tbd-bar .prog i{display:block;height:100%;width:0;background:var(--tb-lamp)}
  .tbd-sheet{position:fixed;left:50%;bottom:78px;transform:translate(-50%,16px);width:min(980px,calc(100vw - 32px));max-height:min(72vh,720px);overflow:auto;z-index:49;
    background:rgba(242,238,230,.97);backdrop-filter:blur(10px);color:var(--tb-ink);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .25s,transform .35s var(--ease);padding:22px 24px}
  .tbd-sheet.on{opacity:1;pointer-events:auto;transform:translate(-50%,0)}
  .tbd-sections{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:2px 20px}
  .tbd-sections a{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--tb-line);color:inherit;text-decoration:none;font-size:15px}
  .tbd-sections a span{font-family:var(--f-data);font-size:11px;opacity:.55;padding-top:3px}
  .tbd-sections a.cur{color:var(--tb-river)}
  .tbd-plans{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .tbd-plans figure{margin:0;cursor:zoom-in}
  .tbd-plans .th{background:#fff;border-radius:6px;aspect-ratio:1/1.13;display:grid;place-items:center;overflow:hidden}
  .tbd-plans img{width:100%;height:100%;object-fit:contain}
  .tbd-plans figcaption{font-size:13px;margin-top:6px}
  .tbd-plans small{display:block;font-family:var(--f-data);font-size:10.5px;opacity:.6}
  .tbd-facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px 22px}
  .tbd-facts b{display:block;font-family:var(--f-data);font-weight:400;font-size:22px}
  .tbd-facts span{font-size:12px;opacity:.7}
  .tbd-zoom{position:fixed;inset:0;background:#fff;z-index:60;display:none;cursor:zoom-out}
  .tbd-zoom.on{display:block}.tbd-zoom img{width:100%;height:100%;object-fit:contain}
  @media (max-width:700px){.tbd-bar .prog,.tbd-bar .lbl{display:none}.tbd-plans{grid-template-columns:1fr 1fr}}
  `;
  document.head.append(el('style', {}, css));
  const sections = [...document.querySelectorAll('[data-tb-section]')];
  const bar = el('nav', {class: 'tbd-bar', 'aria-label': 'Brochure navigation'});
  const sheet = el('div', {class: 'tbd-sheet', role: 'dialog', 'aria-label': 'Quick reference'});
  const zoom = el('div', {class: 'tbd-zoom', onclick: () => zoom.classList.remove('on')}, el('img', {alt: ''}));
  const prog = el('div', {class: 'prog'}, el('i'));
  const panels = {
    sections() {
      const g = el('div', {class: 'tbd-sections'});
      sections.forEach((s, i) => g.append(el('a', {href: '#' + (s.id || (s.id = 'tb-s' + i)), onclick: close}, el('span', {}, String(i + 1).padStart(2, '0')), s.dataset.tbSection)));
      return g;
    },
    plans() {
      const g = el('div', {class: 'tbd-plans'});
      const items = [['cove', 'ground'], ['cove', 'first'], ['lagoon', 'ground'], ['estuary', 'ground']];
      items.forEach(([k, lv]) => { const t = D.villa_types[k]; const src = TBX.asset(t.plans[lv]);
        g.append(el('figure', {onclick: () => { zoom.querySelector('img').src = src; zoom.classList.add('on'); }}, el('div', {class: 'th'}, el('img', {src, alt: `${t.name} ${lv} floor plan`, loading: 'lazy'})),
          el('figcaption', {}, el('small', {}, `${t.bhk} BHK · ${lv} floor`), t.name))); });
      const mp = el('figure', {onclick: () => { zoom.querySelector('img').src = TBX.asset('Masterplan/sanctioned_layout_crop.jpg'); zoom.classList.add('on'); }},
        el('div', {class: 'th'}, el('img', {src: TBX.asset('Masterplan/sanctioned_layout_crop.jpg'), alt: 'Sanctioned layout', loading: 'lazy'})), el('figcaption', {}, el('small', {}, 'Sanctioned layout'), 'Plot numbers'));
      g.append(mp); return g;
    },
    facts() {
      const s = D.site, g = el('div', {class: 'tbd-facts'});
      [[s.total_land_acres + ' acres', 'site area'], [s.villa_plots, 'villa plots'], ['4', 'Moorings homes around one court'], ['2, 3, 4 BHK', 'villa types'],
       [TBX.from('cove').display.replace(' onwards', ''), 'homes from'], ['15 to 20 min', 'to the airport (approx.)'], ['G+1 to G+2', 'villa heights'], [s.open_area_pct || '13.8%', 'open area']]
        .forEach(([b, t]) => g.append(el('div', {}, el('b', {}, b), el('span', {}, t))));
      return g;
    },
  };
  let open = null;
  function show(k, btn) {
    if (open === k) return close(); open = k; sheet.innerHTML = ''; sheet.append(panels[k]()); sheet.classList.add('on');
    bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-expanded', b === btn));
  }
  function close() { open = null; sheet.classList.remove('on'); bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-expanded', false)); }
  bar.append(el('button', {onclick: e => show('sections', e.currentTarget), 'aria-expanded': false}, '☰', el('span', {class: 'lbl'}, '  Contents')), prog,
    el('button', {onclick: e => show('plans', e.currentTarget), 'aria-expanded': false}, 'Plans'),
    el('button', {onclick: () => { close(); (document.querySelector('[data-tb-section="Masterplan"]') || document.body).scrollIntoView({behavior: 'smooth'}); }}, 'Masterplan'),
    el('button', {onclick: e => show('facts', e.currentTarget), 'aria-expanded': false}, 'Key facts'),
    el('button', {onclick: () => { close(); TBX.emit('enquire', {}); (document.querySelector('[data-tb-section="Visit"]') || document.body).scrollIntoView({behavior: 'smooth'}); }, style: {background: 'var(--tb-lamp)', color: 'var(--tb-ink)'}}, 'Enquire'));
  document.body.append(sheet, bar, zoom);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); zoom.classList.remove('on'); } });
  addEventListener('scroll', () => { const p = scrollY / (document.documentElement.scrollHeight - innerHeight); prog.firstChild.style.width = (p * 100) + '%'; }, {passive: true});
})();
