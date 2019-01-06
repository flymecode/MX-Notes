[TOC]



### 正则表达式

```javascript
var str = '100010010abc03'
// /0/匹配数字0
str = str.replace(/0/,'1');
// /0/匹配数字0,/g为全局匹配
str = str.replace(/0/g,'1');
```

### 创建正则表达式的方式

```javascript
// 参数一是我们要书写的正则表达式，参数二是我们需要需要填写的属性 i、g、m 分别表示忽略大小写，全局匹配，多行匹配。
var exp = new RegExp('pattern');
// 参数二可以填写一个也可以填写多个
var exp = new RegExp('pattern',ig);

var exp = /正则表达式/；
var exp = /正则表达式/ig
```

### RegExp的方法

```javascript
var pattern = new RegExp("java", "i");

boolean test(String) 判断我们字符串是否符合 
var str="I like java.";
alert(pattern.test(str));   //true

boolean String[] exec(String) 查找指定的字符串
var pattern = /java/ig;
var str="I like java, also like javascript.";
alert(pattern.exec(str));  //java

```

### 元字符

| 元字符 |                          描述                          |
| ------ | :----------------------------------------------------: |
| \d     |                     数字，即[0-9]                      |
| \D     |                   非数字，即[ ^0-9 ]                   |
| \w     |                     字母、数字和 _                     |
| \W     |                    非字母、数字和 _                    |
| \s     |                          空格                          |
| \S     |                         非空格                         |
| \t     |                         tab符                          |
| \n     |                         换行符                         |
| \r     |                         回车符                         |
| \符号  | 正则表达式符号本身：! $ ^ * + = \| . ? \ / ( ) [ ] { } |

| [a-zA-Z]  |         a-z或A-Z任意一个字符         |
| --------- | :----------------------------------: |
| [0-9]     |          0-9中任意一个数字           |
| [^a-m2-5] |        不包含a-m字符和2-5数字        |
| {m, n}    |     最少m个, 最多n个, {n}, {n,}      |
| .         |         除换行符外的任意字符         |
| ?         |               0个或1个               |
| *         |              0个或多个               |
| +         |              1个或多个               |
| ^         |               行首匹配               |
| $         |               行尾匹配               |
| \|        |       he\|she, he或she中的一个       |
| ()        | 分组, 括号内所有字符看做一个字符处理 |

### 例子

| 表达式               | 匹配                                |
| -------------------- | ----------------------------------- |
| /abc/                | 即：abc                             |
| /abc\.txt/           | 即：abc.txt                         |
| /What's your name\?/ | 即：What's your name?               |
| /第[1-9]章/          | 即：第1章、第2章、……、第9章         |
| /第[1-9][0-9]章/     | 同：/第[1-9]\d章/，即第10章到第99章 |
| /第[1-9]\d*章/       | 即：第1章开始                       |
| /boy(friend){0,1}/   | 即：boy或boyfriend                  |
| /boyfriend{0,1}/     | 即：boyfriend或boyfriend            |

### 练习

```javascript
座机规则
1.010-12345678
2.0755-12345678
3.0535-1234567
4.12345678
5.1234567

^((0[1-9][0-9]-)?[1-9][0-9]{7}|(0[1-9][0-9]{2}-)?([1-9][0-9]{6,7}))$

zhang_san@xupt.edu.cn
li-si01@163.com
^([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+((\.[a-z]{2,8}){1,2})$

var reg=/^([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+((\.[a-z]{2,8}){1,2})$/;
if(reg.test(email))  {
    .......
}

```





### JSP技术

`简介 `JSP和Servlet引擎，主要处理JSP和Servlet。JSP其实就是XML文件的改造版本，经过引擎处理，变成一个Java类。

那么Tomcat和Apache服务器有何区别呢？Apache主要负责静态页面的处理，Tomcat主要处理动态的部分。

### 工作空间：UTF-8

```java
// 引入页面的两种方式
<jsp:include page="userInfo.jsp">
<%@ include file = "文件名" %>
```

### 内置对象

| 内置对象    | 代表内容                                                     | 范围    |
| ----------- | ------------------------------------------------------------ | ------- |
| request     | 客户端的请求信息被封装在该对象中                             | request |
| response    | 对请求的应答                                                 | page    |
| pageContext | 对JSP页面内所有的对象及名字空间的访问，可以取输出流、session、request、response、属性、页面跳转、包含文件 | page    |
| session     | 客户端与服务器的一次会话，从客户连到服务器的一个Web Application开始， 直到客户端与服务器断开连接为止 | session |

| 内置对象    | 代表内容                                                     | 范围        |
| ----------- | ------------------------------------------------------------ | ----------- |
| application | 实现了用户间数据的共享，可存放全局变量.它开始于服务器的启动，直到服务器的关闭 | application |
| out         | 向输出流写入内容的对象                                       | page        |
| config      | 本 JSP 的 ServletConfig                                      | page        |
| page        | 实现处理本页当前请求的类的实例                               | page        |

| page        | Bean 只能在使用页面时使用。当加载新页面时，就会将其销毁 |
| ----------- | ------------------------------------------------------- |
| request     | Bean 在用户对其发出请求时存在                           |
| session     | Bean 一直存在于会话中，直至其终止或被删除为止           |
| application | Bean 在整个应用程序中均可使用                           |

### 字符编码问题

```java
// 设置作为响应生成的内容的类型和字符编码
response.setContentType("text/html,charset=utf-8");
//发送一个响应给浏览器，指示其应请求另一个URL
response.sendRedirect("/转发页面")；
```

### 页面跳转

```java
//request对象的转发
request.getRequestDispatcher("new.jsp").forward(request,response)
//动作的转发
<jsp:forward page="new.jsp"></jsp:forward>
//response的重定向
response.sendRedirect("new.jsp")
//javascript的跳转
<script>
	window.location="new.jsp";
</script>

```

### Servlet

#### 特点

- Servlet是一种比JSP更早的动态网页编程技术
- 无JSP前，充当视图层、业务逻辑层、持久层工作
- MVC规范出台后，仅作为控制层使用

#### 例子

```java
@WebServlet("/LoginServlet") //注册我们的Servlet
public class LoginServlet extends HttpServlet {
    // get请求
   public void doGet(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException {
     // 设置响应类型
     response.setContentType("text/html;charset=UTF-8");
     // 获取输出流
     PrintWriter out= response.getWriter();
     // 输出数据
     out.println("<html><body> 您好！</body></html>");
    }
}

public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException {
    doGet(request,reponse);
}

```

### Filter



- 过滤器是 Web 服务组件
- 过滤器可以访问客户端输入的请求和 Web 资源输出的响应
- 过滤器定义用于将过滤器名称与特定的类关联在一起
- 过滤器映射用于将过滤器映射至 Web 资源
- Filter 接口包含各种方法，如 init()、doFilter() 和 destroy()
- 每次用户发送请求或 Web 资源发送响应时都会调用 doFilter()方法
- FilterChain 接口用于调用过滤器链中的下一个过滤器
- 在初始化过程中，Servlet 使用 FilterConfig 将信息传递给过滤器

```java
@WebFilter("/*") // 设置拦截的路径
public class EncodingFilter implements Filter {
        ...........
   	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws  IOException, ServletException    {
      		HttpServletRequest req=(HttpServletRequest)request;
            if (req.getMethod().equalsIgnoreCase("POST")) {
                // post方式发送，直接设置字符集
                req.setCharacterEncoding(encoding);
           }
           // 放行
           chain.doFilter(request, response);
    }   
    ...........
}

```



### 数据库

```java
// 加载具体数据库的驱动：
Class.forName(驱动程序串);
String dbUrl= "jdbc:microsoft:sqlserver://localhost:1433;databasename=student";
String user = "";
String password = "";
// 与数据库建立连接
Connection conn = DriverManager.getConnection(dbUrl,user,password);
// 可以提前编译sql
//PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM student WHERE name=?");
// 设置参数
//pstmt.setString(1,"张三");
Statement stmt=conn.createStatement();
ResultSet rs=stmt.executeQuery("select * from student");

while(rs.next())  {
    System.out.printf("%d %s %s\n",rs.getInt(1),rs.getString(2),rs.getString(3));
}


```

### 数据分页

```sql
-- MySql
select * from tablename limit 开始位置,每页行数;
-- Oracle
select * from (
	select A.*, rownum RN
	from (select * from TABLE_NAME) A
	where rownum <= 40)
where RN >= 21;
--SQL Server
SELECT top 10 * FROM student 
where 主键字段 not in
(select top (当前页数-1)*每页行数 主键字段 from 
student where xxx=yyy order by 主键字段) 
where xxx=yyy order by 主键字段
```

### Spring

#### Spring IoC容器与Beans

反转控制是Spring的核心，也称作依赖性注入。不创建对象，但是描述创建它们的方式。在代码中不直接与对象和
服务连接，但在配置文件中描述哪一个组件需要哪一项服务。容器(在Spring框架中是IoC容器)负责将这些联系在一起。