[TOC]



# Lambda表达式



![1556286541046](E:\Git\TTMS\MX-Notes\image\1556286541046.png)

在数学中，函数就是有输入量、输出量的一套计算方案，也就是“拿什么东西做什么事情”。相对而言，面向对象过分强调“必须通过对象的形式来做事情”，而函数式思想则尽量忽略面向对象的复杂语法——强调做什么，而不是以什么形式做。

面向对象的思想:
	做一件事情,找一个能解决这个事情的对象,调用对象的方法,完成事情
函数式编程思想:
	只要能获取到结果,谁去做的,怎么做的都不重要,重视的是结果,不重视过程



## Lambda标准格式

### Lambda省去面向对象的条条框框，格式由3个部分组成：

- 一些参数
- 一个箭头
- 一段代码

### Lambda表达式的标准格式为：

```(参数类型 参数名称) ‐> { 代码语句 }```

格式说明：

- 小括号内的语法与传统方法参数列表一致：无参数则留空；多个参数则用逗号分隔。
- ->` 是新引入的语法格式，代表指向动作。
- 大括号内的语法与传统方法体要求基本一致。



### 省略规则

在Lambda标准格式的基础上，使用省略写法的规则为：

1. 小括号内参数的类型可以省略；
2. 如果小括号内有且仅有一个参，则小括号可以省略；
3. 如果大括号内有且仅有一个语句，则无论是否有返回值，都可以省略大括号、return关键字及语句分号

###  Lambda的使用前提

Lambda的语法非常简洁，完全没有面向对象复杂的束缚。但是使用时有几个问题需要特别注意：
1. 使用Lambda必须具有接口，且要求接口中有且仅有一个抽象方法。
  无论是JDK内置的 Runnable 、 Comparator 接口还是自定义的接口，只有当接口中的抽象方法存在且唯一
  时，才可以使用Lambda。
2. 使用Lambda必须具有上下文推断。
  也就是方法的参数或局部变量类型必须为Lambda对应的接口类型，才能使用Lambda作为该接口的实例。



# 函数式接口

 `@FunctionalInterface`  确保只有一个抽象的方法

接口可以包含其他的方法（默认，静态，私有）

```java
public interface MyFunctionInterface {
    void show();
}

class MyFunctionInterfaceImpl implements MyFunctionInterface {
    @Override
    public void show() {

    }
}


class Demo {
    public static void main(String[] args) {
        // 调用 show 方法，方法参数是一个接口，所以传递接口的实现类
        show(new MyFunctionInterfaceImpl());
        // 调用show方法，方法参数是一个接口，所以我们可以传递参数的匿名内部类
        show(new MyFunctionInterface() {
            @Override
            public void show() {
                System.out.println("---");
            }
        });
    }

    private static void show(MyFunctionInterface myInter) {
        myInter.show();
    }
}
```



## JDK8中的接口

- **常量**
- **抽象方法**
- **默认方法**
- **静态方法**

JDK9 中添加了私有方法，私有静态方法



# Stream

## 遍历

```java
public class Demo01ForEach {
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    list.add("张无忌");
    list.add("周芷若");
    list.add("赵敏");
    list.add("张强");
    list.add("张三丰");
    for (String name : list) {
        System.out.println(name);
    }
}
```

