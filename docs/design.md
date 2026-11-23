# Signal Box: design brief

Module: CNS2002 Network Operating Systems Administration (lecturer: Richard Barrett). Input: Lectures 1 to 9 as PDF. Built with the `lecture-to-game` skill.

## What was read

All nine PDFs were extracted with `pdftotext -layout` and read in full: every slide, including the tutorial slides. Images on the slides were not read. Lecture 5's "Basic SNMP Communication Setup" slide is an image only, so it adds no facts here.

No syllabus, practical sheets, past papers or assessment details were supplied. The mock tests are therefore planned from the lecture structure (see below). The module objectives slide that opens each lecture was used as the syllabus.

## Subject diagnosis

| Verb family | Where it dominates |
| --- | --- |
| Classify or compare | Lectures 1 to 5: OS types, P2P vs client/server, NOS characteristics, tool types, preventive vs corrective, log types, SNMP versions, network tools |
| Write or type, predict the output | Lectures 6 to 9: shell commands, files, `chmod`, job control, `ps`, `kill`, `find`, `xargs`, `expr`, `bc`, `trap` |
| Recall | Every lecture: names, numbers (ports 161/162, RFCs, signal numbers, 99.999 %), file type letters |
| Sequence | Log management process, PDCA, `getty` login, shell initialisation, timer script steps |
| Diagnose or decide | Which maintenance applies, which quality failed, which PDU, which signal to send |
| Calculate | Octal permissions, SLA downtime, `expr` and `bc` results |

The top two are **classify/decide** (first half) and **type/predict** (second half). About 45 % of the module is factual, 35 % procedural (commands with steps), 10 % relational (manager/agent/MIB, parent/child processes, directory tree), and 10 % quantitative.

## Loop

- **Primary: Cases.** Each level is a short operating case on a rail network: sort, match, pick-the-step and order puzzles, each answered from the notes.
- **Secondary: Console quests.** Six practical levels put the player at a simulated terminal with typed commands and "predict the output" tasks taken from the lecture examples.
- **One simulator: the permission lever frame.** File permissions are the module's only real algorithm (symbolic and octal `chmod`). The player sets nine levers to the result of a `chmod` command. A reference implementation (`KT_SIM.chmod`) checks every answer and solves it in the play-through.

The four OS simulators that came with the template (scheduling, fit, paging, disk) were removed. This module does not teach those algorithms.

## Theme: a railway run from a signal box

The lectures supply their own analogies: log monitoring as a "watchtower lookout" and "electronic sentry", network maintenance as servicing a motor vehicle every few months or 10,000 km, and UNIX signals. A railway network holds all of them: a central control room, trackside equipment that reports back, a depot that services rolling stock, a logbook office, trains (processes) on main lines and sidings, and real railway signals.

Tone: plain and practical, for second-year students. No childish jokes.

### Analogy table

| World word | Real term | Why a beginner can guess it |
| --- | --- | --- |
| The rail network | Network operating environment | Many stations share one system |
| Control room | Network operating system / NMS | One place sees and runs everything |
| Station that serves the line | Server (dedicated file server) | Clients come to it for resources |
| Stations swapping directly | Peer to peer | No central hub, equal privileges |
| Depot servicing | Preventive maintenance | Service before it breaks |
| Breakdown repair | Corrective maintenance | Fix after a fault |
| Service promise | Service-level agreement | Agreed level, penalty if missed |
| Logbook | Log / audit trail | Written record of every event |
| Signal box | SNMP manager | Asks trackside boxes for readings |
| Trackside box | SNMP agent | Sits on the device and reports |
| Rulebook of readings | MIB | Lists what can be asked |
| Reading number | OID | Numbered address of one reading |
| Alarm from the trackside | TRAP | Agent speaks first when something crosses a threshold |
| Track capacity | Bandwidth | Only so much traffic fits |
| Jam at a junction | Bottleneck | Causes delay (latency), jitter, loss |
| The console in the signal box | Shell | You type, it runs |
| Train | Process | Runs, waits, stops, is ended |
| Main platform | Foreground | Holds the console until done |
| Siding | Background (`&`) | Runs while the console is free |
| Parent engine / carriage | Parent / child process | One starts the other |
| Rail signal sent to a train | UNIX signal | A message that tells a running thing to stop, quit or reload |
| Yard and its sidings tree | Directory tree | Single root, branches below |
| Access pass | Permission | Look, change, run |

### Cast

| Id | Name | Prop | Stands for |
| --- | --- | --- | --- |
| ada | Ada, the Controller | headset | The administrator and the NOS (Worlds 1, 2) |
| gauge | Gauge, depot engineer | spanner | Maintenance, SLAs (World 3) |
| ledger | Ledger, logbook keeper | open logbook | Logs, backups, performance monitoring, legal (World 4) |
| beacon | Beacon, signal-box operator | lantern | SNMP, network tools, monitoring elements (World 5) |
| shunt | Shunt, the console | hand terminal | The shell and commands (Worlds 6, 10) |
| tally | Tally, yard keeper | key ring | Files, directories and permissions (Worlds 7, 8) |
| pip | Pip, the dispatcher | whistle and flag | Processes and jobs (World 9) |
| snag | Snag | a loose bolt with eyes | Faults and attacks. The boss antagonist. It grows with each mistake. |

### Palette

| Token | Colour | Meaning |
| --- | --- | --- |
| background | `#F2EFE6` ballast cream | world |
| sand | `#E3DCCB` platform | soft panels |
| ink | `#1F2A36` | outlines and text |
| teal | `#1F7A8C` | running, working, real terms |
| amber | `#E9A23B` | waiting, caution signal |
| coral | `#D2483B` | stop signal, errors, Snag |
| green | `#4C9F38` | clear signal, success |
| violet | `#2F4F8F` | railway livery, Ada |
| black | `#121820` | Schematic (real terms) view |

Every state also has text or an icon, so colour is never the only signal.

Fonts: a rounded sans for world words, a monospace for real terms, the console and the Schematic view.

### Real-terms switch

The switch is called **Schematic**: it redraws every screen as a dark line diagram with the real terms (`L` key). Content markup is `[[world words|real term]]`. Levels move from plain words to bridge wording to technical only, and boss and practical levels are always technical.

## Worlds and levels

| World | Lecture | Topics | Practical | Boss |
| --- | --- | --- | --- | --- |
| 1 The Network Map | L1 | OS types, time-sharing, distributed, NOS P2P vs client/server, features, functions, components | – | 1.5 Network inspection |
| 2 Choosing a Signal System | L2 | NOS history, stability, security, user-friendliness, robustness, built-in tools | – | 2.4 Which quality failed? |
| 3 The Maintenance Depot | L3 | Checklists, scheduling, backup and recovery, admin activities, SLA, preventive (time, usage, condition, predictive, prescriptive), PDCA, CMMS, corrective planned/unplanned | – | 3.6 Depot day |
| 4 The Logbook Office | L4 | Log management steps, audit logs, logs to check, five-element process, daily backup, SPM, legal implications | – | 4.6 The breach that hid |
| 5 The Signal Wire | L5 | SNMP, UDP, ports, versions, manager/agent/MIB/OID, PDUs, Nmap, Cacti, Nagios, SolarWinds, monitoring elements | – | 5.7 Night shift |
| 6 The Console | L6 | Simple/complex/compound commands, shell types, UNIX system, login and `getty`, `/etc/passwd`, initialisation, `PATH`, executable scripts, `man` | 6.4 First commands | 6.5 Read the manual |
| 7 The Yard | L7 (files) | File kinds, `ls` options, hidden files, `cat`, `wc`, `cp`, `mv`, `rm`, paths, `cd`, `mkdir`, `rmdir`, links, devices, pipes, sockets | 7.3 Moving freight | 7.5 Yard audit |
| 8 Keys and Passes | L7 (attributes) | Permissions, directory permissions, SUID/SGID/sticky, `chmod` symbolic and octal, `chown`, `chgrp` | 8.3 Issue the passes | 8.5 Locked out |
| 9 Trains on the Line | L8 | Foreground/background, job control, `nohup`, `wait`, `jobs`, `ps`, `kill`, parent/child, subshells, `exec` | 9.2 Dispatch desk | 9.5 Runaway train |
| 10 Signals and Tools | L9 | `eval`, `:`, `type`, `sleep`, `find`, `xargs`, `expr`, `bc`, signals, default actions, `trap`, timers | 10.2 Search the yard, 10.3 The counting house | 10.6 Signal failure |

Lecture 7 covers two large topics (files and directories; file attributes and permissions), so it gets two worlds. That gives 10 worlds.

## Mock tests

No assessment information was in the notes, so the tests follow the lecture blocks:

| Test | After | Covers | Kind |
| --- | --- | --- | --- |
| Inspection 1: System administration | World 3 | Worlds 1–3 (L1–L3) | 15 questions |
| Inspection 2: Monitoring | World 5 | Worlds 4–5 (L4–L5) | 15 questions |
| Console exam | World 10 | Practical levels in Worlds 6–10 | 8 typed tasks + 6 questions |
| Final inspection | World 10 | All worlds | 25 questions |

Each test lists the levels to revise after the score. If the real assessments are shared later, the tests can be renamed and re-pointed in `js/config.js`.

## Open items and assumptions

- **Backup strategies.** Lecture 3 names Full, Differential and Incremental backups but does not define them. The game names them and does not define them. The coverage table records this gap.
- **`ls -l`.** The lecture's "Listing Files" slide says `-l` lists one file per line and shows a name-only listing. The game teaches `ls -l` as the long listing with the type and permissions, as later slides (File Types, Viewing Permissions) show it, and never asks which option gives the name-only list. Check this with the lecturer.
- **`wc -m` vs `-c`.** The game follows the notes: `-m` on Solaris and HP-UX, `-c` on Linux.
- **Signal numbers.** The game uses the numbers in the Lecture 9 table (HUP 1, INT 2, QUIT 3, KILL 9, ALRM 14, TERM 15). The `kill -l` listing on the slide is Solaris-specific, and the game says so.
- **Sticky bit wording.** The slide calls it "The SUID bit or stick bit". The game calls it the sticky bit and uses the slide's rule for who may delete files.
- **The Lecture 8 example `ps -ef | grep 3657`** shows two lines with PID 3657. The game uses only the in.telnetd → ksh → ps chain the slide describes.
