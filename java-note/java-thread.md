> 如果是非线程安全，多个线程对统一个对象中的实例变量进行并发的访问时发生。产生的后果就是出现脏读。
>
> 非线程安全问题存在与实例变量中。如果是方法内部的私有变量，则不存在非线程安全问题。因为方法内部的变量是私有的。

### synchronized同步方法

- synchronized获取的锁都是对象锁。
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



### 暂停线程的方法

- #### Thread.stop()

  最好不要用它。他可以实现线程的停止，但是这个方法是不安全的。这个方法和`suspend`，`resume`一样已经是作废过期的方法，会产生不可预料的结果。

  `当使用这两个方法的时候，如果使用不当，很容易造成公共同步对象的独占。`

  `使得其他线程无法访问公共同步对象`，`还有可能导致数据不同步的现象。`

  ```java
  public class MyThread extends Thread {
      @Override
      public void run(){
          super.run();
          try{
              this.stop();
          } catch(){
              System.out.println("我进入catch()");
          }
      }
  }
  ```

- #### Interrupt

  - 当我们在调用`interrupt`方法的时候，仅仅是在当前现线程中打一个停止的标记，并不是真正的停止线程。

- #### interrupted()

  - 设置当前线程是中断状态，执行之后具有将状态标志清除为`fasle`的功能。

- #### isInterrupted()

  - 判断线程对象是否已经是中断状态，但不清楚标志。
