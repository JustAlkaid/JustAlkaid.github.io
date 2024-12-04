## Breakpoint debugging

## Debugging with the IDE's debugging tools

I believe you already know how to use printf for debugging, but using printf for debugging requires you to repeatedly paste printf to different places, and a piece of code can only check the values of some variables, isn't it a big trouble? So, is there a tool that can detect the value changes of all variables in real time?

Of course there is! All IDEs have debugging tools, and the basic function of a debugger is to interrupt a fast-running program and make it execute according to the user's wishes. The debugger does this by forcing the target program to fire a carefully constructed exception. In other words, with the debugger's capabilities, you will be able to watch all the variables change from one line of code to the next with great efficiency. The following is an example of how to use the debugger with VSCode.

### Setting breakpoints
Click on the blank space on the left side of the code line number to set a breakpoint. You will see a red dot indicating that a breakpoint has been set. You can set multiple breakpoints at multiple locations, and the debugger will pause when it reaches those breakpoints.

### Start debugging
Select the debugging configuration you want in the Run panel. Click the green Start Debugging button (or press F5) to start a debugging session. Code execution will pause at the breakpoints, and you can view information about variables, the stack, memory, and so on.

### Debugging Console
Once the debug session is started, you will see VSCode's debug console, which displays the program's output, error messages, and other debugging information. You can enter commands in the console to see the current values of variables and even modify them.

#### common debugging operations:
Continue (F5 or click “Continue” button): the program will continue to execute from the current breakpoint until the next breakpoint.
Single-step execution (F10): Execute the current line of code without going inside the function.
Single-step in (F11): Executes the current line of code and goes inside the function.
Jump out (Shift + F11): Jump out of the current function.
Stop Debugging (Shift + F5): Stop the debugging session.

### Viewing Variables, Call Stacks, and Monitoring
Variables: During debugging, the “Variables” panel on the left shows all variables in the current scope. You can view their values.  
Another simpler approach is to find the variable you want to watch directly in your code, and later hover over it, wait a bit, and a hover window will appear showing the variable's value. This approach can also be used to see the values of variables and global variables that still exist in other functions. It should be noted that it only makes sense to keep track of variables that are in the life cycle. If you try to read the value of a variable that has not been defined or has been destroyed, it is meaningless, even if it is read.  

Call Stack: In the “Call Stack” panel, view the stack frame of the currently called function, which can help you trace the execution path of the program.  
Note that during recursive execution of a function, each call to the function generates a new stack frame, which can lead to very exaggerated display contents.  

Watch: You can manually add variables or expressions in the “Watch” panel to monitor their value changes in real time.

So which is better, printf or breakpoints? The answer is, of course, that both are useful.
Breakpoint debugging is better suited for complex logic problems, errors that are difficult to reproduce. Scenarios where you need to check the function call stack, observe variable changes, or debug without modifying the code, while printf debugging is more used for quickly checking simple program problems or specific variable values, as well as simple scripts, and quickly verifying code blocks. One point to note is that, since the breakpoint debugging is related to the files in the IDE, there is a probability (the probability is small, but not impossible) that the breakpoint debugging will go wrong, resulting in misdirection during the program design process, which needs to be analyzed calmly, and if necessary, you can verify the correctness of the debugging with printf.