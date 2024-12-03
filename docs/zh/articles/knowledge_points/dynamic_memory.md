# 禅与动态内存管理
> 您希望下个月的早餐、午餐和晚餐吃些什么？在第三天的晚餐喝多少盎司的牛奶？在第 15 天的早餐中需要在麦片中添加多少葡萄干？如果您与大多数人一样，就会等到进餐时再做决定。
> 
> ——《C++ Primer Plus》，第 12 章。

开一个超大号的数组，然后祈祷程序需要处理的数据不会超过这个数组的范围，这种做法显然既不经济（浪费内存）也不安全（可能溢出）。有了能直接操纵内存空间的工具——指针，我们可以用更灵活的方式管理内存，做到既避免溢出，也减少浪费。

## 静态内存，自动内存与动态内存
在所有函数之外声明的变量，即**全局变量**所占用的内存空间称为**静态内存**。这些内存在程序开始执行时即被分配，在程序结束运行后才会被释放。

在函数里面声明的变量，称为**自动变量**，这类变量占用的内存空间称为**自动内存**。这些内存的分配和释放跟随变量的生命周期。

以上两类内存的大小都是在**编译时**就确定的，管理它们也不需要程序员单独写代码操作。此外还有一类内存空间，它直接受程序员的支配，由程序员使用函数分配和释放。这样的内存称为**动态内存**。对动态内存的管理称为**动态内存管理**。利用动态内存管理，我们可以在程序**运行时**分配和释放内存，决定某些存储空间的大小，提高内存的利用效率。

关于变量作用域，声明周期的更多内容，可以看[这里](./variable.md)。

## 用于动态内存管理的函数

### `malloc()`
`malloc()`函数定义在`<stdlib.h>`头文件中。其函数定义如下：
```C
void* malloc(size_t size) 
//分配一块 size 字节的连续内存，返回一个指向这块内存的 void* 指针。
```
`size_t`数据类型是一个足够大的无符号整数，其实际大小依赖于编译器的具体实现。就使用而言，直接传入一个`int`值即可。

下面的代码展示了如何用`malloc()`分配一块内存空间用于存储一些 int 整数：
```C
#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);
    int* p = (int*)malloc((n + 10) * sizeof(int)); //分配能存储 (n + 10) 个 int 变量的内存，使用指针 p 来访问。
    for (int i = 0; i < n; ++i) {
        scanf("%d", &p[i]);                        // &p[i]和 (p + i) 没有区别。&p[i] 这样的写法会让访问看起来更像是数组。
    }
    //......
    return 0;
}
```
下面是使用`malloc()`时几个要注意的点：
1. 总是使用`sizeof()`运算符。尽管大多数机器上`int`变量都占据 4 个字节，在上面的代码中把 `sizeof(int)` 替换成 4 可能也不会有什么明显的问题，但是为了预防潜在的错误，仍然建议使用`sizeof()`运算符。
2. 适当多分配一点内存。如果你不想到处查找 REG: SIGSEGV 错误出现的原因的话，适当多分配一些内存，留出一点余量比出错了再修改更好。示例代码写了 (n + 10) 而不是 n 就是这个原因。
3. 总是使用强制类型转换。`malloc()`函数并不清楚你打算把它分配的内存作何用途，因此它返回一个 `void*`指针。尽管把这个返回值直接赋给任何指针都不会出现编译错误，但是为了预防潜在的问题（例如不小心把打算用于存储`int`变量的内存赋给了一个`float*`指针），建议在赋值前对`malloc()`函数的返回值进行强制类型转换。
4. 保管好指针`p`。`malloc()`函数分配的内存可以且只可以被指针访问。如果你把`p`赋给另一个指针`q`，你也可以通过`q`改写这块内存。但是，如果你丢失了指向这块内存的所有指针（比如错误地把这些指针都赋值为了`NULL`），那么你就再也无法访问这块内存了。

如果，很不幸地，你的计算机没有更多的内存可供`malloc()`分配了，那么它的返回值将是`NULL`。

### `calloc()`
`calloc()`函数定义在`<stdlib.h>`头文件中。其函数定义如下：
```C
void* calloc(size_t nitems, size_t size) 
//分配一块刚好容纳 nitems 个 size 字节的对象的连续内存，将这块内存的每一位都设为 0，返回一个指向这块内存的 void* 指针。
```
`calloc()`函数的功能与`malloc()`函数几乎相同，仅仅是多了初始化内存为 0 的步骤。因此它的使用方法与`malloc()`也基本相同。直接看例子：
```C
#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);
    int* p = (int*)calloc((n + 10), sizeof(int)); //分配能存储 (n + 10) 个 int 变量的内存，初始化为 0，使用指针 p 来访问。
    for (int i = 0; i < n; ++i) {
        scanf("%d", &p[i]);
    }
    //......
    return 0;
}
```
与`malloc()`相同，在`calloc()`找不到更多可供分配的内存时，它会返回`NULL`。

### `free()`
`free()`函数定义在`<stdlib.h>`头文件中。其函数定义如下：
```C
void free(void* ptr)
//尝试释放 ptr 指向的内存。
```
`free()`函数将起初由`malloc()`或`calloc()`分配的内存归还给操作系统，允许它们再次被分配或者被其他程序使用。

**应该且只应该**把指向起初由`malloc()`或`calloc()`分配的内存的指针作为`ptr`传递给`free()`。C 语言标准没有规定`free()`在被传入错误的指针时应该做什么，因此这是未定义行为，可能产生相当危险的后果。然而，`free(NULL)`是安全的，这时`free()`不会做任何事。

被`free()`过的指针成为“野指针”（指向不属于自己的程序的内存的指针），在对其重新赋值之前**不应该**再使用它。实际上，如果这个指针不会再被使用，安全的方法是将其赋值为`NULL`。

C 语言标准也没有规定对已经被`free()`过的指针再次使用`free()`会发生什么，因此这也是未定义行为。总之，**不要这样做**。

以下是一个使用例：
```C
#include <stdio.h>
#include <stdlib.h>
int main() {
    int n;
    scanf("%d", &n);
    int* p = (int*)calloc(n + 10, sizeof(int));
    //do something
    free(p);        //归还内存
    p = NULL;       //保证 p 不再指向已经被释放的内存
    return 0;
}
```

### `realloc()`
`realloc()`函数定义在`<stdlib.h>`头文件中。其函数定义如下：
```C
void* realloc(void* ptr, size_t size)
// 调整 ptr 指向的动态内存为 size 字节大小，返回指向调整后内存的 void* 指针。
```
传递给`realloc()`的指针`ptr`应该指向起初由`malloc()`或`calloc()`分配的内存，`realloc()`尝试调整这部分内存的大小为`size`字节。  
*具体地说，`realloc()`会先尝试在不改变`ptr`指向的位置的情况下，调整`ptr`指向的内存空间的大小。如果失败了（比如`ptr`指向的内存后面的一段已经被其他的`malloc()`分配），`realloc()`就会尝试在内存的其他位置寻找新的可用连续内存进行分配，如果仍然失败，则不对原始内存做任何改动，并返回`NULL`。无论`realloc()`调整成功还是失败，原来存储的数据都**不会**被破坏。*

如果`ptr`为`NULL`，此时`realloc(ptr, size)`等价于`malloc(size)`。

如果`size`为 0 ，此时`realloc(ptr, size)`等价于`free(ptr)`。

可以对一块内存多次使用`realloc()`。

下面是使用例：
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
执行结果为：
```
> Hello
> HelloWorld
```
可见`realloc()`让`p`指向的内存增长了，腾出了空间容纳`str2`。

## 内存泄露
考虑这样的代码：
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int n;
    char* p;
    while (scanf("%d", &n) != EOF) {
        getchar();  //接收输入 n 后按下的回车
        p = (char*)calloc(n + 10, sizeof(char));
        scanf("%s", p);
        getchar();  //接受字符串行尾的回车
        //做处理
        printf("%s\n", p);
    }
    return 0;
}
```
这段代码每次读取一个数字`n`，随后读取一个`n`个字符的字符串，并对其做处理。看起来很好，但是你发现什么不对了吗？

真糟糕！每次输入一个字符串时，我们都会用`calloc()`开辟新的内存空间存储这个字符串，此时我们对`p`重新赋了值，也就是说，我们丢失了指向之前分配的内存的指针——我们永远失去它了！

更糟的是，我们每次输入新的字符串时，都会向操作系统申请新的内存，但我们并没有在使用后归还它们（实际上，因为我们丢失了指向它们的指针，我们也无法归还它们了），这会造成程序白白占用的内存越来越多，甚至可能引发 OutOfMemory 错误。

这种情况就被称为**内存泄露**（Memory Leak）。

显然，避免内存泄露在编程时是非常重要的。避免内存泄露的最简单办法就是正确地使用`free()`，及时释放内存。比如像这样修改上面的错误代码：
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int n;
    char* p;
    while (scanf("%d", &n) != EOF) {
        getchar();  //接收输入 n 后按下的回车
        p = (char*)calloc(n + 10, sizeof(char));
        scanf("%s", p);
        getchar();  //接受字符串行尾的回车
        //做处理
        printf("%s\n", p);
        free(p);    //向操作系统归还已经使用完的内存
        p = NULL;   //防止归还的内存再被意外访问
    }
    return 0;
}
```
当然，如果程序执行结束，其使用的内存会被全部归还。因此，在平时的练习中遗漏`free()`可能不会产生大的问题。然而，还是应该尽量养成正确使用`free()`的好习惯。
## 栈，堆与 VLA
自动内存所在的区域也被称为**栈区**或**栈**（Stack），动态内存所在的区域一般也被称为**堆区**或**堆**（Heap）。其区别如下：
1. 栈的容量比堆要小。默认情况下栈的大小一般为 1MB，2MB或者接近的值，而堆的大小几乎只受设备内存本身的限制。因此，在函数内部开辟很大的数组（如`int a[1000000]`）会引发 StackOverFlow 错误，而在堆开辟内存基本不受什么限制。（静态内存区也不受什么限制，因此你可以开辟很大的全局数组）
2. 栈的访问效率比堆要高。

初学者容易写出这样的 C 代码：
```C
//......
int n;
scanf("%d", &n);
int a[n]; //VLA
//......
```
这实际上是 C99 标准中引入的可变长数组（Variable Length Array, VLA）语法。其允许用运行时才能确定值的变量（而不是编译时可确定的常量）创建数组。这种语法自从加入 C 后就饱受争议。不同的编译器对这种语法的实现并不相同：
1. 大部分编译器（如gcc）在栈上开辟内存空间来实现 VLA，这使 VLA 的表现与普通数组几乎一致。然而，如果输入了非常大的 n 值（如1,000,000），VLA 很有可能直接耗尽栈空间，引发 StackOverFlow 错误，这是十分危险的。因此这也成为反对者攻击 VLA 的一大理由。
2. 某些编译器使用类似于`malloc()`的方式在堆上分配空间实现 VLA。尽管这解决了 VLA 容易引发 StackOverFlow 错误的问题，但是会导致 VLA 的表现和普通数组不完全一致，引发潜在的兼容性问题。
3. 某些编译器（如msvc）拒绝支持 VLA。这种情况下，上面的代码会直接引发一个编译错误。

总而言之，**不要使用 VLA**。如果真的需要动态分配内存，使用上面的`malloc()`等函数代替。