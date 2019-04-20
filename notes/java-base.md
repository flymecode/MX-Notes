



[TOC]

# Java 基础

![overview](C:\Users\maxu1\Desktop\MX-Notes\notes\overview.png)

## 枚举  

- 创建 `Enum` 时，编译器会为你生成一个相关的类，这个类继承自 `Java.lang.Enum`
- Enum 会自动创建 toString() 和 name() 方法，以便可以方便的显示某个 enum 实例的名字；
- Enum 还会创建 ordinal() 方法，用来表示某个特定 Enum 常量的声明顺序，从0开始；
- Enum 创建了 static values()方法，用来按照 Enum 常量的声明顺序，产生这些常量值构成的数组。
- valueOf() 是在 Enum中定义的 static 方法，它根据给定的名字返回相应的 Enum 实例，如果不存在给定名字的实例，将会抛出异常。
- 可以使用 == 来比较 Enum 实例，编译器自动为你提供了 equals 和 hashcode 方法。
- Enum类实现了 Comparable 接口，所以它具有 compareTo() 方法。



### 特点：

- 1、枚举的直接父类是java.lang.Enum，但是不能显示的继承Enum
- 2、枚举就相当于一个类，可以定义构造方法、成员变量、普通方法和抽象方法
- 3、默认私有的构造方法，即使不写访问权限也是private。（假构造器，底层没有无参数的构造器）
- 4、每个实例分别用于一个全局常量表示，枚举类型的对象是固定的，实例个数有限，不能使用new关键字。
- 5、枚举实例必须位于枚举中最开始部分，枚举实例列表的后面要有分号与其他成员相分隔
- 6、枚举实例后有花括号时，该实例是枚举的匿名内部类对象
- 7、枚举类可以有构造器，但必须是private的，它默认的也是private的。
- 8、枚举类也可以有抽象方法，但是枚举项必须重写该方法



### 创建

```java
public enum Color {  
  RED, GREEN, BLANK, YELLOW  
}
```

```java
// JDK1.6之前的switch语句只支持int,char,enum类型，使用枚举，能让我们的代码可读性更强。

enum Signal {  
    GREEN, YELLOW, RED  
}  
public class TrafficLight {  
    Signal color = Signal.RED;  
    public void change() {  
        switch (color) {  
        case RED:  
            color = Signal.GREEN;  
            break;  
        case YELLOW:  
            color = Signal.RED;  
            break;  
        case GREEN:  
            color = Signal.YELLOW;  
            break;  
        }  
    }  
}
```

​	如果打算自定义自己的方法，那么必须在 enum 实例序列的最后添加一个分号。而且  Java  要求必须先定义 enum 实例。

```java
public enum Color {  
    RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLO("黄色", 4);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private Color(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
    // 普通方法  
    public static String getName(int index) {  
        for (Color c : Color.values()) {  
            if (c.getIndex() == index) {  
                return c.name;  
            }  
        }  
        return null;  
    }  
    // get set 方法  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getIndex() {  
        return index;  
    }  
    public void setIndex(int index) {  
        this.index = index;  
    }  
}
```



### 覆盖枚举的方法

```java
public enum Color {  
    RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLO("黄色", 4);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private Color(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
    //覆盖方法  
    @Override  
    public String toString() {  
        return this.index+"_"+this.name;  
    }  
}
```



### 实现接口

所有的枚举都继承自`java.lang.Enum`类。由于Java 不支持多继承，所以枚举对象不能再继承其他类。 

```java
public interface Behaviour {  
    void print();  
    String getInfo();  
}  
public enum Color implements Behaviour{  
    RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLO("黄色", 4);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private Color(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
	//接口方法  
    @Override  
    public String getInfo() {  
        return this.name;  
    }  
    //接口方法  
    @Override  
    public void print() {  
        System.out.println(this.index+":"+this.name);  
    }  
}
```



## 内部类

- 内部类是定义在另一个类中的类



### 为什么要使用内部类呢？

1. 内部类方法可以访问该类定义所在的作用域中的数据，包含私有的数据
2. 内部类可以对同一个包中的其它类隐藏起来
3. 当想要定义一个回调函数而且不想编写大量代码的时候，使用匿名内部类比较便捷。



### 内部类访问的局部变量必须用final修饰,为什么?

​	因为当调用内部类方法时,在方法体中访问的局部变量如果没有用`final`修饰,他的生命周期和方法的生命周期是一样的,当方法弹栈,这个局部变量也会消失,那么如果局部内部类对象还没有马上消失，如果还想用这个局部变量,就没有了,如果用`final`修饰，局部变量会在类加载的时候进入常量池,即使方法弹栈,常量池的常量还在,也可以继续使用

注意：

- 内部类中的静态域必须是final修饰的，原因很简单，我们希望静态域只有一个实例，不过对于外部对象，会分别有一个内部实例。如果静态域不是final修饰它可能使不唯一的。

- 编译器将会把内部类翻译成用 $ (美元符号）分隔外部类名与内部类名的常规类文件， 而虚拟机则对此一无所知

- 局部内部类：不能用public或private修饰，它的作用域被限定在这个局部类的块中。
- 在内部类中有一个隐式的外部类的引用。这个引用在内部类中是不可见的。



当变量的编译时类型和运行时类型不同时，通过该变量访问它引用的对象的势力变量的时，该实例变量的值由声明改变量的类型决定的。但通过该变量调用它引用的对象的实例方法时，该方法行为将由他实际引用的对象来决定。

![1549014708591](https://github.com/flymecode/MX-Notes/blob/master/image/1549014708591.png)

## 抽象类

- 如果自下而上在类的继承层次结构中，位于上层的类更具有通用性，甚至可能更加抽象。
- 祖先类更加通用，人们只是将它作为其它类的基类，而不是作为想使用特定的实例类。
- 用关键字abstract可以标识一个抽象类：除了抽象方法以外，抽象类可以包含具体的数据和具体的方法。
- 抽象方法是没有方法体的。
- 抽象类不能够被实例化。如果将一个类声明为abstract，就不能创建这个类的对象。
- 我们可以定义一个抽象类的对象变量，但是它只能引用非抽象子类的对象。



## 多态

- 一个对象变量，可以指示多种实际的类型的现象被称为多态，在运行的时候，能够自动的选择调用哪个方法的现象被称为动态绑定。
- 如果不想让一个方法具有虚拟特征可以将方法设置为final
- 不能将一个父类的引用赋值给子类的变量。
- 在Java中，子类的数组可以转化为父类的数组的引用，而不用采用强制类型转换。

## fianl类和方法

- 不允许扩展的类被称为final类。
- 被final修饰的方法不能覆盖这个方法
- 域也可以被声明为 final。对于 final 域来说，构造对象之后就不允许改变它们的值了。不过， 如果将一个类声明为 final， 只有其中的方法自动地成为 final,而不包括域

## equals方法与 hashCode方法

### equals:

- 用于检测一个对象是否等于另一个对象。
- 在Object类中，这个方法判断对象是否具有相同的引用，如果这两个对象具有相同的
- 引用就代表这两个对象是相等的。
- 为了防备两属性可能为null的情况，我们需要使用Object.equals方法：如果两个参数都是null,Objdect.equals(a,b)将返回true，如果其中一个参数为null则，则返回false，如果两个参数都不为null，调用a.equals(b)

特性：

- 自反性
- 对称性
- 传递性
- 一致性
- 对任意非空引用x, x.equals(null),都返回false

```java
if(this == other)
    return true;  // 检测是否是引用同一个对象
if(other == null)
    return fasle; // 检测other是否为null
if(getClass() != other.getClass()) 
    return false;
if(!(other instaceof ClassName))
    return fasle; // 将othre转换为相应的类类型变量
ClassName other = (ClassName) othreName;

// 开始比较域，使用 == 比较基本类型域，使用equal比较对象域
// 如果所有的都匹配返回true,否则返回false
```



### HashCode:

```java
String s = "ok";
StringBuilder sb = new StringBuilder(s);
System.out.println(s.hashCode()+ " " + sb.hashCode());
String t = new String("ok");
StringBuilder tb = new StringBuilder(t);
System.out.println(t.hashCode() + " " + tb.hashCode());
```



| 对象 | hasCode    |
| ---- | ---------- |
| s    | 3548       |
| sb   | 460141958  |
| t    | 3548       |
| tb   | 1163157884 |

字符串 s 和 t 拥有相同的散列码，是因为字符串的散列码是由内容导出的，而字符串缓冲sb与tb却有着不同的散列码，这是因为在StringBuilder类中没有定义hashCode方法，它的散列码是由Object类的默认hashCode方法导出的对象存储地址。

如果重新定义了equals方法，就必须重新定义hashCode方法，以便用户可以将对象方便的插入到散列列表中，hashCode应该返回一个整形数值，并合理地组合实例域的散列码，以便用户能够让各个不同的对象产生散列码更加均匀。

equals与hashCode的定义必须一致，如果x.equals(y),那么x.hashCode()就必须与y.hashCode()具有相同的值。比如，如果用定义的Employee.equals比较雇员的ID，那么hashCode方法就需要散列ID,而不是雇员的姓名或者存储地址。

## Java异常体系

![1553175374905](E:\Git\TTMS\MX-Notes\image\1553175374905.png)

### 概念角度解析Java的异常处理机制

- Error：程序无法处理的系统错误，编译器不做检查
- Exception:程序可以处理的异常，捕获后可能恢复

 总结：前者是程序无法处理的异常，后者是可以处理的异常 

### 异常类

RuntimeException

- NullPointerException 空指针异常
- ClassCastException 类型强制转换异常
- IllegalArgumentException 传递非法参数异常
- IndexOutOfBoundsException 下标越界异常
- NumberFormatException 数字格式异常

非RuntimeException

- ClassNotFoundException 找不到指定Class异常
- IOException IO操作异常

Error

- NoClassDefFoundError 找不到class定义的异常
- StackOverflowerError 深递归导致栈被耗尽而抛出异常
- OutOfMemoryError 内存溢出异常

### Java异常处理机制

抛出异常：创建异常对象，交由运行时系统处理

捕获异常：寻找合适的异常处理器处理异常，否则终止运行

### Java异常处理的原则

- 具体明确：抛出的异常应该能够通过类名称和message准确的说明异常的类型和产生异常的原因
- 提早抛出：应该尽可能的早发现并抛出异常，便于精确定位
- 延迟捕获：异常的捕获和处理应尽可能延迟，让掌握更多信息的作用域来处理异常

### Java异常处理消耗性能的地方

- try-catch块影响JVM的优化
- 异常对象实例需要保存栈的快照等信息，消耗性能



## 回调函数

### 回调函数涉及的三个函数

- 登记回调函数
- 回调函数
- 响应回调函数

### 

### 解释

​	你到一个商店买东西，刚好你要的东西没有货，于是你在店员那里留下了你的电话。过了几天店里有货了，店员就打了你的电话，然后你接到电话后就到店里去取了货。在这个样例里，你的电话号码就叫回调函数。你把电话留给店员就叫登记回调函数，店里后来有货了叫做触发了回调关联的事件。店员给你打电话叫做调用回调函数，你到店里去取货叫做响应回调事件。回答完成。来自知乎[点击打开链接](http://www.zhihu.com/question/19801131)



### 代码实现



```java
// 预定义业务逻辑
public interface Callback {
    // 响应回调函数
    public void slove();
}
```

实现上面的接口，登记回调和响应回调的类

```java
public class A implements CallBack {
    B b = new B();
    
    @Override
	// 响应回调函数
    public void slove() {
        System.out.println("the problem is solve!");
    }
    /*
	 * 登记回调函数
	 */
    public void askQuestion(){
        System.out.println("ask b solve the problem!");
        /*
		 * 自己去做其它事
		 */
        new Thread(new Runnable() {

            @Override
            public void run() {
                System.out.println("A want to do another thing!");
            }
        }).start();
        /*
		 * ask b to solve this problem
		 */
        this.b.call(this);
    }
    public static void main(String[] args)  {
        A a = new A();
        a.askQuestion();
    }
}
```

```java
// 实现回调的类
public class B {
    /*
	 * 回调函数
	 */
    public void call(CallBack a){
        /*
		 * b help a solve the priblem
		 */
        System.out.println("b help a solve the problem!");
        /*
		 * call back
		 */
        a.slove();

    }
}
```