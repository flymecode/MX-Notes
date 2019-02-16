### 微服务架构的特点

- 小服务的组合
- 单独的运行
- 服务要围绕业务建模
- 能够独立部署
- 能够去中心化管理

### 并不是所有的项目都适合拆分成微服务？

- 访问量不大，可用性不高的系统
- 已经成熟的系统，版本发布很缓慢
- 系统中包含很多强事务的场景

微服务适合小团队之间的开发，方便沟通

![](C:\Users\maxu1\Desktop\MX-Notes\notes\1550319701140.png)

如今微服务开发人员不仅仅要承担开发的任务，开发者要承担起前端，开发，测试，部署的责任。

![img](https://img-blog.csdnimg.cn/20181105104234682.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI5NDc5MDQx,size_16,color_FFFFFF,t_70)

### 服务拆分的方法论

![img](https://img-blog.csdnimg.cn/20181105111710432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI5NDc5MDQx,size_16,color_FFFFFF,t_70)

- X轴的伸缩：由负载均衡器后运行的多个拷贝构成。如果有N份拷贝，每份拷贝处理1/N的负载。
- Y轴的伸缩：Y轴伸缩将应用分成多份不同的服务，每份服务负责一个或多个紧密相关的功能。
- Z轴的伸缩：使用Z轴伸缩的话，每个服务器运行一份完全相同的代码，每个服务器只负责数据的一个子集。

##### 服务拆分的关键：功能和数据



1.拆功能

单一职责（每个服务只负责业务功能的一个单独的部分），松耦合（服务之间耦合度低，修改一个服务不用导致另一个服务跟着修改），高内聚（服务内部相关的行为都聚集在一个服务内，而不是分散在不同的服务中）
关注点分离：按职责（给服务进行分类，比如订单、商品等）、按通用性（一些基础组件，与具体的业务无关的也可划分成单独的服务，比如消息服务，用户服务）、按粒度级别（微服务并不是越小越好，这个比较难把握）
2.服务和数据的关系

先考虑拆分业务功能，再考虑拆分业务功能对应的数据。

无状态服务（一个数据需要被多个服务共享，才能完成一个请求，这个数据就可以称为状态。依赖这个状态数据的服务称为有状态服务，反之无状态服务）：

![img](https://img-blog.csdnimg.cn/20181105113048977.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI5NDc5MDQx,size_16,color_FFFFFF,t_70)

**3.如何拆数据**

- 每个微服务都有单独的数据存储（一个服务的数据智能通过API来访问，服务之间数据是有隔离的）
- 依据服务特点，选择不同结构的数据库类型（依据服务的功能特点，选择合适的数据库）
- 难点在确定边界

\- 针对边界设计API

\- 依据边界权衡数据冗余



### SpringCloud注册中心

依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-netflix-eureka-server</artifactId>
    <version>2.1.0.RELEASE</version>
    <scope>compile</scope>
</dependency>
```

##### 启动 添加@EnableEurekaServer注解

```java
@EnableEurekaServer
@SpringBootApplication
public class EurekaApplication {
	public static void main(String[] args) {
		SpringApplication.run(EurekaApplication.class, args);
	}
}
```

##### yml配置

```yml
server:
  port: 8761
eureka:
  instance:
    hostname: eureka-server #注册中心名称
  client:
    register-with-eureka: false  # 不将自己注册到eureka
    fetch-registry: false # 不从eureka中获取服务的注册信息
    service-url:
      defaultZone: http://localhost:8761/eureka/ # 注册中心地址
  server:
    enable-self-preservation: false #在开发环境中关闭，在生产环境不能关闭

```

### 服务者

##### yml配置

```yml
server:
  port: 8001
eureka:
  instance:
    prefer-ip-address: true # 注册服务的时候使用ip地址
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
spring:
  application:
    name: pro-user #服务者名称
```

##### controller

```java
/**
 * @author maxu
 */
@RestController
public class TicketController {
	@Autowired
	private TickService tickService;
    
	@GetMapping("/tick")
	public String getTicket() {
		return tickService.getTicket();
	}
}
```

##### service

```java
/**
 * @author maxu
 */
@Service
public class TicketService {
	public String getTicket() {
		return "流浪地球";
	}
}
```

##### 启动

```java
@EnableEurekaClient // 将服务注册到eureka
@SpringBootApplication
public class ProApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProApplication.class, args);
	}

}
```

### 消费者

##### yml配置

```yml
server:
  port: 8200
eureka:
  instance:
    prefer-ip-address: true  # 注册服务的时候使用ip地址
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
spring:
  application:
    name: consumer-user #消费者名称
```

##### controller

```java
/**
 * @author maxu
 */
@RestController
public class UserController {
	@Resource
	private RestTemplate restTemplate;

	@GetMapping("/buy")
	public String buyTicket(String name) {
        // 如果没有使用负载均衡机制，不能使用服务名称来代替服务地址
		String s = restTemplate.getForObject("http://PRO-USER/tick", String.class);
		return name + s;
	}
}
```

##### 启动

```java
@EnableDiscoveryClient // 向服务中心注册服务，并发现服务
@SpringBootApplication
public class ConsumerApplication {

   public static void main(String[] args) {
      SpringApplication.run(ConsumerApplication.class, args);
   }
   @LoadBalanced // 使用负载均衡机制，默认是采用轮询的方式
   @Bean
   public RestTemplate restTemplate() {
      return new RestTemplate();
   }
}
```

##### 实现eureka高可用

eureka是客户端发现，简单直接。

eureka之间实现两两相互注册