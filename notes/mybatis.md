## Mybaits

### 入门

​	每一一个MyBatis的应用程序都是以一个SqlSessionFactory对象为核心。

SqlSessionFactory对象的实例可以通过SqlSessionFactoryBuilder对象来获得。

SqlSessionFactoryBuilder对象可以从XML配置文件，或者从Configuration类的实例中构建SqlSessionFactory对象。

#### 在XML中构建SqlSessionFactory

```java
String resource = "org/mybatis/example/mybatis-config.xml";
// 创建一个输入流，获取配置文件
InputStream inputStream = Resources.getResourceAsStream(resource);
// 创建一个SqlSessionFactroy
SqlSessionFactroy sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```



XML 配置文件包含对 MyBatis 系统的核心设置,包含获取数据库连接实例的数据源和 决定事务范围和
控制的事务管理器。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
 PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
 "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
 <environments default="development">
 <environment id="development">
 <transactionManager type="JDBC"/>
 <dataSource type="POOLED">
 <property name="driver" value="${driver}"/>
 <property name="url" value="${url}"/>
 <property name="username" value="${username}"/>
 <property name="password" value="${password}"/>
 </dataSource>
 </environment>
 </environments>
 <mappers>
 <mapper resource="org/mybatis/example/BlogMapper.xml"/>
 </mappers>
</configuration>
```

XML 头部的声明,需要用来验证 XML 文档正确性。environment 元素体中包含对事 务管理和连接池的环境配置。 mappers 元素是包含所有 mapper 映射器的列表, 这些 mapper 的 XML 文件包含 SQL代码和映射定义信息。 



### Java类配置

```java
DataSource dataSource = BlogDataSourceFactory.getBlogDataSource();

TransactionFactory transactionFactory = new JdbcTransactionFactory();

Environment environment = new Environment("development", transactionFactory, dataSource);

Configuration configuration = new Configuration(environment);
configuration.addMapper(BlogMapper.class);

SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
```

### 从 SqlSessionFactory 中获取 SqlSession

-  SqlSession 对象完全包含以数据库为背景的所有执行 SQL 操作的 方法。

- 你可以用 SqlSession 实例来直接执行已映射的 SQL 语句。例如:

  ```java
  SqlSession session = sqlSessionFactory.openSession();
  try {
   Blog blog = (Blog) session.selectOne("org.mybatis.example.BlogMapper.selectBlog", 101);
  } finally {
   session.close();
  }
  ```

### mybatis使用

|                        |                            |
| ---------------------- | -------------------------- |
| %${**user.username**}% | 可以用来连接字符           |
| #{user.name}           | 用来取值                   |
| where标签              | 用来处理多余的and          |
| if                     | 用来判断条件在test中写条件 |
|                        |                            |

```xml
<!-- foreach循环标签
 collection:要遍历的集合，来源入参
 open:循环开始前的sql 
 separator:分隔符
 close:循环结束拼接的sql
-->
<foreach item="uid" collection="ids" open="id IN(" separator=","close=")">
        #{uid}
</foreach>
<!-- 一对一关联查询-resultMap -->
<resultMap type="order" id="order_user_map">
    <!-- id标签用于绑定主键 -->
    <id property="id" column="id"/>
    <!-- 使用result绑定普通字段 -->
    <result property="userId" column="user_id"/>
    <result property="number" column="number"/>
    <result property="createtime" column="createtime"/>
    <result property="note" column="note"/>

    <!-- association:配置一对一关联
     property:绑定的用户属性
     javaType:属性数据类型，支持别名
    -->
    <association property="user" javaType="com.itheima.mybatis.pojo.User">
        <id property="id" column="user_id"/>
        <result property="username" column="username"/>
        <result property="address" column="address"/>
        <result property="sex" column="sex"/>
    </association>
</resultMap>


<select id="getOrderUser2" resultMap="order_user_map">
    SELECT
      o.`id`,
      o.`user_id`,
      o.`number`,
      o.`createtime`,
      o.`note`,
      u.`username`,
      u.`address`,
      u.`sex`
    FROM `order` o
    LEFT JOIN `user` u
    ON u.id = o.`user_id`
</select>
<!-- 一对多关联查询 -->
<resultMap type="user" id="user_order_map">
    <id property="id" column="id" />
    <result property="username" column="username" />
    <result property="birthday" column="birthday" />
    <result property="address" column="address" />
    <result property="sex" column="sex" />
    <result property="uuid2" column="uuid2" />

    <!-- collection:配置一对多关系
     property:用户下的order属性
     ofType:property的数据类型，支持别名
    -->
    <collection property="orders" ofType="order">
    <!-- id标签用于绑定主键 -->
    <id property="id" column="oid"/>
    <!-- 使用result绑定普通字段 -->
    <result property="userId" column="id"/>
    <result property="number" column="number"/>
    <result property="createtime" column="createtime"/>
    </collection>
</resultMap>
<!-- 一对多关联查询 -->
<select id="getUserOrder" resultMap="user_order_map">
SELECT
    u.`id`,
    u.`username`,
    u.`birthday`,
    u.`sex`,
    u.`address`,
    u.`uuid2`,
    o.`id` oid,
    o.`number`,
    o.`createtime`
    FROM `user` u
	LEFT JOIN `order` o
	ON o.`user_id` = u.`id`
</select>
<!-- 返回插入的Id -->
<selectKey resultType="java.lang.Long" order="AFTER" keyProperty="id">
SELECT LAST_INSERT_ID() AS id
</selectKey>
```

### SqlSessionTemplate

SqlSessionTemplate是MyBatis-Spring的核心。这个类负责管理MyBatis的SqlSession,调用MyBatis的SQL方法，翻译异常。SqlSessionTemplate是线程安全的，可以被多个DAO所共享使用。

当调用SQL方法时，包含从映射器getMapper()方法返回的方法，SqlSessionTemplate将会保证使用的SqlSession是和当前Spring的事务相关的。此外，它管理session的生命周期，包含必要的关闭，提交或回滚操作。

SqlSessionTemplate实现了SqlSession，这就是说要对MyBatis的SqlSession进行简易替换。

SqlSessionTemplate通常是被用来替代默认的MyBatis实现的DefaultSqlSession，因为它不能参与到Spring的事务中也不能被注入，因为它是线程不安全的。相同应用程序中两个类之间的转换可能会引起数据一致性的问题。

SqlSessionTemplate对象可以使用SqlSessionFactory作为构造方法的参数来创建。

```xml
<!-- 创建sqlSessionFactoryBean -->
 <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean"
  p:dataSource-ref="dataSource" p:configLocation="classpath:mybatis-config.xml"
  p:mapperLocations="classpath:com/mf/*/entity/mapper/*.xml"
  p:plugins-ref="pagePlugin" />

 <!-- 配置sqlSessionTemplate -->
 <bean class="org.mybatis.spring.SqlSessionTemplate">
  <constructor-arg ref="sqlSessionFactory" />
 </bean>
```

[原文](https://blog.csdn.net/develop_wangzhi/article/details/51064992 )

#### Mybatis一次插入多条记录

```xml
<insert id="insertList" parameterType="java.util.List">
        insert into balance(balance_date,money,fm_id) values
        <!--item就是List里每一项的对象名，要用","分割每一条数据，最后要";"结尾-->
        <foreach collection="list" item="balance" separator="," close=";">
            (#{balance.balanceDate},#{balance.money},#{balance.fmId})
        </foreach>
    </insert>
```

##### MyBatis中当实体类中属性和表的字段名不一样怎样处理？

- ​    在写sql语句的时候起别名
- ​    在配置文件开启驼峰命名规则，必须符合规则。
- ​    使用resultMap