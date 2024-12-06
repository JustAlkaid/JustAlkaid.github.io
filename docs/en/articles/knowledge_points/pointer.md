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
Arrays and pointers are two **different** data types. However, due to certain design features of C, array names can often be used as pointers as well.

1. In the vast majority of expressions that require an address, the array name is implicitly converted to a pointer to its first element:
    ```C
    char a[10] = “bilibili”;
    char* p = a;        //a is converted to &a[0], so this line is actually char* p = &a[0]
    ```
    The situation is pretty much the same for multidimensional arrays, except that it produces array pointers:
    ```C
    char a[2][10] = {“Hello”, “World”};
    char (*p)[10] = a;  // actually char (*p)[10] = &a[0]
    printf(“%s”, p[1]);
    ```
    Result:
    ```C
    > World
    ```
