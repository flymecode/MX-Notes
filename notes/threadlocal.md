# ThreadLocal

- 能让线程有自己内部的变量
- 每个线程可以通过get,set 方法进行操作
- 可以覆盖initialValue方法指定线程独享的值
- 通常会用来修饰类里的private static final的属性，为线程设置一些状态信息，
 例如userId 或者 Transaction ID
- 每个线程都有一个指向threadLocal实例的弱引用，只要线程一直存活或者该threadLocal实例能被访问到，都不会被垃圾回收掉

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






























