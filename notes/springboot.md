### Springboot 2.0

#### 数据源配置

在我们访问数据库的时候，需要先配置一个数据源，下面分别介绍以下几种不同的数据库配置方式。

首先，为了连接数据库需要引入jdbc的支持，在`pom.xml`中引入配置：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>/
```

#### 连接生产数据源

以MySQL数据库为例，先引入MySQL连接的依赖包，在`pom.xml`中加入：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.21</version>
</dependency>
```

在`src/main/resources/application.properties`中配置数据源信息

```xml
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=dpuser
spring.datasource.password=dbpass
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

#### 连接JNDI数据源

```xml
spring.datasource.jndi-name=java:jboss/datasources/customers
```

### 使用JdbcTemplate操作数据库

Spring的JdbcTemplate是自动配置的，你可以直接使用`@Autowired`来注入到你自己的bean中来使用。

举例：我们在创建`User`表，包含属性`name`、`age`，下面来编写数据访问对象和单元测试用例。

```java
public interface UserService {

    /**
     * 新增一个用户
     * @param name
     * @param age
     */
    void create(String name, Integer age);

    /**
     * 根据name删除一个用户高
     * @param name
     */
    void deleteByName(String name);

    /**
     * 获取用户总量
     */
    Integer getAllUsers();

    /**
     * 删除所有用户
     */
    void deleteAllUsers();

}
```

- 通过JdbcTemplate实现UserService中定义的数据访问操作

```java
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(String name, Integer age) {
        jdbcTemplate.update("insert into USER(NAME, AGE) values(?, ?)", name, age);
    }

    @Override
    public void deleteByName(String name) {
        jdbcTemplate.update("delete from USER where NAME = ?", name);
    }

    @Override
    public Integer getAllUsers() {
        return jdbcTemplate.queryForObject("select count(1) from USER", Integer.class);
    }

    @Override
    public void deleteAllUsers() {
        jdbcTemplate.update("delete from USER");
    }
}
```

- 创建对UserService的单元测试用例，通过创建、删除和查询来验证数据库操作的正确性。

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
public class ApplicationTests {

	@Autowired
	private UserService userSerivce;

	@Before
	public void setUp() {
		// 准备，清空user表
		userSerivce.deleteAllUsers();
	}

	@Test
	public void test() throws Exception {
		// 插入5个用户
		userSerivce.create("a", 1);
		userSerivce.create("b", 2);
		userSerivce.create("c", 3);
		userSerivce.create("d", 4);
		userSerivce.create("e", 5);

		// 查数据库，应该有5个用户
		Assert.assertEquals(5, userSerivce.getAllUsers().intValue());

		// 删除两个用户
		userSerivce.deleteByName("a");
		userSerivce.deleteByName("e");

		// 查数据库，应该有5个用户
		Assert.assertEquals(3, userSerivce.getAllUsers().intValue());

	}

}
```

*上面介绍的JdbcTemplate只是最基本的几个操作，更多其他数据访问操作的使用请参考：[JdbcTemplate API](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)*

通过上面这个简单的例子，我们可以看到在Spring Boot下访问数据库的配置依然秉承了框架的初衷：简单。我们只需要在pom.xml中加入数据库依赖，再到application.properties中配置连接信息，不需要像Spring应用中创建JdbcTemplate的Bean，就可以直接在自己的对象中注入使用。

转自[程序员DD](http://blog.didispace.com/springbootdata1/)

### 缓存

- EnableCaching 开启基于注解的缓存模式
- Cacheable 主要针对方法的配置，能够将方法的返回结果缓存起来
- CachePut  保证方法被调用，又能将结果缓存起来，常常用来更新缓存
  - 运行时机
    - 先调用方法
    - 将目标方法的结果缓存起来
- CacheEvict 清除缓存

##### Cacheable属性

- cacheNames / value 指定缓存组件的名称
- key 缓存数据使用的key ,默认使用方法参数的值，也可以指定

```java
@Cacheable(key = "#root.cacheNames+'['+#id+']'")
public String sayHello(Integer id) {...}
```

- condition 指定符合条件的清空下才缓存

```java
@Cacheable(condition="#a0 > 1") 当第一个参数大于1的时候缓存
public String sayHello(Integer id) {...}
```

- unless  否定缓存，当unless指定的条件为true的时候，方法的返回值就不会被缓存
- keyGenerator :key的生成器 key/keyGenerator二选一
- sync 是否启用异步模式，当时用异步模式的时候，unless属性就不能使用了



##### 缓存更新不一致问题解决

原因有可能我们缓存的key不一致导致的，虽然将数据放入缓存中，但是key不一致导致我们更新之后，再次访问的数据还是之前缓存的旧数据。所以我们应该统一缓存的key

```java
@CachePut(value = "emp" ,key = "#result.id")
// @CachePut(value = "emp" ,key = "#user.id")
@Cacheable 是不能使用result的，因为result是方法执行之后返回的结果。
public String updateUser(User user) {...}
```



##### 清除缓存@CacheEvict

- allEntries 指定清除缓存中的所有数据
- beforeInvocation = false 缓存的清除是是否实在方法之前执行，默认代表缓存清楚操作是在方法执行之后执行，如果出现异常就不会清除。

##### 组合缓存@Caching

针对复杂的缓存

```java
	@Caching(
			cacheable = {
					@Cacheable(value = "user", key = "#name")
			},
			put = {
					@CachePut(value = "user", key = "#result.id"),
					@CachePut(value = "user", key = "#result.email")
			}
	)
	public String updateUser(User user) {}
```





### 缓存的工作原理

当没有引入其他的缓存组件springboot启用SimpleCacheConfiguration配置类，并给容器注册一个CacheManger: ConcurrentMapManger

ConcurrentMapManger可以获取和创建ConcurrentMapCache类型的缓存组件，并将缓存数据保存到ConcurrentMap中。

##### 运行流程

@Cacheable 标注的方法执行之前先检查缓存中有没有数据，默认按照参数的是值当作key来进行查找，如果没有数据就执行方法，并将数据放入缓存

1. 方法运行之前,先去查询Cache,按照cacheNames指定的名字获取，第一次获取缓存如果没有cache可以将缓存对象创建出来。

2. 去Cache中查找缓存内容，默认使用的key是方法的参数，key是按照某种策略生成的，默认使用SimpleKeyGrenerator生成key。

   SimpleKeyGrenerator生成key的默认策略

   1. 如果没有参数 key = new SimpleKey();
   2. 如果有一个参数 key = 参数值;
   3. 如果有多个参数 key = new SimpleKey(params);

3. 没有查到缓存就调用目标方法。

4. 将目标方法返回的结果，放进缓存中。

   

##### 自定义KeyGenerator

```java
/**
 * @author maxu
 */
@Configuration
public class MyCacheConfig {

	@Bean("myKeyGenerator")
	public KeyGenerator keyGenerator() {
		return new KeyGenerator() {
			@Override
			public Object generate(Object o, Method method, Object... params) {
				return method.getName() + "[" + Arrays.asList(params).toString() + "]";
			}
		};
	}
}
```



### 热部署

引入依赖，在idea中当我们修改了java文件按快捷键Ctrl + F9 便可以实现热部署

```xml
<dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-devtools</artifactId>
         <optional>true</optional>
</dependency>
```



### Springboot 的异常处理

在日常web开发中发生了异常，往往是需要通过一个统一的异常处理来保证客户端能够收到友好的提示。

##### 单个控制器异常

@ExceptionHandler可用于控制器中，表示处理当前类的异常。

```
@ExceptionHandler(Exception.class)
public String exceptionHandler(Exception e) {
    log.error("---------------->捕获到局部异常", e);
    return "index";
}
```

##### 全局异常

如果单使用@ExceptionHandler，只能在当前Controller中处理异常。但当配合@ControllerAdvice一起使用的时候，就可以摆脱那个限制了。



可通过@ExceptionHandler的参数进行异常分类处理。



**步骤：**

第一步、自定义异常

```
public class MyException extends Exception {


    public MyException(String message) {
        super(message);
    }
}
```



第二步、定义全局处理器，主要是@ControllerAdvice和@ExceptionHandler注解的运用

```
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e)  {
        log.error("------------------>捕捉到全局异常", e);
        
        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", e);
        mav.addObject("url", req.getRequestURL());
        mav.setViewName("error");
        return mav;
    }


    @ExceptionHandler(value = MyException.class)
    @ResponseBody
    public R jsonErrorHandler(HttpServletRequest req, MyException e)  {
        //TODO 错误日志处理
        return R.fail(e.getMessage(), "some data");
     }

```

### Mybatis配置多数据源



### 定时任务和异步任务

```java

@EnableAsync// 开启异步注解
@EnableScheduling // 开启定时任务
@SpringBootApplication
public class SpringbootTaskApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootTaskApplication.class, args);
	}

}
```

```java
@Service
public class AsyncService {
	// 这是一个异步方法
	@Async
	public void hello() {
		System.out.println("hello...");
	}
}
```

```java
/**
 * 定时任务
 * @author maxu
 */
@Service
public class ScheduleService {
	// @Scheduled(cron = "* * * * * * ") 任意
	// @Scheduled(cron = "0,1,2,3,4 * * * * * ") 枚举
	// @Scheduled(cron = "0-5 * * * * * ") 范围
	@Scheduled(cron = "0/5 * * * * * ") 
	public void hello() {
		System.out.println("hello......");
	}
}
```





### Security

```java
/**
 * @author maxu
 */
public class MySecurityConfig extends WebSecurityConfigurerAdapter {

    // 授权
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/").permitAll()
				.antMatchers("/level1/**").hasRole("VIP1")
				.antMatchers("/level2/**").hasRole("VIP2")
				.antMatchers("/level3/**").hasRole("VIP3");

		//开启自动配置的登陆请求,并设置登陆页面
		http.formLogin().usernameParameter("user")
                .passwordParameter("pwd")
                .loginPage("/userLogin")
            	.loginProcessingUrl("login");
		// 开启自动配置的注销功能，注销成功来到首页
		http.logout().logoutSuccessUrl("/");
		// 开启记住我，并设置参数
		http.rememberMe().rememberMeParameter("rememberMe");
	}
	// 认证
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
				.withUser("admin").password("123").roles("VIP1", "VIP2")
				.and()
				.withUser("admin1").password("1235").roles("VIP1", "VIP3")	;
	}
}
```

### SpringCloud

