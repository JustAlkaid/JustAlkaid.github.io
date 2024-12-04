## What are the different types of questions?

## 1. Basic questions
Generally distributed in the first few questions, in accordance with the requirements of the question can be answered, basically do not need to carry out in-depth thinking and the search for the law.  
However, the more basic the questions are, the more you should not take them lightly. You should read the input/output requirements and the meaning of variables carefully, eliminate PE, and try to get it right in one go.  

Example: Question A - Code of Integrity in various competitions.

## 2. Simulation questions
Generally, contestants are asked to write a program to simulate some real-life or virtual situations. These questions are characterized by extremely long descriptions and complex rules, but are almost impossible to think about.  
The most difficult thing to do this type of problem is to overcome the irritation, calm down a little bit to read the topic, the requirements of the topic is split into a function, respectively, to realize, and then combined.  

**Don't underestimate the simulation questions, can do the simulation questions right is a kind of ability, can once AC is more important ability. **

EXAMPLE: C6-E Otter Maze; Luogu P2482 [Pig State Kill](https://www.luogu.com.cn/problem/P2482).

> Come to the Army to learn how to fold a quilt, not to learn skills, but to hone your mind.   
> --Some anonymous military instructor.

## 3. Algorithm questions
Generally examine whether the player has mastered a specific algorithm, whether he/she can implement such algorithm correctly, and whether he/she can reduce the topic question to an algorithmic model.

## 3.1 Recursion
As the name implies, questions that require a function to call itself inside a function in order to accomplish a goal (e.g., Fibonacci series, climbing steps). Questions that can generally be answered using recursion can also be answered using loops.

Example: C5-E Mocha and the Hanoverian Otter.

### 3.2 Greedy
A generic term for a certain class of optimization problems, called greedy because they always take the optimal result under the current conditions, without considering what comes after. Such problems may sometimes require backtracking to determine whether the result obtained is the most valuable result or not, so think twice about assuming that all problems can be traversed once to find the answer.

Example:

### 3.3 dp (dynamic programming)
A typical example of this topic is the backpack problem. dp is a method of solving complex problems by breaking them down into relatively simple sub-problems. The central idea is to decompose the problem to be solved into subproblems, and then construct a solution to the original problem based on the solutions of the subproblems.

Examples: C2-I Maximum sum of subsections, E5-F Fibonacci series (hard version).

### 3.4 Searching
A typical example of this topic is walking through a maze to find the shortest route. Depth-first search (DFS) is a recursion-based algorithm that finds the final solution by constantly moving forward and backward through the states. This searches all the nodes, is a blind search, and has a high time complexity for some of the worse cases.

See also: breadth-first search, backtracking.  

Example: C6-J Little Zombies Eat Brains 2 (simple version).

### 3.5 Sorting
As the name suggests, a question that requires sorting an array on the fly. Common algorithms are quick sort (you can use the qsort function from the standard library) and bubble sort.

See also: insertion sort, selection sort, subsumption sort, heap sort.

Example: C8-G Ranking Sort.

## 4. Math questions
This type of question examines a player's knowledge of mathematics, especially number theory and discrete mathematics.

Example: National Day Special BI Sayrafiezadeh 1994, National Day Special BJ Bubble-sort 2024


## 5. String Processing
Examines topics such as length comparisons, dictionary order comparisons, modifications, finding duplicate segments, and other operations on strings. Often need to use the header file string.h .

A quick checklist of standard library functions is attached to this site.

Example: C7-D Wizard's Guide to Otters and Standard Spells.