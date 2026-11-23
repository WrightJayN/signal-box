# Signal Box demo video prompt

Adapted from `Game/demo-video-prompt.md`, which was written for a different game (Kernelton). That file's structure is kept. Section 1 (configuration and voiceover script) and Sections 4 to 6 (look, motion, story) are rewritten for Signal Box. Every fact allowed on screen comes from the game's README.

How to use this file:

1. Record the voiceover from the script in Section 1 and save it as an MP3.
2. In the original explainer prompt, replace the TASK block and Sections 1, 4, 5 and 6 with the blocks below.
3. Keep Sections 2, 3 and 7 to 17 of the original prompt exactly as they are.
4. Attach the MP3, the eight character files from `assets/`, and three or four screenshots from `docs/samples/`.

---

# TASK

Create a professionally designed animated product demo of a browser game, in a game UI showcase style. Game screens build themselves, trains and messages move along the line, puzzles are solved on screen, and the view flips between an illustrated railway and a dark technical Schematic. Follow the project configuration below.

**Stage 1 — Storyboard:** the visual story, scene timing, motion choreography and rendered storyboard frames, presented for approval.
**Stage 2 — Animation:** after approval, the animation with the configured audio, playback controls and video export.

Storyboard is enabled, so stop before Stage 2 for explicit approval.

---

# 1. PROJECT CONFIGURATION

**Topic:** SIGNAL BOX DEMO: learn Network Operating Systems Administration by running a railway (about 3 minutes)

A demo video made by a student for fellow CNS2002 students. It shows what Signal Box is, how one level plays from start to finish, and how the game helps with revision. The viewer should finish knowing what the game is, why the railway idea makes the concepts easier, and how to start playing.

Signal Box is a browser game. The player runs a railway from its signal box, and every part of the railway is a NOS idea in disguise. The signal box is the SNMP manager. Trackside boxes are SNMP agents. The logbook office is log management. The depot is preventive and corrective maintenance. Trains are processes, and the siding is the background. A button called Schematic redraws every screen with the real terms.

Facts that may appear on screen, and no others:

- 10 worlds and 54 levels, one world per lecture (Lecture 7 is split into two), covering CNS2002 Lectures 1 to 9.
- 6 practical levels at a simulated console (Shunt), with 57 typed commands and "predict the output" tasks taken from the lecture examples.
- 213 checkpoint questions, each with a one-line explanation and the lecture and slide it came from.
- 4 mock tests: Inspection 1 (Lectures 1–3), Inspection 2 (Lectures 4–5), Console exam (typed), Final inspection (all lectures).
- Runs by opening `index.html` in any modern browser. Nothing to install. Progress is saved in the browser on that device.
- Schematic button, or the `L` key, shows the real term for every railway word.
- "I know this" skips a puzzle and goes straight to its checkpoint.
- "Test out" clears a whole world with 4 of 5 correct.
- The placement test starts the player at the first world they did not pass.
- Settings has Expert mode, Revision mode, story, music and sound switches.

Characters: Ada the Controller (the administrator and the NOS), Gauge (maintenance), Ledger (logs and backups), Beacon (SNMP and monitoring), Shunt (the shell console), Tally (files and permissions), Pip (processes and jobs), and Snag (faults), the antagonist.

Scenes:

1. **Hook.** A lecture slide full of terms (SNMP TRAP, chmod 754, SIGTERM, MIB, nohup) blurs out. The Signal Box title builds in with seven characters on the platform.
2. **The idea.** The network map draws itself. Labels appear on railway objects: signal box, trackside box, logbook, depot, train in the siding. Schematic is pressed and each label flips: SNMP manager, SNMP agent, log management, preventive maintenance, background process.
3. **One level, start to finish.** Level 5.4, Messages on the wire. Beacon gives the briefing. Seven messages travel between the signal box and the trackside: GET, RESPONSE, GETNEXT, GETBULK, SET, TRAP, INFORM. The player sorts who starts each one. The reveal card shows pull and push. A three-question checkpoint is answered and three stars pop.
4. **More ways to play.** The lever frame: `-rw-rw-rw-` then `chmod go-w`, the group and other "change" levers flip off, and the readout shows `-rw-r--r--`, octal 644. A train goes into the siding (`ls &`, `[1] 20757`). A boss level with Snag growing after each mistake.
5. **The real console.** Shunt types `ls -F`, `chmod 0600 .profile`, `kill -9 6739`, `find / -name alpha -print`. Then a "predict the output" task: `expr 19 % 7`, answer `5`.
6. **Fast track.** Three cards slide in: Placement test, Test out (4 of 5), I know this. The Settings panel opens with Expert mode and Revision mode switched on.
7. **Mock tests.** The network map shows the four mock test cards. One opens, a score appears, and a short list of levels to revise slides out.
8. **Close.** The numbers count up: 10 worlds, 54 levels, 213 questions, 57 console tasks. "Open index.html. Nothing to install." End card with the title and a space for a link.

- Storyboard: Enabled
- Voiceover: Enabled — attached MP3
- Voiceover transcript:

## Scene 1: Hook (0:00–0:15)
Network Operating Systems is full of words you can't picture. SNMP traps, octal permissions, SIGTERM. So I built a game where you can see them. This is Signal Box.

## Scene 2: The idea (0:15–0:40)
In Signal Box you run a railway, and every part of it is a NOS idea in disguise. The signal box is the SNMP manager. The trackside boxes are its agents. The logbook office is log management, the depot is preventive maintenance, and a train in a siding is a background process. Press Schematic, and every railway word flips to the term you'll see on the test.

## Scene 3: One level, start to finish (0:40–1:25)
Here's one level. Beacon runs the signal box, and seven messages travel along the wire. The box asks with GET, and the switch answers with RESPONSE. GETNEXT walks the MIB, GETBULK grabs a whole table, and SET changes a setting. When a router crosses a threshold, it sends a TRAP on its own, or an INFORM if it wants a reply. Then you sort who starts each message, the game reveals the real terms, and a three-question checkpoint earns you up to three stars.

## Scene 4: More ways to play (1:25–1:55)
Every topic gets its own kind of puzzle. For permissions, you set nine levers to the result of a chmod command. For processes, you send trains into the siding. And every world ends with a boss, where Snag grows every time you make a mistake.

## Scene 5: The real console (1:55–2:20)
It isn't only theory. Six practical levels put you at Shunt, a console where you type the real commands from the lectures: ls, chmod, kill, find. Some tasks ask you to predict the output first, like what expr 19 mod 7 prints.

## Scene 6: Fast track (2:20–2:40)
If you already know a topic, skip ahead. Take the placement test and start where you need to. Test out of a whole world with four out of five. Or tap "I know this" and go straight to the checkpoint.

## Scene 7: Mock tests (2:40–2:55)
There are four mock tests: two inspections, a typed console exam, and a final inspection. Each one lists the exact levels to go back and revise.

## Scene 8: Close (2:55–3:10)
Ten worlds. Fifty-four levels. Two hundred and thirteen questions. There's nothing to install. Open it in your browser and take over the signal box.

- Subtitles: Generate SRT, with optional on-screen display
- Duration without voiceover: Not used — the runtime follows the voiceover's decoded length
- Format: Horizontal, 16:9 · 1920 × 1080 · 30 fps export · smooth preview
- Style: Game UI showcase motion graphics, in Signal Box's own flat vector look
- Sound effects: Enabled · Background music: Enabled · Final format: MP4

---

# 4. VISUAL DIRECTION — SIGNAL BOX GAME UI

Two views, and the contrast between them is the visual idea of the whole video.

**Railway view.** Flat vector art with chunky ink outlines on a ballast-cream background, sleepers and rails along the bottom. Characters are simple figures with one prop each. Panels are white with a thick ink border and rounded corners.

**Schematic view.** The same screen redrawn dark, with monospace labels, where railway words become the real terms in amber.

## Palette
- Ballast cream background #F2EFE6 · platform sand #E3DCCB · ink #1F2A36
- Teal, running and real terms #1F7A8C · amber, waiting and caution #E9A23B
- Signal red, stop, errors and Snag #D2483B · signal green, clear and success #4C9F38
- Livery blue, Ada and trains #2F4F8F · Schematic background #121820 · white panels

## Screens and UI
- A dark ink top bar with Map, the level name, a star count, Schematic and Settings.
- Dialogue: a character portrait beside a white speech panel.
- Railway scenes: the signal box with a blue roof and trackside boxes along a dashed wire; a line of stations with signals that turn green; a main platform and a curved siding.
- The lever frame: three rows (Crew/Owner, Depot team/Group, Everyone else/Other) of three levers (look r, change w, run x), red for off and green for on, with a readout in monospace.
- Console: black panel, green typed commands, teal prompt `student@signalbox:~$`.
- Reward: three large amber stars.

## Typography
A rounded sans for railway words and interface text. A monospace for real terms, the console and the Schematic view.

---

# 5. MOTION DIRECTION — A RAILWAY THAT RUNS

- Messages slide along the wire between the signal box and the trackside, in teal when the box asks and red when the trackside raises an alarm.
- The Schematic flip: a wipe that turns cream to dark and swaps each label for its real term. Use it as the signature transition.
- Levers flip with a short snap, and the readout updates.
- Trains roll into the siding. Signals turn from red to green as stations are passed.
- Console commands type themselves, then output streams in.
- Stars pop one by one. Numbers count up. Snag swells slightly at each mistake.
- Transitions come from the game: the network map zooms into a world, a level card opens into its puzzle, the Schematic wipes between views, a reward screen folds back into the map.
- Aim for 25 to 35 meaningful visual beats in about 3 minutes.

---

# 6. INFORMATION DESIGN AND STORYTELLING

1. The problem: NOS concepts are hard to picture.
2. The idea: a railway where every service is one of those concepts.
3. The proof: one level played from briefing to stars.
4. The range: other puzzles, the console, the fast track and the mock tests.
5. The invitation: what is in the game and how to start.

Show one idea per moment. Whenever a real term first appears, show it beside the railway word it replaces.
