

[TOC]



### 枚举  

- 创建Enum时，编译器会为你生成一个相关的类，这个类继承自`Java.lang.Enum`

- enum会自动创建toString()和name()方法，以便可以方便的显示某个enum实例的名字；
- enum还会创建ordinal()方法，用来表示某个特定enum常量的声明顺序，从0开始；
- enum创建了static values()方法，用来按照enum常量的声明顺序，产生这些常量值构成的数组。
- valueOf()是在Enum中定义的static方法，它根据给定的名字返回相应的enum实例，如果不存在给你名字的实例，将会抛出异常。
- 可以使用==来比较enum实例，编译器自动为你提供了equals和hashcode方法。
- Enum类实现了Comparable接口，所以它具有compareTo()方法。

##### 特点：

- 1、枚举的直接父类是java.lang.Enum，但是不能显示的继承Enum
- 2、枚举就相当于一个类，可以定义构造方法、成员变量、普通方法和抽象方法
- 3、默认私有的构造方法，即使不写访问权限也是private。（假构造器，底层没有无参数的构造器）
- 4、每个实例分别用于一个全局常量表示，枚举类型的对象是固定的，实例个数有限，不能使用new关键字。
- 5、枚举实例必须位于枚举中最开始部分，枚举实例列表的后面要有分号与其他成员相分隔
- 6、枚举实例后有花括号时，该实例是枚举的匿名内部类对象
- 7、枚举类可以有构造器，但必须是private的，它默认的也是private的。
- 8、枚举类也可以有抽象方法，但是枚举项必须重写该方法

##### 创建

```java
public enum Color {  
  RED, GREEN, BLANK, YELLOW  
}
```

```java
JDK1.6之前的switch语句只支持int,char,enum类型，使用枚举，能让我们的代码可读性更强。

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

如果打算自定义自己的方法，那么必须在enum实例序列的最后添加一个分号。而且 Java 要求必须先定义 enum 实例。

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

##### 覆盖枚举的方法

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

##### 实现接口

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

### 内部类

- 内部类是定义在另一个类中的类

##### 为什么要使用内部类呢？

1. 内部类方法可以访问该类定义所在的作用域中的数据，包含私有的数据
2. 内部类可以对同一个包中的其它类隐藏起来
3. 当想要定义一个回调函数而且不想编写大量代码的时候，使用匿名内部类比较便捷。



##### 内部类访问的局部变量必须用final修饰,为什么?

​	因为当调用内部类方法时,在方法体中访问的局部变量如果没有用`final`修饰,他的生命周期和方法的生命周期是一样的,当方法弹栈,这个局部变量也会消失,那么如果局部内部类对象还没有马上消失，如果还想用这个局部变量,就没有了,如果用`final`修饰，局部变量会在类加载的时候进入常量池,即使方法弹栈,常量池的常量还在,也可以继续使用

##### 注意：

- 内部类中的静态域必须是final修饰的，原因很简单，我们希望静态域只有一个实例，不过对于外部对象，会分别有一个内部实例。如果静态域不是final修饰它可能使不唯一的。

- 编译器将会把内部类翻译成用 $ (美元符号）分隔外部类名与内部类名的常规类文件， 而虚拟机则对此一无所知

- 局部内部类：不能用public或private修饰，它的作用域被限定在这个局部类的块中。
- 在内部类中有一个隐式的外部类的引用。这个引用在内部类中是不可见的。



当变量的编译时类型和运行时类型不同时，通过该变量访问它引用的对象的势力变量的时，该实例变量的值由声明改变量的类型决定的。但通过该变量调用它引用的对象的实例方法时，该方法行为将由他实际引用的对象来决定。

![1549014708591](https://github.com/flymecode/MX-Notes/blob/master/image/1549014708591.png)

