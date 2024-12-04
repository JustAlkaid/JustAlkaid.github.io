# Zen and Dynamic Memory Management
> What would you like to have for breakfast, lunch, and dinner next month? How many ounces of milk do you want to drink for dinner on Day 3? How many raisins do you need to add to your cereal for breakfast on Day 15? If you are like most people, you wait until mealtime to make decisions.
> 
> --C++ Primer Plus, Chapter 12.

The practice of opening an oversized array and then praying that the data the program needs to process doesn't exceed the bounds of that array is obviously neither economical (waste of memory) nor safe (possible overflow). With pointers, a tool for directly manipulating memory space, we can manage memory in a more flexible way, avoiding both overflow and waste.

## Static, Automatic and Dynamic Memory
The memory space occupied by variables declared outside all functions, i.e., **global variables**, is called **static memory**. This memory is allocated at the beginning of program execution and is freed only after the program has finished running.

Variables declared inside functions are called **automatic variables** and the memory space occupied by such variables is called **automatic memory**. The allocation and release of this memory follows the life cycle of the variable.

The sizes of both of these types of memory are determined at **compile time**, and managing them does not require the programmer to write separate code to manipulate them. There is also a class of memory space which is directly at the disposal of the programmer and is allocated and freed by the programmer using functions. Such memory is called **dynamic memory**. The management of dynamic memory is called **Dynamic Memory Management**. Using dynamic memory management, we can allocate and free memory at program **run time**, determine the size of certain storage spaces, and improve the efficiency of memory utilization.

For more on variable scoping, declaration cycles, see [here] (. /variable.md).

## Functions for dynamic memory management

### `malloc()`
The `malloc()` function is defined in the `<stdlib.h>` header file. Its function definition is as follows:
```C
void* malloc(size_t size) 
// Allocates a contiguous block of memory of size bytes, returning a void* pointer to this block.
```
The `size_t` datatype is a sufficiently large unsigned integer whose actual size depends on the specific implementation of the compiler. As far as usage is concerned, it is sufficient to pass in a `int` value directly.

The following code shows how to allocate a block of memory space for storing some int integer using `malloc()`:
```C
#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);
    int* p = (int*)malloc((n + 10) * sizeof(int));  //allocate memory capable of storing (n + 10) int variables, accessed using the pointer p.
    for (int i = 0; i < n; ++i) {
        scanf("%d", &p[i]);// There is no difference between &p[i] and (p + i). Writing &p[i] like this makes the access look more like an array.
    }
    //......
    return 0;
}
```
Here are a few points to keep in mind when using `malloc()`:
1. Always use the `sizeof()` operator. Although the `int` variable takes up 4 bytes on most machines, and replacing `sizeof(int)` with 4 in the code above probably wouldn't be an obvious problem, it is still recommended to use the `sizeof()` operator to prevent potential errors.
2. Allocate a little more memory where appropriate. If you don't want to look around for the cause of a REG: SIGSEGV error, it's better to allocate a little more memory to allow for a little margin than to change it after an error. The example code says (n + 10) instead of n for this reason. 3.
3. Always use forced type conversion. `malloc ()` function does not know what you intend to use the memory it allocates, so it returns a ` void * ` pointer. Although assigning this return value directly to any pointer will not result in a compilation error, to prevent potential problems (such as accidentally assigning memory intended for storing `int` variables to a `float*` pointer), it is recommended that you force a type conversion on the return value of the `malloc()` function prior to assignment.
4. Take care of the pointer `p`. Memory allocated by the `malloc()` function can and will only be accessed by pointers. If you assign `p` to another pointer `q`, you can also rewrite this memory via `q`. However, if you lose all the pointers to this memory (e.g., by incorrectly assigning them all to `NULL`), then you can no longer access this memory.

If, unfortunately, your computer has no more memory to allocate with `malloc()`, then its return value will be `NULL`.

### `calloc()`
The `calloc()` function is defined in the `<stdlib.h>` header file. Its function definition is as follows:
```C
void* calloc(size_t nitems, size_t size) 
// Allocate a contiguous block of memory holding exactly one size byte of objects of nitems, set each bit of this block to 0, and return a void* pointer to this block of memory.
```
The `calloc()` function is almost identical to the `malloc()` function, except for the extra step of initializing the memory to zero. Therefore, it can be used in much the same way as `malloc()`. Let's look at the example:
```C
#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);
    int* p = (int*)calloc((n + 10), sizeof(int)); //allocate memory capable of storing (n + 10) int variables, initialized to 0, accessed using pointer p.
    for (int i = 0; i < n; ++i) {
        scanf("%d", &p[i]);
    }
    //......
    return 0;
}
```
As with `malloc()`, `calloc()` returns `NULL` if it can't find more memory to allocate.

### `free()`
The `free()` function is defined in the `<stdlib.h>` header file. Its function definition is as follows:
```C
void free(void* ptr)
// Attempts to free the memory pointed to by ptr.
```
The ``free()`` function returns memory initially allocated by ``malloc()`` or ``calloc()`` to the operating system, allowing it to be reallocated or used by another program.

Pointers to memory initially allocated by `malloc()` or `calloc()` **should and only should** be passed to `free()` as `ptr`. The C language standard does not specify what `free()` should do when it is passed the wrong pointer, and so this is undefined behavior that can have quite dangerous consequences. However, `free(NULL)` is safe, at which point `free()` does nothing.

A pointer that has been `free()` becomes a `wild pointer` (a pointer to memory that doesn't belong to your program), and **shouldn't** be used again until it is reassigned. In fact, if the pointer is not going to be used again, it is safe to assign it to `NULL`.

The C language standard also does not specify what happens if you use `free()` again on a pointer that has already been `free()`, so this is also undefined behavior. In short, **don't do this**.

Here is a usage example:
```C
#include <stdio.h>
#include <stdlib.h>
int main() {
    int n;
    scanf("%d", &n);
    int* p = (int*)calloc(n + 10, sizeof(int));
    //do something
    free(p);        //return memory
    p = NULL;       //ensure that p no longer points to memory that has already been freed
    return 0;
}
```

### `realloc()`
The `realloc()` function is defined in the `<stdlib.h>` header file. Its function definition is as follows:
```C
void* realloc(void* ptr, size_t size)
// Adjusts the dynamic memory pointed to by ptr to size bytes, and returns a void* pointer to the adjusted memory.
```
The pointer `ptr` passed to `realloc()` should point to memory initially allocated by `malloc()` or `calloc()`, and `realloc()` tries to resize this memory to `size` bytes.  
*Specifically, `realloc()` first tries to resize the space of memory pointed to by `ptr` without changing the location pointed to by `ptr`. If that fails (e.g., the section of memory behind the one pointed to by `ptr` has already been allocated by another `malloc()`), `realloc()` then tries to find new available contiguous memory to allocate elsewhere in the memory, and, if that still fails, it leaves the original memory untouched and returns `NULL`. Whether the `realloc()` adjustment succeeds or fails, the originally stored data **will not** be destroyed.*

If `ptr` is `NULL`, then `realloc(ptr, size)` is equivalent to `malloc(size)`.

If `size` is 0, then `realloc(ptr, size)` is equivalent to `free(ptr)`.

It is possible to use `realloc()` multiple times on a block of memory.

Here is an example of usage:
```C
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char str1[] = "Hello";
char str2[] = "World";
int main() {
    char* p = (char*)malloc((1 + sizeof(str1)) * sizeof(char));
    strcpy(p, str1);
    printf("%s\n", p);
    p = (char*)realloc(p, strlen(str1) + strlen(str2) + 1);
    strcat(p, str2);
    printf("%s\n", p);
    free(p);
    return 0;
}
```
The result is:
```
> Hello
> HelloWorld
```
It can be seen that `realloc()` made the memory pointed to by `p` grow, making sure there is enough space to accommodate `str2`.

## Memory Leak
Consider code like this:
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int n;
    char* p;
    while (scanf("%d", &n) != EOF) {
        getchar();  //receive the '\n' return pressed after inputing n
        p = (char*)calloc(n + 10, sizeof(char));
        scanf("%s", p);
        getchar();  //receive the '\n' return pressed after inputing string
        //Do the processing
        printf("%s\n", p);
    }
    return 0;
}
```
This code reads a number `n` at a time, followed by a string of `n` characters and does something with it. It looks great, but do you see what's wrong?

It's awful! Each time we enter a string, we open up new memory space to store that string with `calloc()`, at which point we reassign a value to `p`, meaning that we lose the pointer to the previously allocated memory - we lose it forever!

To make matters worse, each time we type a new string, we request new memory from the operating system, but we don't return them after use (in fact, we can't return them because we've lost the pointer to them), which causes the program to take up more and more memory for nothing, and may even trigger an OutOfMemory error.

This is called a **Memory Leak**.

Obviously, avoiding memory leaks is very important when programming. The easiest way to avoid memory leaks is to use `free()` correctly and free the memory in time. For example, modify the above error code like this:
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int n;
    char* p;
    while (scanf("%d", &n) != EOF) {
        getchar();  //receive the '\n' return pressed after inputing n
        p = (char*)calloc(n + 10, sizeof(char));
        scanf("%s", p);
        getchar();  //receive the '\n' return pressed after inputing string
        //Do the processing
        printf("%s\n", p);
        free(p);     //return used memory to the operating system
        p = NULL;    //prevent the returned memory from being accessed accidentally.
    }
    return 0;
}
```
Of course, if the program's execution ends, all the memory it used will be returned. Therefore, omitting `free()` from your normal practice will probably not create a major problem. However, you should still try to get into the good habit of using `free()` correctly.

## Stacks, heaps and VLA
The area where automatic memory resides is also known as the **stack area** or **stack** , and the area where dynamic memory resides is also generally known as the **heap area** or **heap** . The differences are as follows:
1. The stack is smaller than the heap. By default the size of the stack is typically 1MB, 2MB or something close to that, whereas the size of the heap is limited almost exclusively by the device memory itself. Thus, opening a very large array inside a function (e.g., `int a[1000000]`) will raise a StackOverFlow error, whereas opening memory in the heap is largely unlimited. (There are also no restrictions on static memory areas, so you can open very large global arrays.)
2. The stack is more efficient to access than the heap.

It is easy for a beginner to write C code like this:
```C
//......
int n;
scanf("%d", &n);
int a[n]; //VLA
//......
```
This is actually the Variable Length Array (VLA) syntax introduced in the C99 standard. It allows arrays to be created from variables whose values are determined at runtime (rather than constants that are determined at compile time). This syntax has been controversial since it was added to C. Different compilers have different interpretations of this syntax. Different compilers have different implementations of this syntax. 1:
1. Most compilers (e.g., gcc) implement VLA by opening up memory space on the stack, which makes VLA behave almost identically to ordinary arrays. However, if a very large value of n is entered (e.g., 1,000,000), VLA is very likely to run out of stack space directly, triggering a StackOverFlow error, which is very dangerous. This is a very dangerous situation. This is one of the reasons why opponents attack VLA.
2. Some compilers implement VLA by allocating space on the heap in a manner similar to `malloc()`. Although this solves the problem that VLA is prone to StackOverFlow errors, it causes VLA to behave in a way that is not exactly the same as normal arrays, which is a potential compatibility problem.
3. Some compilers (e.g. msvc) refuse to support VLA, in which case the above code will simply throw a compilation error.

In short, **DON'T USE VLA**. If you really need to allocate memory dynamically, use a function such as `malloc()` above instead.