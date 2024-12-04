# 常用函数表
以下是一些常用的现成函数，包括某些宏函数。

## 一般函数

```C
#define min(a,b) (((a) < (b)) ? (a) : (b))  //取最小值
#define max(a,b) (((a) > (b)) ? (a) : (b))  //取最大值
```

## 数学函数

```C
long long quickPow(long long a, long long b) {           // a^b long long快速幂
    long long res = 1;
    while (b > 0) {
        if (b & 1) {
            res = res * a;
        }
        a *= a;
        b >>= 1;
    }
    return res;
}


long long quickPowMod(long long a, long long b, long long m) {  // a^n % p 快速幂取模
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1) {
            res = res * a % m;
        }
        a = a * a % m;
        b >>= 1;
    }
    return res;
}

int MillerRabinCheck(int a, int n) {                    // Miller-Rabin素数检测
    int u = n - 1;
    while (!(u % 2)) {
        u /= 2;
    }
    int v = quickPowMod(a, u, n);
    if (v == 1) {
        return 1;
    }  
    while (u <= n - 1) {
        if (v == n - 1) {
            return 1;
        }
        if (v == 1) {
            return 0;
        }
        v = 1ll * v * v % n;
        u *= 2;
    }
    return 0;
}

int isPrimeLog(int n) {                                 // int范围内素数检测，时间复杂度O(logn)
    if (n == 2 || n == 7 || n == 61) {
        return 1;
    }
    else if (n % 2) {
        return MillerRabinCheck(2, n) && MillerRabinCheck(7, n) && MillerRabinCheck(61, n);
    }
    else {
        return 0;
    }
}

int isPrime(int n) {                                     //int范围内素数检测，时间复杂度O(sqrt(n))
    if (n == 2) {
        return 1;
    }
    else if (n & 1) {
        for (int i = 3; i * i <= n; i += 2) {
            if (!(n % i)) {
                return 0;
            }
        }
        return 1;
    }
    else {
        return 0;
    }
}

int gcd(int a, int b) {                                   // 求最大公约数
    if (a < b) {
        int tmp = a;
        a = b;
        b = tmp;
    }
    while (b) {
        int tmp = a;
        a = b;
        b = tmp % b;
    }
    return a;
}

inline int lcm(int a, int b) {                            // 求最小公倍数
    return a * b / gcd(a, b);
}

long long fact(long long a) {                             // 求阶乘
    long long res = 1;
    for (long long i = 1; i <= a; ++i) {
        res *= i;
    }
    return res;
}

long long Arrangement(long long n, long long m) {         // 排列数
    long long res = 1;
    for (long long i = n - m + 1; i <= n; ++i) {
        res *= i;
    }
    return res;
}

long long Combination(long long n, long long m) {          // 组合数，n选m
    if (m > n - m) {
        m = n - m;
    }
    long long res = 1;
    for (long long i = 1; i <= m; ++i) {
        res = res * (n - i + 1) / i;
    }
    return res;
}

void EratosthenesSieve(int n) {                             //埃氏筛法输出1~n内所有质数，时间复杂度O(nloglogn)
    int* prime = (int*)calloc(n + 10, sizeof(int));
    for (int i = 2; i <= n; ++i) {
        if (!prime[i]) {
            printf("%d,", i);
            for (int j = i + i; j <= n; j += i) {
                prime[j] = 1;
            }
        }
    }
    free(prime);
}

void EularSieve(int n) {                                    //欧拉筛法输出1~n内所有质数，时间复杂度O(n)
    int* prime = (int*)calloc(n + 10, sizeof(int));
    int* is_prime = (int*)calloc(n + 10, sizeof(int));
    int prime_count = 0;

    for (int i = 2; i <= n; ++i) {
        if (!is_prime[i]) {
            prime[prime_count++] = i;
            printf("%d,", i);
        }
        for (int j = 0; j < prime_count && i * prime[j] <= n; ++j) {
            is_prime[i * prime[j]] = 1;
            if (i % prime[j] == 0) {
                break;
            }
        }
    }
    free(prime);
    free(is_prime);
}

```

## 位运算相关函数
```C
int bit_count(unsigned int n) {         //计算二进制中1的个数
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}

int sumXor(int n) {                     //计算0到n的异或和
    switch (n % 4) {
        case 0: 
            return n;
        case 1: 
            return 1;
        case 2: 
            return 1 + n;
        case 3: 
            return 0;
        default: 
            return -1;
    }
}
```

## 日期相关函数

```C
struct date {
    int year, month, day;
};

#define date struct date                                                                        // 定义date结构体，用于保存年月日信息                               

const int daysEveryYear[] = {365, 366};                                                         // 平年和闰年每年的天数
const int daysEveryMonth[][13] = {{-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},         // 平年每月的天数
                                  {-1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}};        // 闰年每月的天数
                                                                                                // 使用daysEveryMonth[isLeap(year)][month]来获取某年某月的天数

inline int isLeap(int year) {                                                                   // 判断是否为闰年                              
    return !(year % 400) || (!(year % 4) && year % 100);
}

int Zeller(int year, int month, int day) {                                                      //判断某年某月某日是星期几，0=星期日，1=星期一，……，6=星期六
	if (month == 1 || month == 2) {
		year--;
		month += 12;
	}
	int century = year / 100;
	year %= 100;
	int day = ((year + year / 4 + century / 4 - 2 * century + 26 * (month + 1) / 10 + day - 1) % 7 + 7) % 7;
	return day ? day : 7;
}
```