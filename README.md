# Signal Box

A browser game for **CNS2002 Network Operating Systems Administration** (Lectures 1 to 9). You run a railway from its signal box, and every part of the railway stands for a real NOSA idea. Press **Schematic** (or `L`) at any time to redraw the screen with the real terms.

- **Play it:** https://wrightjayn.github.io/signal-box/
- **Watch the demo (2:14):** https://youtu.be/JqRVXtLHbE0

## How to play

Open `index.html` in any modern browser. There is nothing to install. Progress is saved in the browser on that device.

- **I am new to this** starts at World 1. **Placement test** starts you at the first world you did not pass.
- Each level runs: briefing, puzzle, reveal of the real terms, then a 3-question checkpoint (pass on 2).
- Stars: finished · efficient (at most 1 mistake and 3 of 3 on the checkpoint) · no hints.
- **I know this** skips a puzzle and goes straight to its checkpoint (silver badge). **Test out** clears a whole world with 4 of 5.
- **Settings**: Expert mode (Schematic always on), Revision mode (everything unlocked), story, music, sound, reset.
- Boss levels end after five mistakes, and Snag grows with each one.

## What is in it

| | |
| --- | --- |
| Worlds | 10, one per lecture. Lecture 7 is split into files and permissions |
| Levels | 54: 38 teaching, 6 practical (console), 10 boss |
| Checkpoint questions | 213, each with a one-line explanation and a `src` naming the lecture and slide |
| Console tasks | 57 typed commands and "predict the output" tasks from the lecture examples |
| Simulator | The permission lever frame: symbolic and octal `chmod`, checked by `KT_SIM.chmod` |
| Mock tests | Inspection 1 (L1–3), Inspection 2 (L4–5), Console exam (typed, L6–9), Final inspection (all) |

The design decisions are in [docs/design.md](docs/design.md), with screenshots in `docs/samples/`.

## Coverage: every lecture heading and where it is taught

| Lecture · heading | Level(s) |
| --- | --- |
| L1 Types of Operating Systems, RTOS, Single-user, SUST, SUMT, Multi-user | 1.1 |
| L1 Time-sharing, Distributed OS | 1.2 |
| L1 Network Operating System (P2P, client/server) | 1.3 |
| L1 Features of NOS | 1.5 |
| L1 Functions of NOS (multiplexing, system call) | 1.4, 1.5 |
| L1 Components of NOS | 1.4 |
| L1 Tutorial (classify OSs) | 1.1, 1.5 |
| L1 Additional resources (videos) | Not covered: links only |
| L2 Background (UNIX, Linux, NetWare, Windows NT/AD) | 2.1 |
| L2 Characteristics: stability, security, user-friendliness, robustness | 2.2, 2.4 |
| L2 Built-in management and monitoring tools, types of tools | 2.3, 2.4 |
| L3 Maintenance constructs: checklists, scheduling, backup and recovery | 3.1 |
| L3 System administration activities (8) | 3.6 |
| L3 Service-level agreement | 3.2 |
| L3 Types of maintenance; preventive (time, usage, condition, predictive, prescriptive) | 3.3, 3.6 |
| L3 PM planning (PDCA, CMMS), advantages, disadvantages | 3.4, 3.6 |
| L3 Corrective maintenance, planned, unplanned, when to use | 3.5, 3.6 |
| L3 Full / differential / incremental backup | 3.1 (named only: the notes give no definitions) |
| L4 Log management, steps, review logs, logs to check | 4.1, 4.2, 4.6 |
| L4 Logging, alert rules, the "art" phase | 4.2 |
| L4 Log management process: collection, storage, search, correlation, output | 4.3, 4.6 |
| L4 Performing daily backup (survey, frequency factors) | 4.4 |
| L4 Monitoring system performance, SPM | 4.5 |
| L4 Legal implications of network monitoring | 4.5, 4.6 |
| L5 SNMP, UDP, application layer, ports 161/162 | 5.1, 5.7 |
| L5 SNMP versions | 5.2, 5.7 |
| L5 Components: manager, agent, MIB, OID | 5.3 |
| L5 How SNMP works, SNMP commands (PDUs) | 5.4, 5.7 |
| L5 Basic SNMP communication setup | Not covered: the slide is an image only |
| L5 Nmap, Cacti, Nagios, SolarWinds | 5.5, 5.7 |
| L5 Network monitoring elements (servers, disk, CPU, routers/switches, bandwidth) | 5.6 |
| L5 Tutorial 6 (SolarWinds Orion hack 2020) | Not covered: research task, not in the notes |
| L6 Commands: simple, complex, compound, separators | 6.1, 6.4 |
| L6 The shell, prompt, types of shells, Bourne shell | 6.2 |
| L6 The UNIX system (utilities, kernel) | 6.2 |
| L6 Logging in, shell initialisation, interactive vs non-interactive | 6.3, 6.5 |
| L6 Initialisation file contents: TERM, PATH, MANPATH | 6.4 |
| L6 Making a script executable, magic line | 6.4 |
| L6 The man command, manual sections | 6.4, 6.5 |
| L7 Working with files, listing, hidden files, cat, wc | 7.1, 7.3 |
| L7 cp, mv, rm | 7.3, 7.5 |
| L7 Directories, filenames, absolute and relative pathnames, cd, mkdir, rmdir | 7.2, 7.3, 7.5 |
| L7 File types, symbolic links, device files, named pipes, sockets | 7.4 |
| L7 Owners, groups, permissions, directory permissions | 8.1 |
| L7 SUID, SGID, sticky bit | 8.4, 8.5 |
| L7 chmod symbolic and octal, common errors | 8.2, 8.3, 8.5 |
| L7 chown, chgrp | 8.3 |
| L8 Starting processes, foreground, background | 9.1, 9.2 |
| L8 Moving between foreground and background, nohup, wait | 9.1, 9.2 |
| L8 jobs, ps | 9.2, 9.3 |
| L8 kill | 9.5 |
| L8 Parent and child, job ID vs PID, subshells, process permissions, exec | 9.4, 9.5 |
| L9 eval, :, type | 10.1 |
| L9 sleep, find, xargs | 10.1, 10.2 |
| L9 expr, bc | 10.3 |
| L9 Signals, list of signals, default actions, delivering signals | 10.4, 10.6 |
| L9 trap: clean up, ignore, critical sections, timer | 10.5, 10.6 |

## Accuracy

The questions come from a reading of the notes. **Someone who knows the module should check them.** Every question has a `src` field naming the lecture and slide it came from. Conventions where the lecturer might differ are listed under "Open items" in [docs/design.md](docs/design.md): for example, how `ls -l` is described, and that backup strategies are named but not defined.

## Edit a level

Content is plain data in `js/content/part1.js` to `part4.js`. A level looks like this:

```js
{ id: '5.2', n: 'Three versions', k: 't', L: 'bridge',
  brief: [['beacon', 'Briefing line.']],
  pz: { type: 'match', say: 'Instruction', hint: 'Hint', pairs: [['SNMPv1', 'RFC 1157'], ...] },
  rv: [['World words', 'Real term', 'Explanation']],
  qz: [L(5, 'SNMP Versions')('Question?', 'Explanation.', 'Correct answer first', 'Wrong', 'Wrong', 'Wrong')] }
```

Puzzle types: `match`, `order`, `pick`, `sort`, `calc`, `term` (console) and `perm` (lever frame: `tasks: [{ from: '-rw-rw-rw-', cmd: 'go-w', file: '.profile' }]`). Paired wording `[[world words|real term]]` flips with Schematic. Names, cast and mock tests are in `js/config.js`. Scenes are in `js/scenes.js`. Portraits are drawn by `node tools/gen-art.js`.

## Test

```bash
npm i playwright && npx playwright install chromium
node tools/playtest.js
```

The play-through opens the game in headless Chromium, solves every level from the content data, passes every checkpoint, expects three stars, and fails on page errors, duplicate options and fewer than three questions.

## Limits

- Progress is kept in `localStorage` on one device. There are no accounts, leaderboard or server.
- The console checks typed text against patterns. It does not run commands.
- The mock tests follow the lecture blocks. No real assessment details were supplied.
