# ThreadLocal

- 能让线程有自己内部的变量
- 每个线程可以通过get,set 方法进行操作
- 可以覆盖initialValue方法指定线程独享的值
- 通常会用来修饰类里的private static final的属性，为线程设置一些状态信息，
 例如userId 或者 Transaction ID
- 每个线程都有一个指向threadLocal实例的弱引用，只要线程一直存活或者该threadLocal实例能被访问到，都不会被垃圾回收掉

ThreadLocal本身不保存数据，是依靠线程的ThreadLocalMap来保存数据的。ThreadLocal只是作为key，保存在ThreadLocalMap中。
所以
# get
```java
public T get() {
    // 获取当前线程
    Thread t = Thread.currentThread();
    // 获取当前线程内部的ThreadLocalMap
    ThreadLocalMap map = getMap(t);
    // 存在则获取当前ThreadLocal对应的value值
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    // map不存在或者找不到value值，则调用setInitialValue进行初始化
    return setInitialValue();
}


private T setInitialValue() {
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            // ThreadLocal 为key
            map.set(this, value);
        else
            createMap(t, value);
        return value;
    } 
    
    
```
ThreadLocal 内部有一个 ThreadLocalMap内部类，但是ThreadLocal内部没有持有这个内部类的变量，
这个变量的持有至是Thread,所以我们就明白了为什么ThreadLocal是如何做到，每一个线程维护变量的副本（引用），就是在ThreadLocal内部有一个
ThreadLocalMap,用来存储每个线程的变量副本，Map中元素的键为线程对象，而值为对应的变量的副本。
# ThreadLocal 不是用来解决多线程下访问共享变量问题的
- ThreadLocal可以将本地线程持有一个共享变量的副本，它主要是提供了保持对象的方法和避免参数传递的方便的对象访问方式。
- 每个对象中都有一个自己的ThreadLocalMap类对象，可以将线程自己的对象保持到其中，各自管理各自的，线程可以正确的访问到自己的对象。
- 将一个共用的ThreadLocal静态实例作为key，将不同的对象的引用保存到不同线程的ThreadLocalMap中，然后在线程生命周期内执行的各处通过这个静态ThreadLocal
实例的get方法获取自己线程保存的那个对象，避免了将这个对象作为参数传递的麻烦。

# 运用

大家都知道SimpleDateFormat是线程不安全的，为了线程安全，我们是不是每个线程使用SimpleDateFormat的时候都手动new一个新的来用，这是非常麻烦的，
一般来说，在开发的时候SimpleDateFormat是放在工具类里面的，阿里巴巴开发手册是这样推荐的。
```java
public DateUtils {
    public static final ThreadLocal<SimpleDateFormat> df = new ThreadLocal<>() {
      @Override
      protected DateFormat initialValue() {
          return new SimpleDateFormat("yyyy-MM-dd");
      }  
    };
}
```


ThreadLocalMap内部定义了弱引用的Entry用来存放key和value，定义了Entry数组存放Entry,数组的默认容量为16,并且数组的容量必须为2的幂，比如32,64
,128等等。

1.内存泄露

ThreadLocalMap使用ThreadLocal的弱引用作为key，如果一个ThreadLocal没有外部强引用来引用它，那么系统 GC 的时候，这个ThreadLocal势必会被回收，
ThreadLocalMap中就会出现key为null的Entry，就没有办法访问这些key为null的Entry的value，如果当前线程再迟迟不结束的话，这些key为null的Entry的
value就会一直存在一条强引用链：Thread Ref -> Thread -> ThreadLocalMap -> Entry -> value永远无法回收，造成内存泄漏。

ThreadLocalMap的设计中已经考虑到这种情况，也加上了一些防护措施：在ThreadLocal的get(),set(),remove()的时候都会清除线程ThreadLocalMap里所
有key为null的value。

2.为什么用弱引用？

key 使用强引用：引用的ThreadLocal的对象被回收了，但是ThreadLocalMap还持有ThreadLocal的强引用，如果没有手动删除，ThreadLocal不会被回收，
导致Entry内存泄漏。

key 使用弱引用：引用的ThreadLocal的对象被回收了，由于ThreadLocalMap持有ThreadLocal的弱引用，即使没有手动删除，ThreadLocal也会被回收。
value在下一次ThreadLocalMap调用set,get，remove的时候会被清除,否则value内存溢出。

由于ThreadLocalMap的生命周期跟Thread一样长，如果没有手动删除对应key，都会导致内存泄漏，但是使用弱引用可以多一层保障：弱引用ThreadLocal不会
内存泄漏，对应的value在下一次ThreadLocalMap调用set,get,remove的时候会被清除。






























