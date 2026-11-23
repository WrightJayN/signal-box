/* Railway scenes drawn as inline SVG. KT_SCENES maps a level id to one scene per puzzle part (null = none).
   KT_SCENE(scene, step) returns the markup; step counts answered steps, so the scene advances as the player answers.
   The Schematic (real terms) view hides these scenes. */
window.KT_SCENES = {
  '3.4': [{ kind: 'flow', title: 'Tuning the service timetable', stops: ['Plan', 'Do', 'Check', 'Act'] }],
  '4.3': [{ kind: 'flow', title: 'A log travels through the office', stops: ['Collection', 'Storage', 'Search', 'Correlation', 'Output'] }, null],
  '5.1': [{ kind: 'snmp', pdus: [] }],
  '5.4': [{ kind: 'snmp', pdus: [['GET', 1], ['RESPONSE', -1], ['GETNEXT', 1], ['GETBULK', 1], ['SET', 1], ['TRAP', -1], ['INFORM', -1]] }, null],
  '6.3': [{ kind: 'flow', title: 'Signing on at the console', stops: ['login:', 'Password:', 'login', '/etc/passwd', '/etc/profile', '.profile', '$'] }, null],
  '9.1': [{ kind: 'yard' }],
  '10.5': [null, { kind: 'flow', title: 'The timer script, stop by stop', stops: ['trap 14', 'SetTimer', '$PROG &', 'wait', 'UnsetTimer'] }]
};
window.KT_SCENE = (sc, step) => {
  if (!sc) return '';
  const INK = '#1F2A36', TEAL = '#1F7A8C', AMBER = '#E9A23B', CORAL = '#D2483B', GREEN = '#4C9F38', BLUE = '#2F4F8F', SAND = '#E3DCCB';
  const SK = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 700}" fill="${o.f || INK}">${s}</text>`;
  const wrap = (h, inner) => `<div class="scene"><svg viewBox="0 0 760 ${h}" role="img" aria-label="Railway scene"><rect width="760" height="${h}" fill="#F2EFE6"/>${inner}</svg></div>`;
  const rails = y => `<path d="M20 ${y}H740M20 ${y + 10}H740" stroke="${INK}" stroke-width="3"/>` + Array.from({ length: 30 }, (_, i) => `<rect x="${24 + i * 25}" y="${y - 3}" width="8" height="16" fill="#C08A2B" opacity=".5"/>`).join('');
  const signal = (x, y, on) => `<rect x="${x - 3}" y="${y}" width="6" height="40" fill="${INK}"/><rect x="${x - 10}" y="${y - 26}" width="20" height="30" rx="5" fill="${INK}"/><circle cx="${x}" cy="${y - 11}" r="7" fill="${on ? GREEN : CORAL}"/>`;
  const train = (x, y, col, lbl) => `<g><rect x="${x}" y="${y - 30}" width="70" height="30" rx="7" fill="${col}" ${SK}/><rect x="${x + 50}" y="${y - 44}" width="18" height="16" rx="3" fill="${col}" ${SK}/><circle cx="${x + 16}" cy="${y + 2}" r="7" fill="${INK}"/><circle cx="${x + 54}" cy="${y + 2}" r="7" fill="${INK}"/>${lbl ? t(x + 32, y - 10, lbl, { s: 12, f: '#fff' }) : ''}</g>`;

  if (sc.kind === 'flow') {
    const n = sc.stops.length, gap = 590 / (n - 1), pos = Math.min(step, n - 1);
    let s = t(380, 22, sc.title, { s: 15, w: 800 }) + rails(150);
    sc.stops.forEach((name, i) => { const x = 110 + i * gap, done = i < step;
      s += `<rect x="${x - 36}" y="34" width="72" height="32" rx="8" fill="${done ? GREEN : '#fff'}" ${SK}/>` + t(x, 55, name, { s: name.length > 9 ? 10.5 : 12.5, f: done ? '#fff' : INK }) + signal(x, 104, done); });
    s += train(110 + pos * gap - 88, 148, step >= n ? GREEN : BLUE, step >= n ? 'done' : '');
    return wrap(180, s);
  }
  if (sc.kind === 'snmp') {
    const boxes = [['Router', 520, 70], ['Switch', 640, 120], ['Server', 520, 170]];
    let s = `<rect x="40" y="60" width="150" height="110" rx="8" fill="#fff" ${SK}/><path d="M30 60 L115 18 L200 60Z" fill="${BLUE}" ${SK}/>` + t(115, 52, 'SIGNAL BOX', { s: 12, f: '#fff', w: 800 }) + t(115, 104, 'asks on 161', { s: 12 }) + t(115, 124, 'hears alarms on 162', { s: 12 });
    boxes.forEach(([name, x, y], k) => {
      s += `<path d="M190 ${115} C 330 ${115}, 380 ${y}, ${x - 30} ${y}" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/>`;
      s += `<rect x="${x - 30}" y="${y - 24}" width="60" height="48" rx="6" fill="${k < step || sc.pdus.length ? AMBER : SAND}" ${SK}/>` + t(x, y + 5, name, { s: 12 });
    });
    if (sc.pdus.length) {
      const cur = sc.pdus[Math.min(step, sc.pdus.length) - 1];
      if (cur) { const [name, dir] = cur, x = dir > 0 ? 330 : 300;
        s += `<g><rect x="${x - 50}" y="96" width="100" height="36" rx="6" fill="${dir > 0 ? TEAL : CORAL}" ${SK}/>` + t(x, 119, name, { s: 13, f: '#fff', w: 800 }) + `<path d="M${x - 60 * dir} 146 H${x + 60 * dir}" ${SK}/><path d="M${x + 60 * dir} 146 l${-10 * dir} -7 v14z" fill="${INK}"/></g>` + t(x, 172, dir > 0 ? 'box asks the trackside' : 'trackside tells the box', { s: 12 });
      } else s += t(330, 120, 'Messages appear here as you name them.', { s: 13 });
    } else s += t(330, 30, `${Math.min(step, 4)} of 4 basics answered`, { s: 13 });
    return wrap(200, s);
  }
  if (sc.kind === 'yard') {
    const toSiding = step >= 1;
    let s = `<rect x="30" y="40" width="300" height="24" fill="${SAND}" ${SK}/>` + t(180, 57, 'MAIN PLATFORM (foreground)', { s: 12 }) + rails(100);
    s += `<path d="M380 110 Q470 110 520 160 H740" fill="none" stroke="${INK}" stroke-width="3"/><path d="M380 120 Q465 120 515 170 H740" fill="none" stroke="${INK}" stroke-width="3"/>` + t(640, 195, 'SIDING (background, &)', { s: 12 });
    s += toSiding ? train(600, 160, AMBER, step >= 3 ? 'held' : 'ls &') + train(80, 98, BLUE, step >= 4 ? 'bg' : 'console') : train(120, 98, AMBER, 'ls');
    s += t(740, 30, step >= 4 ? 'Ctrl+Z, then bg' : step >= 2 ? '[1] 20757' : '', { a: 'end', s: 14, w: 800 });
    return wrap(210, s);
  }
  return '';
};
