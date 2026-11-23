/* Worlds 6 to 8: Lectures 6 and 7 (advanced shell scripting: the shell, files, attributes). Correct answer first; the engine shuffles. */
(function () {
  const { P, T, TP } = window.KTH;
  const L = (n, slide) => window.KTH.Q(`Lecture ${n} · ${slide}`);
  window.KT_WORLDS = window.KT_WORLDS || [];

  /* ---------------- World 6 · Lecture 6 ---------------- */
  window.KT_WORLDS.push({
    id: 6, name: 'The Console', guide: 'shunt', week: 'Lecture 6', unit: 'Advanced Shell Scripting', topic: 'Commands, shells, logging in, initialisation, scripts, man pages',
    intro: 'Meet Shunt, [[the console in the signal box|the UNIX shell]]. You type, it reads the first word as the command and the rest as [[instructions to it|arguments]], and it runs it.',
    outro: 'You can now run simple, complex and compound commands, explain how a shell starts, make a script executable and read a man page.',
    levels: [
      { id: '6.1', n: 'Three shapes of command', k: 't', L: 'bridge',
        brief: [['shunt', 'In UNIX a [[command|command]] is a program you run by typing its name and pressing ENTER.'], ['shunt', 'Commands come in three shapes. Sort these.']],
        pz: { type: 'sort', say: 'Simple, complex or compound?', hint: 'Name only: simple. Name plus arguments: complex. Several commands joined with ; : compound.',
          bins: ['Simple', 'Complex', 'Compound'],
          items: [['<code>date</code>', 0], ['<code>who</code>', 0], ['<code>who am i</code>', 1], ['<code>man uptime</code>', 1], ['<code>date ; who am i ;</code>', 2], ['<code>date ; who</code>', 2]] },
        rv: [['Command on its own', 'Simple command', 'Just the name: date, who.'], ['Command with instructions', 'Complex command', 'Name plus arguments that change its default behaviour: who am i.'], ['Commands in a row', 'Compound command', 'Separated by the semicolon, run in order, no prompt in between.']],
        qz: [L(6, 'Complex Commands')('In <code>who am i</code>, what are <code>am</code> and <code>i</code>?', 'Arguments: command modifiers that change its behaviour.', 'Arguments', 'Commands', 'Shells', 'Prompts'),
          L(6, 'Command Separators')('Which character separates commands in a compound command?', 'The semicolon.', ';', '&', '|', ':'),
          L(6, 'Complex Commands')('The output of a command run with no arguments is its:', 'Default behaviour.', 'Default behaviour', 'Compound output', 'Error message', 'Man page'),
          L(6, 'The Shell Prompt')('How does the shell decide which command to run?', 'It takes the first word of the input; the rest are arguments.', 'From the first word of the input', 'From the last word', 'From the longest word', 'It asks the user')] },

      { id: '6.2', n: 'Which shell?', k: 't', L: 'bridge',
        brief: [['shunt', 'UNIX has two big families of shell: the Bourne family and the C family. The course uses only Bourne-type shells.']],
        pz: [{ type: 'sort', say: 'Which family is this shell in?', hint: 'sh, ksh, bash and the POSIX sh are Bourne. csh and tcsh are C shells.',
          bins: ['Bourne family', 'C shell family'],
          items: [['sh (Bourne shell)', 0], ['ksh (Korn shell)', 0], ['bash (Bourne Again shell)', 0], ['POSIX shell', 0], ['csh (C shell)', 1], ['tcsh (TENEX/TOPS C shell)', 1]] },
          { type: 'pick', steps: [
            P('What is the default prompt of a Bourne-type shell?', '$ for Bourne, % for C shells.', '$', '%', '#', '>'),
            P('Who wrote the original UNIX shell, in the mid-1970s at AT&T Bell Labs?', 'Stephen R. Bourne.', 'Stephen R. Bourne', 'Richard Barrett', 'Linus Torvalds', 'Bill Joy'),
            P('Which is one of the three drawbacks of the original Bourne shell?', 'No file name completion, no history or editing, hard to run many background jobs.', 'No command history or command editing', 'It cannot run scripts', 'It has no prompt', 'It only runs on Windows'),
            P('The UNIX system has two components. What are they?', 'Utilities and the kernel.', 'Utilities and the kernel', 'The shell and the mouse', 'The MIB and the OID', 'The prompt and the PATH')] }],
        rv: [['The console', 'The shell (command interpreter)', 'Gathers input and runs programs; also a full programming language.'], ['The engine room', 'The kernel', 'Heart of UNIX: hardware access, scheduling and execution. Loaded into memory at boot and stays there.']],
        qz: [L(6, 'Different Types of Shells')('Why does the course cover only Bourne-type shells?', 'C-type shells are not powerful enough for shell programming.', 'C-type shells are not powerful enough for shell programming', 'C shells are newer', 'Bourne shells have no prompt', 'C shells cannot run commands'),
          L(6, 'The UNIX System')('When are utilities loaded into memory?', 'Only when they are executed.', 'Only when they are run', 'At boot, forever', 'Never', 'When the user logs out'),
          L(6, 'The Original Bourne Shell')('Where is the Bourne shell usually installed?', '/bin/sh', '/bin/sh', '/usr/csh', '/etc/profile', '/home/sh'),
          L(6, 'The UNIX System')('Why does a second <code>date</code> run faster than the first?', 'The program usually stays in memory for a short while after it finishes.', 'It stays in memory for a short time after running', 'The kernel is reloaded', 'The PATH gets shorter', 'The shell compiles it')] },

      { id: '6.3', n: 'Signing on', k: 't', L: 'bridge',
        brief: [['shunt', 'Before you reach my prompt, two programs and two files do some work. Put the steps in order.']],
        pz: [{ type: 'order', say: 'Tap the login steps in order, from switch-on to the $ prompt.', hint: 'getty prompts, login checks /etc/passwd and starts the shell, then the shell reads /etc/profile and .profile.',
          items: ['getty shows the login: prompt', 'getty waits for a username, then shows Password:', 'getty passes the username and password to login', 'login looks for a match in /etc/passwd and starts the shell', 'The shell reads /etc/profile if it exists', 'The shell reads .profile in the home directory if it exists', 'The shell shows the $ prompt'] },
          { type: 'match', say: 'Match each field of <code>rbarrett:x:500:100:Richard Barrett:/home/rbarrett:/bin/bash</code>.', hint: 'Fields in order: username, x, user id, group id, full name, home, shell.',
            pairs: [['rbarrett', 'Username'], ['500', 'User ID'], ['/home/rbarrett', 'Home directory'], ['/bin/bash', 'Shell to start']] }],
        rv: [['The gatekeeper', 'getty and login', 'getty prompts for the username and password; login checks /etc/passwd and runs the shell.'], ['Setting up the desk', 'Shell initialisation', '/etc/profile (system-wide, admin) then .profile (yours). Missing files are skipped with no error.']],
        qz: [L(6, 'Logging In')('Which program displays the <code>login:</code> prompt?', 'getty.', 'getty', 'login', 'sh', 'init'),
          L(6, 'Shell Initialization')('If .profile does not exist, the shell:', 'Skips it. No error message is displayed.', 'Skips it with no error', 'Stops with an error', 'Creates it', 'Logs you out'),
          L(6, 'Initialization File Contents')('Who maintains /etc/profile?', 'The system administrator.', 'The system administrator', 'Each user', 'getty', 'The kernel'),
          L(6, 'Interactive Versus Non-interactive Shells')('A shell that reads commands from a file and exits at the end is:', 'Non-interactive.', 'Non-interactive', 'Interactive', 'A login shell', 'A C shell')] },

      { id: '6.4', n: 'First commands', k: 'p', L: 'technical',
        brief: [['shunt', 'Hands on the keys. Type each command as the notes write it. I do exactly what you type.']],
        pz: { type: 'term', tasks: [
          T('Show the current day, date, time and year.', 'date', 'Wed Oct 20 11:25:12 EST 2021'),
          T('Show who you are logged in as (information about you only).', 'who am i', 'rbarrett pts/0 Oct 20 08:49', /who am [iI]/),
          T('Run <code>date</code> and then <code>who am i</code> as one compound command.', 'date ; who am i ;', 'Wed Oct 27 10:10:10 EST 2021\nrbarrett pts/0 Oct 27 08:49', /date ?; ?who am [iI]( ?;)?/),
          T('Run the file <code>userLogins</code> with the Bourne shell, non-interactively.', '/bin/sh userLogins', 'Wed Oct 27 10:12:01 EST 2021\nrbarrett pts/0 Oct 27 08:49'),
          T('Make <code>./userLogins</code> executable for all users.', 'chmod a+x ./userLogins', '', /chmod a\+x (\.\/)?userLogins/),
          T('Set the PATH so the shell looks in <code>/bin</code> then <code>/usr/bin</code>.', 'PATH=/bin:/usr/bin', ''),
          T('Open the manual page for <code>uptime</code>.', 'man uptime', 'uptime - show how long the system has been up'),
          TP('You type <code>date who am i</code> with no semicolon. What does it print?', 'date: bad conversion'),
          TP('What line must be the very first line of a script so that /bin/sh runs it?', '#!/bin/sh', /#! ?\/bin\/sh/)] },
        rv: [['Making a script runnable', 'chmod a+x and the magic line', 'Make it executable, and start it with #!/bin/sh so the right shell runs it.'], ['Where to look for commands', 'PATH', 'Directories separated by colons, e.g. PATH=/bin:/usr/bin. MANPATH does the same for man pages.']],
        qz: [L(6, 'Making a Shell Script Executable')('What happens if <code>#!/bin/sh</code> is on the third line of a script?', 'Anywhere but the first line it is treated as a comment.', 'It is treated as a comment', 'It runs sh three times', 'The script cannot run', 'It sets the PATH'),
          L(6, 'Setting the PATH')('In <code>PATH=/bin:/usr/bin</code>, what separates the directories?', 'The colon.', 'The colon :', 'The semicolon ;', 'A space', 'A slash /'),
          L(6, 'Setting the TERM')('Most users set their terminal type to the lowest common denominator with:', 'TERM=vt100', 'TERM=vt100', 'PATH=vt100', 'MANPATH=vt100', 'SHELL=vt100'),
          L(6, 'Setting the MANPATH')('A common MANPATH setting is:', '/usr/man:/usr/share/man', 'MANPATH=/usr/man:/usr/share/man', 'MANPATH=/bin:/usr/bin', 'MANPATH=/etc/profile', 'MANPATH=.profile')] },

      { id: '6.5', n: 'Read the manual', k: 'b', L: 'technical',
        brief: [['shunt', 'The man pages are the authoritative source about your UNIX system. Snag has scrambled the manual. Put it right.']],
        pz: { type: 'pick', steps: [
          P('Which man page section lists the different modes a command can be run in, with its arguments?', 'SYNOPSIS.', 'SYNOPSIS', 'NAME', 'SEE ALSO', 'NOTES'),
          P('Which section lists related commands?', 'SEE ALSO.', 'SEE ALSO', 'EXAMPLE', 'DESCRIPTION', 'NAME'),
          P('Which section sometimes lists known bugs?', 'NOTES.', 'NOTES', 'SYNOPSIS', 'NAME', 'EXAMPLE'),
          P('Manual section 2 covers:', 'UNIX system calls.', 'System calls', 'Commands', 'Games', 'Device drivers'),
          P('Manual section 8 covers:', 'System maintenance.', 'System maintenance', 'Libraries', 'File formats', 'Commands'),
          P('<code>man apple</code> prints an error. Why?', 'There is no man page for "apple".', 'There is no manual entry for apple', 'apple is a shell keyword', 'MANPATH is empty by law', 'man only reads section 1'),
          P('What does <code>uptime</code> print besides the time and how long the system has been up?', 'The average number of jobs in the run queue over the last 1, 5 and 15 minutes.', 'Average jobs in the run queue over 1, 5 and 15 minutes', 'The list of users\' passwords', 'Free disk space', 'The PATH')] },
        rv: [['The railway rulebook', 'man pages', 'NAME, SYNOPSIS, DESCRIPTION, EXAMPLE, SEE ALSO, NOTES. man searches every section for you.']],
        qz: [L(6, 'Manual Section')('Manual section 1 covers:', 'Commands.', 'Commands', 'System calls', 'Libraries', 'Games'),
          L(6, 'Manual Section')('Manual section 6 covers:', 'Instructions for the games that came with UNIX.', 'The games that came with UNIX', 'Device drivers', 'System maintenance', 'Commands'),
          L(6, 'Using the man Command')('<code>who -b</code> gives:', 'The time the system was last booted (from the uptime man page NOTES).', 'The time the system was last booted', 'Everyone\'s password', 'The current PATH', 'The man sections'),
          L(6, 'How login Starts a Shell')('You start a second shell with <code>/bin/sh</code>. What does <code>exit</code> do?', 'It exits that shell and returns to the original one started by login.', 'Returns you to the original shell', 'Shuts down the machine', 'Deletes .profile', 'Restarts getty')] }
    ]
  });

  /* ---------------- World 7 · Lecture 7 (files and directories) ---------------- */
  window.KT_WORLDS.push({
    id: 7, name: 'The Yard', guide: 'tally', week: 'Lecture 7 (part 1)', unit: 'Advanced Shell Scripting', topic: 'Files, listing, copying, moving, removing, paths, directories, file types',
    intro: 'The [[yard|file system]] is a tree with one root, <code>/</code>. Every [[wagon|file]] sits on a [[siding|directory]], and every siding except the root sits on another.',
    outro: 'You can now list, view, count, copy, move and remove files, find your way with paths, and read file types.',
    levels: [
      { id: '7.1', n: 'Reading the yard', k: 't', L: 'bridge',
        brief: [['tally', 'UNIX has three basic [[kinds of wagon|file types]]: ordinary files, directories and special files.'], ['tally', 'Let\'s read some listings.']],
        pz: { type: 'pick', steps: [
          P('<code>ls -F</code> shows <code>bin/ hosts lib/ hw1</code>. What does the <code>/</code> mean?', 'With -F, a / marks a directory.', 'bin and lib are directories', 'bin and lib are hidden', 'bin and lib are links', 'bin and lib are devices'),
          P('Which option makes <code>ls</code> also show [[hidden wagons|hidden files]]?', '-a shows files whose names start with a dot.', '<code>-a</code>', '<code>-F</code>', '<code>-i</code>', '<code>-r</code>'),
          P('What makes a file hidden?', 'Its first character is a dot.', 'Its name starts with a dot (.)', 'It has no permissions', 'It is in /tmp', 'It is empty'),
          P('In a listing, what are <code>.</code> and <code>..</code>?', 'The current directory and the parent directory.', 'The current directory and its parent', 'Two hidden files', 'The root and home', 'Two devices'),
          P('Which command shows a file\'s contents?', 'cat (concatenate).', '<code>cat</code>', '<code>ls</code>', '<code>wc</code>', '<code>pwd</code>'),
          P('<code>cat -b hosts</code> differs from <code>cat -n hosts</code> because -b:', '-b does not number blank lines.', 'Does not number blank lines', 'Numbers only blank lines', 'Shows hidden files', 'Counts words')] },
        rv: [['Kinds of wagon', 'Ordinary files, directories, special files', 'Special files give access to hardware, or act like aliases.'], ['Hidden wagons', 'Hidden (dot) files', '.profile, .kshrc, .cshrc, .rhosts store configuration.']],
        qz: [L(7, 'Hidden Files')('Which is the Bourne shell initialisation script, a hidden file?', '.profile.', '.profile', '.cshrc', '.rhosts', '.kshrc'),
          L(7, 'Working with Files')('UNIX directories are equivalent to which thing in Windows or Mac OS?', 'Folders.', 'Folders', 'Drives', 'Shortcuts', 'Programs'),
          L(7, 'Counting Words (wc)')('On Linux, which wc option counts characters?', '-c (the notes say -m is for Solaris and HP-UX).', '-c', '-m', '-w', '-l'),
          L(7, 'Counting Words (wc)')('<code>wc .rhosts</code> prints <code>7 14 179 .rhosts</code>. What is 14?', 'The number of words.', 'Words', 'Lines', 'Characters', 'Files')] },

      { id: '7.2', n: 'Finding your way', k: 't', L: 'bridge',
        brief: [['tally', '"I live in Sandy Bay" is relative. "I live in Sandy Bay, Clarendon, Jamaica" is absolute.'], ['tally', 'An [[absolute route|absolute pathname]] starts from the root /. A [[relative route|relative pathname]] starts from where you are now.']],
        pz: [{ type: 'sort', say: 'Absolute or relative pathname?', hint: 'Starts with / : absolute. Anything else: relative.',
          bins: ['Absolute', 'Relative'],
          items: [['/home/rbarrett/work/bugs.txt', 0], ['/usr/local/bin/', 0], ['docs/ch5.doc', 1], ['../docs/ch5.doc', 1], ['./docs/ch5.doc', 1]] },
          { type: 'pick', steps: [
            P('You are in <code>/home/rbarrett/work</code>. Which file is <code>../docs/ch5.doc</code>?', '.. goes up to /home/rbarrett.', '/home/rbarrett/docs/ch5.doc', '/home/rbarrett/work/docs/ch5.doc', '/docs/ch5.doc', '/home/docs/ch5.doc'),
            P('Same place. Which file is <code>./docs/ch5.doc</code>?', '. is the current directory.', '/home/rbarrett/work/docs/ch5.doc', '/home/rbarrett/docs/ch5.doc', '/docs/ch5.doc', '/work/ch5.doc'),
            P('You are in <code>/home/rbarrett</code>. Which relative path reaches <code>/usr/local/bin</code>?', 'Up two levels to /, then down.', '../../usr/local/bin', '../usr/local/bin', 'usr/local/bin', './usr/local/bin'),
            P('What does <code>cd</code> with no argument do?', 'Changes to your home directory.', 'Goes to your home directory', 'Goes to /', 'Prints the directory', 'Does nothing'),
            P('Are <code>/home/rbarrett/docs/ch5.doc</code> and <code>/home/rbarrett/docs/CH5.doc</code> the same file?', 'UNIX is case-sensitive, so they are different files.', 'No, UNIX is case-sensitive', 'Yes, case is ignored', 'Only on Fridays', 'Only if both are empty')] }],
        rv: [['Full address', 'Absolute pathname', 'Starts with /, from the root.'], ['Directions from here', 'Relative pathname', 'From the current directory (pwd); . is here, .. is the parent.']],
        qz: [L(7, 'Filenames')('Which character can never appear in a UNIX filename?', '/ separates directories.', '/', '.', '-', '_'),
          L(7, 'Filenames')('How long can a filename be?', 'Up to 255 characters.', 'Up to 255 characters', 'Up to 8 characters', 'Up to 11 characters', 'Unlimited'),
          L(7, 'Relative Pathnames')('Which command prints the current directory?', 'pwd: print working directory.', 'pwd', 'cd', 'ls', 'cat'),
          L(7, 'Filenames')('Why avoid spaces in filenames?', 'Many programs treat the parts as separate files.', 'Many programs treat each word as a separate file', 'Spaces delete the file', 'Spaces make files hidden', 'UNIX forbids spaces')] },

      { id: '7.3', n: 'Moving freight', k: 'p', L: 'technical',
        brief: [['tally', 'Time to shunt some wagons. Type each command.']],
        pz: { type: 'term', tasks: [
          T('List the current directory, marking each directory with a <code>/</code>.', 'ls -F', 'bin/ hosts lib/ res.03\nch07 hw1 pub/ test_results\nch07.bak hw2 res.01 users\ndocs/ hw3 res.02 work/'),
          T('List every file, including the hidden ones.', 'ls -a', '. .profile docs lib test_results\n.. .rhosts hosts pub users'),
          T('Show the file <code>hosts</code> with every line numbered.', 'cat -n hosts', '1 127.0.0.1 localhost loopback\n2 10.8.11.2 kanchi.bosland.us kanchi\n...\n5'),
          T('Count only the lines in <code>.profile</code>.', 'wc -l .profile', '133 .profile'),
          T('Copy <code>test_results</code> to <code>test_results.v2</code>, asking before you overwrite.', 'cp -i test_results test_results.v2', 'overwrite test_results.v2? (y/n)'),
          T('Copy the directory <code>docs/book</code> into <code>/mnt/zip</code>.', 'cp -r docs/book /mnt/zip', ''),
          T('Move <code>docs/names</code> to <code>/tmp</code> and rename it <code>names.txt</code> in one command.', 'mv docs/names /tmp/names.txt', ''),
          T('Remove the empty directories <code>ch01</code>, <code>ch02</code> and <code>ch03</code>.', 'rmdir ch01 ch02 ch03', ''),
          T('Create the link <code>./public_html</code> pointing to <code>../httpd/html/users/rbarrett</code>.', 'ln -s ../httpd/html/users/rbarrett ./public_html', '', /ln -s \.\.\/httpd\/html\/users\/rbarrett (\.\/)?public_html/),
          TP('<code>cp hw1 hw2 hw3</code> when hw3 does not exist. What error is printed?', 'cp: hw3: No such file or directory')] },
        rv: [['Safe moves', '-i (interactive)', 'cp -i, mv -i and rm -i ask before overwriting or deleting.'], ['Shifting a whole siding', 'cp -r, rm -r, rmdir', 'rmdir is "safe" (empty only). rm -r is "unsafe": deleted files cannot be restored.']],
        qz: [L(7, 'Copying Files (cp)')('If the destination of <code>cp</code> already exists, without -i:', 'It is overwritten with no error.', 'It is overwritten with no warning', 'cp refuses', 'cp asks first', 'A backup is made'),
          L(7, 'Removing Directories')('Why is <code>rm -r</code> called "unsafe"?', 'It removes directories with their contents, and rm deletions cannot be restored.', 'It deletes contents too, and they cannot be restored', 'It only works on empty directories', 'It asks too many questions', 'It needs root'),
          L(7, 'Renaming Files (mv)')('When moving several items with one <code>mv</code>, can you rename them?', 'No; use a separate mv for each rename.', 'No, use a separate mv for each', 'Yes, always', 'Only directories', 'Only hidden files'),
          L(7, 'Creating Directories')('<code>mkdir docs pub</code> creates:', 'Both directories.', 'Two directories, docs and pub', 'One directory called "docs pub"', 'A link', 'Nothing, it is an error')] },

      { id: '7.4', n: 'Wagon markings', k: 't', L: 'technical',
        brief: [['tally', 'The first character of <code>ls -l</code> tells you the [[kind of wagon|file type]]. Match the letters.']],
        pz: [{ type: 'match', say: 'Match the first character to the file type.', hint: '- regular, d directory, l link, c character special, b block special, p named pipe, s socket.',
          pairs: [['-', 'Regular file'], ['d', 'Directory'], ['l', 'Symbolic link'], ['c', 'Character special'], ['b', 'Block special'], ['p', 'Named pipe'], ['s', 'Socket']] },
          { type: 'pick', steps: [
            P('<code>brw-rw---- 1 root disk 8, 0 /dev/sda</code>. What are 8 and 0?', 'The major and minor numbers, which identify the device driver.', 'Major and minor numbers', 'Size and links', 'User and group IDs', 'Day and month'),
            P('Which file type lets two processes on different machines communicate?', 'Sockets: used by web browsers to reach web servers.', 'Socket', 'Named pipe', 'Block special', 'Regular file'),
            P('Which file type is a popular form of IPC between processes via a file that acts like a pipe?', 'A named pipe.', 'Named pipe', 'Socket', 'Directory', 'Character special'),
            P('Which command tells you whether a regular file is a binary program, a script or a library?', 'file.', '<code>file</code>', '<code>cat</code>', '<code>wc</code>', '<code>type</code>')] }],
        rv: [['Shortcut wagon', 'Symbolic link', 'Points to another file. Created with ln -s source destination.'], ['Device wagons', 'Character and block special files', 'Under /dev. Character: one character at a time ("raw"). Block: large blocks, e.g. hard drives.']],
        qz: [L(7, 'Device Files')('Block special files typically represent:', 'Hard drives and removable media.', 'Hard drives and removable media', 'Keyboards', 'Shell scripts', 'Directories'),
          L(7, 'Symbolic Links')('A symbolic link\'s relative target is relative to:', 'The directory where the link resides.', 'The directory where the link is', 'Your current directory', 'The root', 'Your home'),
          L(7, 'Named Pipes')('In <code>who | grep rbarrett</code>, what does the | do?', 'Pipes the output of who into grep.', 'Sends who\'s output into grep', 'Runs them in parallel', 'Separates two commands like ;', 'Hides the output'),
          L(7, 'Device Files')('Where are device files usually located?', '/dev.', '/dev', '/bin', '/home', '/etc/profile')] },

      { id: '7.5', n: 'Yard audit', k: 'b', L: 'technical',
        brief: [['tally', 'Snag has jumbled the yard. Fix every mistake.']],
        pz: { type: 'pick', steps: [
          P('<code>cp work docs</code> where work is a directory. What happens?', 'cp: work: is a directory.', 'An error: work is a directory', 'work is copied into docs', 'docs is deleted', 'A link is made'),
          P('<code>rm res.01 res.02 res.03</code> where res.02 does not exist. What happens to the others?', 'The error is reported and the other two files are removed.', 'res.01 and res.03 are removed', 'Nothing is removed', 'All three are removed', 'The directory is removed'),
          P('<code>cp res.01 work/ docs/ pub/</code>. Where does res.01 end up?', 'The last argument is the destination; it is copied to pub despite the errors.', 'In pub', 'In work', 'In docs', 'Nowhere'),
          P('You <code>cd /usr/local</code> then <code>cat names</code>, but names is in /home/rbarrett/docs. Result?', 'cat: cannot open names, because relative paths follow the current directory.', 'cat: cannot open names', 'The file is shown', 'The file is moved', 'You return home'),
          P('How can a deleted file be restored after <code>rm</code>?', 'It cannot: there is no way to recover a file deleted with rm.', 'It cannot be restored', 'With rm -u', 'From the trash', 'With undo'),
          P('Which command moves directories work and docs and the file .profile into pub?', 'mv accepts several sources and a destination directory.', '<code>mv work/ docs/ .profile pub/</code>', '<code>cp work docs .profile pub</code>', '<code>mv pub work docs .profile</code>', '<code>rmdir work docs</code>')] },
        rv: [['The yard tree', 'Directory tree', 'One root, /. Every file is in a directory, every directory except / in another.']],
        qz: [L(7, 'Unix Directories')('How does the UNIX directory tree differ from Windows?', 'UNIX has a single root (/); Windows mounts devices at the top level (multi-root).', 'UNIX has a single root', 'UNIX has one root per drive', 'UNIX has no directories', 'They are identical'),
          L(7, 'Moving Files and Directories')('What is the real purpose of <code>mv</code>?', 'To move files and directories between locations (renaming is a side use).', 'Moving files and directories in the tree', 'Deleting files', 'Copying files', 'Counting lines'),
          L(7, 'Removing Files (rm)')('<code>rm -i hw1 hw2 hw3</code> does what?', 'Asks for confirmation for every file.', 'Asks before deleting each file', 'Deletes without asking', 'Deletes directories only', 'Shows hidden files'),
          L(7, 'Copying Directories')('Which option lets <code>cp</code> copy a directory?', '-r.', '-r', '-i', '-a', '-F')] }
    ]
  });

  /* ---------------- World 8 · Lecture 7 (file attributes) ---------------- */
  window.KT_WORLDS.push({
    id: 8, name: 'Keys and Passes', guide: 'tally', week: 'Lecture 7 (part 2)', unit: 'Advanced Shell Scripting', topic: 'Permissions, SUID/SGID/sticky, chmod, chown, chgrp',
    intro: 'Every wagon carries three [[passes|permission sets]]: one for its [[crew|owner]], one for its [[depot team|group]], and one for [[everyone else|other]]. Each pass says whether you may [[look|read]], [[change|write]] or [[run|execute]].',
    outro: 'You can now read permission strings, use chmod in symbolic and octal form, and change owners and groups.',
    levels: [
      { id: '8.1', n: 'Reading a pass', k: 't', L: 'bridge',
        brief: [['tally', '<code>-rwxr-xr-x 1 rbarrett users 2368 Nov 11 15:57 .profile</code>'], ['tally', 'After the type character come three groups of three: owner, group, other. Read this one.']],
        pz: { type: 'pick', steps: [
          P('In <code>-rwxr-xr-x</code>, what can the [[crew|owner]] do?', 'rwx: read, write and execute.', 'Read, write and execute', 'Read only', 'Read and execute', 'Nothing'),
          P('What can members of the group <code>users</code> do?', 'r-x: read and execute.', 'Read and execute', 'Read, write and execute', 'Write only', 'Nothing'),
          P('Who owns the file, and which group is it in?', 'Owner rbarrett, group users.', 'Owner rbarrett, group users', 'Owner users, group rbarrett', 'Owner root, group users', 'Owner 2368, group 1'),
          P('A directory gives you only x. What can you do?', 'Run executable files in it, but not list or add/delete files.', 'Run files in it, but not list or change its contents', 'List and delete files', 'Nothing at all', 'Add files only'),
          P('Which directory permission is the one "to watch out for"?', 'Write lets a user add and remove files.', 'Write: it lets users add and delete files', 'Read', 'Execute', 'None of them')] },
        rv: [['Look, change, run', 'r, w, x', 'Read views the file. Write alters it. Execute runs it; on a directory, x grants access.'], ['Three passes', 'Owner, group, other', 'Read left to right after the file type character.']],
        qz: [L(7, 'Directory Permissions')('A file is in a directory with write and execute for owner, group and other. The file is:', 'Insecure, whatever the file\'s own permissions.', 'Insecure, whatever its own permissions', 'Safe if the file is read-only', 'Safe', 'Hidden'),
          L(7, 'Directory Permissions')('Read permission on a directory lets users:', 'Use ls to view the files and their attributes.', 'Use ls to list its files', 'Delete its files', 'Run its programs', 'Change its owner'),
          L(7, 'Owners, Groups and Permissions')('Which three permission sets does every file have?', 'Owner, group, other (world).', 'Owner, group and other', 'Read, write, execute only', 'User, admin, root', 'Local, remote, global'),
          L(7, 'Directory Permissions')('If a file has write permission for owner, group and other, it is:', 'Insecure.', 'Insecure', 'Secure', 'Hidden', 'A directory')] },

      { id: '8.2', n: 'The lever frame', k: 't', L: 'bridge',
        brief: [['tally', 'This lever frame sets a wagon\'s passes: nine levers, three per row. Each card shows a file\'s passes and a <code>chmod</code> command. Set the levers to the result.'],
          ['tally', 'Symbolic mode (<code>go-w</code>, <code>a+x</code>, <code>a=r</code>) only changes what it names; <code>=</code> sets exactly. Octal mode sets everything: r is 4, w is 2, x is 1.']],
        pz: { type: 'perm', say: 'Set the levers. The readout shows the string and octal value as you go.', hint: 'Work one row at a time. Octal digits: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--, 0 = ---.',
          tasks: [{ from: '-rw-rw-rw-', cmd: 'go-w', file: '.profile' }, { from: '-rw-------', cmd: 'a+x', file: 'a.out' }, { from: '-rwxrwxrwx', cmd: '754', file: 'report' },
            { from: '-rwx------', cmd: 'a=r', file: 'notes' }, { from: '-rwxr-xr-x', cmd: '0600', file: '.profile' }] },
        rv: [['Letters on the lever', 'Symbolic chmod', '(who)(action)(permissions): u g o a, + - =, r w x s.'], ['Numbers on the lever', 'Octal chmod', 'r=4, w=2, x=1 added per set. Octal SETS permissions, it cannot add or remove.']],
        qz: [L(7, 'Octal Method')('What octal digit means read and write, no execute?', '4 + 2 = 6.', '6', '7', '5', '3'),
          L(7, 'Common Errors Using Octal Method')('Why is <code>chmod 0600 .profile</code> not the same as <code>chmod u+rw .profile</code>?', 'Octal sets permissions: it also removes group and other permissions and the owner\'s x.', 'Octal sets all bits, removing others\' and the owner\'s x', 'They are identical', 'u+rw removes everything', 'Octal only works on directories'),
          L(7, 'Symbolic Method')('<code>chmod guo+rx *</code> and <code>chmod uog+xr *</code> are:', 'Equivalent: letter order is irrelevant.', 'Equivalent', 'Different', 'Both errors', 'Only valid as root'),
          L(7, 'Symbolic Method')('Which symbolic command denies group and other all access to your files?', 'chmod go= * or chmod go-rwx *.', '<code>chmod go-rwx *</code>', '<code>chmod a+rwx *</code>', '<code>chmod u= *</code>', '<code>chmod go+rwx *</code>')] },

      { id: '8.3', n: 'Issue the passes', k: 'p', L: 'technical',
        brief: [['tally', 'At the console now. Type each chmod, chown and chgrp command.']],
        pz: { type: 'term', tasks: [
          T('Stop anyone except the owner from writing to <code>.profile</code> (symbolic).', 'chmod go-w .profile', ''),
          T('Give the world read access to all files in this directory, octal form.', 'chmod 0444 *', '', /chmod 0?444 \*/),
          T('Make <code>.profile</code> read/write for the owner only, octal form.', 'chmod 0600 .profile', '', /chmod 0?600 \.profile/),
          T('Remove group and world write on <code>a.out</code> and add execute for everyone, in one command.', 'chmod go-w,a+x a.out', '', /chmod (go|og)-w,a\+x a\.out/),
          T('Give others read access to <code>pub</code> and everything under it.', 'chmod -R o+r pub', ''),
          T('Change the group of <code>/home/rbarrett/docs/ch5.doc</code> to <code>authors</code> with chgrp.', 'chgrp authors /home/rbarrett/docs/ch5.doc', ''),
          T('Do the same with chown instead.', 'chown :authors /home/rbarrett/docs/ch5.doc', ''),
          T('Make rbarrett the owner of <code>/home/httpd/html/users/rbarrett</code> and everything under it.', 'chown -R rbarrett: /home/httpd/html/users/rbarrett', '', /chown -R rbarrett:? \/home\/httpd\/html\/users\/rbarrett/),
          TP('What octal number is <code>rwxr-xr-x</code>?', '755', /0?755/),
          TP('<code>ls -l /usr/bin/passwd</code> shows <code>-r-sr-xr-x</code>. Which special bit does the s show?', 'SUID', /SUID|suid|Set User ID|set user id/)] },
        rv: [['Changing the crew', 'chown user:group files', 'Root can change any owner. A normal user can only give away files they own.'], ['Changing the depot team', 'chgrp group files', 'Or chown :group for portability.']],
        qz: [L(7, 'Changing Ownership Restrictions')('You give a file to another user with chown. Can you take it back yourself?', 'No. Only the new owner or root can return it.', 'No, only the new owner or root can', 'Yes, any time', 'Only with chmod', 'Only with chgrp'),
          L(7, 'Changing Owners and Groups')('For maximum portability, which command should you use to change both owner and group?', 'chown.', 'chown', 'chgrp', 'chmod', 'ln'),
          L(7, 'Changing Ownership Restrictions')('Why is chown sometimes disabled for normal users?', 'With disk quotas, giving files away would free up a user\'s quota.', 'Disk quotas could be dodged by giving files away', 'It is too slow', 'It deletes files', 'It needs a network'),
          L(7, 'Symbolic Method')('Which option makes chmod change every file in subdirectories too?', '-R.', '-R', '-r', '-a', '-i')] },

      { id: '8.4', n: 'Special passes', k: 't', L: 'technical',
        brief: [['tally', 'Some programs need more than the user\'s own pass. <code>passwd</code> must write <code>/etc/shadow</code>, which normal users cannot touch.']],
        pz: { type: 'pick', steps: [
          P('When you run a program with the SUID bit set, you get:', 'The permissions of the program\'s owner.', 'The permissions of the program\'s owner', 'Your own permissions only', 'No permissions', 'The group\'s permissions'),
          P('Where does the SUID <code>s</code> appear in <code>ls -l</code>?', 'In the owner\'s execute position.', 'In the owner\'s execute position', 'In the first character', 'In the other\'s read position', 'After the file name'),
          P('A capital <code>S</code> instead of a lowercase <code>s</code> means:', 'The execute bit is not set.', 'The execute bit is not set', 'The file is a socket', 'The sticky bit is set', 'The file is hidden'),
          P('A directory has the sticky bit set. Who can remove a file in it?', 'The directory\'s owner, the file\'s owner, or root.', 'The directory owner, the file owner, or root', 'Anyone with write permission', 'Nobody', 'Only the group'),
          P('A directory has SGID set. A new file added to it gets:', 'The directory\'s group.', 'The directory\'s group', 'The writer\'s group', 'No group', 'Group root always'),
          P('In octal, which values do SUID and SGID take, placed in front of the normal digits?', 'SUID 4, SGID 2.', 'SUID 4, SGID 2', 'SUID 1, SGID 2', 'SUID 7, SGID 6', 'SUID 2, SGID 4')] },
        rv: [['Borrowed pass', 'SUID / SGID', 'Run with the owner\'s (SUID) or group owner\'s (SGID) permissions. passwd is owned by root with SUID.'], ['Shared yard rule', 'Sticky bit', 'In a writable shared directory (e.g. temporary or upload directories), only owners or root may delete files.']],
        qz: [L(7, 'SUID and SGID File Permission')('Which file does passwd write your new password to?', '/etc/shadow.', '/etc/shadow', '/etc/profile', '.profile', '/dev/tty0'),
          L(7, 'SUID and SGID File Permission')('For which directories should you consider the sticky bit?', 'Directories non-privileged users can write, such as temporary and upload directories.', 'Shared writable directories such as temporary ones', 'Your home directory only', '/bin', 'Every directory'),
          L(7, 'Symbolic Method')('Which command sets SUID and SGID on your home directory?', 'cd ; chmod ug+s .', '<code>cd ; chmod ug+s .</code>', '<code>chmod 777 ~</code>', '<code>chown -s ~</code>', '<code>chgrp s ~</code>'),
          L(8, 'Process Permissions')('By default, a process runs with the permissions of:', 'The user running it.', 'The user who runs it', 'Root', 'The file\'s group', 'Nobody')] },

      { id: '8.5', n: 'Locked out', k: 'b', L: 'technical',
        brief: [['tally', 'Snag has jammed the lever frame. Set every pass exactly. Five mistakes and Snag wins.']],
        pz: [{ type: 'perm', say: 'Set the levers to the result of each command.',
          tasks: [{ from: '-rwxrwxrwx', cmd: 'go-w,a+x', file: 'a.out' }, { from: '-r--r--r--', cmd: 'u+rw', file: '.profile' }, { from: '-rw-r--r--', cmd: '0444', file: 'hosts' }, { from: '-rwxrwxrwx', cmd: 'go=', file: 'diary' }] },
          { type: 'pick', steps: [
            P('A shared upload directory: users keep deleting each other\'s files. What fixes it?', 'The sticky bit: only owners or root may delete.', 'Set the sticky bit', 'chmod 777 the directory', 'Remove the x bit', 'Set SUID on every file'),
            P('Which octal setting makes a script runnable by everyone and writable only by its owner?', 'rwxr-xr-x = 755.', '755', '777', '644', '700')] }],
        rv: [['The whole frame', 'chmod, chown, chgrp', 'Symbolic changes what it names; octal sets all nine bits; -R recurses.']],
        qz: [L(7, 'Octal Method')('Which octal mode gives everyone read access only?', '4 for each set.', '0444', '0777', '0600', '0111'),
          L(7, 'Symbolic Method')('<code>chmod a=r *</code> is the same as:', '<code>chmod guo=r *</code>.', '<code>chmod guo=r *</code>', '<code>chmod u+r *</code>', '<code>chmod go-r *</code>', '<code>chmod a-r *</code>'),
          L(7, 'Changing File and Directory Permissions')('Two ways to write a chmod expression are:', 'Symbolic and octal.', 'Symbolic and octal', 'Binary and hex', 'Absolute and relative', 'Simple and compound')] }
    ]
  });
})();
