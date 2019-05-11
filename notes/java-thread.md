[TOC]



> 如果是非线程安全，多个线程对统一个对象中的实例变量进行并发的访问时发生。产生的后果就是出现脏读。
>
> 非线程安全问题存在与实例变量中。如果是方法内部的私有变量，则不存在非线程安全问题。因为方法内部的变量是私有的。

##### 线程的start和run方法的区别？

```java
public static void main(String[] args) {
    Thread t = new Thread(){
        @Override
        public void run() {
            attack();
        }
    };
    t.run();
    t.start();
}

public static void attack() {
    System.out.println("Go");
    System.out.println("currentThread: " + Thread.currentThread().getName());
}
// Go
// currentThread: main
// Go
// currentThread: Thread-0
```

![1551611425352](C:\Users\maxu1\Desktop\MX-Notes\notes\1551611425352.png)

```java
public synchronized void start() {

    if (threadStatus != 0)
        throw new IllegalThreadStateException();
    group.add(this);
    boolean started = false;
    try {
        // 调用本地方法，用JVM_StartThread创建一个子线程（Thread_entry）由子线程调用run方法
        start0();
        started = true;
    } finally {
        try {
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {
            /* do nothing. If start0 threw a Throwable then
                  it will be passed up the call stack */
        }
    }
}
```



- 调用start()方法，会创建一个新的子线程并启动
- run()方法只是Thread的一个普通方法的调用

### Thread方法

| 方法名          | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| currentThread() | 返回代码段正在别那个线程调用                                 |
| isAlive()       | 判断线程是否处于活动状态。活动状态就是线程已经启动还没终止的。线程处于正在运行或者准备开始运行的状态，就认为是活动状态。 |
| sleep()         | 在指定的毫秒数让当前线程休眠                                 |
| getId()         | 取得线程的唯一标识                                           |
| yield()         | 放弃当前CPU的资源，将他让给其他任务去占用CPU的执行时间。但放弃的时间是不确定的。有可能刚刚放弃，马上又获得CPU时间片，不会影响锁的行为 |
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

##### Sleep和Wait的区别？

- wait是Object类中的方法，Sleep是Thread类中的方法
- sleep()方法可以在任何地方使用
- wait()方法只能在synchronized方法或者在synchronized块中使用（因为wait只有获得锁之后才会释放）

最主要的区别：

- Thread.sleep()只会让出CPU,不会导致锁行为的改变。
- Object.wait()不仅让出CPU,还会释放已经占有的同步资源锁。

##### notify和notifyAll的区别？

锁池：假设线程A已经拥有了某个对象（不是类）的锁，而其他线程B、C想要调用这个对象的某个synchroized方法（或者块），由于B、C线程在进入对象的synchronized方法（或者块）之前必须先获得该对象锁的拥有权，而恰巧该对象的锁目前正被线程A所占用，此时B、C线程就会被阻塞、进入一个地方去等待锁的释放，这个地方便是对象的锁池。

- notify会从锁池中随机选择一个唤醒
- notifyAll会唤醒锁池中所有的线程

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

##### Thread和Runnable的区别？

- Thread是实现了Runnable接口的类，使得run支持多线程
- 因类的单一继承原则，推荐使用Runnable接口

##### 如何给run方法传递参数？

##### 如何处理线程返回值？

- 主线程等待

  ```java
  public class CycleWait implements Runnable {
      private String value;
  
      public static void main(String[] args) throws InterruptedException {
          CycleWait cw = new CycleWait();
          Thread t = new Thread(cw);
          t.start();
          while (cw.value == null) {
              Thread.sleep(100);
          }
          System.out.println(cw.value);
      }
  
      @Override
      public void run() {
          try {
              Thread.sleep(Long.parseLong("5000"));
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
          value = "we have data now";
      }
  }
  ```

- join方法

  ```java
  public class CycleWait implements Runnable {
  	private String value;
  
  	public static void main(String[] args) throws InterruptedException {
  		CycleWait cw = new CycleWait();
  		Thread t = new Thread(cw);
  		t.start();
  		t.join();
  		System.out.println(cw.value);
  	}
  
  	@Override
  	public void run() {
  		try {
  			Thread.sleep(Long.parseLong("5000"));
  		} catch (InterruptedException e) {
  			e.printStackTrace();
  		}
  		value = "we have data now";
  	}
  }
  ```

- Callable接口实现：通过FutureTask 

  ```java
  public class CallableDemo implements Callable<String> {
  
  	@Override
  	public String call() throws Exception {
  		System.out.println("start...");
  		Thread.sleep(5000);
  		return "end...";
  	}
  
  }
  
  class FutureDemo {
  	public static void main(String[] args) throws ExecutionException, InterruptedException {
  		FutureTask future = new FutureTask(new CallableDemo());
  		Thread thread = new Thread(future);
  		thread.start();
          // 判断传入的Callable接口的call方法已经执行完成
  		if (!future.isDone()) {
  			System.out.println("task hash not finished, please wait!");
  		}
          // 获取返回值，如果没有执行完成，会阻塞
  		System.out.println("task return: " + future.get());
  	}
  }
  ```

- 线程池获取

```java
public static void main(String[] args) {
    ExecutorService newPool = Executors.newCachedThreadPool();
	// 使用线程池能够提交更多线程，让线程并发执行    
    Future<String> submit = newPool.submit(new CallableDemo());
    if (!submit.isDone()) {
        System.out.println("please wait!");
    }
    try {
        System.out.println(submit.get());
    } catch (InterruptedException e) {
        e.printStackTrace();
    } catch (ExecutionException e) {
        e.printStackTrace();
    } finally {
        newPool.shutdown();
    }
}
```



### JAVA中线程的状态

在Java中线程的状态一共被分成6种：

![1551749425572](C:\Users\maxu1\Desktop\MX-Notes\notes\1551749425572.png)

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

#### 无限等待态 Waiting

- 当前线程中调用Object.wait()、Thread.join()、LockSupport.park()函数时，当前线程就会进入等待态。
- 也有一个等待队列存放所有等待态的线程。
- 线程处于等待态表示它需要等待其他线程的唤醒才能继续运行。
- 进入等待态的线程会释放CPU执行权，也就是不会被分配CPU的执行时间，并释放资源（如：锁）

#### 限期等待态 Timed Waiting 

- 当运行中的线程调用Thread.sleep(time)、Object.wait()、Thread.join()、LockSupport.parkNanos()、LockSupport.parkUntil()时，就会进入该状态；
- 它和等待态一样，并不是因为请求不到资源，而是主动进入，并且进入后由系统自动唤醒；
- 进入该状态后释放CPU执行权 和 占有的资源。
- **与等待态的区别：**到了超时时间后自动进入阻塞队列，开始竞争锁。

#### 终止态

- 线程执行结束后的状态。
- 线程终止之后就不可以再被再次调用，否则抛出异常

```java
Exception in thread "main" java.lang.IllegalThreadStateException
```



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

##### 可见性：必须确保在锁释放之前，对共享变量所做的修改，对随后获得该锁的另一个线程是可见的（即在获得锁时应获得最新共享变量的值），否则另一个线程可能对本地保存的缓存数据的副本上进行操作，从而引起不一致的现象

###### synchronized锁的不是代码，锁的都是对象

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

实现Synchronized的基础

- Java对象头

  | 虚拟机位数 | 头对象结构             | 说明                                                         |
  | ---------- | ---------------------- | ------------------------------------------------------------ |
  | 32\64      | Mark Word              | 默认存储对象的hashCode,分代年龄，锁类型，锁标识位等信息      |
  | 32\64      | Class Metadata Address | 类型指针指向对象的类元数据，JVM通过这个指针确定该对象是哪个类的数据 |

- Monitor ：每个Java对象天生具有一个锁

```c++
ObjectMonitor::ObjectMonitor() {
  _header       = NULL;
  _count        = 0; // 计数器
  _waiters      = 0,
  _recursions   = 0;
  _object       = NULL;
  _owner        = NULL; // 保存获得锁的线程
  _WaitSet      = NULL; // 等待队列
  _WaitSetLock  = 0 ;
  _Responsible  = NULL ;
  _succ         = NULL ;
  _cxq          = NULL ;
  FreeNext      = NULL ;
  _EntryList    = NULL ; // 锁池
  _SpinFreq     = 0 ;
  _SpinClock    = 0 ;
  OwnerIsThread = 0 ;
}
```

##### 字节码：

```java
public void syncsTask() {
    synchronized (this) {
        System.out.println("hello");
    }
}

public synchronized void syncTask() {
    System.out.println("hello again");
}
```

```java
public void syncsTask();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=1
         0: aload_0
         1: dup
         2: astore_1
         3: monitorenter // 当执行到这里的时候当前线程尝试获取对象锁
         4: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         7: ldc           #3                  // String hello
         9: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        12: aload_1
        13: monitorexit // 释放锁
        14: goto          22
        17: astore_2
        18: aload_1
        19: monitorexit
        20: aload_2
        21: athrow
        22: return
            
public synchronized void syncTask();
    descriptor: ()V
    flags: ACC_PUBLIC, ACC_SYNCHRONIZED  // 这个标志代表该方法已经加锁
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #5                  // String hello again
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 12: 0
        line 13: 8

```

### 自旋锁

- 许多情况下，共享数据的锁定状体持续时间较短，切换线程不值得
- 通过让线程执行忙循环等待锁的释放，不让出CPU
- 缺点：当锁占用的时间比较长的时候，会带来性能上的开销

### 自适应自旋锁

- 自旋的次数不再固定
- 由前一次在同一个锁上的自旋时间及锁的拥有者状态来决定的

### 锁消除

- `JIT`编译时，对运行上下文进行扫描，去除不可能存在竞争的锁。

  ```java
  public void add(String str1,String str2) {
      // StringBuffer是线程安全的，由于sb,只会在append方法中使用，不可能被其他线程引用
     	// 因此sb属于不可能共享的资源，JVM会自动消除内部的锁
      StringBuffer sb = new StringBuffer();
      sb.append(str1).append(str2);
  }
  ```

### 锁粗化

- 通过扩大加锁的范围，避免反复加锁和解锁

```java
public void add(String str1) {
    int i = 0;
    StringBuffer sb = new StringBuffer();
    while(i++ < 100)
        // 这种多次加锁，导致性能问题，所以JVM扩大加锁范围到方法的外部，只需要加一次锁就可以了。
    	sb.append(str1);
}
```

synchronized的四种状态：

- 无锁，偏向锁，轻量级锁，重量级锁

偏向锁：

- 大多数情况下，锁不存多线程的竞争，总是由同一线程获得

  核心思想：如果一个线程获得了锁，那么锁就进入偏向模式，此时Mark Word的结构也变为偏向锁结构，当该线程再次请求锁时，无需再做任何的操作，即获取锁的过程只需要检查Mark Word的锁标记位为偏向锁，以及当前线程id等于Mark Word 的ThreadID即可，这样就省去了大量有关锁申请的操作。

轻量级锁：

- 轻量级锁是由偏向锁升级而来的，偏向锁运行在一个线程进入同步块的情况下，当第二个线程加入锁争用的时候，偏向锁就会升级成为轻量级的锁。
- 适用场景：线程交替
- 若存在同一时间访问同一锁的情况下，就会导致轻量级锁膨胀为重量级锁。

锁的内存语义：

- 当线程释放锁的时候，Java内存模型会把该线程对应的本地内存中的共享变量刷新到主内存中；
- 而当线程获取锁的时候，Java内存模型会将该线程本地内存置为无效，从而使得被监视器保护的临界资源必须从主内存中读取共享变量

![1551778205860](C:\Users\maxu1\Desktop\MX-Notes\notes\1551778205860.png)

ReentrantLock公平性的设置

```java
ReentrantLock lock = new ReentrantLock();
```

参数为true的时候，倾向于将锁赋予等待时间最久的线程。

synchronized和ReentrantLock的区别？

- synchronized是非公平锁
- ReentrantLock是类，sybchronized是关键字
- ReentrantLock可是对获取锁的等待时间进行设置，可以避免死锁
- ReentrantLock可以获取锁的信息
- ReentrantLock可以灵活的实现多路通知
- 实现的机制是不一样的，ReentrantLock是调用Unsafe类的park（）方法，synchronized是操作对象头上的Mark Word

### 线程调试技巧

### 暂停线程的方法

- #### Thread.stop()

  最好不要用它。他可以实现线程的停止，但是这个方法是不安全的。当线程A调用线程B的Stop方法的时候，线程A并不知道线程B的具体执行情况，可能影响线程B的清理工作，而且调用stop方法线程B会立即释放锁，可能引发数据同步不一致的现象。

  这个方法和`suspend`，`resume`一样已经是作废过期的方法，会产生不可预料的结果。

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

- #### Interrupt()

  - 当我们在调用`interrupt`方法的时候，仅仅是在当前现线程中添加一个停止的标记,通知线程该中断了，并不是真正的停止线程。
  - 如果线程处于被阻塞的状态，那么线程将立即退出被阻塞的状态，并抛出一个InterruptedException异常
  - 如果线程处于正常的活动状态，那么会将该线程的中断标志设置为true.被设置中断标志的线程将继续正常运行，不受影响。

  ![1551701686206](C:\Users\maxu1\Desktop\MX-Notes\notes\1551701686206.png)

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



##### Java进程和线程的关系

- java对操作系统提供的功能进行封装，包括进程和线程
- 运行一个程序会产生一个进程，进程包含至少一个线程
- 每个进程对应一个JVM实例，多个线程共享JVM堆
- Java采用单线程编程模型，程序会自动创建主线程
- 主线程可以创建子线程,原则上要后于子线程完成

```java
public static void main(String[] args) {
    System.out.println("currentThread" + Thread.currentThread().getName());
    // currentThread: main
}
```

补充：一个程序是一个可以执行的文件，而一个进程是执行中的实例。

##### 等待超时机制伪代码

```java
public synchronized Object get(long mills) throw InterruptedException {
    long future = System.currentTimeMills() + mills;
    long remaining = mills;
    // 当超时大于0并且result返回值不满足要求
    while((result == null) && remaining > 0) {
        wait(remaining);
        remaining = future - System.currentTimeMillis();
    }
    return result;
}
```

##### 等待/通知经典范式

```java
synchronized(对象) {
    while(条件不满足) {
        对象.wait();
    }
    对应的处理逻辑
}

synchronized(对象) {
	改变条件
    对象.notifyAll();
}
```

