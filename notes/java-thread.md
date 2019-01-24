[TOC]



> 如果是非线程安全，多个线程对统一个对象中的实例变量进行并发的访问时发生。产生的后果就是出现脏读。
>
> 非线程安全问题存在与实例变量中。如果是方法内部的私有变量，则不存在非线程安全问题。因为方法内部的变量是私有的。

### Thread方法

| 方法名          | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| currentThread() | 返回代码段正在别那个线程调用                                 |
| isAlive()       | 判断线程是否处于活动状态。活动状态就是线程已经启动还没终止的。线程处于正在运行或者准备开始运行的状态，就认为是活动状态。 |
| sleep()         | 在指定的毫秒数让当前线程休眠                                 |
| getId()         | 取得线程的唯一标识                                           |
| yield()         | 放弃当前CPU的资源，将他让给其他任务去占用CPU的执行时间。但放弃的时间是不确定的。有可能刚刚放弃，马上又获得CPU时间片 |
| setPriority()   | 设置线程的优先级别                                           |
| setDaemon()     | 设置称为守护线程                                             |
| join()          | 使所属线程thread对象正常执行完run方法中的任务，而使当前线程无限阻塞，等待thread线程销毁之后在继续执行线程z后面的代码。 |

线程的优先级是具有继承性的，比如A线程启动B线程，则B线程的优先级与A是一样的。

join内部使用的wait方法进行等待。而sychronized关键字使用的是，对象监视器。原理做为同步的。

如果join过程中，当前线程对象对象被中断，则当前线程出现异常。

### Join 与 Sleep的区别

| 方法        | 区别                                                         |
| ----------- | ------------------------------------------------------------ |
| join(Long)  | join(long)内部是使用wait(long)实现的，所以join(long)方法具有释放锁的特点。 |
| Sleep(long) | 该方法不会释放锁。                                           |

### wait与notify

wait和notify都是object中的方法

| 方法     | 方法名                                                       |
| -------- | ------------------------------------------------------------ |
| wait()   | wait方法用来将当前线程放入阻塞队列中，并且在wait所在的代码行停止执行，直到接到通知或者被中断为之，在调用wait方法之前，线程必须获得该对象的对象级别的锁，即只能在同步方法，或者同步代码块中调用wait方法，在调用wait方法之后，当前线程释放锁。在wait返回之前，线程和其他线程竞争重新获得锁。如果调用wait时没有持有适当的锁，则抛出illegalMonitorStateException |
| notify() | 也要在同步方法或者同步方法块中调用，线程必须获得该对象的锁，如果调用notify方法的对象没有持有适当的锁，则会抛出异常。该方法用来通知那些可能等待该对象锁的其他线程，如果有多个线程等待，则有线程规划器随机挑选一个程先wait的线程，对其发出通知notify,并使它等待获取该对象的对象锁。在执行notify之后，当前线程不会马上释放对象锁，程先wait的线程也不能马上获取该对象锁。要等到执行notify方法的线程将程序执行完成之后，当前线程才会释放锁。而程先wait状态的线程才可以获得该对象锁。 |

##### wait(long) :

​	 带一个参数的wait(long)方法的功能是等待某一时间内是否有线程对锁进行唤醒，如果超过这个时间则自动唤醒。

##### 简单的总结就是：

​	wait使当前线程处于等待状态，notify使等待的线程继续运行。

​	每个锁对象都有两个队列，一个是就绪队列一个是阻塞队列，就绪队列存储了将要获得锁的线程，阻塞队列存储了被阻塞的线程。

​	一个线程被唤醒后，才会进入就绪队列，等待CPU的调度，反之，一个线程被wait后，就会进入阻塞队列，等待下一次的唤醒。

​	当线程程wait状态的时候，调用线程对象的Interrupt方法会出现InterruptExcepthion异常。

​	方法notify只能随机唤醒一个线程。

​	当多次调用notify方法时，会随机将等待的线程进行唤醒

##### 总结：

- 在执行同步代码块就会释放对象的锁。
- 在执行同步代码块的过程中，遇到异常而导致线程终止，锁也会被释放。
- 在执行同步代码块的过程中，执行了锁所属对象的wait方法，这个线程就会释放对象锁。而此线程对象就会进入线程等待池中，等待被唤醒。

### JAVA中线程的状态

在Java中线程的状态一共被分成6种：

#### 初始态：NEW

创建一个Thread对象，但还未调用start()启动线程时，线程处于初始态。

#### 运行态：RUNNABLE

在Java中，运行态包括就绪态 和 运行态。

- 就绪态

- - 该状态下的线程已经获得执行所需的所有资源，只要CPU分配执行权就能运行。
  - 所有就绪态的线程存放在就绪队列中。

- 运行态

- - 获得CPU执行权，正在执行的线程。
  - 由于一个CPU同一时刻只能执行一条线程，因此每个CPU每个时刻只有一条运行态的线程。

#### 阻塞态

- 当一条正在执行的线程请求某一资源失败时，就会进入阻塞态。
- 而在Java中，阻塞态专指请求锁失败时进入的状态。
- 由一个阻塞队列存放所有阻塞态的线程。
- 处于阻塞态的线程会不断请求资源，一旦请求成功，就会进入就绪队列，等待执行。

PS：锁、IO、Socket等都资源。

#### 等待态

- 当前线程中调用wait、join、park函数时，当前线程就会进入等待态。
- 也有一个等待队列存放所有等待态的线程。
- 线程处于等待态表示它需要等待其他线程的指示才能继续运行。
- 进入等待态的线程会释放CPU执行权，并释放资源（如：锁）

#### 超时等待态

- 当运行中的线程调用sleep(time)、wait、join、parkNanos、parkUntil时，就会进入该状态；
- 它和等待态一样，并不是因为请求不到资源，而是主动进入，并且进入后需要其他线程唤醒；
- 进入该状态后释放CPU执行权 和 占有的资源。
- **与等待态的区别：**到了超时时间后自动进入阻塞队列，开始竞争锁。

#### 终止态

线程执行结束后的状态。

#### 注意：

- wait()方法会释放CPU执行权 和 占有的锁。
- sleep(long)方法仅释放CPU使用权，锁仍然占用；线程被放入超时等待队列，与yield相比，它会使线程较长时间得不到运行。
- yield()方法仅释放CPU执行权，锁仍然占用，线程会被放入就绪队列，会在短时间内再次执行。
- wait和notify必须配套使用，即必须使用同一把锁调用；
- wait和notify必须放在一个同步块中
- 调用wait和notify的对象必须是他们所处同步块的锁对象。



### Synchronized同步方法

##### 作用：能够保证在同一时刻最多只有一个线程执行该段代码，以达到并发安全的效果。

##### 介绍：JVM可以通过monitor来加锁和解锁，保证同时只有一个线程可以执行代码，从而保证了线程安全，同时具有可重入和不可中断的性质。

### Synchronized的两个作用

- 对象锁

  - 包括方法锁（默认锁对象为this当前的实例对象）

  ```java
  public void run() {
      // 默认当前实例为锁对象
      synchronized(this) {
          System.out.println(Thread.currentThread().getName() + "运行开始");
          try{
              Thread.sleep(3000);
          } catch(InterruptedException e) {
              e.printStackTrace();
          }
          System.out.println(Thread.currentThread().getName() + "运行结束")；
      }
  }
  ```

  ```java
  // 锁对象默认为this
  public synchronized void method() {
     System.out.println(Thread.currentThread().getName() + "运行开始");
      try{
          Thread.sleep(3000);
      } catch(InterruptedException e) {
          e.printStackTrace();
      }
       System.out.println(Thread.currentThread().getName() + "运行开始");
  }
  ```



  - 同步代码块锁（自己指定锁对象）

  ```java
  // 定义锁
  Object lock = new Object();
  public void run() {
      synchronized(lock) {
          System.out.println(Thread.currentThread().getName() + "运行开始")
          try{
              Thread.sleep(3000);
          } catch(InterruptedException e) {
              e.printStackTrace();
          }
          System.out.println(Thread.currentThread().getName() + "运行结束")；
      }
  }
  ```

- 类锁 （java类可以有很多个对象，但只有一个Class对象）

  - 所谓类锁，就是对Class对象加锁
  - synchronized修饰的静态的方法

  ```java
  // 锁对象默认为类对象，多个实例访问该方法的时候是顺序执行的
  public static synchronized void method() {
     System.out.println(Thread.currentThread().getName() + "运行开始");
      try{
          Thread.sleep(3000);
      } catch(InterruptedException e) {
          e.printStackTrace();
      }
       System.out.println(Thread.currentThread().getName() + "运行开始");
  }
  ```

  - 指定锁对象为Class对象

  ```java
  // 定义Class锁
  public void run() {
      synchronized(xxx.class) {
          System.out.println(Thread.currentThread().getName() + "运行开始")
          try{
              Thread.sleep(3000);
          } catch(InterruptedException e) {
              e.printStackTrace();
          }
          System.out.println(Thread.currentThread().getName() + "运行结束")；
      }
  }
  ```


- A线程先持有`object`的锁，B线程可以以异步的方式调用`object`中的非`synchronized`修饰的方法。
- A线程先持有`object`的锁，B线程可以以异步的方式调用`object`对象中的`synchronized`修饰的方法则需要等待，也就是`同步`。

```java
class xxx {
    synchronized public void method (){}
    private String lock = "lock";
    synchronized (lock){}  
}
```

上面的两个锁不是同一个对象，所以在调用的时候不能够同步。



- synchronized锁重入：关键字synchronized锁，拥有锁重入的功能，也就是在使用synchronized时，当一个线程得到一个对象锁后，再次请求此对象锁是可以再次得到该对象的锁的。

`什么是可重入锁，比如一个线程获得了某个对象的锁，此时这个对象还没有释放，当其再次想要获得这个对象的锁的时候还是可以获取的。如果不可重入就会造成死锁`

- 出现异常时锁会被自动释放。
- 同步不能继承，尽管父类的方法加`synchronized`关键字，但是子类要使用此方法还要加

##### 情况:

- 两个线程访问的是一个对象的同一个同步方法
- 两个线程访问的是两个实例的同一个同步方法
- 两个线程访问的是synchronized的静态方法
- 同时访问同步方法和非同步方法
- 访问同一个对象的不同的普通同步方法
- 同时访问静态synchronized和非静态synchronized方法
- 方法抛出异常后，会释放锁

##### 字节码：

- monditorenter
- monditorexit

##### 可重入原理：

- 加锁次数计数器
- JVM负责跟踪对象被加锁的次数
- 线程第一次给对象加锁的时候，计数器会变为1，每当这个相同的线程在此对象上再次获得锁时，计数会递增。
- 每当任务离开的时候，计数递减，当计数为0的时候，锁被完全释放。

##### 可见性原理：

-  被Synchronized释放锁之前将被修改的内容写回主内中
- 在进入Synchroized之后数据也是从主内存中获取

##### 缺点：

- 效率低
  - 锁的释放情况少
    - 任务执行完毕
    - 抛出异常
  - 试图获得锁时不能设定超时
  - 不能中断一个正在试图活得锁的线程
- 不够灵活
  - 加锁和释放的时机单一（读写锁更灵活）
  - 每个锁有单一的条件（某个对象）
- 无法知道是否成功获取锁



### 线程调试技巧

### 暂停线程的方法

- #### Thread.stop()

  最好不要用它。他可以实现线程的停止，但是这个方法是不安全的。这个方法和`suspend`，`resume`一样已经是作废过期的方法，会产生不可预料的结果。

  ```java
  public class MyThread extends Thread {
      @Override
      public void run(){
          super.run();
          try{
              this.stop();
          } catch(ThreadDeath threadDeath){
              System.out.println("我进入catch()");
          }
      }
  }
  ```

  如果调用stop方法，将抛出`ThreadDeath`异常。他让线程强制停止，有可能使一些清理工作得不到完成，另外一个情况就是对锁定的对象进行了“解锁”，导致数据得不到同步的处理，出现数据不一致的问题。



  使用`interrupt`和`return`来来结束线程，但是还是建议用`抛异常的方式`来停止线程，因为可以在catch块中进行对异常的处理，而且使用异常流更好，能够更方便的控制程序的运行流程。不至于在代码中出现多个return,造成污染。

- #### Interrupt

  - 当我们在调用`interrupt`方法的时候，仅仅是在当前现线程中添加一个停止的标记，并不是真正的停止线程。

- #### interrupted()

  - 设置当前线程是中断状态，执行之后具有将状态标志清除为`fasle`的功能。

- #### isInterrupted()

  - 判断线程对象是否已经是中断状态，但不清楚状态标志。

#### 注意点

- 锁对象不能为空（锁的对象的信息是保存到对象头上的）
- 作用域不宜过大 （如果过大会降低程序的运行效率）
- 避免死锁（互相请求拥有锁的方法）

### 如何选择Lock和synchronized?

- 如果可以的话两个都不使用
- 优先使用synchronized
- 如果使用Lock的特性的时候使用Lock



### ThreadLocal

ThreadLocal主要解决的就是每个线程绑定自己的指们可以将ThreadLocal类比喻成全剧存放数据的盒子，盒子中可以存放每个线程私有数据。

类ThreadLocal解决的是变量在不同线程间的隔离性，也就是不同线程拥有自己的值，不同的线程中值是可以放入ThreadLocal类中进行保存。

通过覆盖ThreadLocal中的initialValue(）方法解决第一次获取值为null的情况

类InheritableThreadLocal的使用

使用InheritableThreadLocal的时候，如果子线程在取值的同时，主线程将InheritableThreadLocal中的值进行了修改那么，子线程取到的值还是旧值。