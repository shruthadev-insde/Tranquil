/* Tranquil Bay · fixed brochure chrome: header with both logos, fixed disclaimer footer.
   Load after tb-core.js on the brochure page:  <script>window.TB_CHROME = true</script> ... <script src="tb-chrome.js" defer></script>
   Sections declare their ground so the header can switch logo versions:
     <section data-tb-section="…" data-tb-theme="dark|light">                                            */
(function () {
  const {data: D, el} = window.TBX;
  document.documentElement.classList.add('tb-chrome');
  const css = `
  .tbc-head{position:fixed;left:0;right:0;top:0;height:var(--chrome-top);z-index:60;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
    padding:0 var(--gutter);transition:background .4s var(--ease),color .4s,box-shadow .4s;color:var(--tb-paper);pointer-events:none}
  .tbc-head>*{pointer-events:auto}
  .tbc-head.light{background:rgba(242,238,230,.86);backdrop-filter:blur(12px) saturate(1.1);color:var(--tb-ink);box-shadow:0 1px 0 var(--tb-line)}
  .tbc-head.dark{background:linear-gradient(180deg,rgba(12,16,15,.55),rgba(12,16,15,0))}
  .tbc-brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit}
  .tbc-brand .lg{position:relative;display:block}
  .tbc-brand img{display:block;transition:opacity .35s}
  .tbc-brand img.alt{position:absolute;left:0;top:0}
  .tbc-n img{height:calc(var(--chrome-top) - 22px);width:auto}
  .tbc-i img{height:calc((var(--chrome-top) - 22px) * .42);width:auto}
  .tbc-role{font-family:var(--f-data);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.7;line-height:1.3}
  .tbc-mid{font-family:var(--f-display);font-weight:500;font-size:24px;letter-spacing:.01em;opacity:0;transition:opacity .4s;white-space:nowrap}
  .tbc-head.scrolled .tbc-mid{opacity:1}
  .tbc-right{justify-self:end}
  .tbc-i{flex-direction:row-reverse;text-align:right}
  .tbc-head.dark .on-light,.tbc-head.light .on-dark{opacity:0}

  .tbc-foot{position:fixed;left:0;right:0;bottom:0;z-index:58;display:flex;align-items:center;gap:16px;min-height:30px;padding:6px var(--gutter);
    background:rgba(28,35,33,.9);backdrop-filter:blur(8px);color:rgba(242,238,230,.82);font-family:var(--f-data);font-size:10.5px;letter-spacing:.02em;line-height:1.4}
  .tbc-foot p{margin:0;flex:1}
  .tbc-foot button{background:none;border:0;color:var(--tb-lamp);font:inherit;text-decoration:underline;text-underline-offset:3px;white-space:nowrap;padding:0}
  .tbc-legal{position:fixed;left:0;right:0;bottom:0;z-index:70;max-height:70vh;overflow:auto;background:var(--tb-paper);color:var(--tb-ink);
    padding:28px var(--gutter) 40px;box-shadow:0 -20px 60px rgba(0,0,0,.25);transform:translateY(102%);transition:transform .45s var(--ease)}
  .tbc-legal.on{transform:none}
  .tbc-legal h3{font-family:var(--f-display);letter-spacing:.01em;font-weight:500;font-size:40px;margin:0 0 14px}
  .tbc-legal ol{margin:0;padding-left:20px;max-width:900px;font-size:14px;line-height:1.6}
  .tbc-legal li{margin-bottom:8px}
  .tbc-legal .x{position:absolute;right:var(--gutter);top:22px}
  .tbc-legal .cred{margin-top:18px;font-family:var(--f-data);font-size:11px;opacity:.7}
  .tbd-bar{bottom:calc(30px + 14px)!important}
  .tbd-sheet{bottom:calc(30px + 74px)!important}
  @media (max-width:760px){.tbc-mid{display:none}.tbc-role{display:none}.tbc-head{grid-template-columns:1fr 1fr}
    .tbc-foot{font-size:9.5px}.tbc-foot p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}}
  @media print{.tbc-head,.tbc-foot{position:static}}
  `;
  document.head.append(el('style', {}, css));
  const T = D.team;
  const logo = (onLight, onDark, alt) => el('span', {class: 'lg'},
    el('img', {class: 'on-light', src: TBX.asset(onLight), alt}), el('img', {class: 'on-dark alt', src: TBX.asset(onDark), alt: '', 'aria-hidden': 'true'}));
  const head = el('header', {class: 'tbc-head dark', role: 'banner'},
    el('a', {class: 'tbc-brand tbc-n', href: T.developer.url, target: '_blank', rel: 'noopener', 'aria-label': T.developer.name},
      logo(T.developer.logo, T.developer.logo_on_dark, T.developer.name), el('span', {class: 'tbc-role'}, 'Developed by')),
    el('div', {class: 'tbc-mid'}, D.project.name),
    el('div', {class: 'tbc-right'}, el('a', {class: 'tbc-brand tbc-i', href: T.consultant.url, target: '_blank', rel: 'noopener', 'aria-label': T.consultant.name},
      logo(T.consultant.logo, T.consultant.logo_on_dark, T.consultant.name), el('span', {class: 'tbc-role'}, 'Design', el('br'), 'consultancy'))));
  const legal = el('div', {class: 'tbc-legal', role: 'dialog', 'aria-label': 'Disclaimer'},
    el('button', {class: 'tb-btn ghost x', onclick: () => legal.classList.remove('on')}, 'Close'),
    el('h3', {}, 'Disclaimer'), el('ol', {}, D.disclaimers.full.map(t => el('li', {}, t))),
    el('div', {class: 'cred'}, D.brand.credit_line));
  const foot = el('footer', {class: 'tbc-foot', role: 'contentinfo'},
    el('p', {}, D.disclaimers.footer_short), el('button', {onclick: () => legal.classList.add('on')}, 'Read full disclaimer'));
  document.body.append(head, foot, legal);
  document.addEventListener('keydown', e => e.key === 'Escape' && legal.classList.remove('on'));

  /* switch header theme to match the section under it */
  const secs = [...document.querySelectorAll('[data-tb-theme]')];
  function update() {
    const y = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--chrome-top')) || 76;
    let theme = 'dark';
    for (const s of secs) { const r = s.getBoundingClientRect(); if (r.top <= y / 2 && r.bottom > y / 2) { theme = s.dataset.tbTheme; break; } }
    head.classList.toggle('dark', theme === 'dark'); head.classList.toggle('light', theme === 'light');
    head.classList.toggle('scrolled', scrollY > innerHeight * 0.6);
  }
  addEventListener('scroll', update, {passive: true}); addEventListener('resize', update); update();
  TBX.on('theme', d => { if (d && d.theme) { head.classList.toggle('dark', d.theme === 'dark'); head.classList.toggle('light', d.theme === 'light'); } });
})();
