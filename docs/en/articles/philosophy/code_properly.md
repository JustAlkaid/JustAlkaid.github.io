## Make your program more readable

## Clear and concise naming
Naming conventions: variable names, function names, class names, etc. should be able to clearly express their purpose and function. Avoid names that are too short or ambiguous. Avoid names that are too short or ambiguous, except in special cases such as one-time-use loop iterator variables.  
One naming convention should be used consistently when naming (e.g., camel nomenclature, underscore nomenclature, etc. C is a strongly typed language and no one uses Hungarian nomenclature - Linux kernel development documentation). A brief description of the naming conventions can be found at the following website:

Link: https://blog.csdn.net/weixin_43758823/article/details/84888470
## Modularity and Functionality
Single duty principle: Each function or class should be responsible for only one task, avoiding one function doing too many things. Functions should be kept as short as possible and do only one thing.  
Splitting Complex Functions: When a function becomes too long, you should consider splitting it into multiple smaller functions.  
Avoid duplicate code: If the same code logic appears in multiple places, you should consider extracting it into separate functions or methods to reduce code duplication and improve maintainability.  
## Comments
Necessary comments: Try to minimize excessive comments, add comments only where the logic is complex or may confuse other developers, and make sure the comments help understand the intent of the code rather than repeating the meaning of the code.  
For example, comments like the following are bad:
```C
i = i + 1; // add 1 to i
```
And a comment like the following is good: (Question source C5-E)
```C
inline void printHanoi(int x, int q1, int q2) {
    printf(“Moca move otter %d from queue %c to queue %c\n”, x, que[q1], que[q2]);
}

void hanoi(int n, int q1, int q2) { // move the n uppermost discs of the Hanoi tower from the column numbered q1 to the column numbered q2
    if (n == 1) {
        printHanoi(1, q1, q2);
        return.
    }
    hanoi(n - 1, q1, 6 - q1 - q2); //first move the top n - 1 disks from the current column to the third column
    printHanoi(n, q1, q2); //then move the bottom disk from the current column to the target column
    hanoi(n - 1, 6 - q1 - q2, q2); //finally move the top n - 1 discs from the third column to the target column
    return.
}
```
Good annotations are especially useful when using recursion. Explicitly stating the meaning of a recursive function in a comment saves a lot of thinking and allows the writer to focus on the implementation logic itself without having to deeply analyze the process of calling the recursive function.
## Keep your code simple
Avoid over-design: Don't introduce complex design patterns or premature optimizations where they are not needed. Write code that meets your current needs and optimize it for future needs.  
Follow the KISS (Keep It Simple, Stupid) principle: Keep your code as simple as possible, avoiding complex control structures and multiple layers of nesting.  
## Follow coding standards
Unified coding style: Use a unified code style, adopt appropriate indentation (usually 2 or 4 spaces), use blank lines to separate logic blocks, follow the appropriate rules for the use of parentheses, and keep the code clear and tidy.