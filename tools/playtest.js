// Plays every level in a headless browser using the answers in the content files.
// Usage: node tools/playtest.js   (needs playwright)
let chromium; try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 900, height: 900 } });
  const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  const res = await p.evaluate(async () => {
    const out = [], $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
    const click = el => { if (!el) throw new Error('missing element'); el.click(); };
    const strip = s => { const d = document.createElement('div'); d.innerHTML = s; return d.textContent.replace(/\s+/g, ' ').trim(); };
    const variants = s => [s.replace(/\[\[(.+?)\|(.+?)\]\]/g, '$1'), s.replace(/\[\[(.+?)\|(.+?)\]\]/g, '$1 ($2)'), s.replace(/\[\[(.+?)\|(.+?)\]\]/g, '$2')].map(strip);
    const solve = {
      match: pz => pz.pairs.forEach((_, i) => { click($(`#pz [data-l="${i}"]`)); click($(`#pz [data-r="${i}"]`)); }),
      order: pz => pz.items.forEach((_, i) => click($(`#pz [data-i="${i}"]`))),
      pick: pz => pz.steps.forEach(() => { click($('#pz .opt[data-k="0"]')); const n = $('#pz [data-next]'); if (n) n.click(); }),
      sort: pz => pz.items.forEach(() => {
        const t = strip($('#pz .card.big').innerHTML), it = pz.items.find(x => variants(x[0]).includes(t));
        if (!it) throw new Error('sort item not found: ' + t);
        click($(`#pz .opt[data-k="${it[1]}"]`));
      }),
      calc: pz => { $$('#pz input').forEach((inp, i) => { inp.value = pz.fields[i].a; }); click($('#pz [data-check]')); },
      perm: pz => pz.tasks.forEach(t => {
        const want = window.KT_SIM.chmod(window.KT_SIM.fromStr(t.from), t.cmd);
        want.forEach((v, n) => { const b = $(`#pz [data-b="${n}"]`); if (b.classList.contains('on') !== v) click($(`#pz [data-b="${n}"]`)); });
        click($('#pz [data-set]'));
      }),
      term: pz => pz.tasks.forEach((t, i) => {
        const inp = $('#pz input'); inp.value = t.sol; inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        if ($$('#pz .err').length) throw new Error(`term task ${i + 1} rejected its own solution: ${t.sol}`);
      })
    };
    for (const [wi, w] of window.KT.WORLDS.entries()) for (const [li, lv] of w.levels.entries()) {
      try {
        window.KT.startLevel(wi, li);
        let guard = 0; while ($('#adv') && guard++ < 20) click($('#adv'));
        for (const pz of [].concat(lv.pz)) {
          if (!$('#pz')) throw new Error('no puzzle mounted');
          solve[pz.type](pz);
          if ($('#cont').hidden) throw new Error(`${pz.type} puzzle did not complete: ${$('.fb').textContent}`);
          click($('#cont'));
        }
        if (lv.rv && lv.rv.length) click($('[data-go="n"]'));
        for (let q = 0; q < 3; q++) { click($('.opt[data-k="0"]')); click($('[data-go="n"]')); }
        const st = $('.bigstars');
        if (!st || st.textContent !== '★★★') throw new Error('expected 3 stars, got ' + (st ? st.textContent : 'no reward screen'));
        if (lv.qz.length < 3) throw new Error('fewer than 3 quiz questions');
        lv.qz.forEach(q => { if (new Set(q.a).size !== q.a.length) throw new Error('duplicate quiz options: ' + q.q); });
        out.push({ id: lv.id, ok: true });
      } catch (e) { out.push({ id: lv.id, ok: false, err: e.message }); }
    }
    const C = window.KT_SIM, run = (f, e) => C.toStr(C.chmod(C.fromStr(f), e));
    return {
      out, chmod: [['rw-rw-rw-', 'go-w'], ['rw-------', 'a+x'], ['rwxrwxrwx', '754'], ['rwxrwxrwx', 'go-w,a+x'], ['rwxrwxrwx', 'go='], ['r--r--r--', 'u+rw']].map(([f, e]) => `${f} + chmod ${e} = ${run(f, e)}`),
      qs: window.KT.WORLDS.reduce((a, w) => a + w.levels.reduce((x, l) => x + l.qz.length, 0), 0)
    };
  });
  const bad = res.out.filter(r => !r.ok);
  console.log(`levels: ${res.out.length}, passed: ${res.out.length - bad.length}, quiz questions: ${res.qs}`);
  res.chmod.forEach(l => console.log('chmod check:', l));
  bad.forEach(r => console.log('FAIL', r.id, r.err));
  errs.forEach(e => console.log(e));
  await b.close();
  process.exit(bad.length || errs.length ? 1 : 0);
})();
