# C 标准库函数速查表
这是一份 C 标准库函数的速查表，包含了你可能用到的大部分库函数（去除了一些不常用函数）和一些库宏。

## ctype.h

| 序号 | 函数 | 描述 |
|---|---|---|
| 1 | `int isalnum(int c)` | 该函数检查所传的字符是否是字母和数字。|
| 2	| `int isalpha(int c)` | 该函数检查所传的字符是否是字母。 |
| 3	| `int iscntrl(int c)` | 该函数检查所传的字符是否是控制字符。|
| 4	| `int isdigit(int c)` | 该函数检查所传的字符是否是十进制数字。|
| 5 | `int isgraph(int c)` | 该函数检查所传的字符是否有图形表示法。|
| 6	| `int islower(int c)` | 该函数检查所传的字符是否是小写字母。 |
| 7	| `int isprint(int c)` | 该函数检查所传的字符是否是可打印的。|
| 8	| `int ispunct(int c)` | 该函数检查所传的字符是否是标点符号字符。|
| 9	| `int isspace(int c)` | 该函数检查所传的字符是否是空白字符。 |
| 10 | `int isupper(int c)` | 该函数检查所传的字符是否是大写字母。|
| 11 | `int isxdigit(int c)` | 该函数检查所传的字符是否是十六进制数字。|
| 12 |`int tolower(int c)` | 该函数把大写字母转换为小写字母。|
| 13 | `int toupper(int c)` | 该函数把小写字母转换为大写字母。 |

## stdlib.h

| 序号 | 函数 | 描述 |
|---|---|---|
| 1 | `double atof(const char* str)` | 把参数 str 所指向的字符串转换为一个浮点数（类型为 double 型）。|
| 2 | `int atoi(const char* str)` | 把参数 str 所指向的字符串转换为一个整数（类型为 int 型）。 |
| 3 | `long int atol(const char* str)` | 把参数 str 所指向的字符串转换为一个长整数（类型为 long int 型）。|
| 4 | `double strtod(const char* str, char** endptr)` | 把参数 str 所指向的字符串转换为一个浮点数（类型为 double 型）。字符串中不是数字的部分被放置在 endptr 处。 |
| 5	| `long int strtol(const char* str, char** endptr, int base)` | 把参数 str 所指向的字符串转换为一个长整数（类型为 long int 型）。 字符串中不是数字的部分被放置在 endptr 处。base 为原字符串中数字的进制基数，取0为自动判断进制，否则取为2~36（含2和36）之间的值。|
| 6 | `unsigned long int strtoul(const char* str, char** endptr, int base)` | 把参数 str 所指向的字符串转换为一个无符号长整数（类型为 unsigned long int 型）。参数含义与 strtol() 相同。 |
| 7 | `void* calloc(size_t nitems, size_t size)` | 分配所需的内存空间，将这块内存空间的每一位置为0，并返回一个指向它的 void* 指针。|
| 8	| `void free(void* ptr)` | 释放之前调用 calloc、malloc 或 realloc 所分配的内存空间。 |
| 9	| `void* malloc(size_t size)` | 分配所需的内存空间，并返回一个指向它的void*指针。 |
| 10 | `void* bsearch(const void* key, const void* base, size_t nitems, size_t size, int (*compar)(const void* a, const void* b))` | 二分查找。key 指向要查找的元素，base 指向进行查找的数组，nitems指定数组的长度，size 指定数组中每个元素的大小。数组的内容应根据 compar() 函数升序排序。一般要求 compar() 函数在 a > b时返回正值，a < b时返回负值， a = b 时返回0。 |
| 11 | `void qsort(void* base, size_t nitems, size_t size, int (*compar)(const void* a, const void* b))` | 快速排序。base 指向进行查找的数组，nitems指定数组的长度，size 指定数组中每个元素的大小。数组的内容应根据 compar() 函数升序排序，compar() 函数的要求与 bsearch() 中的 compar() 函数相同。 |
| 12 | `int abs(int x)` | 返回 x 的绝对值。 |
| 13 | `long int labs(long int x)` | 返回 x 的绝对值。 |
| 14 | `int rand(void)` | 返回一个范围在 0 到 RAND_MAX 之间的伪随机数。 将输出模 n 即可得到0 ~ n - 1 之间的随机数。|
| 15 | `void srand(unsigned int seed)` | 该函数播种由函数 rand 使用的随机数发生器。 常用的写法是 srand((unsigned) time(&t)); 此代码以系统时间作为输入。|

## string.h

|序号 | 函数 | 描述 |
|---|---|---
| 1	| `void* memchr(const void* str, int c, size_t n)` | 在参数 str 所指向的字符串的前 n 个字节中搜索第一次出现字符 c（一个无符号字符）的位置，返回指向这个字符的指针。未搜索到则返回 NULL。|
| 2 | `int memcmp(const void* str1, const void* str2, size_t n)` | 把 str1 和 str2 的前 n 个字节进行比较。比较逻辑与 strcmp() 相同。 |
| 3 | `void* memcpy(void* dest, const void* src, size_t n)` | 从 src 复制 n 个字符到 dest。 |
| 4 | `void* memset(void* str, int c, size_t n)` | 将指定的值 c 复制到 str 所指向的内存区域的前 n 个字节中。 |
| 5 | `char* strcat(char* dest, const char*src)` | 把 src 所指向的字符串追加到 dest 所指向的字符串的结尾。 |
| 6 | `char* strncat(char* dest, const char* src, size_t n)` | 把 src 所指向的字符串追加到 dest 所指向的字符串的结尾，直到 n 字符长度为止。 |
| 7 | `char* strchr(const char* str, int c)` | 在参数 str 所指向的字符串中搜索第一次出现字符 c（一个无符号字符）的位置，返回指向这个字符的指针。未搜索到则返回 NULL。 |
| 8 | `int strcmp(const char* str1, const char* str2)` | 把 str1 所指向的字符串和 str2 所指向的字符串进行比较。两个字符串自左向右逐个字符相比（按 ASCII 值大小相比较），大于返回正值，小于返回负值，直到出现不同的字符或遇 \0 为止。如果所有被比较的字符都相同则返回 0。|
| 9 | `int strncmp(const char* str1, const char* str2, size_t n)` | 把 str1 和 str2 进行比较，比较逻辑与 strcmo() 相同，最多比较前 n 个字节。 |
| 10 | `char* strcpy(char* dest, const char* src)` | 把 src 所指向的字符串复制到 dest。|
| 11 | `char* strncpy(char* dest, const char* src, size_t n)` | 把 src 所指向的字符串复制到 dest，最多复制 n 个字符。 |
| 12 | `size_t strcspn(const char* str1, const char* str2)` | 检索字符串 str1 开头连续有几个字符都不含字符串 str2 中的字符。 |
| 13 | `size_t strlen(const char* str)` | 计算字符串 str 的长度，直到 \0，但不包括 \0。 |
| 14 | `char* strpbrk(const char* str1, const char* str2)` | 检索字符串 str1 中第一个匹配字符串 str2 中字符的字符，不包含 \0。未检索到则返回 NULL。 |
| 15 | `char* strrchr(const char* str, int c)` | 在参数 str 所指向的字符串中搜索最后一次出现字符 c（一个无符号字符）的位置。未检索到则返回 NULL。 |
| 16 | `size_t strspn(const char* str1, const char* str2)` | 检索字符串 str1 中第一个不在字符串 str2 中出现的字符下标。 |
| 17 | `char* strstr(const char* haystack, const char* needle)` | 在字符串 haystack 中查找第一次出现字符串 needle（不包含空结束字符）的位置。 |
| 18 | `char* strtok(char* str, const char* delim)` | 分解字符串 str 为一组字符串，delim 为分隔符，返回指向被分解的第一个子字符串的指针，未检索到分隔符则返回 NULL。实际逻辑是把切分符原位置均更改为 '\0'。可以用 token = strtok(str, delim); 获取第一个子字符串，循环应用 token = strtok(NULL, s); 来得到剩余的子字符串，直到 token = NULL; 为止。|

## math.h

| 序号 | 函数 | 描述 |
|---|---|---
| 1 | `double acos(double x)` | 返回以弧度表示的 x 的反余弦。返回值的范围是 [0, π]。 |
| 2 | `double asin(double x)` | 返回以弧度表示的 x 的反正弦。返回值的范围是 [-π/2, π/2]。 |
| 3 | `double atan(double x)` | 返回以弧度表示的 x 的反正切。返回值的范围是 [-π/2, π/2]。 |
| 4 | `double atan2(double y, double x)` | 返回以弧度表示的 y/x 的反正切。y 和 x 的值的符号决定了正确的象限，返回值的范围是 [-π, π]。 |
| 5 | `double cos(double x)` | 返回弧度角 x 的余弦。 |
| 6 | `double cosh(double x)` | 返回 x 的双曲余弦。 |
| 7 | `double sin(double x)` | 返回弧度角 x 的正弦。|
| 8	| `double sinh(double x)` | 返回 x 的双曲正弦。 |
| 9	| `double tanh(double x)` | 返回 x 的双曲正切。 |
| 10 | `double exp(double x)` | 返回 e 的 x 次幂的值。 |
| 11 | `double frexp(double x, int* exponent)` | 把浮点数 x 分解成尾数和指数。返回值是尾数，并将指数存入 exponent 中。所得的值是 x = mantissa * 2 ^ exponent。|
| 12 | `double ldexp(double x, int exponent)` | 返回 x 乘以 2 的 exponent 次幂。 |
| 13 | `double log(double x)` | 返回 x 的自然对数（基数为 e 的对数）。 |
| 14 | `double log10(double x)` | 返回 x 的常用对数（基数为 10 的对数）。 |
| 15 | `double modf(double x, double* integer)` | 返回 x 的小数部分（小数点后的部分），并设置 integer 为整数部分。 |
| 16 | `double pow(double x, double y)` | 返回 x 的 y 次幂。 |
| 17 | `double sqrt(double x)` | 返回 x 的平方根。 |
| 18 | `double ceil(double x)` | 返回大于或等于 x 的最小的整数值，即 x 的向上取整。注意返回值是浮点数。 |
| 19 | `double fabs(double x)` | 返回 x 的绝对值，特别用于浮点数。 |
| 20 | `double floor(double x)` |返回小于或等于 x 的最大的整数值，即 x 的向下取整。注意返回值是浮点数。 |
| 21 | `double fmod(double x, double y)` | 返回 x 除以 y 的余数，返回值的符号与 x 相同。注意返回值是浮点数。 |


| 常量 | 值 | 描述 |
|---|---|---|
| `M_PI` | 3.14159265358979323846	| 圆周率 π |
| `M_E` | 2.71828182845904523536 | 自然对数的底数 e |
| `M_LOG2E` | 1.44269504088896340736 | log2(e) |
| `M_LOG10E` | 0.43429448190325182765 | log10(e) |
| `M_LN2` | 0.69314718055994530942 | ln(2) |
| `M_LN10` | 2.30258509299404568402 | ln(10) |
| `M_PI_2` | 1.57079632679489661923 | π/2 |
| `M_PI_4` | 0.78539816339744830962 | π/4 |
| `M_1_PI` | 0.31830988618379067154 | 1/π |
| `M_2_PI` | 0.63661977236758134308 | 2/π |
| `M_2_SQRTPI` | 1.12837916709551257390 | 2/√π |
| `M_SQRT2` | 1.41421356237309504880 | √2 |
| `M_SQRT1_2` | 0.70710678118654752440 | 1/√2 |