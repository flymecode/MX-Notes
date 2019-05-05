

[TOC]



![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551436864811&di=e3b96294b0d5f8a8734dfb650caa9c44&imgtype=0&src=http%3A%2F%2Fimg2018.cnblogs.com%2Fblog%2F1228717%2F201902%2F1228717-20190203145702646-2102876188.png)

## 程序计数器

- 当前线程所执行的字节码行号指示器（逻辑）
- 改变计数器的值来选取下一条需要执行的字节码指令
- 和线程是一对一的关系即“线程私有”
- 对Java方法计数，如果是Native方法则计数器值为Undefined
- 不会发生内存泄漏

如果线程正在执行Java方法，这个计数器记录的是正在执行的虚拟机字节码指令的地址;如果正在执行的是Native方法，这个计数器的值为null

## Stack(Java虚拟机栈)

- Java方法执行的内存模型

- 线程私有的内存区域

- 包含多个栈帧，每个方法在执行的同时都会创建一个栈帧，用来存储局部变量表，操作数栈，动态连接和方法出口等信息。

- 生命周期和当前线程的生命周期一致

  ![1551444762538](https://github.com/flymecode/MX-Notes/blob/master/image/1551444762538.png)

##### 局部变量表和操作数栈

- 局部变量表：包含方法执行过程中的所有变量
- 操作数栈：入栈、出栈、复制、交换、产生消费变量

```java
public static int add(int a, int b) {
		int c = 0;
		c = a + b;
		return c;
}
// 反汇编
public static int add(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=3, args_size=2
         0: iconst_0
         1: istore_2 // 将操作数栈中pop出放在局部变量表中第二个位置
         2: iload_0 // 将局部变量表中第一个数压入栈中
         3: iload_1 // 将局部变量表中第二个数压入栈中
         4: iadd // 将栈中的数弹出相加，然后放入栈中
         5: istore_2
         6: iload_2
         7: ireturn
      LineNumberTable:
        line 7: 0
        line 8: 2
        line 9: 6

```

##### 递归为什么会引起java.lang.StackOverflowError异常？

##### Class中变量内存的分配问题

- 当一个方法执行的时候，每个方法都会建立一个自己的内存栈，在这个方法内定义的变量将会返回逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁。因此所有在方法中定义的局部变量都是放在栈内存中的；
- 当创建一个对象的时候，这个对象将被保存到运行时的数据区中，以便反复的利用，这个运行的数据区就是堆内存，堆内存中的对象不会随着方法的结束而销毁，即使方法结束后后这个对象还是可能被另一个引用变量所引用，则这个对象依然不会被销毁，只有当一个对象没有任何引用它的时候，系统的垃圾回收器才会在合适的时候回收它。

## 本地方法栈

本地方法栈和Java虚拟机栈所发挥的作用类似，他们之间的区别只不过是Java虚拟机栈是为java为虚拟机执行Java方法服务的，而本地方法栈是为虚拟机使用Native方法服务的。

##### 元空间与永久代的区别？

- 元空间使用本地内存，而永久代使用的是JVM的内存

##### MetaSpace相比PermGen的优势？

- 字符串常量池存在永久代中，容易出现性能问题和内存溢出。
- 类的方法的信息大小难易确定，给永久代的大小指定带来困难。
- 永久代会为GC带来不必要的复杂性。

JDK1.8 字符串常量池被转移到堆中。

Java Heap

- 对象实例及数组的分配区域
- 是所有线程共享的一块内存区域，在虚拟机启动的时候创建，也是虚拟机管理的最大的一块内存区域
- 也是GC发生的主要区域

##### JVM三大性能调优参数-Xms -Xmx -Xss含义

-Xss:规定了每个线程虚拟机栈（堆栈）的大小

-Xms:堆的初始值

-Xmx:堆能达到的最大值

一般我们把-Xms和-Xmx设置成一样大的，防止堆扩容的时候，内存抖动问题。

## 方法区 Method Area

- 是各个线程共享的一块内存区域，用来存储已经被虚拟机加载的类信息，常量，静态变量，即使编译后的代码信息。
- 运行时常量池是方法去的一部分，Class文件中除了有类的版本，字段，方法，接口等描述信息之外，还有一项信息是常量池，用存放编译后的字面量和符号引用，这部分信息到类加载之后放到方法区运行时常量池中存放。
- JDK8中永久代被移除，取而代之的是元数据区，元数据是堆外直接内存，可以提供更大内存空间。

##### Java内存模型中堆和栈的区别？

内存分配策略

- 静态存储： 编译时确定每个数据目标在运行时的存储空间需求

- 栈式存储： 数据区需求在编译时未知，运行时模块入口前确定。

- 堆式存储：编译时或运行时模块入口都无法确定，动态分配。

- 栈里定义变量保存堆中目标的首地址。

- 栈自动释放，堆需要GC

- 栈比堆小

- 栈产生的碎片远小于堆

- 栈支持静态和动态分配，而堆仅支持动态分配

- 栈的效率比堆高


JDK6：当调用intern方法时，如果字符串常量池先前已经创建出该字符串对象，则返回池中的该字符串的引用。否则，将此字符串对象添加到字符串常量池中，并且返回该字符串对象的引用。

JDK6+：当调用intern方法时，如果字符串常量池先前已创建出该字符串对象，则返回池中的该字符串的引用。否则，如果该字符串对象已经存在于Java堆中，则将堆中对此对象的引用添加到字符串常量池中，并且返回该引用；如果堆中不存在，则在池中创建该字符串并返回其引用。

```java
String s = new String("a"); // 字符串常量池中没有a对象，此步骤相当于创建了两个对象，一个在常量池中创建了a对象，另外在堆中创建了该对象
s.intern();
String s2 = "a";
System.out.println(s == s2);

String s3 = new String("a") + new String("a");
s3.intern();
System.out.println(s3 == s4);
```

JDK6 false false

![1551525995556](https://github.com/flymecode/MX-Notes/blob/master/image/1551525995556.png)

JDK6+ 结果为 false  true

![1551526023990](https://github.com/flymecode/MX-Notes/blob/master/image/1551526023990.png)

## 对象的创建

当虚拟机遇见new指令之后，检查这个指令的参数是否能在常量池中定位到一个类的符号引用，并检查这个符号引用所代表的类时候已经被加载，解析，初始化，如果没有执行类的加载过程，当类加载检查通过之后，虚拟机开始为对象分配内存，主要有两种方式，一是采用指针碰撞，二是采用空闲列表的方法。为了保证多个线程并发的安全，通过采用CAS来保证内存分配的同步，二是为每个线程分配本地线程分配缓冲。内存分配完成之后，虚拟机要将分配的内存初始化为零值。设置对象的类型指针，哈希值，对象的GC分代年龄等信息。在执行new 指令之后，会紧接着执行<init> 方法。

### 对象的内存布局

- 对象头
- 实例数据
- 对齐填充

### 对象的访问定位

- 句柄
- 直接指针

如果使用句柄访问的话，Java堆中划分出一块内存区域来作为句柄池，reference中存储的就是对象的句柄地址，而句柄中包含了对象那个的实例数据与类型数据各自的具体地址信息。

如果用直接指针访问的话，引用中保存的直接是对象的地址。

使用句柄的好处就是，引用存储的是稳定的句柄地址，当对象被移动之后，只会改变句柄中实例数据指针。而引用不需要改变

使用直接引用的好处，就是减少了一次指针的定位，速度更加快。对于HotSpot采用的是直接地址访问。



## JMM

java内存模型（Java Memory Model）本身是一种抽象的概念，并不真实存在，它描述的是一组规则或者规范，通过这组规则和规范定义了程序中各个变量（包括实例字段，静态字段，和构成数组对象的元素）的访问方式。

![1551780285060](https://github.com/flymecode/MX-Notes/blob/master/image/1551780285060.png)

JMM中的主内存

- 存储Java实例对象
- 包括成员变量，类信息，常量，静态变量等
- 属于数据共享的区域，多线程并发操作时候，会引起线程安全问题

JMM的工作内存

- 存储当前方法的所有本地变量信息，本地变量对其它线程是不可见的
- 字节码行号指示器，Native方法信息
- 属于线程私有数据区域，不存在线程安全问题

JMM内存模型和Java内存区域划分的概念层次

JMM描述的是一组规则，围绕原子性，有序性，可见性展开的

存在私有区域和公有区域

主内存与工作内存的数据存储类型以及操作方式归纳

- 方法里的基本数据类型本地变量将存储在工作内存中的栈帧中
- 引用类型的本地变量，引用存储在工作内存中，实例存储在主内存中
- 成员变量，static变量，类信息均会存储在主内存中
- 主内存共享的方式是线程拷贝一份数据到工作内存，操作完成后刷新主内存中。

JMM如何解决可见性？

##### 指令重排序需要满足的条件

- 单线程环境下不能改变程序的结果

- 存在数据依赖关系的不允许重排序

- 无法通过happens-before原则推导出来的，才能进行指令重排序


A操作的结果需要对B操作可见，则A与B存在happens-before关系

那么操作A在内存上所做的操作，对操作B都是可见的。

```java
i = 1; // 线程a执行
j = i; // 线程b执行
```



![1552873261221](https://github.com/flymecode/MX-Notes/blob/master/image/1552873261221.png)

##### volatile：JVM提供的轻量级同步机制

- 保证被volatile修饰的共享变量对所有线程总是可见的
- 禁止指令重排序优化

volatile变量为何立即可见？

当写一个volatile变量时，JMM会把该线程对应的工作内存中的共享变量值刷新到主内存中。

当读取一个volatile变量时，JMM会把该线程对应的工作内存置为无效。

##### volatile如何禁止重排优化？

内存屏障

1. 保证特定操作的执行排序
2. 保证某些变量的内存可见性
3. 通过插入内存屏障指令禁止在内存屏障前后的指令执行重排序优化
4. 强制刷出各种CPU的缓存数据，因此任何CPU上的线程都能读取到这些数据的最新版本

```java
public class Singleton {
    private volatile static Singleton instance;
    private Singleton(){}
    public static Singleton getInstance() {
        // 第一次检测
        if(instance == null){
            // 同步
            synchronized (Singleton.class) {
                if(instance == null) {
                    // 多线程环境下可能会出现问题的地方
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

在instance= new Singleton();创建一个对象的时候，这一行可以分解为如下三行代码。

```java
memory = allocate(); // 1.分配对象的内存空间
instance = memory(); // 3.设置instance指向分配的内存地址，此时对象还没初始化！

ctorInstance(memory); // 2.初始化对象
```

由于2和3发生了重排序                                                                                                                                                                                                                                                                                                                                                                     

![1552874721232](https://github.com/flymecode/MX-Notes/blob/master/image/1552874721232.png)

### CAS

- 支持原子更新操作，使用与计数器，序列发生器等场景
- 属于乐观锁机制
- CAS操作失败时，由开发者决定继续尝试，还是还是执行别的操作，不会被阻塞

##### CAS思想

包含三个操作数，内存位置V，预期原值A和新值B

缺点

循环时间长，开销大

只能保证一个共享变量

ABA问题

##### Java线程池

![1552902848314](https://github.com/flymecode/MX-Notes/blob/master/image/1552902848314.png)

##### Fork/Join框架

Work-Stealing算法：某个线程从其它线程队列里窃取任务来执行

![1552902950158](https://github.com/flymecode/MX-Notes/blob/master/image/1552902950158.png)

##### 为什么要使用线程池？

- 降低资源消耗
- 提高线程的可管理性

![1552903339093](https://github.com/flymecode/MX-Notes/blob/master/image/1552903339093.png)

```java
public ThreadPoolExecutor(int corePoolSize, // 核心线程数量
                              int maximumPoolSize, // 线程不够用时能够创建的最大线程数
                              long keepAliveTime, // 空闲时间保持线程的存活时间
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue, // 任务等待队列
                              ThreadFactory threadFactory, // 线程工厂
                          		// 线程饱和策略
                              RejectedExecutionHandler handler ) {}
```

饱和策略

- AbortPolicy:直接抛出异常，这是默认策略
- CallerRunsPolicy:调用者所在的线程来执行任务
- DiscardOldestPolicy:丢弃队列中靠前的任务，并执行当前任务
- DiscardPolicy:直接丢弃任务
- 实现RejectedExecutionHandler接口自定义handler

![1552906940511](https://github.com/flymecode/MX-Notes/blob/master/image/1552906940511.png)

![1552909427115](https://github.com/flymecode/MX-Notes/blob/master/image/1552909427115.png)

![1552908241601](https://github.com/flymecode/MX-Notes/blob/master/image/1552908241601.png)

##### 线程生命周期

![1552909755921](https://github.com/flymecode/MX-Notes/blob/master/image/1552909755921.png)

##### 线程池的大小如何选定？

CPU密集型：线程数=按照核数+1设定

I/O密集型：线程=CPU核数*（1+平均等待时间/平均工作时间）