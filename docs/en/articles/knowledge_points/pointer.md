# 12 Questions to understand Pointers

## What is a pointer?
A pointer is a variable that stores a **memory address**. The **value** of a pointer variable is called **the memory address that the pointer points to**. If the memory address pointed to by the pointer belongs to a variable, we say that the pointer **points to that variable**.

```C
int a = 114514;
int* p = &a;         //Use the address operator & to get the memory address of variable a, then assign this address to the int*-type pointer variable p
printf("%#010x", p); //Output the value of p in hex, starting with 0x and including at least 10 characters, including 0x.
```
Result:
```C
> 0x00f3fe3c
```
(may be different for each execution)

## How do you define a pointer?
Add the `*` character to any normal data type to get a pointer derived from that data type.

```C
int* p;                             //created a pointer of type int*
double* a;                          //creates a pointer of type double*.

struct student{                     //If you don't know what a struct is, skip this.
    int age;
    char name[100];
};
typedef struct student student;
student* q;                         //Creates a pointer of type struct student*.

int *a;                             /* The placement of the space doesn't matter. It has been argued that 
                                     * this way of writing emphasizes that *a is an int-type variable, 
                                     * whereas the normal way of writing emphasizes that a is an int*-type variable.
                                     */
int *a, *b;                         //creates two int*-type pointers a and b
int* a, b;                          /* creates an int*-type pointer a and an int-type variable b. Therefore, 
                                     * when declaring pointers, the * character needs to appear in front of each pointer.
                                     */
```
## How much memory space do pointers take up?
It depends on the machine. Most computers today use 64-bit systems, where pointer variables take up 8 bytes. If your computer has a 32-bit system or uses a 32-bit compiler on a 64-bit system, the pointer variable will take up 4 bytes.  
*It is obvious that 4 bytes is exactly 32 bits and 8 bytes is exactly 64 bits.*

Pointer variables occupy memory independent of their type.

```C
int *ptr = NULL;
printf(“%zu”, sizeof(ptr)); //Use the sizeof operator to get the size of the memory space occupied by the pointer in bytes.
```

Result:
```C
> 4 (32-bit systems/compilers)
> 8 (64-bit systems and compilers)
```

*Out-of-topic: On 32-bit systems, a pointer occupies 4 bytes and has 2^32 = 4,294,967,296 possible values, and the CPU can access up to 4,294,967,296 different bytes with such a pointer variable.*  
*1KB = 1024byte, 1MB = 1024KB, 1GB = 1024MB. Calculations show that the maximum amount of memory available to a 32-bit CPU is no more than 4GB, which is far from enough for fast evolving software.*  
*With the development of the chip manufacturing technology, large memory capacity of more than 4GB became more and more common in the market and cheaper, and 32-bit systems were retired from the stage of history.*

## What does the type of a pointer indicate?
The type of a pointer variable determines the type of data stored on the memory address it points to; in other words, the type of a pointer variable tells the program how to interpret the data on that memory address.

```C
int* p = (int*)malloc(sizeof(int)); //allocate a chunk of memory the size of the int variable to the int*-type pointer p
//assume that this part of the code is running on a machine with a 4-byte int variable.
//p is of type int*, which tells the program to treat the byte pointed to by p and the next 3 bytes as an int variable.
```

Roughly speaking, if you want to know the type of a pointer, just remove its name from its definition and **keep all the other symbols**.  
*(Sigh) Yes, there's a lot of operator precedence and combinability going on here.*

```C
int* p;                                                          //type: int*
double** q;                                                      //type: double**
char (*a)[20]                                                    //type: char (*)[20]
int (*b)(int, int)                                               //type: int (*)(int, int)
float (*c)(long long, short, void (*)(const void*, const void*)) //type: float (*)(long long, short, void (*)(const void*, const void*))
```

*You get their type, but what's the point? This stuff is simply too complex for a human to understand. How about asking the AI?*  
*C++ allows programmers to directly replace these lengthy types with the `auto` keyword when initializing variables. Maybe it's time to switch to C++?*

## How to use pointers?
Use the dereference operator `*` on a pointer to get the value of the variable **pointed to by the pointer**.

```C
int a = 23333;
int* p = &a;        //the pointer stores the address of the variable a, or the pointer points to the variable a
printf(“%d”, *p);   //Outputs the value of the variable pointed to by the pointer, i.e., outputs the value of a.
```
Result:
```C
> 23333
```

Performing addition and subtraction on a pointer is essentially a shift of the location pointed to by the pointer, which is known as **pointer arithmetic**.  
Pointer arithmetic is affected by the type of the pointer variable. Each time you add 1 to a pointer, it is equivalent to moving the position of the pointer back one size of the “data type of the pointer”.

```C
int a[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

int* p = a;              //p points to the first address of a, or p points to a[0]
printf(“%d\n”, *p);         

printf(“%d\n”, *(p + 1));/* p is an int*-type pointer, p + 1 means that p points to a location one int variable size back.
                          * Therefore (p + 1) points to a[1], pay attention to the operator precedence here.
                          */

p = p + 2;               //move p back by 2 int variables, pointing to a[2].
printf(“%d\n”, *p);

--p;                     //move p forward 1 int variable size, pointing to a[1]
printf(“%d\n”, *p);

printf(“%d\n”, *p++);    /* Postponement of ++ takes precedence over dereferencing *, so *p++ is interpreted as *(p++).
                          * So the * operator uses the value of p before it is incremented, passing in a 1 for printf,
                          * After that, it performs the self-increment, p is moved back 1 int variable size, and p points to a[2].
                          * In short, if you don't know how the operators fit together, either use parentheses or don't write it that way.
                          */
printf(“%d\n”, *p); 
```
Result:
```C
> 0
> 1
> 2
> 1
> 1
> 2
```

Pointers to the same block of memory, of the same type, can be subtracted, and the result is the number of elements (in units of the type they point to) that differ between the two pointers. This is also a form of pointer arithmetic.
```C
int a[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
int* p = a;
int* q = a;
q += 6; printf(“%d”, “%d”)
printf(“%d”, q - p);
```
Result:
```C
> 6
```
This can be used to calculate the distance between two elements in an array.

Subtracting pointers that do not point to the same block of memory is undefined behavior, the result is unpredictable, and **should never be done**.  
Subtracting pointers of different types is undefined behavior. It triggers a warning on some compilers, others will trigger a compilation error outright.

## What are multiple pointers?
**A pointer pointing to another pointer** is known as a multiple pointer. The data type of a multiple pointer tells the program to treat the data stored in the memory space pointed by this pointer as a memory address as well.  
You can create dual, triple, or more multiple pointers as needed.

```C
char c = '!';
char* p1 = &c;
char** p2 = &p1;        //create a pointer p2 of type char**, which can be thought of as a char*-derived datatype
printf(“%c\n”, *p1);    //p1 points to c, *p1 is c, output the value of c (character)
printf("%#010x\n", *p2);//p2 points to p1, *p2 is p1, outputs value of p1 (memory address)
printf(“%c\n”, **p2);   //**p2 is *(*p2), which is *p1, and finally outputs the value of c (character)
```
Result:
```C
> !
> 0x005cf86b
> !
```
The address in the output may be different each time it is executed.

## Relationship between pointers and arrays
Arrays and pointers are two **different** data types. Take the following example:

```C
int a[10];
int* p = a;
printf(“%zu\n%zu”, sizeof(a), sizeof(p));
```
Result:
```C
> 40 (assuming int occupies 4 bytes on the device used)
> 4 (assuming 32-bit system/compiler)
```
As you can see, using the `sizeof()` operator on an array gives you the number of bytes occupied by the entire array, whereas using `sizeof()` on a pointer only gives you the number of bytes occupied by the pointer itself.

However, due to a series of C language designs (known as Array-to-Pointer Decay), array names can often be used as pointers as well.

1. In the vast majority of expressions that require an address, the array name is implicitly converted to a pointer to its first element:
    ```C
    char a[10] = “bilibili”;
    char* p = a;        //a is converted to &a[0], so this line is actually char* p = &a[0]
    ```
    The situation is pretty much the same for multidimensional arrays, except that it produces  pointers to arrays:
    ```C
    char a[2][10] = {“Hello”, “World”};
    char (*p)[10] = a;  // actually char (*p)[10] = &a[0]
    printf(“%s”, p[1]);
    ```
    Result:
    ```C
    > World
    ```
2. Arrays appearing in a function's formal parameter list are converted to pointers to the types their elements have. This means that the following three function prototypes are identical (for the compiler):
    ```C
    void printArray(int* array);        //pointer
    void printArray(int array[]);       //written as an array but omitting the length, treated as a pointer by the compiler
    void printArray(int array[16384]);  //written as an array and the length is specified, but the compiler ignores the length and treats it as a pointer
    ```
    Multidimensional arrays are **arrays whose elements are arrays**, so when they are written in a function's formal parameter list, they are considered to be pointers to arrays. Therefore the following three function prototypes are also identical:
    ```C
    void print2DArray(int (*arr)[4], int rows); //array pointer
    void print2DArray(int arr[][4], int rows);  //treated as an array pointer by the compiler
    void print2DArray(int arr[2][4], int rows); //also treated as an array pointer by the compiler
    ```

3. Array names appearing in a function's actual parameter list are also implicitly converted to pointers to their first elements:
    ```C
    void printArray(int array[]);
    //...
    int a[3] = {0, 1, 2};
    printArray(a);
    printArray(&a[0])       // Same as the previous line
    ```
    The situation is similar for multidimensional arrays, which are implicitly converted to pointers to arrays:
    ```C
    void print2DArray(int arr[][4], int rows);
    //...
    int a[2][2]= {{0, 1}, {2, 3}};
    print2DArray(a, 2);
    print2Darray(&a[0], 2); // same as previous rows
    ```

## Top-level const? Low-level const?
*My strategy of remembering: the keyword **nearest after** the `const` is a constant.*

This is the top-level `const`, which indicates that the value of the pointer itself (the memory address at which the pointer is stored) cannot be modified:.
```C
int a = 10;
int b = 20;
int* const p = &a; //top level const
*p = 64;           //modification of *p has nothing to do with the top-level const
p = &b;            //modifies the value of p (the memory address where p is stored), triggering a compile error
```
*the keyword nearest after the `const` is `p`, then `p` is a constant.*

This is the low-level `const`, which indicates a pointer to a constant.
```C
int a = 10;
const int b = 20;
const int* p = &b;  //low-lwvwl const
p = &a;             //modifying the value of p (the memory address where p is stored) has nothing to do with the low-level const
a = 8192;           /* there's no way to modify the value of a via *p, but a itself is not a constant and can be modified directly
                     * - so it doesn't make any sense if the underlying const pointer isn't pointing to a constant.
                     */
*p = 64;            //modifies the value of *p, triggering a compilation error.
```
*the keyword nearest after the `const` is `int*`, then `int*` is the constant.*

The two `const`s can also be used together.
```C
const int a = 64;
const int b = 256;
const int* const p = &a.
*p = 1; //that doesn't work
p = &b; //that doesn't work either
```
*Much simpler, isn't it?*

## Pointer to arrays? Or array of pointers?

A pointer to arrays is a **pointer** and an array of pointers is an **array**.  
In more detail, pointers to arrays are **pointers point to arrays** and arrays of pointers are **arrays whose elements are pointers**.  
*(sigh) Yes, there's a lot of operator precedence and combinability issues here too. *

```C
int (*a)[20];   // creates a pointer to arrays of type int(*)[20]
int* b[20];     // creates an array of pointers b whose every element is an int* pointer
```

As with other pointers, the type of a pointer to arrays tells the program that the memory address it points to should be interpreted as an array.

```C
int (*a)[20] = (int*[20])calloc(20, sizeof(int)); //*a is an array with 20 int elements
printf(“%d”, (*a)[5]);                            // access the 5th element of this array
```
Result:
```C
> 0
```

An array of pointers is **just** an array whose elements are pointers. That's all.
```C
int* p[10];                               //create an array p with 10 elements of type int*
for (int i = 0; i < 10; ++i) {
    p[i] = (int*)calloc(10, sizeof(int)); //allocate a block of memory for each element of p - the int* pointer
}
```

## Pass by value? Pass by pointer?
The presence of ordinary variables in a function's formal parameter list is called **pass by value**. In this case, the formal parameter is a copy of the value of the actual parameter, and changes made to the formal parameter inside the function do not affect the actual parameter.
```C
void modifyValue(int x) {
    x += 114514;
    x *= 1919;
}
int main() {
    int a = 1;
    modifyValue(a); //the modfiyValue() function does not have any effect on a in the main() function
    printf(“%d”, a); 
    return 0; 
}
```
Result:
```C
> 1
```

The presence of a pointer in the list of formal parameters of a function is called **passing by pointer**.
```C
void modifyValue(int* x) {
    *x += 114514;
    *x *= 1919;
}
int main() {
    int a = 1;
    modifyValue(&a); //the modfiyValue() function modifies a of the main() function
    printf(“%d”, a); 
    return 0;
}
```
Result:
```C
> 219752366
```

*Think about it, the pointer itself is passed by value - if you modify the value of the formal parameter x - so that it points to another block of memory, it certainly doesn't move the real parameter a from one part of memory to another.*  
*Whereas real parameters are passed by pointer - the modfiyValue() function gets the address of the real parameter a, and can modify the value of a via the pointer x.*   
*However, the main() function can do nothing but helplessly watch everything happen. :(*

There are several application scenarios for pass-by-pointer:

1. Passing by pointer allows a function to modify the value of a variable that does not belong to it. For example, the `scanf()` function requires the addresses of the variables to be passed in (also passed by pointer) so that it can modify the values of those variables with data obtained from standard input. In contrast, the `printf()` function does not need to modify the values of the incoming variables in order to output data to the standard output, so it uses pass-by-value.

2. A function can only return one value, if the function needs to output more than one value, you can utilize pass-by-pointer - add a few extra pointers to the function's parameter list, and just put in the values that can't be returned. For example, the `modf()` function in `<math.h>`:
    ```C
    double modf(double x, double* integer) /* decompose x into an integer part and a fractional part, return the fractional part, 
                                            * and set *integer to the integer part.
                                            */
    ```

3. If the data to be passed does not need to be modified, but its type is very complex, occupies a large amount of memory, then the transfer by value will require the CPU to take a lot of time to copy the data from one piece of memory to another - this is obviously not economical. This is where pass-by-pointer can be utilized by passing a `const` pointer to the function. The pointer variable itself takes up a small amount of memory, which saves time copying the data, and the `const` keyword prevents accidental modification of important data.
     ```c
    struct student{
        int num;
        int score;
        int age;
        char name[100];
    }; // Complex data types take up a lot of memory
    typedef sturct student student
    void printStudentInfo(const student* stu) { //pass in const pointer to save copying time and avoid accidental changes
        //do something
    }
    ```

To summarize:
- Passing by value is suitable for passing simple data types and data that don't need to be modified.
- Passing by pointer is suitable for passing complex data types, data that need to be modified, as well as for receiving multiple output values from the function. However, note that if you are passing complex data structures that do not need to be modified by pointers, always use `const` pointers to avoid accidental modifications.

## What is a void* pointer?
`void*` is a special type of pointer that tells a program **not to make any special interpretations** of the memory address pointed to by that pointer.  
```C
void* malloc(size_t size) /* The malloc() function doesn't know what you're going to do with the allocated memory,
                           * so it returns a void* pointer that says it doesn't make any interpretations about the data in this memory.
                           */
```
You **shouldn't** do anything with a `void*` pointer until you perform a type casting. It doesn't make sense to do anything other than a type casting (such as self-incrementing, self-decrementing, and dereferencing) with a `void*` pointer.

```C
int a = 1919810;
void* p = &a.
p++;                //Meaningless! Compile error, not allowed
printf(“%c”, *p);   //Meaningless! Compile error, not allowed
```

A `void*` pointer can be implicitly cast by the compiler to any pointer type (the casting is done automatically by the compiler and does not generate any compile warnings), and in turn, any other pointer can be implicitly cast by the compiler to a `void*` pointer. This can cause many dangerous problems, such as undefined behavior (behavior whose result is not explicitly specified in the C language standard and which may have undefined consequences).

```C
int a = 0721;       //this is actually an octal number
int* p = &a.
void* q = p;        //implicit type casting! No compile warnings were triggered
float* r = q;       //implicit type casting! No compile warnings were triggered
printf(“%f”, *r);   //Undefined behavior! The program tries to interpret an area of memory holding int data as a float integer
```

Therefore, it is recommended to always perform forced type casting on `void*` pointers.

The `void*` pointer is often used to design interfaces to various generic functions. An example is the familiar `qsort()` function:
```C
void qsort(void* base, size_t num, size_t size, int (*compare)(const void* a, const void* b));
```
The `qsort()` function can sort arrays of any data type, which takes advantage of the fact that the `void*` pointer `base` can be passed data of any data type. Just pass the size of each element in the array with the `size` parameter, and use the `compare()` function to specify the comparison method.

```C
struct student{                         //If you don't know what a struct is already, skip this
    int age;
    char name[100];
};
typedef struct student student;
//input data
int comp(const void* a, const void* b) { //create specific comp() function for each data type to be sorted
    return ((student*)a)->age - ((student*)b)->age; } 
}
qsort(&a, 100, sizeof(student), comp);
//qsort() doesn't actually know what it's sorting, it just knows that each sizeof(student) byte is a unit of data.
//Pass two data into the comp() function to know which is bigger, by which the sorting can be done.
```

## What is a function pointer?
A function pointer is also a pointer. But its data type tells the program to **interpret the memory address pointed to by this pointer as a function**.
```C
int add(int a, int b) {
    return a + b;
}
int (*p)(int a, int b) = add; //create a pointer p of type int(int, int)
```

Defining a function pointer is as simple as writing a correct function prototype and subsequently replacing the function name with `(*<pointer name>)` (note the parentheses; the combinatory nature of the operator makes this parenthesis necessary).

```C
//step 1
void processArray(int array[], int size);
//step 2
void (*ptr)(int array[], int size).
```

The type of a function pointer contains the type of return value and the list of formal parameters of the function it points to. Variable names, function names, etc. don't mean anything to a compiler (names are for programmers), so any of the following code defines a legal function pointer:
```C
int (*p)(int a, int b); //the compiler automatically ignores the variable names a and b
int (*q)(int, int);     //not much different from the previous one for the compiler, but much less human-friendly
```

Dereferencing a function pointer gives you the function itself it points to. Thus you can call a function with a function pointer. Note that due to the combining nature of the operators, you need to wrap the dereference operator and the pointer name in parentheses.

```C
int add(int a, int b) {
    return a + b;
}
int (*p)(int, int) = add;
printf(“%d”, (*p)(2, 3)); //dereference p, get the function add(), then pass in arguments 2 and 3
```
Result:
```C
> 5
```

The C language also provides a simplified way of writing functions that allows programmers to use function pointers like function names:
```C
int add(int a, int b) {
    return a + b;
}
int (*p)(int, int) = add;
printf(“%d”, p(2, 3)); // p(2, 3) is no different from (*p)(2, 3)
```
Result:
```C
> 5
```

The usage about function pointers is that they allow a function to be passed as an argument to another function, thus increasing the generality of the function. Still using the `qsort()` function as an example:
```C
void qsort(void* base, size_t num, size_t size, int (*compare)(const void* a, const void* b));;
```

Users can create their own comparison functions, and by passing in `qsort()` with a function pointer, they can have `qsort()` compare the elements in the array according to their own specified rules, and thus sort them.

*If a function is passed as an argument to another function in the form of a function pointer, that function is called a **callback function**.*