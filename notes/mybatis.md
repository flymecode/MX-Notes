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
