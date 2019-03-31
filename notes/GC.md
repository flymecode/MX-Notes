## Java垃圾回收机制

对象没有被其他对象所引用的时候，就可以被垃圾收集

#### 判断对象是否被引用的算法

引用计数算法：

- 判断对象的引用数量来决定对象是否可以被回收
- 每个对象实例都有一个引用计数器，被引用则+1,完成引用则-1
- 任何引用计数为0的对象实例可以被当作垃圾收集

优点：

- 执行效率高，程序执行受影响小

缺点：

- 无法检测出循环引用的情况，导致内存泄漏

```java
class MyObject {
    private MyObject childNode;
    ...
}

public static  void main(String[] args) {
    MyObject object1 = new MyObject();
    MyObject object2 = new MyObject();
    
    object1.childNode = object2;
    object2.childNode = object1;
}
```



#### 可达性分析算法

通过判断对象的引用链是否可达来决定对象是否可以被回收

##### 可以作为GC Root对象

- 虚拟机栈中引用的对象
- 方法区中的常量引用的对象
-  方法区中的类静态属性引用的对象
- 本地方法栈中引用的对象
- 活跃线程的引用对象

![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551597118264&di=9f4b22615645df3c7069d1cb5cb8e54b&imgtype=0&src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F9463862-4e25919d342883f8.png)



#### 回收方法区

永久代主要回收无用的常量和无用的类

判断一个常量是否无用，只需要判断时候还存在引用

判断一个类是否是无用的类，需要判断该类的所有实例已经被回收，类加载器被回收，类对象没有被任何地方引用，无法在任何地方通过反射访问该类的方法。

### 垃圾回收算法

##### 标记-清除算法（Mark and Sweep）

标记：从根集合进行扫描，对存活的对象进行标记

清除：对堆内存从头到尾进行线性的遍历，回收不可达的对象内存

![1551588132324](https://github.com/flymecode/MX-Notes/blob/master/image/1551588132324.png)

缺点：

- 碎片化，如果在以后的分配过程中不满足，又要触发一次垃圾收集的动作
- 标记和清除的效率都不高

##### 复制算法（Copying）

- 分为对象面和空闲面
- 对象在对象面上创建
- 存活的对象被从对象面复制到空闲面
- 将对象面所有对象内存清除

优点

- 解决碎片化
- 顺序分配内存，简单高效
- 适用于对象村活低的场景
- 适用年轻代的收集，如果年轻代没有足够的内存，使用老年代来进行担保

缺点

- 可用内存缩小

![1551589760984](https://github.com/flymecode/MX-Notes/blob/master/image/1551589760984.png)

#####  标记-整理算法（Compacting）

- 标记：从根集合进行扫描，对存活的对象进行标记
- 清除：移动所有存活的对象，且按照内存地址次序依次排列，然后将末端内存地址以后的内存全部回收。

优点：

- 避免内存的不连续，解决碎片化
- 不用设置两块内存互换，较少了内存空间的浪费
- 适用于存活率高的场景

![1551589483095](https://github.com/flymecode/MX-Notes/blob/master/image/1551589483095.png)

##### 分代收集算法（Generational Collector）

- 垃圾回收算法的组合拳
- 一般把堆分为新生代和老年代
- 新生代采用复制算法，老年代采用标记整理算法 
- 按照对象生命周期的不同划分区域以采用不同的垃圾回收算法
- 目的：提高JVM的回收率

![1551590019486](https://github.com/flymecode/MX-Notes/blob/master/image/1551590019486.png)



##### GC分类

- Minor GC 
  - 复制算法
  - 发生在年轻代
  - 发生频繁
- Full GC
  -  标记清除、标记整理
  - 年轻代和老年代
  - 发生率低

##### 年轻代: 尽可能快速的收集掉那些生命周期短的对象

Eden区

两个Survivor区

![1551590595600](https://github.com/flymecode/MX-Notes/blob/master/image/1551590595600.png)

经历一次Minor次数依然存活的对象

Survivor区中存放不下的对象

新生成的大对象

##### 常用的调优参数

-XX: SurvivorRation :Eden和Survivor的比值，默认是8：1

-XX:NewRation:老年代和年轻代内存大小的比例

-XX:MaxTenuringThreshold:对象从年轻代晋升到老年代经过GC次数的最大阈值

老年代：存放生命周期较长的对象

##### 触发Full GC的条件?

- 老年代空间不足
- 永久代空间不足（JDK7以前）
- Minor GC 晋升到老年代的平均大小大于老年代的剩余空间
- CMS GC时出现promotion failed,concurrent mode failure
- 调用System.gc()
- 使用RMI来进行RPC或管理的JDK应用，每一小时触发一次Full GC



### Stop-the-World

- JVM由于 要执行GC而停止了应用程序的执行
- 任何一种GC算法中都会发生
- 多数GC的优化通过减少Stop-The-World发生的时间来提高程序性能

### Safepoint

- 分析过程中对象引用关系不会变化的点	
- 产生Safepoint的地方：方法调用；循环跳转；异常跳转等
- 安全点要适中

##### JVM的运行模式

- Server
- Client

##### Serial收集器（-XX:+UseSerialGC复制算法）

- 单线程收集，进行垃圾收集时，必须暂停所有的工作线程。
- 简单高效，Client模式下默认的年轻代收集器。

![1551593597605](https://github.com/flymecode/MX-Notes/blob/master/image/1551593597605.png)

##### ParNew收集器（-XX:+UseParNewGC,复制算法）

- 多线程收集，其余行为，特点和Serial收集器一样
- 单核执行效率不如Serial，在多核下执行才有优势

![1551593919763](https://github.com/flymecode/MX-Notes/blob/master/image/1551593919763.png)

##### Parallel Scavenge收集器（-XX：+UseParallelGC，复制算法）

- 吞吐量=运行用户代码时间/（运行用户代码时间+垃圾收集时间）
- 多线程，比起关注用户停顿时间，更关注系统的吞吐量，适合后台运算而不需要太多交互的任务
- 在多核执行下有优势，Server模式下默认的年轻代收集器
- -XX:UseAdaptiveSizePolicy :调优

老年代收集器：

##### Serial Old收集器（-XX：+UseSerialOldGC,标记-整理算法）

- 单线程收集，进行垃圾收集时，必须暂停所有工作线程
- 简单高效，Client模式下默认的老年代收集器

![1551598747027](https://github.com/flymecode/MX-Notes/blob/master/image/1551598747027.png)

##### Parallel Old收集器（-XX:+UseParallelOldGC 标记-整理算法）

- 多线程，吞吐量

![1551598843583](https://github.com/flymecode/MX-Notes/blob/master/image/1551598843583.png)

##### CMS收集器（-XX:+UseConcMarkSweepGC，标记-清除算法）

- 初始化标记：stop-the-wold
- 并发标记：并发追溯标记，程序不会停顿
- 并发预清理：查找执行并发标记阶段从年轻代，晋升到老年代的对象
- 重新标记：暂停虚拟机，扫描CMS堆中的剩余对象
- 并发清理：清理垃圾对象，程序不会停顿
- 并发重置：重置CMS收集器的数据结构

CMS收集器的内存回收过程是和用户线程一起并发执行的。减少了用户的停顿时间

缺点：

- 对CPU资源敏感
- 无法处理浮动垃圾
- 产生碎片化空间

##### Garbage First收集器的特点

将堆划分为多个大小相等的独立区域，虽然还保留新生代和老年代的物理的，他们都是一部分Region的集合。

- 并发和并行
- 分代收集
- 空间整合，从整体上看是基于标记-整理算法，但是从两个Region之间来看是基于复制算法实现的，无论是那种算法东不会在运行期间产生内存碎片。
- 可预测的停顿

将整个Java堆内存划分成多个大小相等的Region

年轻代和老年代不再物理隔离



##### 常见问题

Object的finalize()方法的作用是否与C++的析构函数作用相同？

- 与C++的析构函数不同，析构函数调用确定，而它是不同的
- 将为被引用的对象放置于F-Queue队列
- finalize()方法执行之后可能会被终止
- 给予对象最后一次逃脱的机会

```java
System.gc();// 触发finalize()方法
protected void finalize(){}
```

Java中的强引用，软引用，弱引用，虚引用？

强引用：

- 最普遍的引用 

  ```java
  Object object  = new Object()
  ```

- 当内存不够抛出OutOfMemoryError终止程序也不会回收具有强引用的对象

- 通过将对象设置为null来弱化引用，使其被回收

软引用：

- 对象处在游离但非必须的状态

- 只有当内存不足的时候，GC会回收该引用的对象内存

- 可以用来实现高速缓存

  ```java
  String str = new Stirng("abc"); // 强引用
  SoftReference<String> softRef = new SoftReferece<String>(str);// 软引用
  ```

弱引用：

- 非必需的对象，比软引用更弱一些
- GC时被回收
- 被回收的概率也不大，因为GC线程优先级比较低
- 使用与引用偶尔被使用且不影响垃圾收集的对象

```java
String str = new Stirng("abc"); // 强引用
WeakReference<String> ref = new WeakReferece<String>(str);// 弱引用
```

虚引用：

- 不会决定对象的生命周期
- 任何时候都可能被垃圾收集器回收
- 跟踪对象被垃圾收集器回收的活动，起哨兵的作用
- 必须和引用该队列ReferenceQueue联合使用

```java
String str = new Stirng("abc"); // 强引用
ReferenceQueue queue = new ReferenceQueue();
PhantomReference ref = new PhantomReference(str,queue);// 虚引用
```

### 对象第二次拯救

对象真正的死亡至少需要经历两次标记的过程，如果对象在进行可达性分析算法之后发现没有与GC Roots相连接的引用链，那么它将会被第一次标记并且进行一次筛选，对象是否有必要执行finalize方法，如果对象没有覆盖finalize方法，或者finalize方法已经被虚拟机调用过一次，则没有必要执行finalize方法。当对象被判定为执行finalize方法的时候，将对象放置在一个F-Queue队列中，并稍后有Java虚拟机创建一个Finazlizer线程去触发这个方法。如果对象要在finalize（）成功拯救自己，只需要重新或者对象引用链上任何一个对象关联即可。