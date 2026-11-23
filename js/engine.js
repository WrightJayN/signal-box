/* Learning game engine (starter template).
   Config lives in js/config.js as window.KT_CONFIG. Content lives in js/content/*.js as window.KT_WORLDS.
   Signal Box: the OS simulators were replaced by one permission simulator (PZ.perm, KT_SIM.chmod). */
(function () {
  'use strict';
  const WORLDS = (window.KT_WORLDS || []).sort((a, b) => a.id - b.id);
  const CFG = Object.assign({
    id: 'learning-game', title: 'Learning Game', tagline: '', intro: 'Press <b>{lens}</b> at any time to see the real term.',
    lensName: 'Lens', lensTip: 'Show the real terms (L)', mapName: 'Map', cast: {}, titleCast: null, rival: 'rival', acts: {}, tests: null, prompt: 'student@host:~$', consoleName: 'Console'
  }, window.KT_CONFIG || {});
  const nm = id => CFG.cast[id] || id;
  const FIRST = Object.keys(CFG.cast)[0] || 'guide';
  const ACTS = CFG.acts;
  const TESTS = CFG.tests || [{ id: 'final', after: WORLDS.length ? WORLDS[WORLDS.length - 1].id : 1, name: 'Final test', mirrors: 'All worlds', worlds: WORLDS.map(w => w.id), n: 20 }];
  const KEY = CFG.id + '-v1';
  let S = { stars: {}, tests: {}, set: { expert: false, story: true, music: false, sfx: true, revision: false }, placed: false };
  try { const o = JSON.parse(localStorage.getItem(KEY)); if (o) S = Object.assign(S, o, { set: Object.assign(S.set, o.set) }); } catch (e) { /* first run */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode */ } };

  let lens = false;
  const $ = (s, r) => (r || document).querySelector(s);
  const app = $('#app');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // [[town words|real term]] is shown according to the language layer.
  function tx(s, layer) {
    // Both wordings are always in the page; CSS shows the right one, so the Lens works without redrawing.
    return String(s).replace(/\[\[(.+?)\|(.+?)\]\]/g, (_, a, b) => `<span class="tx L-${layer || 'bridge'}" title="${esc(b.replace(/<[^>]+>/g, ''))}"><span class="ta">${a}</span><span class="tp"> (</span><span class="tr">${b}</span><span class="tp">)</span></span>`);
  }

  /* ---------- sound ---------- */
  let AC = null, musicTimer = null;
  const ac = () => { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } return AC; };
  function tone(f, t, d, type, vol) {
    const a = ac(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, a.currentTime + t);
    g.gain.linearRampToValueAtTime(vol || 0.08, a.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + t + d);
    o.connect(g).connect(a.destination); o.start(a.currentTime + t); o.stop(a.currentTime + t + d + 0.05);
  }
  function sfx(k) {
    if (!S.set.sfx) return;
    if (k === 'ok') { tone(660, 0, 0.12, 'triangle'); tone(880, 0.08, 0.16, 'triangle'); }
    else if (k === 'bad') tone(150, 0, 0.25, 'sawtooth', 0.05);
    else if (k === 'bell') { tone(1320, 0, 0.5, 'sine', 0.06); tone(1760, 0.02, 0.4, 'sine', 0.03); }
    else if (k === 'key') tone(520, 0, 0.05, 'square', 0.03);
    else if (k === 'win') [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle'));
  }
  const CHORDS = [[220, 261.6, 329.6, 392], [174.6, 220, 261.6, 329.6], [130.8, 196, 246.9, 329.6], [196, 246.9, 293.7, 370]];
  function music(on) {
    clearInterval(musicTimer); musicTimer = null;
    if (!on || !ac()) return;
    let bar = 0;
    const play = () => {
      const c = CHORDS[bar++ % 4];
      c.forEach((f, i) => tone(f, i * 0.02, 2.6, 'triangle', 0.025));
      [0, 2, 1, 3, 2, 1].forEach((n, i) => tone(c[n] * 2, 0.45 * i, 0.35, 'sine', 0.02));
      for (let i = 0; i < 6; i++) tone(6000, 0.45 * i, 0.03, 'square', 0.004);
    };
    play(); musicTimer = setInterval(play, 2700);
  }

  /* ---------- progress helpers ---------- */
  const lvDone = id => S.stars[id] != null;
  const worldDone = w => w.levels.every(l => lvDone(l.id));
  const worldOpen = i => S.set.revision || i === 0 || worldDone(WORLDS[i - 1]);
  const testOpen = t => S.set.revision || (WORLDS.filter(w => w.id <= t.after).every(worldDone) && (t.needs || []).every(n => S.tests[n] != null));
  const starHtml = v => v == null ? '<span class="st muted">☆☆☆</span>' : v === 'silver' ? '<span class="st silver" title="Cleared by skipping">◆ silver</span>' : `<span class="st">${'★'.repeat(v)}${'☆'.repeat(3 - v)}</span>`;
  function hud(crumb) {
    $('#crumb').textContent = crumb || CFG.title;
    const n = Object.values(S.stars).reduce((a, v) => a + (v === 'silver' ? 0 : v), 0);
    $('#stars').textContent = '★ ' + n;
    $('#lensBtn').classList.toggle('on', lens || S.set.expert);
    document.body.classList.toggle('lens', lens || S.set.expert);
  }
  let redraw = () => {};
  function screen(crumb, html, handlers) {
    hud(crumb); app.innerHTML = html; app.onclick = null; window.scrollTo(0, 0);
    app.onclick = e => { const b = e.target.closest('[data-go]'); if (b && !b.disabled && handlers && handlers[b.dataset.go]) handlers[b.dataset.go](b); };
  }

  /* ---------- screens ---------- */
  function showTitle() {
    redraw = showTitle;
    const fresh = !S.placed && !Object.keys(S.stars).length;
    screen(CFG.title, `<div class="title">
      <h1>${esc(CFG.title)}</h1><p class="muted">${CFG.tagline}</p>
      <div class="castrow">${(CFG.titleCast || Object.keys(CFG.cast).slice(0, 6)).map(c => `<img src="assets/${c}.svg" alt="${nm(c)}">`).join('')}</div>
      <p>${CFG.intro.replace('{lens}', esc(CFG.lensName))}</p>
      <div class="row">${fresh ? `<button class="btn" data-go="new">I am new to this</button><button class="btn alt" data-go="place">I know some already: placement test</button>` : `<button class="btn" data-go="map">Continue</button>`}</div>
      ${CFG.demo ? `<p class="demo"><a href="${esc(CFG.demo.url)}" target="_blank" rel="noopener">▶ ${esc(CFG.demo.label)}</a></p>` : ''}
    </div>`, {
      new: () => { S.placed = true; save(); startLevel(0, 0); },
      place: placement, map: showMap
    });
  }

  function showMap() {
    redraw = showMap;
    let html = '<h2>' + CFG.mapName + '</h2><p class="muted">One world per lecture week. Finish a world to open the next, or use Test out inside a world to skip it.</p>';
    if (WORLDS.length && !ACTS[WORLDS[0].id]) html += '<div class="grid">';
    WORLDS.forEach((w, i) => {
      if (ACTS[w.id]) html += `${i ? '</div>' : ''}<div class="act">${ACTS[w.id]}</div><div class="grid">`;
      const open = worldOpen(i), done = w.levels.filter(l => lvDone(l.id)).length;
      html += `<button class="wcard ${open ? '' : 'locked'} ${done === w.levels.length ? 'done' : ''}" data-go="w" data-i="${i}" ${open ? '' : 'disabled'}>
        <img src="assets/${w.guide}.svg" alt=""><span><span class="num">World ${w.id} · ${w.week}</span><b>${w.name}</b><span class="muted">${w.topic}</span>
        <span class="bar"><i style="width:${100 * done / w.levels.length}%"></i></span></span></button>`;
      TESTS.filter(t => t.after === w.id).forEach(t => {
        const o = testOpen(t), sc = S.tests[t.id];
        html += `<button class="wcard test ${o ? '' : 'locked'}" data-go="t" data-id="${t.id}" ${o ? '' : 'disabled'}>
          <img src="assets/${t.icon || FIRST}.svg" alt=""><span><span class="num">Mock test</span><b>${t.name}</b><span class="muted">${t.mirrors}</span>${sc != null ? `<br><b>Best: ${sc}%</b>` : ''}</span></button>`;
      });
    });
    screen(CFG.mapName, html + '</div>', { w: b => showWorld(+b.dataset.i), t: b => runTest(TESTS.find(t => t.id === b.dataset.id)) });
  }

  function showWorld(wi) {
    redraw = () => showWorld(wi);
    const w = WORLDS[wi];
    const tags = { t: '', p: '<span class="tag p">practical</span>', b: '<span class="tag b">boss</span>' };
    screen(`World ${w.id} · ${w.name}`, `<div class="panel whead"><img src="assets/${w.guide}.svg" alt="${nm(w.guide)}"><div>
        <span class="phase">${w.unit} · ${w.week}</span><h2>${w.name}</h2><p>${tx(w.intro, 'bridge')}</p>
        <button class="btn alt sm" data-go="out">Test out of this world</button></div></div>
      ${w.levels.map((l, i) => { const open = S.set.revision || i === 0 || lvDone(w.levels[i - 1].id) || lvDone(l.id);
        return `<button class="lv ${open ? '' : 'locked'}" data-go="lv" data-i="${i}" ${open ? '' : 'disabled'}><span class="id">${l.id}</span><span class="nm">${l.n}</span>${tags[l.k] || ''}${starHtml(S.stars[l.id])}</button>`; }).join('')}`,
      { lv: b => startLevel(wi, +b.dataset.i), out: () => testOut(wi) });
  }

  /* ---------- quiz (checkpoints, test out, placement, mock tests) ---------- */
  function runQuiz(title, qs, layer, cb, note) {
    let i = 0, right = 0; const missed = [];
    const show = () => {
      const q = qs[i], opts = shuffle(q.a.map((t, k) => ({ t, k })));
      screen(title, `<div class="phase">Question ${i + 1} of ${qs.length}${note ? ' · ' + note : ''}</div><div class="panel"><p class="say">${tx(q.q, layer)}</p>
        <div class="opts">${opts.map(o => `<button class="opt" data-go="a" data-k="${o.k}">${tx(o.t, layer)}</button>`).join('')}</div><p class="why"></p></div>`, {
        a: b => {
          const ok = +b.dataset.k === q.c;
          app.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.k === q.c) x.classList.add('ok'); });
          if (ok) { right++; sfx('ok'); } else { b.classList.add('bad'); missed.push(q); sfx('bad'); }
          $('.why', app).innerHTML = `${ok ? 'Correct.' : 'Not quite.'} ${tx(q.w || '', layer)} <button class="btn sm" data-go="n">${i + 1 < qs.length ? 'Next' : 'Finish'}</button>`;
        },
        n: () => { if (++i < qs.length) show(); else cb(right, missed); }
      });
    };
    redraw = show; show();
  }
  // wid = world id. (q.w is the question's explanation, so the world id needs its own field.)
  const pool = ids => WORLDS.filter(w => ids.includes(w.id)).flatMap(w => w.levels.flatMap(l => l.qz.map(q => Object.assign({ lv: l.id, wid: w.id }, q))));
  const layerOf = () => 'technical';

  function testOut(wi) {
    const w = WORLDS[wi], qs = shuffle(pool([w.id])).slice(0, 5);
    runQuiz(`Test out · ${w.name}`, qs, 'technical', (right, missed) => {
      const pass = right >= 4;
      if (pass) { w.levels.forEach(l => { if (!lvDone(l.id)) S.stars[l.id] = 'silver'; }); save(); sfx('win'); }
      const gaps = [...new Set(missed.map(q => q.lv))];
      screen(w.name, `<div class="panel"><h2>${pass ? 'World cleared' : 'Not yet'}</h2><p>You scored ${right} of 5. ${pass ? 'Every level here now has a silver badge. Play them any time for stars.' : 'You need 4 of 5 to test out.'}</p>
        ${gaps.length ? `<p>Levels worth playing: <b>${gaps.join(', ')}</b></p>` : ''}<div class="row"><button class="btn" data-go="w">Back to world</button><button class="btn alt" data-go="m">${CFG.mapName}</button></div></div>`,
        { w: () => showWorld(wi), m: showMap });
    }, 'need 4 of 5');
  }

  function placement() {
    const qs = WORLDS.flatMap(w => shuffle(pool([w.id])).slice(0, w.id <= 5 ? 2 : 1));
    runQuiz('Placement test', qs, 'technical', (right, missed) => {
      const firstGap = missed.length ? Math.min(...missed.map(q => q.wid)) : WORLDS.length + 1;
      WORLDS.filter(w => w.id < firstGap).forEach(w => w.levels.forEach(l => { if (!lvDone(l.id)) S.stars[l.id] = 'silver'; }));
      S.placed = true; save();
      const start = WORLDS.find(w => w.id === firstGap);
      screen('Placement test', `<div class="panel"><h2>${right} of ${qs.length}</h2><p>${start ? `You start at <b>World ${start.id}: ${start.name}</b>. Earlier worlds have silver badges and stay open for revision.` : 'You cleared every world. Head for the mock tests.'}</p>
        <button class="btn" data-go="m">${CFG.mapName}</button></div>`, { m: showMap });
    });
  }

  function runTest(t) {
    const finish = (score, total, missed) => {
      const pct = Math.round(100 * score / total);
      S.tests[t.id] = Math.max(S.tests[t.id] || 0, pct); save(); sfx(pct >= 50 ? 'win' : 'bad');
      const by = {}; missed.forEach(q => { (by[q.wid] = by[q.wid] || new Set()).add(q.lv); });
      screen(t.name, `<div class="panel"><h2>${t.name}: ${pct}%</h2><p>${score} of ${total}. ${pct >= 80 ? 'Well done.' : pct >= 50 ? 'A pass, with gaps to close.' : 'Revise the levels below and try again.'}</p>
        ${Object.keys(by).length ? `<h3>Revise these levels</h3><ul>${Object.keys(by).map(w => `<li>World ${w}: ${[...by[w]].join(', ')}</li>`).join('')}</ul>` : ''}
        <button class="btn" data-go="m">${CFG.mapName}</button></div>`, { m: showMap });
    };
    if (!t.lab) { const qs = shuffle(pool(t.worlds)).slice(0, t.n); return runQuiz(t.name, qs, 'technical', (r, m) => finish(r, qs.length, m), 'no hints'); }
    const prac = WORLDS.flatMap(w => w.levels.filter(l => l.k === 'p').map(l => ({ l, w })));
    const tasks = shuffle(prac.flatMap(x => [].concat(x.l.pz).filter(p => p.type === 'term').flatMap(p => p.tasks.map(tk => Object.assign({ lv: x.l.id, wid: x.w.id }, tk))))).slice(0, 8);
    const qs = shuffle(prac.flatMap(x => x.l.qz.map(q => Object.assign({ lv: x.l.id, wid: x.w.id }, q)))).slice(0, 6);
    let pts = 0; const missed = [];
    screen(t.name, `<div class="phase">Part 1 of 2 · type the commands · two attempts each · no hints</div><div id="pz"></div><div class="fb"></div>`);
    PZ.term($('#pz'), { tasks }, { layer: 'technical', exam: true, miss: () => sfx('bad'), point: (ok, tk) => { if (ok) pts++; else missed.push(tk); },
      done: () => runQuiz(t.name, qs, 'technical', (r, m) => finish(pts + r, tasks.length + qs.length, missed.concat(m)), 'Part 2 of 2') });
  }

  /* ---------- level flow ---------- */
  let run = null;
  function startLevel(wi, li) {
    const w = WORLDS[wi], lv = w.levels[li];
    run = { wi, li, w, lv, mistakes: 0, hints: 0, skipped: false, stage: 0 };
    if (S.set.story && lv.brief && lv.brief.length) brief(0); else puzzle();
  }
  const crumb = () => `${run.lv.id} · ${run.lv.n}`;
  function brief(i) {
    redraw = () => brief(i);
    const { lv, w } = run, line = lv.brief[i], who = Array.isArray(line) ? line[0] : w.guide, text = Array.isArray(line) ? line[1] : line;
    if (who === 'beacon' && i === 0) sfx('bell');
    screen(crumb(), `<div class="phase">Briefing · ${i + 1} of ${lv.brief.length}</div><div class="dlg"><img src="assets/${who}.svg" alt=""><div class="bub"><div class="who">${nm(who)}</div><p>${tx(text, lv.L)}</p></div></div>
      <div class="row end" style="margin-top:14px"><button class="btn alt sm" data-go="know">I know this: go to the checkpoint</button><button class="btn alt sm" data-go="skip">Skip story</button><button class="btn" data-go="next" id="adv">${i + 1 < lv.brief.length ? 'Next' : 'Start'}</button></div>`,
      { next: () => (i + 1 < lv.brief.length ? brief(i + 1) : puzzle()), skip: puzzle, know: () => { run.skipped = true; checkpoint(); } });
  }

  function puzzle() {
    const { lv } = run, list = [].concat(lv.pz), p = list[run.stage], boss = lv.k === 'b';
    redraw = puzzle;
    screen(crumb(), `<div class="phase">${boss ? 'Boss' : 'Puzzle'}${list.length > 1 ? ` · part ${run.stage + 1} of ${list.length}` : ''}</div>
      ${boss ? `<div class="grid-meter"><img id="gl" src="assets/${CFG.rival}.svg" alt="${nm(CFG.rival)}"><span id="glt"></span></div>` : ''}
      <div class="panel"><p class="say">${tx(p.say || '', lv.L)}</p><div id="scn"></div><div id="pz"></div><div class="fb"></div></div>
      <div class="row end">${boss ? '' : '<button class="btn alt sm" data-go="hint">Hint</button>'}<button class="btn alt sm" data-go="know">I know this: go to the checkpoint</button><button class="btn" data-go="cont" id="cont" hidden>Continue</button></div>`, {
      hint: () => { run.hints++; const h = (api && api.hint && api.hint()) || p.hint || 'Read the prompt again, one piece at a time.'; fb(tx('Hint: ' + h, lv.L), ''); },
      know: () => { run.skipped = true; checkpoint(); },
      cont: () => { if (++run.stage < list.length) puzzle(); else { run.stage = 0; reveal(); } }
    });
    const fb = (html, cls) => { const f = $('.fb', app); f.className = 'fb ' + (cls || ''); f.innerHTML = html; };
    const meter = () => { if (!boss) return; const left = 5 - run.bossMiss; $('#glt').textContent = `${nm(CFG.rival)} grows with every mistake. ${left} left.`; $('#gl').style.transform = `scale(${1 + run.bossMiss * 0.22})`; };
    if (boss && run.stage === 0 && run.bossMiss == null) run.bossMiss = 0;
    meter();
    const sc = ((window.KT_SCENES || {})[lv.id] || [])[run.stage];
    const drawScene = n => { if (sc && window.KT_SCENE) $('#scn').innerHTML = window.KT_SCENE(sc, n); };
    drawScene(sc && sc.done ? 99 : 0);
    const api = PZ[p.type]($('#pz'), p, {
      layer: lv.L, step: n => { if ($('#scn')) drawScene(n); },
      miss: msg => {
        run.mistakes++; sfx('bad'); fb(msg || 'Not quite. Try again.', 'bad');
        const el = $('#pz'); el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
        if (boss && ++run.bossMiss >= 5) {
          screen(crumb(), `<div class="panel"><h2>${nm(CFG.rival)} wins this round</h2><p>Five mistakes ends the boss. Take a breath and try again.</p><button class="btn" data-go="r">Try again</button> <button class="btn alt" data-go="w">Back to world</button></div>`,
            { r: () => startLevel(run.wi, run.li), w: () => showWorld(run.wi) });
        } else meter();
      },
      done: html => { sfx('ok'); fb(html || 'Solved.', 'ok'); $('#cont').hidden = false; $('#cont').focus(); }
    });
  }

  function reveal() {
    const { lv } = run; redraw = reveal;
    if (!lv.rv || !lv.rv.length) return checkpoint();
    screen(crumb(), `<div class="phase">Reveal · the real terms</div><div class="rv">${lv.rv.map(r => `<div class="panel"><div class="t">${r[0]}</div><div class="r">${r[1]}</div><div>${r[2]}</div></div>`).join('')}</div>
      <div class="row end" style="margin-top:14px"><button class="btn" data-go="n">To the checkpoint</button></div>`, { n: checkpoint });
  }

  function checkpoint() {
    const { lv } = run;
    runQuiz(crumb(), shuffle(lv.qz).slice(0, 3), lv.k === 'b' || lv.k === 'p' ? 'technical' : lv.L === 'layman' ? 'bridge' : 'technical', right => {
      if (right < 2) return screen(crumb(), `<div class="panel"><h2>Checkpoint not passed</h2><p>${right} of 3. You need 2. ${run.skipped ? 'Try the puzzle first, it teaches exactly this.' : 'Replay the puzzle with a hint, then try again.'}</p>
        <div class="row"><button class="btn" data-go="p">Play the puzzle</button><button class="btn alt" data-go="q">Retry the checkpoint</button></div></div>`,
        { p: () => { const s = run.skipped; startLevel(run.wi, run.li); if (!s) run.hints = 1; }, q: checkpoint });
      reward(right);
    }, 'checkpoint · need 2 of 3');
  }

  function reward(right) {
    const { lv, w, wi, li } = run;
    let v = run.skipped ? 'silver' : 1 + (run.mistakes <= 1 && right === 3 ? 1 : 0) + (run.hints === 0 ? 1 : 0);
    const old = S.stars[lv.id];
    if (old == null || old === 'silver' || (v !== 'silver' && v > old)) S.stars[lv.id] = (v === 'silver' && old != null) ? old : v;
    save(); sfx('win');
    const next = w.levels[li + 1], last = !next, nw = WORLDS[wi + 1];
    screen(crumb(), `<div class="panel"><div class="bigstars ${v === 'silver' ? 'silver' : ''}">${v === 'silver' ? '◆' : '★'.repeat(v) + '☆'.repeat(3 - v)}</div>
      <h2 style="text-align:center">${v === 'silver' ? 'Silver badge' : ['', 'Done', 'Well run', 'Perfectly run'][v]}</h2>
      ${v === 'silver' ? '<p>Cleared by skipping the puzzle. Play it in full to earn stars.</p>' : `<p class="muted" style="text-align:center">Stars: finished${run.mistakes <= 1 && right === 3 ? ' · efficient' : ''}${run.hints === 0 ? ' · no hints' : ''}. Mistakes: ${run.mistakes}. Hints: ${run.hints}.</p>`}
      ${last ? `<p><b>${w.name} is rebuilt.</b> ${w.outro || ''}</p>` : ''}
      <div class="row end">${next ? `<button class="btn" data-go="n">Next level</button>` : nw ? `<button class="btn" data-go="m">${CFG.mapName}</button>` : `<button class="btn" data-go="m">${CFG.mapName}</button>`}<button class="btn alt" data-go="w">World</button><button class="btn alt" data-go="r">Replay</button></div></div>`,
      { n: () => startLevel(wi, li + 1), m: showMap, w: () => showWorld(wi), r: () => startLevel(wi, li) });
  }

  /* ---------- simulator: chmod on a nine-lever frame (reference implementation, also used by the play-through) ---------- */
  // bits: 9 booleans in the order u r,w,x  g r,w,x  o r,w,x. expr: octal ("754", "0600") or symbolic ("go-w,a+x", "a=r", "ug+x").
  function chmod(bits, expr) {
    bits = bits.slice();
    if (/^[0-7]{3,4}$/.test(expr)) {
      const d = expr.slice(-3).split('').map(Number);
      return d.flatMap(n => [!!(n & 4), !!(n & 2), !!(n & 1)]);
    }
    expr.split(',').forEach(part => {
      const m = part.match(/^([ugoa]*)([-+=])([rwxs]*)$/); if (!m) throw new Error('bad chmod expression: ' + part);
      const who = (m[1] || 'a').replace('a', 'ugo'), perms = m[3].replace('s', '');
      [...new Set(who)].forEach(w => {
        const base = 'ugo'.indexOf(w) * 3;
        ['r', 'w', 'x'].forEach((r, k) => {
          const has = perms.includes(r);
          if (m[2] === '+' && has) bits[base + k] = true;
          if (m[2] === '-' && has) bits[base + k] = false;
          if (m[2] === '=') bits[base + k] = has;
        });
      });
    });
    return bits;
  }
  const fromStr = s => s.replace(/^[-dlcbps]/, '').slice(0, 9).split('').map(ch => ch !== '-');
  const toStr = b => b.map((on, i) => on ? 'rwx'[i % 3] : '-').join('');
  const toOct = b => [0, 1, 2].map(g => (b[g * 3] ? 4 : 0) + (b[g * 3 + 1] ? 2 : 0) + (b[g * 3 + 2] ? 1 : 0)).join('');
  window.KT_SIM = { chmod, fromStr, toStr, toOct };

  /* ---------- puzzle types ---------- */
  const PZ = {};
  PZ.match = (el, p, c) => {
    const R = shuffle(p.pairs.map((x, i) => ({ t: x[1], i }))); let sel = null, left = p.pairs.length;
    el.innerHTML = `<div class="cols"><div class="col">${p.pairs.map((x, i) => `<button class="chip" data-l="${i}">${tx(x[0], c.layer)}</button>`).join('')}</div><div class="col">${R.map(o => `<button class="chip alt" data-r="${o.i}">${tx(o.t, c.layer)}</button>`).join('')}</div></div>`;
    el.onclick = e => {
      const b = e.target.closest('button'); if (!b || b.disabled) return;
      if (b.dataset.l != null) { el.querySelectorAll('[data-l]').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b; }
      else if (b.dataset.r != null && sel) {
        if (b.dataset.r === sel.dataset.l) { b.disabled = sel.disabled = true; b.classList.add('ok'); sel.classList.add('ok'); sel.classList.remove('sel'); sel = null; sfx('key'); left--; if (c.step) c.step(p.pairs.length - left); if (left === 0) c.done(); }
        else c.miss('Not a match. Try another.');
      }
    };
  };
  PZ.order = (el, p, c) => {
    const items = shuffle(p.items.map((t, i) => ({ t, i }))); let n = 0;
    el.innerHTML = `<ol class="seq"></ol><div class="pool">${items.map(o => `<button class="chip" data-i="${o.i}">${tx(o.t, c.layer)}</button>`).join('')}</div>`;
    el.onclick = e => {
      const b = e.target.closest('button[data-i]'); if (!b || b.disabled) return;
      if (+b.dataset.i === n) { b.disabled = true; $('.seq', el).insertAdjacentHTML('beforeend', `<li>${b.innerHTML}</li>`); n++; sfx('key'); if (c.step) c.step(n); if (n === p.items.length) c.done(); }
      else c.miss('That one does not come next.');
    };
  };
  PZ.pick = (el, p, c) => {
    let i = 0;
    const show = () => { const s = p.steps[i], opts = shuffle(s.o.map((t, k) => ({ t, k })));
      el.innerHTML = `${p.steps.length > 1 ? `<p class="count">Step ${i + 1} of ${p.steps.length}</p>` : ''}<p class="scn">${tx(s.t, c.layer)}</p><div class="opts">${opts.map(o => `<button class="opt" data-k="${o.k}">${tx(o.t, c.layer)}</button>`).join('')}</div><p class="why"></p>`; };
    show();
    el.onclick = e => {
      const b = e.target.closest('button'); if (!b || b.disabled) return;
      if (b.dataset.k != null) {
        if (+b.dataset.k === p.steps[i].c) {
          el.querySelectorAll('.opt').forEach(x => { x.disabled = true; }); b.classList.add('ok'); sfx('key'); if (c.step) c.step(i + 1);
          if (i + 1 < p.steps.length) $('.why', el).innerHTML = tx(p.steps[i].w || 'Correct.', c.layer) + ' <button class="btn sm" data-next="1">Next</button>';
          else c.done(tx(p.steps[i].w || 'Solved.', c.layer));
        } else { b.disabled = true; b.classList.add('bad'); c.miss('Not that one.'); }
      } else if (b.dataset.next) { i++; show(); }
    };
  };
  PZ.sort = (el, p, c) => {
    const items = shuffle(p.items); let i = 0;
    const show = () => { el.innerHTML = `<p class="count">${i + 1} of ${items.length}</p><div class="card big">${tx(items[i][0], c.layer)}</div><div class="opts row" style="flex-wrap:wrap">${p.bins.map((b, k) => `<button class="opt" data-k="${k}">${tx(b, c.layer)}</button>`).join('')}</div>`; };
    show();
    el.onclick = e => {
      const b = e.target.closest('button[data-k]'); if (!b) return;
      if (+b.dataset.k === items[i][1]) { sfx('key'); i++; if (c.step) c.step(i); if (i < items.length) show(); else { el.querySelectorAll('button').forEach(x => { x.disabled = true; }); c.done(); } }
      else { b.classList.add('bad'); c.miss('That belongs in a different group.'); }
    };
  };
  PZ.calc = (el, p, c) => {
    el.innerHTML = (p.table ? `<pre class="tbl">${esc(p.table)}</pre>` : '') + p.fields.map((f, i) => `<label class="fld"><span>${tx(f.l, c.layer)}</span><input inputmode="decimal" data-i="${i}"></label>`).join('') + '<button class="btn" data-check="1">Check</button>';
    el.onclick = e => {
      if (!e.target.closest('[data-check]')) return; let bad = 0;
      el.querySelectorAll('input').forEach(inp => { const f = p.fields[+inp.dataset.i], v = parseFloat(inp.value), ok = !isNaN(v) && Math.abs(v - f.a) <= (f.tol || 0.011); inp.classList.toggle('ok', ok); inp.classList.toggle('bad', !ok); if (!ok) bad++; });
      if (bad) c.miss(`${bad} answer${bad > 1 ? 's are' : ' is'} off. Check the red box${bad > 1 ? 'es' : ''}.`);
      else { el.querySelectorAll('input,button').forEach(x => { x.disabled = true; }); c.done(p.after ? tx(p.after, c.layer) : ''); }
    };
  };
  /* perm: each task gives a start string and a chmod expression; the player sets the nine levers to the result. */
  PZ.perm = (el, p, c) => {
    let i = 0, bits = [];
    const who = ['[[Crew|Owner (u)]]', '[[Depot team|Group (g)]]', '[[Everyone else|Other (o)]]'], what = ['[[look|r]]', '[[change|w]]', '[[run|x]]'];
    const target = () => chmod(fromStr(p.tasks[i].from), p.tasks[i].cmd);
    const show = () => {
      const t = p.tasks[i];
      el.innerHTML = `<p class="count">Pass ${i + 1} of ${p.tasks.length}</p><div class="card big"><code>${esc(t.from)}</code> ${t.file ? esc(t.file) : 'file'}<br>then <code>chmod ${esc(t.cmd)} ${esc(t.file || 'file')}</code></div>
        <p>${tx(t.ask || 'Set the levers to the permissions the file has after this command.', c.layer)}</p>
        <div class="levers">${who.map((w, g) => `<div class="lrow"><span class="lwho">${tx(w, c.layer)}</span>${what.map((x, k) => { const n = g * 3 + k; return `<button class="lever ${bits[n] ? 'on' : ''}" data-b="${n}" aria-pressed="${!!bits[n]}"><i></i><span>${tx(x, c.layer)}</span><small class="lst"></small></button>`; }).join('')}</div>`).join('')}</div>
        <p class="pread">Now reads <code>-${toStr(bits)}</code> · octal <code>${toOct(bits)}</code></p><button class="btn" data-set="1">Set the levers</button>`;
    };
    const start = () => { bits = fromStr(p.tasks[i].from); show(); };
    start();
    el.onclick = e => {
      const b = e.target.closest('[data-b],[data-set]'); if (!b || b.disabled) return;
      if (b.dataset.b != null) { bits[+b.dataset.b] = !bits[+b.dataset.b]; sfx('key'); show(); return; }
      const want = target(), wrong = want.map((v, n) => v !== bits[n]).filter(Boolean).length;
      if (wrong) return c.miss(`${wrong} lever${wrong > 1 ? 's are' : ' is'} wrong. ${/^[0-7]+$/.test(p.tasks[i].cmd) ? 'Octal sets every lever: 4 is r, 2 is w, 1 is x.' : 'Symbolic mode only touches the letters named; = sets them exactly.'}`);
      sfx('ok'); if (c.step) c.step(i + 1);
      if (++i < p.tasks.length) start();
      else { el.querySelectorAll('button').forEach(x => { x.disabled = true; }); c.done(tx(`Every pass issued. Last one: <code>-${toStr(want)}</code>, octal <code>${toOct(want)}</code>.`, c.layer)); }
    };
    return { hint: () => { const w = target(); return `the result reads <code>-${toStr(w)}</code>`; } };
  };

  PZ.term = (el, p, c) => {
    let i = 0, tries = 0;
    el.innerHTML = `<div class="task"></div><div class="term"><div class="out"></div><div class="line"><span class="ps"></span><input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="terminal input"></div></div>`;
    const out = $('.out', el), inp = $('input', el);
    const print = (t, cls) => { const d = document.createElement('div'); d.className = cls || ''; d.textContent = t; out.appendChild(d); out.scrollTop = 1e9; };
    const show = () => { const t = p.tasks[i]; $('.task', el).innerHTML = `<b>Task ${i + 1} of ${p.tasks.length}${t.predict ? ' · predict the output' : ''}</b><p>${tx(t.ask, c.layer)}</p>`; $('.ps', el).textContent = t.predict ? 'it prints>' : CFG.prompt; inp.focus(); };
    const next = () => { tries = 0; if (++i < p.tasks.length) show(); else { inp.disabled = true; $('.task', el).innerHTML = '<b>All tasks done.</b>'; c.done(); } };
    inp.onkeydown = e => {
      if (e.key !== 'Enter') return; e.stopPropagation();
      const v = inp.value.trim().replace(/\s+/g, ' '); if (!v) return; inp.value = '';
      const t = p.tasks[i]; print((t.predict ? 'it prints> ' : '$ ') + v, 'cmd');
      if (t.accept.some(r => new RegExp('^(?:' + r + ')$').test(v))) { if (t.out) print(t.out); if (c.point) c.point(true, t); sfx('key'); next(); }
      else {
        tries++; c.miss(' ');
        print(t.predict ? CFG.consoleName + ': that is not what it prints.' : CFG.consoleName + ': I ran exactly what you typed, but that is not what the task asked for.', 'err');
        if (c.exam && tries >= 2) { print(CFG.consoleName + ': moving on. One answer: ' + t.sol, 'hint'); c.point(false, t); next(); }
        else if (!c.exam && tries >= 3) print(CFG.consoleName + ': one way to do it: ' + t.sol, 'hint');
      }
    };
    show();
    return { hint: () => 'one way to do it is <code>' + esc(p.tasks[Math.min(i, p.tasks.length - 1)].sol) + '</code>' };
  };
  window.KT_PZ = PZ;

  /* ---------- settings ---------- */
  function settings() {
    const m = $('#modal'), row = (k, label, note) => `<label class="setrow"><span><b>${label}</b><br><span class="muted">${note}</span></span><input type="checkbox" data-k="${k}" ${S.set[k] ? 'checked' : ''}></label>`;
    m.hidden = false;
    m.innerHTML = `<div class="panel"><h2>Settings</h2>
      ${row('expert', 'Expert mode', CFG.lensName + ' stays on: real terms from the start.')}${row('story', 'Story', 'Show the briefing before each puzzle.')}
      ${row('music', 'Music', 'A quiet lo-fi loop.')}${row('sfx', 'Sound effects', 'Clicks, bells and stars.')}
      ${row('revision', 'Revision mode', 'Unlock every world and mock test.')}
      <div class="row" style="margin-top:14px"><button class="btn alt sm" data-x="place">Placement test</button><button class="btn warn sm" data-x="reset">Reset progress</button><span style="flex:1"></span><button class="btn" data-x="close">Close</button></div></div>`;
    m.onchange = e => { const k = e.target.dataset.k; if (!k) return; S.set[k] = e.target.checked; save(); if (k === 'music') music(S.set.music); hud($('#crumb').textContent); };
    m.onclick = e => {
      const x = e.target.dataset.x; if (e.target === m || x === 'close') { m.hidden = true; redraw(); }
      else if (x === 'place') { m.hidden = true; placement(); }
      else if (x === 'reset') {
        if (e.target.dataset.sure) { S.stars = {}; S.tests = {}; S.placed = false; save(); m.hidden = true; showTitle(); }
        else { e.target.dataset.sure = '1'; e.target.textContent = 'Press again to erase everything'; }
      }
    };
  }

  /* ---------- global controls ---------- */
  $('#top').onclick = e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'map') showMap();
    else if (a.dataset.act === 'settings') settings();
    else if (a.dataset.act === 'lens') { lens = !lens; hud($('#crumb').textContent); }
  };
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'l' || e.key === 'L') $('#lensBtn').click();
    const act = document.activeElement;
    if ((e.key === ' ' || e.key === 'Enter') && act && act.getAttribute('role') === 'button') { e.preventDefault(); act.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
    if (e.key === ' ' || e.key === 'Enter') { const b = $('#adv') || ($('#cont') && !$('#cont').hidden && $('#cont')) || $('[data-go="n"]'); if (b && document.activeElement.tagName !== 'BUTTON') { e.preventDefault(); b.click(); } }
  });
  document.addEventListener('click', () => { if (S.set.music && !musicTimer) music(true); }, { once: false });
  window.KT = { S, WORLDS, startLevel, showMap, save };
  $('#lensBtn').textContent = CFG.lensName; $('#lensBtn').title = CFG.lensTip; document.title = CFG.title;
  showTitle();
})();
