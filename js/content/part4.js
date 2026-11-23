/* Worlds 9 and 10: Lectures 8 and 9 (processes; miscellaneous tools and signals). Correct answer first; the engine shuffles. */
(function () {
  const { P, T, TP } = window.KTH;
  const L = (n, slide) => window.KTH.Q(`Lecture ${n} · ${slide}`);
  window.KT_WORLDS = window.KT_WORLDS || [];

  /* ---------------- World 9 · Lecture 8 ---------------- */
  window.KT_WORLDS.push({
    id: 9, name: 'Trains on the Line', guide: 'pip', week: 'Lecture 8', unit: 'Advanced Shell Scripting', topic: 'Processes: foreground, background, jobs, ps, kill, parents and children',
    intro: 'Every command you run becomes a [[train|process]] with its own [[running number|PID]]. Pip dispatches them: on the [[main platform|foreground]], or out to a [[siding|background]] so the console stays free.',
    outro: 'You can now start, suspend, move, list, wait for and kill processes, and follow a process family.',
    levels: [
      { id: '9.1', n: 'Main platform or siding', k: 't', L: 'layman',
        brief: [['pip', 'A [[train on the main platform|foreground process]] holds the console until it leaves. A [[train in a siding|background process]] runs while you keep working.'], ['pip', 'Dispatch these cases.']],
        pz: { type: 'pick', steps: [
          P('How do you start a command as a [[train in a siding|background process]]?', 'Add an ampersand & at the end.', 'Add <code>&</code> at the end', 'Add <code>;</code> at the end', 'Add <code>|</code> at the end', 'Press Ctrl+C'),
          P('<code>ls ch0*.doc &</code> prints <code>[1] 20757</code> first. What are 1 and 20757?', 'The job number and the process ID.', 'The [[siding number|job number]] and the [[running number|PID]]', 'Lines and words', 'User and group IDs', 'Minutes and seconds'),
          P('A [[siding train|background process]] needs keyboard input. What does it do?', 'It waits in a stopped state until moved to the foreground.', 'It stops and waits until brought to the foreground', 'It reads from the file anyway', 'It kills the shell', 'It finishes with no input'),
          P('A long compile is tying up your console. Which key suspends it?', 'Ctrl+Z on most systems (check with stty -a).', 'Ctrl+Z', 'Ctrl+C', 'Ctrl+D', 'Ctrl+S'),
          P('After suspending it, which command resumes it [[in a siding|in the background]]?', 'bg.', '<code>bg</code>', '<code>fg</code>', '<code>kill</code>', '<code>jobs</code>')] },
        rv: [['Main platform', 'Foreground process', 'Input from the keyboard, output to the screen. No new commands until it ends.'], ['Siding', 'Background process (&)', 'Runs without the keyboard; you get the prompt back at once.'], ['Siding number vs running number', 'Job ID vs PID', 'Job IDs are short and can cover several processes; PIDs are unique per process.']],
        qz: [L(8, 'Starting a Process')('PIDs roll over at the 16-bit signed boundary. What is the highest PID before rolling over?', '32,767.', '32,767', '65,535', '9,999', '1,024'),
          L(8, 'Background Processes')('Which command turns job-monitoring completion messages on?', 'set -o monitor.', '<code>set -o monitor</code>', '<code>set +o monitor</code>', '<code>stty -a</code>', '<code>jobs -o</code>'),
          L(8, 'Background Processes')('<code>[1] + Done(2) ls no_such_file &</code>. What does (2) tell you?', 'The command returned a nonzero status: it did not run successfully.', 'It exited with a nonzero status, so it failed', 'It ran twice', 'It is job 2', 'It used 2 seconds'),
          L(8, 'Moving a Foreground Process to the Background')('A suspended foreground process is:', 'Still in memory but getting no CPU time.', 'In memory but getting no CPU time', 'Deleted', 'Running in the background', 'Logged out')] },

      { id: '9.2', n: 'Dispatch desk', k: 'p', L: 'technical',
        brief: [['pip', 'Take the dispatch desk. Type each job-control command.']],
        pz: { type: 'term', tasks: [
          T('Run <code>ls ch0*.doc</code> in the background.', 'ls ch0*.doc &', '[1] 20757'),
          T('Show the keys for intr, susp and the rest.', 'stty -a', 'intr = ^C; quit = ^\\; erase = ^H; kill = ^U; eof = ^D\n... susp = ^Z ...'),
          T('Resume suspended job number 1 in the background.', 'bg %1', '[1] long_running_process &'),
          T('Bring job number 1 back to the foreground.', 'fg %1', 'long_running_process'),
          T('List your suspended and background jobs.', 'jobs', '[3] + Running first_one &\n[2] - Stopped (SIGTSTP) second_one\n[1] Stopped (SIGTTIN) third_one &'),
          T('Run <code>ls</code> in the background so it survives you logging off.', 'nohup ls &', '[1] 6695\nSending output to nohup.out'),
          T('Wait until job number 1 finishes before doing anything else.', 'wait %1', ''),
          T('Show a full listing of your processes, with PPID and start time.', 'ps -f', 'UID PID PPID C STIME TTY TIME CMD\nrbarrett 6738 3662 0 10:23:03 pts/6 0:00 first_one'),
          T('Show every process on the system and filter for lines with 3657.', 'ps -ef | grep 3657', 'root 3657 711 0 08:10:53 ? 0:00 in.telnetd', /ps -ef ?\| ?grep 3657/),
          TP('In <code>jobs</code> output, which job do bg and fg act on if you give no number?', 'the one marked +', /\+|the one marked \+|plus|the most recent job|most recent|job 3|3/)] },
        rv: [['Moving trains', 'bg, fg, %n', 'Use the job number with % to say which job; don\'t guess.'], ['Keep it running after you go', 'nohup', 'Ignores HUP; output goes to nohup.out unless you redirect it.']],
        qz: [L(8, 'Listing Running Processes using the jobs Command')('In <code>jobs</code> output, the + marks:', 'The most recent job, the one bg and fg act on by default.', 'The most recent job', 'The oldest job', 'A failed job', 'A root job'),
          L(8, 'Waiting for Background Process to Finish')('<code>wait</code> with no options waits for:', 'All background jobs.', 'All background jobs to finish', 'One second', 'The next login', 'Job 1 only'),
          L(8, 'Keeping Background Processes Around')('nohup protects a process from which signal?', 'HUP (hang up).', 'HUP', 'KILL', 'TERM', 'INT'),
          L(8, 'Listing Running Processes using the jobs Command')('Why can\'t <code>jobs</code> show your active foreground process?', 'jobs itself is the foreground process.', 'jobs is itself the foreground process', 'Foreground processes have no PID', 'They are hidden by default', 'It needs root')] },

      { id: '9.3', n: 'The departure board', k: 't', L: 'technical',
        brief: [['pip', '<code>ps -f</code> is the [[departure board|full process listing]]. Read each column.']],
        pz: [{ type: 'match', say: 'Match each ps -f column to its meaning.', hint: 'UID: who. PID: this process. PPID: its parent. C: CPU use. STIME: start time. CMD: the command.',
          pairs: [['UID', 'User ID the process belongs to'], ['PID', 'Process ID'], ['PPID', 'Parent process ID'], ['C', 'CPU utilisation of the process'], ['STIME', 'Process start time'], ['CMD', 'The command, with options and arguments']] },
          { type: 'pick', steps: [
            P('Which ps option lists every process on the system?', '-e (every).', '<code>-e</code>', '<code>-u</code>', '<code>-f</code>', '<code>-l</code>'),
            P('Which ps option lists a specific user\'s processes?', '-u, followed by the user.', '<code>-u</code>', '<code>-e</code>', '<code>-a</code>', '<code>-x</code>'),
            P('Which pair can NOT be combined, according to the notes?', 'You can combine -f with -e or -u, but not -e with -u.', '<code>-e</code> with <code>-u</code>', '<code>-f</code> with <code>-e</code>', '<code>-f</code> with <code>-u</code>', 'None can be combined'),
            P('Three jobs are running but ps shows five processes. What are the other two?', 'The ps command itself and the shell (ksh).', 'ps itself and the shell', 'Two hidden jobs', 'getty and login', 'The kernel and init')] }],
        rv: [['Departure board', 'ps (process status)', 'Default: PID, TTY, TIME, CMD. -f adds UID, PPID, C and STIME.']],
        qz: [L(8, 'Listing Running Processes using the ps Command')('What does the TIME column show?', 'The amount of CPU time consumed.', 'CPU time used by the process', 'The current clock time', 'Time until it ends', 'Login time'),
          L(8, 'Listing Running Processes using the ps Command')('On BSD-based systems like Linux, which extra column does plain ps show?', 'STAT, the state of the job.', 'STAT', 'PPID', 'UID', 'MIB'),
          L(8, 'Listing Running Processes using the ps Command')('Why is it common to pipe <code>ps -e</code> into grep?', 'So many processes run that you filter for the one you want.', 'To filter a long list for one process', 'To kill processes', 'To change their owner', 'To hide ps'),
          L(8, 'Listing Running Processes using the ps Command')('In the notes\' ps -f example, all commands have PPID 3662. What is 3662?', 'The PID of ksh, the shell.', 'The shell (ksh)', 'in.telnetd', 'getty', 'The kernel')] },

      { id: '9.4', n: 'Engines and carriages', k: 't', L: 'bridge',
        brief: [['pip', 'Every [[train|process]] was started by another: its [[parent engine|parent process]]. Follow the family.']],
        pz: { type: 'pick', steps: [
          P('Most commands you run have which parent?', 'The shell.', 'The shell', 'The kernel directly', 'getty', 'Another user'),
          P('In the notes, in.telnetd is the parent of ksh, which is the parent of ps. ksh is in.telnetd\'s:', 'Child.', 'Child', 'Parent', 'Sibling', 'Subshell owner'),
          P('When a child is forked, what does it receive from its parent?', 'A copy of the parent\'s environment, including environment variables.', 'A copy of the parent\'s environment', 'The parent\'s PID', 'Nothing', 'The parent\'s terminal only'),
          P('The child changes an environment variable. What happens in the parent?', 'Nothing: the change does not reflect in the parent and goes away when the child exits.', 'Nothing; the change stays in the child', 'The parent changes too', 'The parent is killed', 'The variable is deleted everywhere'),
          P('Running a script creates a new copy of the shell interpreter called a:', 'A subshell.', '[[Coupled engine|Subshell]]', 'Sub-kernel', 'Daemon', 'Socket'),
          P('<code>exec csh</code> at the ksh prompt does what?', 'Replaces the current process with csh, keeping the original PID.', 'Replaces ksh with csh, keeping the same PID', 'Starts csh as a child of ksh', 'Kills the machine', 'Lists processes')] },
        rv: [['Parent engine', 'Parent process (PPID)', 'Each user process has one; usually your shell.'], ['Swap the engine in place', 'exec', 'Overlays the current process. exec ls at the login shell logs you out after the listing.']],
        qz: [L(8, 'Overlaying the Current Process (exec Command)')('Why does <code>exec ls</code> at your login shell log you out?', 'exec replaces the shell; when ls exits there is nothing left to take commands.', 'It replaces the shell, so nothing is left when ls ends', 'ls deletes your account', 'exec sends kill -9', 'ls runs forever'),
          L(8, 'Subshells')('How do you leave a subshell started with <code>csh</code>?', 'exit.', '<code>exit</code>', '<code>kill -9 0</code>', '<code>bg</code>', '<code>logout -all</code>'),
          L(8, 'Process Permissions')('/usr/bin/passwd runs with root\'s permissions because:', 'It has the s (SUID) bit and is owned by root.', 'It is owned by root and has the SUID bit', 'Every user is root', 'It is in /usr', 'It is a shell built-in'),
          L(8, 'Parent and Child Processes')('Creating a child process from a parent is called:', 'Forking.', 'Forking', 'Piping', 'Trapping', 'Paging')] },

      { id: '9.5', n: 'Runaway train', k: 'b', L: 'technical',
        brief: [['pip', 'A runaway train (PID 6739) will not stop. Snag is driving. Bring it in safely.']],
        pz: { type: 'pick', steps: [
          P('First try. Which command sends the default signal to PID 6739?', 'kill with no option sends TERM.', '<code>kill 6739</code>', '<code>kill %6739</code>', '<code>fg 6739</code>', '<code>bg 6739</code>'),
          P('Which signal does that send by default, and its number?', 'TERM, value 15.', 'TERM (15)', 'KILL (9)', 'HUP (1)', 'INT (2)'),
          P('The process ignores TERM. What forces it to end?', 'kill -9 (KILL).', '<code>kill -9 6739</code>', '<code>kill -15 6739</code>', '<code>wait 6739</code>', '<code>nohup 6739</code>'),
          P('How do you kill job number 1 instead of a PID?', 'Prefix the job number with %.', '<code>kill %1</code>', '<code>kill 1</code>', '<code>kill #1</code>', '<code>kill -1</code>'),
          P('You run <code>kill -9 3662</code>, and 3662 is your own ksh. What happens?', 'You are disconnected from the system.', 'You are disconnected', 'Nothing, ksh ignores it', 'ksh restarts', 'All files are deleted'),
          P('Why is TERM tried before kill -9?', 'TERM lets the process shut down in order (flush buffers, close files).', 'It allows an orderly shutdown', 'It is faster', 'kill -9 needs root', 'TERM cannot be ignored')] },
        rv: [['Sending a stop signal', 'kill', 'kill does not physically kill: it sends a signal. Default TERM (15); kill -9 forces the end.']],
        qz: [L(8, 'Killing a Process (kill Command)')('ksh ignores a regular kill but not:', 'kill -9.', '<code>kill -9</code>', '<code>kill</code>', '<code>kill -15</code>', '<code>kill -0</code>'),
          L(8, 'Killing a Process (kill Command)')('Which is equivalent to <code>kill -9</code>?', 'kill -KILL.', '<code>kill -KILL</code>', '<code>kill -TERM</code>', '<code>kill -HUP</code>', '<code>kill -INT</code>'),
          L(8, 'Job ID Versus Process ID')('Why are background jobs usually handled by job ID?', 'It is shorter, and a job can contain several processes.', 'It is shorter and a job can hold several processes', 'PIDs are secret', 'Job IDs never repeat', 'PIDs only exist for root'),
          L(8, 'Killing a Process (kill Command)')('If your UNIX does not support <code>ps -f</code>, the notes suggest:', 'ps -ux.', '<code>ps -ux</code>', '<code>ps -z</code>', '<code>jobs -f</code>', '<code>top -f</code>')] }
    ]
  });

  /* ---------------- World 10 · Lecture 9 ---------------- */
  window.KT_WORLDS.push({
    id: 10, name: 'Signals and Tools', guide: 'shunt', week: 'Lecture 9', unit: 'Advanced Shell Scripting', topic: 'eval, :, type, sleep, find, xargs, expr, bc, signals, trap, timers',
    intro: 'The last stretch of line. First the toolbox scripts use every day, then [[railway signals|UNIX signals]]: messages that tell a running train to stop, quit or reset.',
    outro: 'The whole network is yours. You can use the tools, send signals, and write traps that clean up, ignore or time out.',
    levels: [
      { id: '10.1', n: 'Built in or on disk', k: 't', L: 'bridge',
        brief: [['shunt', 'Some tools are [[built into the console|shell built-ins]]: the shell runs them without reading a separate program from disk. Others are [[separate machines|external commands]] stored on disk.']],
        pz: [{ type: 'sort', say: 'Shell built-in or external command (as the notes group them)?', hint: 'The notes\' built-ins: eval, :, type. External: sleep, find, xargs, bc, expr.',
          bins: ['Shell built-in', 'External command on disk'],
          items: [['eval', 0], [':', 0], ['type', 0], ['sleep', 1], ['find', 1], ['xargs', 1], ['bc', 1], ['expr', 1]] },
          { type: 'pick', steps: [
            P('<code>OUTPUT="> out.file"</code> then <code>echo hello $OUTPUT</code> prints <code>hello > out.file</code>. What makes it write to the file?', 'eval makes the shell reprocess the line a second time.', '<code>eval echo hello $OUTPUT</code>', '<code>type echo hello</code>', '<code>: echo hello</code>', '<code>sleep echo hello</code>'),
            P('What does the <code>:</code> command do?', 'Nothing: it returns a zero (success) completion code.', 'Nothing, and returns success (0)', 'Prints a colon', 'Ends the script', 'Starts a subshell'),
            P('Why is <code>while :</code> slightly better than <code>while true</code> in the Bourne shell?', ': is built in; true may need to be read from disk.', ': is built in; true may be read from disk', 'true is always false', ': runs only once', 'There is no difference ever'),
            P('<code>: ${TERM:?"TERM not set"}</code> when TERM is empty:', 'The script aborts with the message "TERM not set".', 'Aborts with "TERM not set"', 'Sets TERM to vt100', 'Does nothing', 'Prints the PATH'),
            P('<code>type ulimit</code> prints:', 'ulimit is a shell builtin.', 'ulimit is a shell builtin', 'ulimit is /bin/ulimit', 'ulimit is a keyword', 'ulimit is an alias')] }],
        rv: [['Built into the console', 'Shell built-ins: eval, :, type', 'Slightly faster: no disk read. Only matters when looping thousands of times.'], ['Second reading', 'eval', 'Reprocesses the command line so special characters from variables take effect.']],
        qz: [L(9, 'The type Command')('<code>type case</code> prints:', 'case is a keyword.', 'case is a keyword', 'case is /bin/case', 'case is a builtin', 'case is an alias'),
          L(9, 'The eval Command')('With <code>OUTPUT=" >> out.file"</code>, <code>eval echo hello $OUTPUT</code>:', 'Appends hello to out.file.', 'Appends hello to out.file', 'Overwrites out.file', 'Prints to the screen', 'Deletes out.file'),
          L(9, 'The : Command')('Why did old Bourne scripts sometimes start with <code>:</code>?', 'A C shell treats a script starting with # as C shell syntax.', 'So the C shell would not read them as C shell scripts', 'To make them run faster', 'To hide them', 'To set the PATH'),
          L(9, 'The sleep Command')('It is recommended that <code>sleep n</code> not exceed:', '65,534 seconds.', '65,534', '60', '32,767', '255')] },

      { id: '10.2', n: 'Search the yard', k: 'p', L: 'technical',
        brief: [['shunt', 'Find wagons anywhere in the yard and act on them. Type each command.']],
        pz: { type: 'term', tasks: [
          T('Find every file named <code>alpha</code> on the whole system and print its path.', 'find / -name alpha -print', '/reports/1998/alpha\n/reports/1998/region2/alpha\n/tmp/alpha'),
          T('Find every file with <code>alpha</code> anywhere in its name, under /.', "find / -name '*alpha*' -print", '/reports/1998/alpha\n/reports/1998/alpha2\n/reports/1998/old-alpha\n/usr/fredp/ralphadams', /find \/ -name '\*alpha\*' -print/),
          T('List every directory on the system.', 'find / -type d -print', '/\n/bin\n/home\n...'),
          T('Make every file named alpha readable by everyone, using -exec.', 'find / -name alpha -exec chmod a+r {} \\;', '', /find \/ -name alpha -exec chmod a\+r \{\} \\;/),
          T('Delete all files named core quickly, using xargs.', 'find / -name core -print | xargs rm -f', '', /find \/ -name core -print ?\| ?xargs rm -f/),
          T('Delete the files listed in <code>filelist</code>, 20 at a time.', 'cat filelist | xargs -n 20 rm', '', /cat filelist ?\| ?xargs -n 20 rm/),
          T('Append date and who to <code>logfile</code> every 5 minutes, forever, in one line.', 'while : ; do date ; who ; sleep 300 ; done >> logfile', '', /while :? ?;? ?do date ?; ?who ?; ?sleep 300 ?;? ?done ?>> ?logfile/),
          TP('<code>ls | xargs -n 2 echo ===</code> in a directory with acme report16 report3 report34 report527. What is the last line?', '=== report527'),
          TP('<code>find / -size -20 -print -mtime +30</code>. Is the -mtime test used?', 'no', /no|No|NO|ignored|it is ignored/)] },
        rv: [['Yard search', 'find start-dir options actions', '-name, -type, then actions -print and -exec cmd {} \\;. Quote wildcards in single quotes.'], ['Batching wagons', 'xargs', 'Builds command lines from standard input; -n sets how many arguments each time. Solves "arg list too long".']],
        qz: [L(9, 'find: -exec Action')('Why is <code>| xargs rm -f</code> faster than <code>-exec rm -f {} \\;</code> for thousands of files?', '-exec calls rm once per file; xargs batches them.', '-exec runs rm once per file; xargs batches', 'xargs skips some files', '-exec needs root', 'They are equally fast'),
          L(9, 'find: Starting Directory')('Why back up using relative pathnames from find?', 'Files can be restored to a temporary directory.', 'So files can be restored to a temporary directory', 'Relative paths are shorter', 'Absolute paths are illegal', 'find cannot print absolute paths'),
          L(9, 'find: -type Option')('In <code>find -type</code>, what does <code>f</code> mean?', 'A regular or normal file.', 'Regular file', 'Folder', 'FIFO', 'Font'),
          L(9, 'The xargs Command')('<code>rm abc*</code> fails with "arg list too long". What fixes it?', 'ls | grep \'^abc\' | xargs -n 20 rm', '<code>ls | grep \'^abc\' | xargs -n 20 rm</code>', '<code>rm -i abc*</code>', '<code>rmdir abc*</code>', '<code>kill abc*</code>')] },

      { id: '10.3', n: 'The counting house', k: 'p', L: 'technical',
        brief: [['shunt', 'Arithmetic at the console: <code>expr</code> for whole numbers, <code>bc</code> for everything else. Predict what each prints.']],
        pz: { type: 'term', tasks: [
          TP('<code>expr 8 / 3</code>', '2'),
          TP('<code>expr 3 \\* 5</code>', '15'),
          TP('<code>expr 19 % 7</code>', '5'),
          TP('<code>expr 3+2</code> (no spaces)', '3+2'),
          TP("<code>expr abcdef : '..\\(..\\)..'</code>", 'cd'),
          TP('In bc with <code>scale=4</code>, what is <code>8/3</code>?', '2.6666'),
          TP('In bc with <code>obase=16</code> and <code>ibase=8</code>, what does <code>77</code> print?', '3f', /3f|3F/),
          TP('Same settings. What does <code>10*3</code> print?', '18'),
          T('Add 1 to the variable CNT with expr and backquotes.', 'CNT=`expr $CNT + 1`', '', /CNT=`expr \$CNT \+ 1`/)] },
        rv: [['Whole-number sums', 'expr', 'Integer arithmetic; fractions dropped; quote \\*; spaces between every argument. Also counts regex matches with :.'], ['Any sum, any base', 'bc', 'scale sets decimal places; ibase/obase convert bases (set obase first).']],
        qz: [L(9, 'The expr Command')('What does % do in expr?', 'Remainder (modulus).', 'Remainder (modulus)', 'Percentage', 'Integer division', 'Comment'),
          L(9, 'The bc Command')('In bc, which should you set first when converting bases?', 'The output base, obase.', 'obase', 'ibase', 'scale', 'quit'),
          L(9, 'The expr Command')("<code>expr $ABC : '.*'</code> prints 7. What is 7?", 'The number of characters in $ABC.', 'The number of characters in ABC', 'The number of digits', 'The line number', 'The exit code'),
          L(9, 'The bc Command')('Which operator is integer exponentiation in bc?', '^', '^', '**', '%', '&')] },

      { id: '10.4', n: 'Reading the signals', k: 't', L: 'bridge',
        brief: [['shunt', '[[Railway signals|UNIX signals]] are software interrupts: they tell a program an important event has happened. Each is a small positive integer.'], ['shunt', 'Learn the six from the notes\' table.']],
        pz: [{ type: 'match', say: 'Match each signal to its number and meaning.', hint: 'HUP 1 hang up. INT 2 keyboard interrupt. QUIT 3 keyboard quit. KILL 9. ALRM 14 alarm clock. TERM 15 terminate.',
          pairs: [['SIGHUP', '1 · hang up on the controlling terminal'], ['SIGINT', '2 · interrupt from the keyboard'], ['SIGQUIT', '3 · quit from the keyboard'], ['SIGKILL', '9 · kill, cannot be caught'], ['SIGALRM', '14 · alarm clock, for timers'], ['SIGTERM', '15 · termination']] },
          { type: 'pick', steps: [
            P('Pressing CONTROL-C while a script runs sends which signal?', 'SIGINT.', 'SIGINT', 'SIGTERM', 'SIGKILL', 'SIGHUP'),
            P('Many UNIX programs treat HUP as a request to:', 'Reinitialise themselves.', 'Reinitialise themselves', 'Delete their files', 'Log the user in', 'Print a man page'),
            P('Signal 0, sent when a script exits, is really:', 'More of a shell convention than a real signal.', 'A shell convention, not a real signal', 'The KILL signal', 'An error', 'A keyboard key'),
            P('Which command lists the signals your system understands?', 'kill -l.', '<code>kill -l</code>', '<code>trap -l</code>', '<code>ps -l</code>', '<code>man -l</code>'),
            P('Which is one of the default actions for a signal?', 'Terminate, ignore, dump core, stop, continue.', 'Dump core', 'Reboot', 'Send email', 'Change the PATH')] }],
        rv: [['A signal to a train', 'UNIX signal', 'A software interrupt that can arrive at any time.'], ['Emergency stop', 'SIGKILL (9)', 'Cannot be caught. The process may leave data corrupted. Use only when others fail.']],
        qz: [L(9, 'Delivering Signals')('Which two commands are equivalent?', 'kill pid and kill -s SIGTERM pid.', '<code>kill pid</code> and <code>kill -s SIGTERM pid</code>', '<code>kill pid</code> and <code>kill -9 pid</code>', '<code>kill -1 pid</code> and <code>kill -15 pid</code>', '<code>kill -s SIGINT pid</code> and <code>kill -9 pid</code>'),
          L(9, 'Getting a List of Signals')('On Linux, which man page lists the signals?', 'man 7 signal.', '<code>man 7 signal</code>', '<code>man 5 signal</code>', '<code>man -s 5 signal</code>', '<code>man signal.h</code>'),
          L(9, 'Delivering Signals')('<code>kill -1 1001</code> sends:', 'The hang-up signal (HUP).', 'HUP', 'KILL', 'TERM', 'INT'),
          L(9, 'Default Actions')('"Dump core" creates a file called core containing:', 'A memory image of the process when it received the signal.', 'A memory image of the process', 'The signal list', 'The user\'s password', 'The man page')] },

      { id: '10.5', n: 'Setting a trap', k: 't', L: 'technical',
        brief: [['shunt', 'A script can deal with a signal in three ways: do nothing (default), ignore it, or catch it and run its own commands. <code>trap</code> sets which.']],
        pz: [{ type: 'pick', steps: [
          P('Which trap removes a temp file and exits with code 2 on HUP, INT, QUIT or TERM?', 'trap "rm -f $TMPF; exit 2" 1 2 3 15', '<code>trap "rm -f $TMPF; exit 2" 1 2 3 15</code>', '<code>trap "" 1 2 3 15</code>', '<code>trap 1 2 3 15</code>', '<code>trap "rm -f $TMPF" 9</code>'),
          P('Which line makes a script ignore HUP, INT, QUIT and TERM?', "trap '' 1 2 3 15 (or trap : 1 2 3 15).", "<code>trap '' 1 2 3 15</code>", '<code>trap 1 2 3 15</code>', '<code>trap CleanUp 1 2 3 15</code>', '<code>kill -9 $$</code>'),
          P('<code>trap 1 2 3 15</code> with only signal numbers does what?', 'Resets the handlers to the default.', 'Resets those signals to their default action', 'Ignores them', 'Sends them', 'Lists them'),
          P('Why ignore signals only around <code>DoImportantStuff</code>, not the whole script?', 'So the critical part runs uninterrupted, but the user can still stop the script.', 'The critical part is protected, but the user can still stop the script', 'Signals cannot be reset', 'It is faster', 'It hides the script'),
          P('A daemon script has <code>trap CleanUp 2 15</code> and <code>trap Init 1</code>. What does HUP do?', 'Calls Init.', 'Runs Init', 'Runs CleanUp', 'Ignores it', 'Kills the script at once'),
          P('Why should a script exit with a nonzero code after an abnormal stop?', 'A normal exit is 0; nonzero signals something abnormal.', 'Nonzero shows the exit was abnormal', 'Zero is not allowed', 'It frees memory', 'It restarts the script')] },
          { type: 'order', say: 'The timer script\'s main body. Tap the steps in order.', hint: 'Handler, timer, program, wait, unset.',
            items: ['Set a handler for the ALARM signal (trap AlarmHandler 14)', 'Set the timer (SetTimer 15)', 'Execute the program in the background', 'Wait for the program to finish', 'Unset the timer (kill $TIMERPROC)'] }],
        rv: [['Catching a signal', 'trap name signals', 'Runs name (commands or a function) when a listed signal arrives.'], ['A timer', 'sleep $DEF_TOUT && kill -s 14 $$ &', 'A background sleep sends ALRM to the script\'s own PID ($$) when time is up.']],
        qz: [L(9, 'The trap Command')('Which is one of the three common uses of trap in the notes?', 'Clean up temp files, always ignore signals, ignore during critical operations.', 'Clean up temporary files', 'Change file owners', 'Set the PATH', 'List processes'),
          L(9, 'Setting Up a Timer')('In the timer script, what holds the list of child processes?', 'CHPROCIDS.', 'CHPROCIDS', 'TIMERPROC', 'DEF_TOUT', '$$'),
          L(9, 'Setting Up a Timer')('What does <code>$$</code> hold in <code>kill -s 14 $$</code>?', 'The shell\'s (script\'s) own process ID.', 'The script\'s own process ID', 'The last background PID', 'The exit code', 'The signal number'),
          L(9, 'Setting Up a Timer')('AlarmHandler exits with which code to show the alarm fired?', '14.', '14', '0', '2', '9')] },

      { id: '10.6', n: 'Signal failure', k: 'b', L: 'technical',
        brief: [['shunt', 'Final run. Snag has crossed every signal on the line. Put them right.']],
        pz: { type: 'pick', steps: [
          P('A program has a handler that ignores TERM, QUIT and INT. What still ends it?', 'KILL cannot be caught.', '<code>kill -9 pid</code>', '<code>kill pid</code>', '<code>kill -s SIGINT pid</code>', '<code>kill -1 pid</code>'),
          P('The default kill cannot end a process. Before -9, the notes suggest trying:', 'QUIT or INT.', 'QUIT or INT', 'HUP', 'ALRM', 'Nothing else'),
          P('You want to stop a daemon, not make it reload. Which signal should you avoid?', 'HUP often means reinitialise.', 'HUP', 'TERM', 'QUIT', 'INT'),
          P('A long command might never finish. Which signal does the timer use?', 'ALRM (14).', 'SIGALRM (14)', 'SIGKILL (9)', 'SIGHUP (1)', 'SIGINT (2)'),
          P('<code>KillSubProcs</code> runs <code>kill ${CHPROCIDS:-$!}</code>. If CHPROCIDS is empty, it kills:', 'The last background process, $!.', 'The last background process ($!)', 'Every process', 'The shell', 'Nothing'),
          P('Signals arrive at any time. That is why scripts need:', 'Extra code to respond correctly whatever they were doing.', 'Extra code to handle them at any point', 'No changes', 'A faster CPU', 'A bigger MIB')] },
        rv: [['Signal box mastered', 'Signals and trap', 'Default, ignore or catch. TERM first, then QUIT/INT, KILL only as a last resort.']],
        qz: [L(9, 'Delivering Signals')('By convention, the KILL signal is always sent using:', 'Its number, 9.', 'Its number, 9', 'Its name only', 'CONTROL-C', 'trap'),
          L(9, 'Ignoring Signals')("<code>trap '' signals</code> and <code>trap : signals</code> differ in:", 'Only style: both produce the same result.', 'Only style; both ignore the signals', 'One ignores, one catches', 'One works only in csh', 'One sends the signals'),
          L(9, 'Dealing with Signals')('Which way of dealing with a signal needs no extra code?', 'Doing nothing and letting the default action occur.', 'Letting the default action happen', 'Ignoring it', 'Catching it', 'All three need code'),
          L(9, 'Signals')('Signals are best described as:', 'Software interrupts sent to a program when an important event occurs.', 'Software interrupts for important events', 'Hardware cables', 'Log files', 'SNMP messages')] }
    ]
  });
})();
