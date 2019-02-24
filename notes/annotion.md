# Java注解

-   @Override，表示当前的方法定义将覆盖超类中的方法。
-  @Deprecated，使用了注解为它的元素编译器将发出警告，因为注解@Deprecated是不赞成使用的代码，被弃用的代码。
-    @SuppressWarnings，关闭不当编译器警告信息。



我们可以创建自定义注解，为了创建自定义注解java还提供了4种源注解，专门负责注解的创建

### 元注解

##### @Target ：表示该注解可以用于什么地方，可能的ElementType参数有

- CONSTRUCTOR：构造器的声明。
- FIELD：域声明（包括enum实例）。
- LOCAL_VARIABLE：局部变量声明。
- METHOD：方法声明。
- PACKAGE：包声明。
- PARAMETER：参数声明。
- TYPE：类、接口（包括注解类型）或enum声明。

##### @Retention：表示需要在什么级别保存该注解信息。可选的RetentionPolicy参数包括

- SOURCE：注解将被编译器丢弃。
- CLASS：注解在class文件中可用，但会被VM丢弃。
- RUNTIME：VM将在运行期间保留注解，因此可以通过反射机制读取注解的信息。

##### @Document ：将注解包含在Javadoc中

##### @Inherited ： 允许子类继承父类中的注解



##### 下面我创建一个名称为@Description的自定义注解

```java
/**
 * @author maxu
 */
@Target({ElementType.METHOD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
// 这里使用@interface 关键字来定义注解
public @interface Description {
	/**
	 * 这里是声明一个成员变量，并且要求无参数，无抛出异常
 	 */
	String desc();

	String author();

	/**
	 * 这里使用 default 关键字来给成员指定默认值
	 */
	int age() default 12;

}
```

上面我们定义成员只是使用了String和int 类型，其实注解中成员变量的合法类型可以包括原始的基本类型，String，Class，Annotion,Enumeration.

##### 注意：

​	如果注解只有一个成员变量的时候，成员的名称必须取名为value(),在使用的时候我们可以忽略成员名称，和赋值号（=）。

​	注解类可以没有成员变量，没有成员变量的注解称为标识注解。



##### 使用上面我们定义的@Description注解

```java
// age属性可以不用赋值，因为我们定义的时候提供了默认值
@Description(desc = "很可爱", author = "1", age = 14)
public String method() {
    return "使用注解";		
}
```



### 解析注解

​	通过反射获取类、函数或者成员上运行时注解信息，从而实现动态控制程序运行的逻辑。

我们可以尝试来解析我们刚刚定义的@Description注解

```java
public static void main(String[] args) throws ClassNotFoundException {
    // 解析类上的注解
    // 首先我们应该加载我们标记注解的类
    Class c = Class.forName("类路径");
    // 判断当前类上面是否添加上@Description注解
    boolean isExist = c.isAnnotationPresent(Description.class);
    if (isExist) {
        // 拿到注解的实例
        Description description = (Description) c.getAnnotation(Description.class);
        System.out.println(description.age());
    }

    // 解析方法上的注解
    // 首先遍历所有的方法
    Method[] methods = c.getMethods();
    for (Method method : methods) {
        // 判断是否有该注解
        boolean sure = method.isAnnotationPresent(Description.class);
        if (sure) {
            Description annotation = method.getAnnotation(Description.class);
            System.out.println(annotation.age());
        }
    }

    // 第二中解析方法
    for (Method method : methods) {
        // 获取所有的注解
        Annotation[] annotations = method.getAnnotations();
        // 判断注解的类型
        for (Annotation annotation : annotations) {
            if (annotation instanceof Description) {
                Description description = (Description) annotation;
                System.out.println(description.age());
            }
        }
    }
}
```

