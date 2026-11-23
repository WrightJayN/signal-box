/* Names and labels for Signal Box (CNS2002 Network Operating Systems Administration). */
window.KT_CONFIG = {
  id: 'signal-box-cns2002',
  title: 'Signal Box',
  tagline: 'Learn Network Operating Systems Administration by running a railway from its signal box. CNS2002, Lectures 1 to 9.',
  intro: 'Every part of the railway stands for a real NOSA idea. Press <b>{lens}</b> (or the <b>L</b> key) at any time to redraw the screen with the real terms.',
  demo: { url: 'https://youtu.be/JqRVXtLHbE0', label: 'Watch the 2-minute demo on YouTube' },   // link under the title screen buttons
  lensName: 'Schematic',
  lensTip: 'Redraw with the real terms (L)',
  mapName: 'Network map',
  consoleName: 'Shunt',
  cast: { ada: 'Ada, the Controller', gauge: 'Gauge', ledger: 'Ledger', beacon: 'Beacon', shunt: 'Shunt', tally: 'Tally', pip: 'Pip', snag: 'Snag' },
  titleCast: ['ada', 'gauge', 'ledger', 'beacon', 'shunt', 'tally', 'pip'],
  rival: 'snag',
  acts: { 1: 'Part 1 · Running the network (Lectures 1–3)', 4: 'Part 2 · Watching the network (Lectures 4–5)', 6: 'Part 3 · The console (Lectures 6–9)' },
  tests: [
    { id: 'insp1', after: 3, name: 'Inspection 1: System administration', mirrors: 'Lectures 1–3 · 15 questions', worlds: [1, 2, 3], n: 15, icon: 'gauge' },
    { id: 'insp2', after: 5, name: 'Inspection 2: Monitoring', mirrors: 'Lectures 4–5 · 15 questions', worlds: [4, 5], n: 15, icon: 'beacon' },
    { id: 'console', after: 10, name: 'Console exam', mirrors: 'Practical levels, Lectures 6–9 · typed commands', worlds: [6, 7, 8, 9, 10], lab: true, icon: 'shunt' },
    { id: 'final', after: 10, name: 'Final inspection', mirrors: 'All nine lectures · 25 questions', worlds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n: 25, needs: ['insp1', 'insp2'], icon: 'ada' }
  ],
  prompt: 'student@signalbox:~$'
};
