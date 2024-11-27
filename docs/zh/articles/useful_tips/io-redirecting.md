# 标准输入输出的重定向

有时你可能想为你的代码一次输入相当多的测试数据，以至于复制粘贴都显得太过复杂。那么，试试重定向标准输入输出吧。

## 在代码中实现输入输出重定向
可使用 freopen 语句。如：想从 1.in 读入数据，把数据写入 1.out ，则使用：

```C
freopen("1.in","r",stdin);
freopen("1.out","w",stdout);
//your code
fclose(stdin);
fclose(stdout);
```
随后向 1.in 中写入你的测试数据，执行程序，就可以从 1.out 读到输出。

## 在运行窗口中实现输入输出重定向
大于号表示将输出数据写入哪里，小于号表示从哪里读入数据，如：

`C:\...\filename.exe < test.in > test.out`

等价于从 test.in 读数据，往 test.out 写数据。
此操作请在 cmd 或 powershell 中进行。