### 过滤器和拦截器的区别

- 拦截器是基于java反射机制的，而过滤器是基于函数回调的。
- 拦截器不依赖于servlet容器
- 拦截器可以访问action上下文，值栈里面的对象，而过滤器不能
- 在action生命周期中，拦截器可以多次被调用，而过滤器只能在容器初始化的时候被调用一次。
- 拦截器可以获取IOC容器中的各个bean，而过滤器是不能够获取。可以在拦截器中注入service，可以调用业务逻辑。

### 触发时机

- 过滤器的触发时机是在请求进入容器后，但请求进入servlet之前进行预处理的。请求结束返回也是，是在servlet处理完后，返回给前端之前。

- 总结：过滤器包裹住servlet，servlet包裹住拦截器。

  ![1550999541272](https://github.com/flymecode/MX-Notes/blob/master/image/1550999541272.png)

过滤器的触发时机是容器后，servlet之前，所以过滤器的

```java
doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
```

的入参是ServletRequest ，而不是httpservletrequest。因为过滤器是在httpservlet之前。



```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    System.out.println("before...");
    chain.doFilter(request, response);
    System.out.println("after...");
}
```

chain.doFilter(request, response);这个方法的调用作为分水岭。

事实上调用Servlet的doService()方法是在chain.doFilter(request, response);这个方法中进行的。

过滤器是JavaEE标准，采用函数回调的方式进行。是在请求进入容器之后，还未进入Servlet之前进行预处理，并且在请求结束返回给前端这之间进行后期处理。

拦截器是被包裹在过滤器之中的。

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    System.out.println("preHandle");
    return true;
}

@Override
public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    System.out.println("postHandle");
}

@Override
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    System.out.println("afterCompletion");
}
```

![1551001190293](https://github.com/flymecode/MX-Notes/blob/master/image/1551001190293.png)
