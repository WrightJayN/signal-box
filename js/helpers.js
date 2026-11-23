/* Small helpers that keep a level to a few lines. The correct answer is always written first; the engine shuffles.
   Q(src)(question, explanation, correct, wrong1, wrong2, ...)   checkpoint and test question, src = where it came from in the notes
   P(step, explanation, correct, wrong1, ...)                     one step of a "pick" puzzle
   T(ask, solution, output, ...regexes)                           console task. The solution is accepted; add regexes for other valid answers
   TP(ask, answer, ...regexes)                                    "predict the output" console task                                      */
window.KTH = {
  Q: src => (q, w, ...a) => ({ q, a, c: 0, w, src }),
  P: (t, w, ...o) => ({ t, o, c: 0, w }),
  T: (ask, sol, out, ...acc) => ({ ask, sol, out, accept: acc.length ? acc.map(r => r.source || r) : [sol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')] }),
  TP: (ask, sol, ...acc) => ({ ask, sol, predict: true, accept: acc.length ? acc.map(r => r.source || r) : [sol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')] })
};
