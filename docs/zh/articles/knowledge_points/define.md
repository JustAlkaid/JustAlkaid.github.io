# 百变宏定义
宏定义，即`#define`语句，有许多重要的用途。下面的文本简要介绍了关于宏定义的一些知识。

## 预处理
在 C 语言中，以 # 开头的语句被称为“预处理语句”，这些语句会在程序真正编译前，被一个名为“预处理器”的程序（一般由编译器负责调用）处理。  
例如，最常见的`#include`语句就是预处理语句。这个例子解释了其作用。
```C
#include <stdio.h> //将文件"stdio.h"的内容全部复制到本文件中
```
（实际上，在 gcc 编译器的实现下， stdio.h 是一个有 855 行的文件！）

宏定义语句同样也是预处理语句。下面来介绍它的功能。

## 无参宏定义
这是最简单的宏定义形式。其格式如下：
```C
#define <宏名> <宏内容>
```
这条指令告诉预处理器，在实际编译代码之前，找到代码中所有的<宏名>，将其替换为<宏内容>。（这个过程被称为“宏展开”）  
例如，下面的代码：
```C
#define MAX_N 1000 //预处理语句会在预处理结束后被删除
int main() {
    int a[MAX_N];
    return 0;
}
```
会在预处理后变为：
```C
int main() {
    int a[1000];
    return 0;
}
```

无参宏定义适合用来创建常量，方便代码的阅读，维护和修改，下面是一些 C 标准库中常见的无参宏定义：
```C
#define NULL ((void*)0)
#define EOF (-1)
#define M_PI 3.14159265358979323846
```
无参宏定义也可以用来简化代码，但是可能会降低代码的可读性。例如：
```C
#define LL long long
#define ULL unsigned long long
int main() {
    LL a;
    scanf("%lld", &a);
    printf("%lld", a);
    return 0;
}
```
根据需要，你也可以创建你自己的宏定义。比如：
```C
#define True 1
#define False 0
```

注意，和`#include`语句不需要分号一样，宏定义后无需带有分号`;`。如果错误地在宏定义后加上分号，这个分号会被认为是宏内容的一部分，因此可能会产生意料不到的错误。例如：
```C
#define MAX_N 1000;
int main() {
    int a[MAX_N];
    return 0;
}
```
在预处理后变为了
```C
int main() {
    int a[1000;];
    return 0;
}
```
数组定义的方括号内出现了一个多余的分号，这会引发一个编译错误。

## 含参宏定义
宏定义也可以带有参数，其语法为
```C
#define <宏名>(参数列表) <含参数的表达式>
```
这条指令告诉预处理器，在实际编译代码之前，找到代码中所有的<宏名>，将其替换为<含参数的表达式>，并把(参数列表)中的参数代入。(参数列表)中的参数可以是字面量，变量或者表达式。  

含参宏定义可以被用来定义简单的“宏函数”（执行类似函数功能的宏）。例如 msvc 编译器中在`<stdlib.h>`头文件内定义了这样的宏：
```C
#define min(a,b) (((a) < (b)) ? (a) : (b))
#define max(a,b) (((a) > (b)) ? (a) : (b))
```
这样的宏会把下面的代码：
```C
ans = max(ans, p + 5);
```
替换成
```C
ans = (((ans) > (p + 5)) ? (ans) : (p + 5));
```

含参宏定义也可以用来简化一些复杂的语句。不过，过度使用含参宏定义会降低代码的可读性。例如：
```C
#define FOR(i,a,b) for( int i=(a); i<(b); ++i)
```

永远给含参宏定义的表达式和参数都加括号，否则可能产生一些难以发现的错误。例如下面的代码：
```C
#define multiply(a, b) (a * b)
int main() {
    int a = 2, b = 3, c = 5, d = 7;
    int ans = multiply(a + b, c + d);
    printf("%d", ans);
    return 0;
}
```
表达式中的 a 和 b 没有加括号。这段代码经过预处理器处理后变为：
```C
int main() {
    int a = 2, b = 3, c = 5, d = 7;
    int ans = (a + b * c + d);
    printf("%d", ans);
    return 0;
}
```
编写代码的人本来想计算`(2 + 3) * (5 + 7)`的值，结果预处理后计算的式子变成了`2 + 3 * 5 + 7`，出现了运算顺序问题。如果修改成：
```C
#define multiply(a, b) ((a) * (b))
int main() {
    int a = 2, b = 3, c = 5, d = 7;
    int ans = multiply(a + b, c + d);
    printf("%d", ans);
    return 0;
}
```
经过预处理器处理后为：
```C
int main() {
    int a = 2, b = 3, c = 5, d = 7;
    int ans = ((a + b) * (c + d));
    printf("%d", ans);
    return 0;
}
```
实现了预期的结果。  

因此，一定要给含参宏定义的表达式和参数都加括号。

## 破坏性宏定义
某些宏定义可能对现有的代码具有破坏性。比如：
```C
#define int long long
```
这会破坏掉现有代码中所有的 int 类型变量。  

然而，如果考场上的你已经急到没有时间 Ctrl+H 替换所有的 int，那么试试这个吧。

请注意，你仍然要手动替换所有 scanf 和 printf 中的`%d`为`%lld`。

## typedef

无参宏定义的一部分工作也可以由`typedef`关键字代替。`typedef`允许程序员为已有的数据类型创建别名。例如：
```C
typedef long long ll;
```
基本上就相当于：
```C
#define ll long long
```
`typedef`还常常用于简写结构体（如果你已经知道结构体是什么）的定义，例如：
```C
struct Node {
    int data;
    struct Node* p;
};
typedef struct Node Node;
Node a; // 创建一个 struct Node 结构体的实例
```

`typedef`与`#define`不同的地方有三个，一是`typedef`只能为合法的数据类型创建别名，而`#define`允许你为任何的文本/关键字/语句创建别名；二是`typedef`由编译器而不是预处理器执行，三是`typedef`语句需要一个分号`;`作为结尾。