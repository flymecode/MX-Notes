### Lombok的使用

##### 什么是lombok？

连官网都懒得废话，只给出了一句广告词：给你的java加点料(spice up your java)。

我们自己来总结一下：

lombok是一个ide插件，它可以让我们写更少的代码，而编译出更多的字节码。

我们可以让我们编译出一个复杂的.class文件，而我们的.java文件很干净清爽。

lombok是一个可以通过简单的注解形式来帮助我们简化消除一些必须有但显得很臃肿的Java代码的工具，通过通用对应的注解，在编译源码的时候生成对应的方法。

##### lombok优点和缺点

优点

- 省事，少些写很多模板代码；减少修改属性带来的错误。

缺点

- 可读性差；不支持多种参数构造器的重载。

导入pom包

```xml
<!-- lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

##### lombok常用注解

@Slf4j 

```java
Creates private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class); 
```

@Log4j 

```java
Creates private static final org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(LogExample.class); 
```

@Data ：

​	注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了`equals、canEqual、hashCode、toString` 方法

@Setter：注解在属性上；为属性提供 `setting` 方法

@Getter：注解在属性上；为属性提供 `getting` 方法



##### lombok使用场景

- 尤其适合pojo类，如普通的javabean、orm的实体类、json的实体类等。

- 有些功能如Log相关，适用于任意类。



### 原理解析

而且由于他相当于是在编译期对代码进行了修改，因此从直观上看，源代码甚至是语法有问题的。

一个更直接的体现就是，普通的包在引用之后一般的IDE都能够自动识别语法，但是Lombok的这些注解，一般的IDE都无法自动识别。

像spring那种注解是通过反射来获得注解对应的元素并实现业务逻辑，但是我们显然不希望在使用Lombok这种功能的时候还要编写其他的调用代码，况且用反射也获取不到编译期才存在的注解。

幸运的是Java早已支持了JSR269的规范，允许在编译时指定一个processor类来对编译阶段的注解进行干预。



```java
public abstract class AbstractProcessor implements Processor{

  //通过ProcessingEnvironment来获取编译阶段的一些环境信息
  public synchronized void init(ProcessingEnvironment var1){}
  
  //实现具体逻辑的地方，也就是对AST进行处理的地方
  public abstract boolean process(Set<? extends TypeElement> var1, RoundEnvironment var2);
```



**参考链接** http://blog.didispace.com/java-lombok-how-to-use/

