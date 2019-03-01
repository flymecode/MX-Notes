![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551436864811&di=e3b96294b0d5f8a8734dfb650caa9c44&imgtype=0&src=http%3A%2F%2Fimg2018.cnblogs.com%2Fblog%2F1228717%2F201902%2F1228717-20190203145702646-2102876188.png)

##### 程序计数器

- 当前线程所执行的字节码行号指示器（逻辑）
- 改变计数器的值来选取下一条需要执行的字节码指令
- 和线程是一对一的关系即“线程私有”
- 对Java方法计数，如果是Native方法则计数器值为Undefined
- 不会发生内存泄漏

##### Stack

- Java方法执行的内存模型

- 包含多个栈帧

  ![1551444762538](C:\Users\maxu1\Desktop\MX-Notes\notes\1551444762538.png)

##### 局部变量表和操作数栈

- 局部变量表：包含方法执行过程中的所有变量
- 操作数栈：入栈、出栈、复制、交换、产生消费变量

