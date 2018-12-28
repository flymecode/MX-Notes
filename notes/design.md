
### Java设计笔记



#### 一、Controller层

- 定义每个模块的restful接口

```java
@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
```

- 只负责控制逻辑与返回响应数据

```java
 return new ResponseEntity<>(HttpStatus.OK.toString(), HttpStatus.OK);
```

- 每个controller添加日志

  ```java
  Logger logger = LoggerFactory.getLogger(this.getClass());
  ```

- 将request请求传递给业务层(service)

  ```java
   String name = userService.getUserName(Id, request)
  ```

- 添加一个Template 和一个响应实体ResponseEntity<>将返回的数据放入模板中，然后将模板封装到响应实体之中，最后将相应实体发送给前端

  ```java
  UserTemplate user = userService.getUserById(Id, request);
  ResponseEntity<>(user, HttpStatus.OK)
  ```

- 针对不同的请求添加不同的注解

```java
@GetMapping("/xxx") @PosstMapping("/xxx") @PutMapping("/xxx") 
```

- 使用@PathVariable(value = "id") 支持Restful
- 使用@RequestParam接受Request中的数据 
- 使用数据字典，将常量统一保存到指定的类中进行管理。



#### 二、Service层

- 分页

  ```java
  @Override
  // SearchVo 封装了查询条件
  public List<User> getList(SearchVo searchVo, PageInfo pageInfo) {
      List<User> userList = new ArrayList<>();
      // 获取总行数
      Integer totalSize = userMapper.getUserCount(searchVo);
      // 增强鲁棒性
      if (totalSize == null || totalSize == 0) {
          pageInfo.setTotalSize(0);
          pageInfo.setPageCount(0);
      } else {
          pageInfo.setTotalSize(totalSize);
          pageInfo.setPageCount((int) Math.ceil((totalSize * 1.0) / 															(pageInfo.getPageSize() * 1.0)));
          Integer offset = (pageInfo.getPageNo() - 1) * pageInfo.getPageSize();
          searchVo.setOffset(offset);
          searchVo.setPageSize(pageInfo.getPageSize());
          // 查询数据
          userList = userMapper.searchUser(searchVo);
      }
      return userList;
  }
  ```

- ```java
  StringUtils.isEmpty() //判断是否为空	
  ```

- 事务处理

- ```java
   @Transactional(rollbackFor = {Throwable.class, Exception.class})
  ```

- 如果出现异常向上抛出

- 数据的封装
- 业务的处理

#### 三、 Mapper层



- 定制sql		



  ```java
  
  @SelectProvider(type = BookSQLProvider.class, method = "searchBook")
  Integer getDsDashboardCount(SearchVo searchBean);
  -------------
  
  public class BookSQLProvider {
      public String searchBook(SearchVo searchBean) {
          StringBuffer sql = new StringBuffer(new SQL(){{
              SELECT("count(1)");
              FROM("db_book b, db_person p");
              WHERE("b.id = p.id");
              if (!StringUtils.isEmpty(searchBean.getDashboardName())){
                  WHERE("title like '"+searchBean.getDashboardName()+"%'");
              }
              if (!StringUtils.isEmpty(searchBean.getCreator())) {
                  WHERE("creator = #{creator}");
              }
          }}.toString());
          return sql.toString();
      }
  ```

- CRUD

```java
@Insert("INSERT INTO dp_report_dashboards (title) VALUES (#{title})") // 关键字大写
@Options(useGeneratedKeys=true, keyProperty="id") // 主键自增
void createDashboard(MetaDashboard dashboard);
```

##### 注解@Results

```java
@Results({
	@Result(property = "id", column = "id", javaType = Long.class, jdbcType = JdbcType.BIGINT),
    @Result(property = "book_price", column = "db_id", javaType = Long.class, jdbcType = JdbcType.BIGINT),
    @Result(property = "image", column = "iamge", javaType = Image.class,many = @many(select = "com.mx.mappers.ImageMapper.getImageById")),
@Result(
    property = "company_id", column = "company_id", javaType = List.class,many = 		@Many(select ="com.mx.mappers.CompanyMapper.getInfoById"))
})
```

