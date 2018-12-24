### VO (View Object) 值对象

- `VO`是值对象，精确点讲它是业务对象，是存活在业务层的，是业务逻辑使用的，它存活的目的就是为数据提供一个生存的地方。
- 主要对应界面显示的`数据对象`，对于一个WEB页面，用一个`VO对象`对应整个界面的值。 

### PO (Persistant object)  持久对象

- 在 `O/R` 映射的时候出现的概念，如果没有 `o/r` 映射，没有这个概念存在了。

- 通常对应数据模型 ( 数据库 ), 本身还有部分业务逻辑的处理。可以看成是与数据库中的表相映射的 `java` 对象。

- 最简单的 PO 就是对应数据库中某个表中的一条记录，多个记录可以用 PO 的集合。

-  PO 中应该不包含任何对数据库的操作

- PO的属性是跟数据库表的字段一一对应的。
- 好处是可以把一条记录作为一个对象处理，可以方便的转为其它对象。

### POJO (Plain Ordinary Java object) 简单Java对象

- 纯的传统意义的 `java` 对象。就是说在一些 `Object/Relation Mapping` 工具中，能够做到维护数据库表记录的 `persisent object` 完全是一个符合 `Java Bean` 规范的纯 `Java` 对象，没有增加别的属性和方法。

- 我的理解就是最基本的 `Java Bean` ，只有属性字段及 `setter` 和 `getter` 方法。
- `POJO`是最常见最多变的对象，是一个中间对象，也是我们最常打交道的对象。 

### DTO（Data Transfer Object） 数据传输对象

- 这个概念来源于`J2EE`的设计模式，原来的目的是为了`EJB`的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分布式调用的性能和降低网络负载，但在这里，我泛指用于展示层与服务层之间的数据传输对象
- 主要用于远程调用等需要大量传输对象的地方。 
  比如我们一张表有100个字段，那么对应的PO就有100个属性。 但是我们界面上只要显示10个字段， 客户端用WEB service来获取数据，没有必要把整个PO对象传递到客户端，这时我们就可以用只有这10个属性的`DTO`来传递结果到客户端，这样也不会暴露服务端表结构.到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为`VO` 

### DAO（Data Access Object) 数据访问对象 

- 是一个sun的一个标准`j2ee`设计模式，这个模式中有个接口就是`DAO`，它负持久层的操作。
- 为业务层提供接口。此对象用于访问数据库。通常和`PO`结合使用，`DAO`中包含了各种数据库的操作方法。
- 通过它的方法,结合`PO`对数据库进行相关的操作。
- 夹在业务逻辑与数据库资源中间。配合`VO`, 提供数据库的`CRUD`操作... 。





### 总结

- 在项目开发中,VO对应于页面上需要显示的数据(表单),
- DO对应于数据库中存储的数据(数据表),
- DTO对应于除二者之外需要进行传递的数据。

很多人可能对VO和DTO并不是那么熟悉,相反对DO却比较熟悉,那是因为在很多项目中由于种种原因我们只使用了DO,原因可能有以下几种：

1. 项目太小,对于一种业务实体,封装成一个DO就够了。
2. 并不熟悉DTO、VO,更不知道他们之间的区别。
3. 了解DO/DTO/VO之间的区别,但是懒得用。



为什么建议大家在自己的项目使用这些实体对象，为什么不能只用一个DO

我们可以来看下面这个例子

![1545630684549](C:\Users\maxu1\AppData\Roaming\Typora\typora-user-images\1545630684549.png)

针对这个实体，我们需要创建一个DO类，来封装这个Book实体。

```java
public class UserDO {

    private Integer id;//唯一主键

    private Date createdTime;//创建时间

    private Date updatedTime;//最后更新时间

    private String name;//姓名

    private Integer age;//年龄

    private String gender;//性别

    private String address;//住址

    private String password;//密码

    private String nickName;//昵称

    private Date birthday;//生日

    private String politicalStatus;//政治面貌,1表示群众,2表示团员,3表示党员,4表示其他,100表示未	知  
    private Integer companyId;//公司的ID

    private Integer status;//数据状态,1表示可用,0表示不可用

    //setter and getter

}
```

然后,在代码中,从`DAO`一直到前端展示,我们都通过这个`UserDO`类的对象来进行数据传输。这样做会有什么问题嘛?

`不需要的字段也会传递到前端页面。`

如`password、createdTime、updatedTime和status`这几个字段我们可能在前端根本不需要展示,但是这些字段有可能也会被传递到前端(`除非我们在SQL查询的时候没有查询出对应的字段`)。这不仅使数据的传输量增大,还可能有安全性问题。某些字段需要转换,但是无法支持。

对于上面例子中的政治面貌字段,我们在数据库中存储的是数字,但是在前端页面我要展示的是中文描述。这种情况只能在前端通过`if/else`的方式来分情况展示。某些字段要展示,但是并不希望出现在数据库中 

在User表中我们只保存了这个用户的`companyId,`需要同时查询company表来查询出该公司的更多详细信息。对于User对象,如果我们想在前端同时展示他所属的公司,希望通过一次查询全都查出来怎么办?有几个简单的方案,第一个是让`UserDO`中包含一个`Company`类的属性,通过这个属性来传递。另外一种是把我们希望传到前端的`Company`的属性也写到`UserDO`中。但是,如果真的这么做了,那`UserDO`还能被称作`DO`了吗?   



##### 引入UserVO,用于封装传递到前端需要展示的字段

```java
public class UserVO {

    private Integer id;//唯一主键

    private String name;//姓名

    private Integer age;//年龄

    private String gender;//性别

    private String address;//住址

    private String nickName;//昵称

    private Date birthday;//生日

    private String education;//学历

    private String politicalStatus;//政治面貌,群众、团员、党员等

    private Company company;//公司

    //setter and getter

}
```

`UserVO`中只包含了展示所需要的字段,并不需要展示的字段在这里不需要包含。

在引入了这个类之后,我们就可在进行数据库查询的时候使用`UserDO`,然后再需要传递到前端的时候把DO转换成`VO`。

总结 

​	看到这里,你可能已经发现,`UserDO`和`UserVO`中包含了大量的相同字段。难道真的有必要再单独设计个VO嘛?

​	当你的系统越来越大,表中的字段越来越多的时候,使用`DO/DTO/VO`等概念进行分层处理是绝对有好处的。至于如何进行有效的在不同的实体类间进行转换是我接下来要介绍的。

##### 优雅的将DO转换成VO 

​	Dozer是一个对象转换工具。

```java
@Autowired
private Mapper baseMapper;

    private UserVO doToVo(UserDO userDO){

    if(userDO ==null)return null;

    UserVO vo = baseMapper.map(userDO, UserVO.getClass());

    if(userDO.getCompanyId !=null) getCompany(vo);

    return vo;

}
```

如果在`JavaWeb`项目中使用`Dozer`需要在`pom.xml`中引入依赖

```xml
<!-- https://mvnrepository.com/artifact/net.sf.dozer/dozer -->
<dependency>
    <groupId>net.sf.dozer</groupId>
    <artifactId>dozer</artifactId>
    <version>5.5.1</version>
</dependency>

```

