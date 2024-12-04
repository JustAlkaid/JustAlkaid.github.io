# Cheat points with result-oriented programming

## **Note: This technique is not useful for all questions and is recommended when and only when desperate. The number of points that can be gained by a good and subtle algorithm can be greater than the total number of points that can be cheated on all questions! **

## 1. Print Sample
In the early days of NOIP, the first data point was often a sample, so many people were able to get 5/10 out of 100 points using this technique. The same applies to OJ, where you can design a program that tailors the scanf statement to the sample input, and then outputs the sample as is.

## 2. Output only special data
There are some unsolved/special cases that output special data (such as the familiar Careless Otter!), in which case you can output only the special data indiscriminately, such as C7-D, which outputs only “Spell Not Found!\n”.

## 3. Ignoring Complications
Some puzzles are difficult in that individual cases are very special, and so advanced algorithms need to be designed that can cover the special cases (e.g. ddz split apples, 4-dimensional dp, greedy). In this case, we can forget about all that and just consider most of the cases that are good to do.  
For example, for some of the minimization problems, we can minimize at every step. e.g: For the problem ddz Splitting Apples, you can have the apples with the largest and smallest values in separate bags, and subsequently calculate the result. Tests show that you can get half the points this way.

## 4. Outputting random numbers
Some of the final output is a natural number, and the value range of the data is very small, then you can also try to muddle through by outputting a random number.  
Method: Introduce the header file stdlib.h and time.h, and write these two lines of code in the appropriate place in the main function.
```C
 srand(time(NULL)). 
 printf(“%d”,rand()%(y-x+1)+x); 
```

## 5. Guess the answer
If sometimes you just don't have any ideas, you can try to violently enumerate or hand-calculate a few sets of data, and that's when you might find a pattern. Then, we can simply not think about the principle, trust the intuition, and output the data directly according to the pattern found.

## 6. Calculate the necessary data first.
> Violence produces miracles, Make a datasheet to pass the sample.  

Some of the difficult data will be used many times in the calculation process. In this case, we can use a simple program with the TLE package to calculate these important data first, and then store them in an array in the formally submitted code, so that the data can be used directly in the runtime, which saves a lot of time.  
For example, for C8-E, you can type a list of primes up to 1e4, and then try to divide the input by the numbers in the list of primes to determine if the input is a pseudo-prime or not, which gives you a better time complexity than O(sqrt(n)).

## 7. Turn in whatever you want in the last few minutes
On the midterm, someone got an AC by submitting empty code to the J question in the last few minutes. So, you can try it at the last minute. You can't just leave it empty, right?