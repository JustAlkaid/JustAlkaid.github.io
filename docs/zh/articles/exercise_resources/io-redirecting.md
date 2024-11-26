## 在代码中实现输入输出重定向
可使用 freopen 语句。如：想从 1.in 读入数据，把数据写入 1.out ，则使用：

`freopen("1.in","r",stdin);`
`freopen("1.out","w",stdout);`
`//your code`
`fclose(stdin);`
`fclose(stdout);`
```C
freopen("1.in","r",stdin);
freopen("1.out","w",stdout);
//your code
fclose(stdin);
fclose(stdout);
```

## 在运行窗口中实现输入输出重定向
大于号表示将输出数据写入哪里，小于号表示从哪里读入数据，如：

`C:\...\filename.exe < test.in > test.out`

等价于从 test.in 读数据，往 test.out 写数据
此操作请在 cmd 或 powershell 中进行等价于从 test.in 读数据，往 test.out 写数据。
此操作请在 cmd 或 powershell 中进行。