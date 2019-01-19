[TOC]



> 如果是非线程安全，多个线程对统一个对象中的实例变量进行并发的访问时发生。产生的后果就是出现脏读。
>
> 非线程安全问题存在与实例变量中。如果是方法内部的私有变量，则不存在非线程安全问题。因为方法内部的变量是私有的。

### Synchronized同步方法

##### 作用：能够保证在同一时刻最多只有一个线程执行该段代码，以达到并发安全的效果。

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