# Redirection of standard input and output

Sometimes you may want to enter quite a lot of test data for your code at once, so much so that copying and pasting seems too complicated. Well, try redirecting standard input and output.

## Implementing input/output redirection in code
You can use the freopen statement. E.g., if you want to read data from 1.in and write data to 1.out, use:

```C
freopen(“1.in”, “r”,stdin);
freopen(“1.out”, “w”,stdout);
//your code
fclose(stdin); fclose(stdout); 
fclose(stdin); fclose(stdout); 
```
Then write your test data to 1.in, execute the program, and you can read the output from 1.out.

## Implementing input/output redirection in the run window
The greater-than sign indicates where to write the output data to, and the less-than sign indicates where to read the data from, e.g.:

`C:\... \filename.exe < test.in > test.out`.

This is equivalent to reading data from test.in and writing data to test.out.
Do this in cmd or powershell.