## Set

- set代表一种集合元素无序，集合元素不可重复的集合。

- HashSet的实现是基于HashMap的,它只是封装了一个HashMap对象来存储所有的集合元素。
- 所有放入HashSet中的集合元素实际上由HashMap的key来保存，而HashMap的value则存储一个静态的Object对象。

```java
public HashSet() {
        map = new HashMap<>();
}
```

![](https://github.com/flymecode/MX-Notes/blob/master/image/26341ef9fe5caf66ba.jpg)

## Map

- map是一种key-value对组成的集合。

- Map集合是Set集合的扩展。

- 系统采用Hash算法决定集合元素的存储位置，这样可以保证快速存，取集合元素。

- 集合中保存的是对象的引用，并不是将Java对象放入set集合中。

## HashMap

- 它根据键的hashCode值存储数据，大多数情况下可以直接定位到它的值，因而具有很快的访问速度，但遍历顺序却是不确定的。 
- HashMap最多只允许一条记录的键为null，允许多条记录的值为null。
- HashMap非线程安全，即任一时刻可以有多个线程同时写HashMap，可能会导致数据的不一致。
- 如果需要满足线程安全，可以用 Collections的synchronizedMap方法使HashMap具有线程安全的能力，或者使用ConcurrentHashMap。

##  Hashtable

- Hashtable是遗留类，很多映射的常用功能与HashMap类似，不同的是它承自Dictionary类，并且是线程安全的，任一时间只有一个线程能写Hashtable，并发性不如ConcurrentHashMap，因为ConcurrentHashMap引入了分段锁。
- Hashtable不建议在新代码中使用，不需要线程安全的场合可以用HashMap替换，需要线程安全的场合可以用ConcurrentHashMap替换。

## LinkedHashMap

- LinkedHashMap是HashMap的一个子类，保存了记录的插入顺序，在用Iterator遍历LinkedHashMap时，先得到的记录肯定是先插入的，也可以在构造时带参数，按照访问次序排序。

## TreeMap

- TreeMap实现SortedMap接口，能够把它保存的记录根据键排序，默认是按键值的升序排序，也可以指定排序的比较器，当用Iterator遍历TreeMap时，得到的记录是排过序的。

- 如果使用排序的映射，建议使用TreeMap。

- 在使用TreeMap时，key必须实现Comparable接口或者在构造TreeMap传入自定义的Comparator，否则会在运行时抛出java.lang.ClassCastException类型的异常。

  

`对于上述四种Map类型的类，要求映射中的key是不可变对象。不可变对象是该对象在创建后它的哈希值不会被改变。如果对象的哈希值发生变化，Map对象很可能就定位不到映射的位置了。`



## JDK1.7解读HashMap

```java
public V put(K key, V value) {
    if(key == null) {
        // 如果key为null，调用putForNullKey方法进行处理
       return putForNullKey(value); 
    }
    // 根据key的keyCode计算Hash值
    int hash = hash(key.hashCode());
    // 搜索指定hash值在对应table中的索引
    int i = indexFor(hash, table.length);
    // 如果i索引处的Entry不为null,通过循环不断遍历e元素的下一个元素。
    for(Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        // 找到指定key与需要放入的key相等
        if(e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }
    // 如果i索引处的Entry为null,表明此处还没有Entry
    modCount++;
    // 将key、value添加到i索引处
    addEntry(hash,key,value,i);
    return null;
}
```

从源码可以看出当试图将一个key-value对放入HashMap中时，首先根据该key的hashCode()返回值决定该Entry的存储位置：如果两个Entry的key的hashCode()返回值相同，那它们的存储位置相同；如果这两个Entry的key通过equals比较返回true，新添加Entry的value将覆盖集合中原有Entry的value,但是key不会覆盖，如果这两个key比较返回fase,新添加的Entry将与集合中原有的Entry形成Entry链，而且新添加的Entry位于Entry链的头部。

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
    // 获取指定bucketIndex索引处的Entry
    Entry<K,V> e = table[bucketIndex];                  // 1
    // 将新创建的Entry放入bucketIndex索引处，并让新的Entry指向原来的Entry
    table[bucketIndex] = new Entry<K,V>(hash, key, value, e);
    // 如果Map中的key-value对的数量超过了极限
    // size: 保存HashMap中所包含的key-value数量
    // treshold: 包含了HashMap能容纳的key-value对的极限， 等于capacity * loadFactor
    if(size ++ >= threshold) {
        // 把table对象的长度扩容2倍
        resize(2 * table.length);
    }
}
```

将新添加的Entry对象放入table数组的bucketIndex索引处，如果bucketIndex索引处已经有一个Entry对象，新添加的Entry对象指向原有的Entry对象（产生一个Entry链），如果bucketIndex索引处没有Entry对象，也就是上面代码中1 行代码的e变量是null,即新放入的Entry对象指向null,就没有产生Entry链。

```java
// 指定初始化容量，负载因子创建HashMap 
public HashMap(int initialCapacity, float loadFactor) {
    	// 负载因子不能为负数
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
    	// 如果初始化容量大于最大容量，让初始化容量等于最大容量
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
    	// 负载因子必须是大于0的数
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);
    
        this.loadFactor = loadFactor;
   		
    }

```

## JDK1.8解读HashMap

### 存储结构-字段

从结构实现来讲，HashMap是数组+链表+红黑树（JDK1.8增加了红黑树部分）实现的，如下图所示

![preview](https://pic1.zhimg.com/8db4a3bdfb238da1a1c4431d2b6e075c_r.jpg)

数据底层具体存储的是什么？这样的存储方式有什么优点呢？

1. 从源码可知，HashMap类中有一个非常重要的字段，就是 Node[] table，即哈希桶数组，明显它是一个Node的数组。我们来看Node[JDK1.8]是何物。

   ```java
   static class Node<K,V> implements Map.Entry<K,V> {
           final int hash;    //用来定位数组索引位置
           final K key;
           V value;
           Node<K,V> next;   //链表的下一个node
   
           Node(int hash, K key, V value, Node<K,V> next) { ... }
           public final K getKey(){ ... }
           public final V getValue() { ... }
           public final String toString() { ... }
           public final int hashCode() { ... }
           public final V setValue(V newValue) { ... }
           public final boolean equals(Object o) { ... }
   }
   ```

   Node是HashMap的一个内部类，实现了Map.Entry接口，本质是就是一个映射(键值对)。上图中的每个黑色圆点就是一个Node对象。

2. HashMap就是使用哈希表来存储的。

   哈希表为解决冲突，可以采用`开放地址法和链地址法`等来解决问题，Java中HashMap采用了`链地址法`。

   链地址法，简单来说，就是数组加链表的结合。

   在每个数组元素上都一个链表结构，当数据被Hash后，得到数组下标，把数据放在对应下标元素的链表上。

   例如程序执行下面代码：

   ```java
    map.put("美团","小美");
   ```

   系统将调用"美团"这个key的hashCode()方法得到其hashCode 值（该方法适用于每个Java对象），然后再通过Hash算法的后两步运算（高位运算和取模运算，下文有介绍）来定位该键值对的存储位置，有时两个key会定位到相同的位置，表示发生了Hash碰撞。

   

3. 当然Hash算法计算结果越分散均匀，Hash碰撞的概率就越小，map的存取效率就会越高。

   如果哈希桶数组很大，即使较差的Hash算法也会比较分散，如果哈希桶数组数组很小，即使好的Hash算法也会出现较多碰撞，所以就需要在空间成本和时间成本之间权衡，其实就是在根据实际情况确定哈希桶数组的大小，并在此基础上设计好的hash算法减少Hash碰撞。

   那么通过什么方式来控制map使得Hash碰撞的概率又小，哈希桶数组（`Node[] table`）占用空间又少呢？

   答案就是好的Hash算法和扩容机制。

   

   在理解Hash和扩容流程之前，我们得先了解下HashMap的几个字段。从HashMap的默认构造函数源码可知，构造函数就是对下面几个字段进行初始化，源码如下：

   ```java
      int threshold;             // 所能容纳的key-value对极限 
      final float loadFactor;    // 负载因子
      int modCount;  
      int size;
   ```

   首先，Node[] table的初始化长度length(默认值是16)，Load factor为负载因子(默认值是0.75)，threshold是HashMap所能容纳的最大数据量的Node(键值对)个数。threshold = length * Loadfactor。也就是说，在数组定义好长度之后，负载因子越大，所能容纳的键值对个数越多。

   

   结合负载因子的定义公式可知，`threshold`就是在此Load factor和length(数组长度)对应下允许的最大元素数目，超过这个数目就重新`resize`(扩容)，扩容后的HashMap容量是之前容量的`两倍`。

   默认的负载因子`0.75`是对空间和时间效率的一个平衡选择，建议大家不要修改，除非在时间和空间比较特殊的情况下，如果内存空间很多而又对时间效率要求很高，可以降低负载因子Load factor的值。

   相反，如果内存空间紧张而对时间效率要求不高，可以增加负载因子loadFactor的值，`这个值可以大于1`。

   `size`这个字段其实很好理解，就是HashMap中实际存在的键值对数量。注意和table的长度length、容纳最大键值对数量threshold的区别。

   而modCount字段主要用来记录HashMap内部结构发生变化的次数，主要用于迭代的快速失败。

   强调一点，内部结构发生变化指的是结构发生变化，例如put新键值对，但是某个key对应的value值被覆盖不属于结构变化。

   在HashMap中，哈希桶数组table的长度length大小必须为2的n次方(一定是合数)，这是一种非常规的设计，常规的设计是把桶的大小设计为素数。

   相对来说素数导致冲突的概率要小于合数，具体证明可以参考[为什么一般hashtable的桶数会取一个素数](http://link.zhihu.com/?target=http%3A//blog.csdn.net/liuqiyao_01/article/details/14475159)，Hashtable初始化桶大小为11，就是桶大小设计为素数的应用（Hashtable扩容后不能保证还是素数）。HashMap采用这种非常规设计，主要是为了在取模和扩容时做优化，同时为了减少冲突，HashMap定位哈希桶索引位置时，也加入了高位参与运算的过程。

   这里存在一个问题，即使负载因子和Hash算法设计的再合理，也免不了会出现拉链过长的情况，一旦出现拉链过长，则会严重影响HashMap的性能。

   于是，在JDK1.8版本中，对数据结构做了进一步的优化，引入了红黑树。

   `而当链表长度太长（默认超过8）时`，链表就转换为红黑树，利用红黑树快速增删改查的特点提高HashMap的性能，其中会用到红黑树的插入、删除、查找等算法。本文不再对红黑树展开讨论，想了解更多红黑树数据结构的工作原理可以参考[教你初步了解红黑树](http://link.zhihu.com/?target=http%3A//blog.csdn.net/v_july_v/article/details/6105630)。

```java
public V put(K key, V value) {
     // 对key的hashCode()做hash
     return putVal(hash(key), key, value, false, true);
}
 
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
    	// tab 为空则进行创建
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
    	// 计算index，并对null进行处理
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            // 节点key存在直接覆盖value
            if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            // 判断该链是否是红黑树
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            // 该链为链表
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        // 当链表超过8进行转化为红黑树
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    // key已经存在直接覆盖value
                    if (e.hash == hash &&((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
    	// 超过最大容量，就扩容
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
```

```java
final Node<K,V>[] resize() {
        Node<K,V>[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap > 0) {
            // 超过最大值就不再扩充了，就只好随你碰撞去吧
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
             // 没超过最大值，就扩充为原来的2倍
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1; // double threshold
        }
        else if (oldThr > 0) // initial capacity was placed in threshold
            newCap = oldThr;
        else {               // zero initial threshold signifies using defaults
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
    	// 计算新的resize上限
        if (newThr == 0) {
            float ft = (float)newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE);
        }
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        table = newTab;
        if (oldTab != null) {
            // 把每个bucket都移动到新的buckets中
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { 
                        // 链表优化重hash的代码块
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            // 原索引
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            // 原索引+oldCap
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        // 原索引放到bucket里
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        // 原索引+oldCap放到bucket里
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }

```

# **小结**

(1) 扩容是一个特别耗性能的操作，所以当程序员在使用HashMap的时候，估算map的大小，初始化的时候给一个大致的数值，避免map进行频繁的扩容。

(2) 负载因子是可以修改的，也可以大于1，但是建议不要轻易修改，除非情况非常特殊。

(3) HashMap是线程不安全的，不要在并发的环境中同时操作HashMap，建议使用ConcurrentHashMap。

(4) JDK1.8引入红黑树大程度优化了HashMap的性能。


# ConcurrentHashMap
- ConcurrentHashMap底层也是数组和链表的方式，有一个Segment数组和一个HashEntry数组，Segment是一个实现可重入锁ReentrantLocak，用来分段技术
Segment和HashMap很像，是一种数组和链表构成的结构，一个Segment里包含一个HashEntry数组，每个HashEntry是一个链表的结构的元素。锁的个数，与Segment
数组的大小相等
- 定位Segment首先使用hash方法来对hashCode进行再散列，目的是减少哈希冲突，虽然定位HashEntry和Segment的散列算法一样，都与数组的长度减一，但是
他们与的值不一样，定位Segment使用的是hashcode的高位，而定位HashEntry直接使用再散列的值。
- get操作实现非常简单，通过两次散列定位到元素，get操作过程不需要进行加锁操作，除非读到的值是空才会加锁重读。ConcurrentHashMap将共享变量
- put操作必须进行加锁，首先判断是否对segment进行扩容，然后定位到HashEntry位置中，然后放入HashEntry数组中。
首先判断容量是不是超过阀值，ConcurrentHashMap是插入元素之后再进行判断是不是需要扩容。
- 在扩容的时候首先建立一个容量是原来数组两倍的数组，让后将原来的数组里的元素进行再散列后插入到新的数组里。ConcurrentHashMap不会对整个容器进行扩容，而是对
某个Segment进行扩容。
- size统计，尝试两次无锁统计，观察count有无变化，就将统计结果返回，如果统计过程中，count发生了变化，则采取加锁统计。


# 安全对列

- 一种使用阻塞队列，可以使用一对锁，入队和出队使用同一把锁，或者入队一把，出队一把。
- 非阻塞算法，使用CAS来保障线程安全。

ConcurrentLinkedQueue是一个基于链接节点的无界线程安全的队列。

- 入队：首先定位到尾节点，将入队节点设置为尾节点的下一个节点，第二是更新tail节点，如果tail节点next不为空，则将入队节点设置为tail节点，反之将入队节点的
next设置为tail的next节点。所以tail节点不总是尾节点。使用CAS来添加入队节点。
- hops设计是为了控制和减少CAS比较的次数，增加入队效率。但是hops越大，定位尾节点的时间就会越长。
- 出队：首先判断头结点是否为null,入过为null表示另外一个线程对头结点进行了操作，需要重新获取头结点，如果头结点不为null,使用CAS来设置头结点为null.
如果设置成功，则返回头结点。

# Fork/Join 

Fork是把一个大任务切分成若干子任务并行执行，Join就是合并这些子任务的执行结果。最后得到这个大任务的执行结果。
工作窃取算法，这些被分割的子任务分别放在不同的对列里，每个队列有一个负责的线程来处理，这里使用双端对列来保存任务，被窃取的任务始终从对列的头部进行取任务
而窃取任务的线程始终从队列的尾部进行取任务执行，这样能够充分利用线程进行并行的计算，减少了线程的竞争。但是某些情况下还是存在竞争的，比如双端队列只有一个
子任务时。而且创建多个线程和对对个队列本身也是很消耗资源的。
