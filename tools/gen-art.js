// Draws the Signal Box cast as SVG portraits (250 x 340) into assets/.
// Usage: node tools/gen-art.js
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'assets');
const C = { bg: '#F2EFE6', sand: '#E3DCCB', ink: '#1F2A36', teal: '#1F7A8C', amber: '#E9A23B', coral: '#D2483B', green: '#4C9F38', blue: '#2F4F8F', white: '#FFFFFF', grey: '#9AA3B2', brass: '#C08A2B' };
const S = `stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const s3 = `stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;
const G = 296, X = 125;

const frame = inner => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 340"><rect width="250" height="340" fill="${C.bg}"/>
<rect y="${G}" width="250" height="44" fill="${C.sand}"/><path d="M0 ${G + 18}H250M0 ${G + 32}H250" stroke="${C.ink}" stroke-width="2" opacity=".35"/>
${[20, 60, 100, 140, 180, 220].map(x => `<rect x="${x}" y="${G + 12}" width="14" height="26" fill="${C.brass}" opacity=".35"/>`).join('')}
<line x1="0" x2="250" y1="${G}" y2="${G}" stroke="${C.ink}" stroke-width="4"/>${inner}</svg>`;

// A simple figure: legs, rounded body, round head, eyes, smile. Returns the head centre for props.
function person(body, skin, o = {}) {
  const by = 150, hy = 108;
  return { hy, by, svg: `<ellipse cx="${X}" cy="${G + 8}" rx="62" ry="8" fill="${C.ink}" opacity=".12"/>
  <rect x="88" y="262" width="26" height="34" rx="8" fill="${C.ink}"/><rect x="136" y="262" width="26" height="34" rx="8" fill="${C.ink}"/>
  <rect x="70" y="${by}" width="110" height="130" rx="40" fill="${body}" ${S}/>
  ${o.hair ? o.hair : ''}<circle cx="${X}" cy="${hy}" r="48" fill="${skin}" ${S}/>${o.hairTop || ''}
  <circle cx="${X - 17}" cy="${hy - 2}" r="6" fill="${C.ink}"/><circle cx="${X + 17}" cy="${hy - 2}" r="6" fill="${C.ink}"/>
  <path d="M${X - 13} ${hy + 18} Q${X} ${hy + 29} ${X + 13} ${hy + 18}" fill="none" ${S}/>` };
}

const art = {};

// Ada, the Controller: blue livery, headset with a microphone.
{ const p = person(C.blue, '#8D5A3B', { hair: `<circle cx="${X}" cy="96" r="54" fill="${C.ink}"/>` });
  art.ada = frame(p.svg + `<path d="M${X - 50} ${p.hy - 4} A50 50 0 0 1 ${X + 50} ${p.hy - 4}" fill="none" stroke="${C.ink}" stroke-width="9"/>
  <rect x="${X - 62}" y="${p.hy - 16}" width="18" height="30" rx="7" fill="${C.amber}" ${s3}/><rect x="${X + 44}" y="${p.hy - 16}" width="18" height="30" rx="7" fill="${C.amber}" ${s3}/>
  <path d="M${X - 53} ${p.hy + 12} Q${X - 50} ${p.hy + 40} ${X - 22} ${p.hy + 38}" fill="none" ${s3}/><circle cx="${X - 20}" cy="${p.hy + 38}" r="6" fill="${C.ink}"/>
  <rect x="96" y="172" width="58" height="14" rx="4" fill="${C.amber}" ${s3}/>`); }

// Gauge: amber overalls, cap, big spanner.
{ const p = person(C.amber, '#F1D0AE');
  art.gauge = frame(p.svg + `<path d="M${X - 48} ${p.hy - 14} A48 48 0 0 1 ${X + 48} ${p.hy - 14}Z" fill="${C.teal}" ${S}/><path d="M${X + 20} ${p.hy - 16} H${X + 78} Q${X + 70} ${p.hy - 2} ${X + 36} ${p.hy - 6}Z" fill="${C.teal}" ${S}/>
  <rect x="98" y="${p.by + 10}" width="54" height="60" rx="8" fill="${C.teal}" ${s3}/>
  <g transform="translate(196 200) rotate(-30)"><rect x="-8" y="-6" width="16" height="78" rx="6" fill="${C.grey}" ${s3}/><path d="M-20 -30 A22 22 0 1 0 20 -30 L10 -30 L10 -14 L-10 -14 L-10 -30 Z" fill="${C.grey}" ${s3}/></g>`); }

// Ledger: green waistcoat, round glasses, open logbook.
{ const p = person(C.green, '#C98B5E', { hairTop: `<path d="M${X - 46} ${108 - 14} Q${X} ${108 - 70} ${X + 46} ${108 - 14} Q${X} ${108 - 38} ${X - 46} ${108 - 14}Z" fill="${C.grey}" ${s3}/>` });
  art.ledger = frame(p.svg + `<circle cx="${X - 17}" cy="${p.hy - 2}" r="13" fill="none" ${s3}/><circle cx="${X + 17}" cy="${p.hy - 2}" r="13" fill="none" ${s3}/><path d="M${X - 4} ${p.hy - 2}H${X + 4}" ${s3}/>
  <g transform="translate(${X} 214)"><path d="M-62 -26 Q-30 -36 0 -22 Q30 -36 62 -26 V30 Q30 20 0 34 Q-30 20 -62 30Z" fill="${C.white}" ${S}/><path d="M0 -22V34" ${s3}/>
  ${[-10, 0, 10].map(y => `<path d="M-50 ${y} H-12 M12 ${y} H50" stroke="${C.ink}" stroke-width="2.5" opacity=".6"/>`).join('')}</g>`); }

// Beacon: teal coat, railway lantern held up, showing green.
{ const p = person(C.teal, '#F6D2B0', { hair: `<path d="M${X - 52} 120 Q${X - 60} 60 ${X} 52 Q${X + 60} 60 ${X + 52} 120Z" fill="${C.coral}" ${s3}/>` });
  art.beacon = frame(p.svg + `<g transform="translate(200 176)"><path d="M-12 -46 Q0 -62 12 -46" fill="none" ${s3}/><rect x="-22" y="-46" width="44" height="12" rx="4" fill="${C.ink}"/>
  <rect x="-18" y="-34" width="36" height="46" rx="8" fill="${C.green}" ${S}/><circle cx="0" cy="-11" r="9" fill="${C.white}" opacity=".75"/><rect x="-22" y="12" width="44" height="10" rx="4" fill="${C.ink}"/></g>
  <path d="M175 200 L196 188" ${S}/>`); }

// Shunt: the console. A friendly terminal on legs with a cursor face.
{ art.shunt = frame(`<ellipse cx="${X}" cy="${G + 8}" rx="62" ry="8" fill="${C.ink}" opacity=".12"/>
  <rect x="90" y="250" width="22" height="46" rx="8" fill="${C.ink}"/><rect x="138" y="250" width="22" height="46" rx="8" fill="${C.ink}"/>
  <rect x="40" y="70" width="170" height="190" rx="26" fill="${C.blue}" ${S}/><rect x="58" y="88" width="134" height="110" rx="14" fill="#121820" ${S}/>
  <text x="70" y="128" font-family="Menlo, Consolas, monospace" font-size="24" font-weight="700" fill="${C.green}">$_</text>
  <circle cx="102" cy="160" r="7" fill="${C.green}"/><circle cx="148" cy="160" r="7" fill="${C.green}"/><path d="M110 178 Q125 188 140 178" fill="none" stroke="${C.green}" stroke-width="4" stroke-linecap="round"/>
  ${[0, 1, 2, 3, 4].map(k => `<rect x="${64 + k * 25}" y="214" width="20" height="14" rx="3" fill="${C.white}" ${s3}/>`).join('')}<rect x="88" y="234" width="74" height="12" rx="3" fill="${C.white}" ${s3}/>`); }

// Tally: violet-blue jacket, big ring of keys.
{ const p = person('#6C4AA0', '#F1D0AE', { hair: `<path d="M${X - 52} 136 Q${X - 62} 56 ${X} 54 Q${X + 62} 56 ${X + 52} 136 L${X + 40} 136 L${X - 40} 136Z" fill="${C.brass}" ${s3}/>` });
  art.tally = frame(p.svg + `<g transform="translate(66 214)"><circle r="22" fill="none" stroke="${C.ink}" stroke-width="9"/><circle r="22" fill="none" stroke="${C.amber}" stroke-width="4"/>
  ${[[-14, 26, C.amber], [6, 30, C.green], [22, 18, C.coral]].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><circle r="8" fill="${c}" ${s3}/><rect x="-3" y="6" width="6" height="26" fill="${c}" ${s3}/><rect x="3" y="22" width="8" height="5" fill="${c}" ${s3}/></g>`).join('')}</g>`); }

// Pip: the dispatcher, red cap, whistle and a green flag.
{ const p = person(C.coral, '#8D5A3B');
  art.pip = frame(p.svg + `<path d="M${X - 48} ${p.hy - 16} A48 48 0 0 1 ${X + 48} ${p.hy - 16}Z" fill="${C.coral}" ${S}/><rect x="${X - 56}" y="${p.hy - 20}" width="112" height="12" rx="6" fill="${C.ink}"/>
  <rect x="${X - 10}" y="${p.hy + 28}" width="24" height="12" rx="5" fill="${C.grey}" ${s3}/>
  <path d="M196 120 V250" ${S}/><path d="M196 122 H236 Q228 140 236 158 H196Z" fill="${C.green}" ${S}/><path d="M176 196 L196 190" ${S}/>`); }

// Snag: the antagonist. A loose bolt with angry eyes and sparks.
{ art.snag = frame(`<ellipse cx="${X}" cy="${G + 8}" rx="62" ry="8" fill="${C.ink}" opacity=".15"/>
  <rect x="98" y="150" width="54" height="140" rx="6" fill="${C.grey}" ${S}/>${[170, 196, 222, 248].map(y => `<path d="M98 ${y} L152 ${y + 12}" ${s3}/>`).join('')}
  <path d="M60 92 L95 52 H155 L190 92 L155 132 H95 Z" fill="${C.coral}" ${S}/>
  <path d="M95 82 L115 90 M155 82 L135 90" ${S}/><circle cx="110" cy="98" r="7" fill="${C.ink}"/><circle cx="140" cy="98" r="7" fill="${C.ink}"/>
  <path d="M108 118 Q125 108 142 118" fill="none" ${S}/>
  <path d="M40 40 L52 56 L44 58 L58 78" fill="none" stroke="${C.amber}" stroke-width="5" stroke-linecap="round"/><path d="M210 40 L198 56 L206 58 L192 78" fill="none" stroke="${C.amber}" stroke-width="5" stroke-linecap="round"/>`); }

for (const [k, v] of Object.entries(art)) fs.writeFileSync(path.join(OUT, k + '.svg'), v.replace(/\n\s*/g, ''));
console.log('wrote', Object.keys(art).join(', '));
