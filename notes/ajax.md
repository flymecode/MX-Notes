

[TOC]



### AJAX 笔记

在没有`ajax`之前实现页面局部更新的效果使用的`iframe`标签，后台相应`js`脚本，使用子页面来调用父页面的内容。 `parent.doucmnet.getElementById()`

### 初识Ajax

```javascript
// 1、创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();
// 2、准备发送
xhr.open('get','/user/id',true);
// 3、执行发送动作
xhr.send(null);
// 指定回调函数
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4){ // 返回数据	
        if(xhr.status == 200){ // 判断状态值
            var data = xhr.responseText;
        }
    }
}
```

### Ajax 发送get请求

```javascript
var xhr = null;
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();// 标准的
} else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
// 准备发送
// 参数一，请求方式（get获取数据，post提交数据）
// 参数二，请求地址
// 参数三，同步或者异步标志位，默认是true表示异步，false表示同步
// 如果是get请求，那么请求参数必须在url中传递
// encodeURI(）用来对中文参数进行编码，防止乱码。
var param = 'username'+username;
// 准备发送
xhr.open('get','/user？'+codeURI(param),true);
// 执行发送动作
// 发送post的时候需要加上这个请求头
// xhr.sendRequestHeader('Content-type','application/x-www-form-urlencode');         
xhr.send(null);
// 指定回掉函数
// 浏览器来调用回掉函数，并且调用了3次，浏览器根据readyState的值的变化（1->2->3->4）来调用。
// readyState = 0,xhr对象初始化完成
// readyState = 1,已经发送了请求。
// readyState = 2 浏览器已经受到了服务器响应的数据
// readyState = 3 浏览器正在解析数据
// readyState = 4 浏览器已经解析完成，可以使用了
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        // http状态码
        // 200 表示成功
        // 404 没有找到资源
        // 500 服务端错误
        if(xhr.status == 200){ // 判断数据是否正常
            // 两种返回数据的方式
            var data1 = xhr.reponseText;
            // 解析JSON
            var obj = JSON.parse(data1); // 将json形式的字符串转化为对象
            var str = JSON.stringify(obj);// 把对象转化为字符串
            var d = eval('('+data1+')'); // eval的作用就是把字符串解析成js代码并执行,有安全隐患。
            // 解析XML数据
            var data2 = xhr.reponseXML;
            var booklist = data2.getElementsByTagName('booklist');
            var books = bookList[0].children;
            var book1 = books[0];
            var name = book1.children[0].innerHTML;
        }
    }
}
```

### 封装

```javascript
function ajax(url,type，dataType,param,callback){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(type == 'get'){
        url += '?' + param;
    }
    var data = null;
    if(type = 'post'){
        data = param;
        // 如果是post请求必须对请求头设置一下信息
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencode');
    }
    xhr.open(type,url,true);
    xhr.send(data);
    // 对业务逻辑进行抽取
    xhr.onreadystatechange = function(){
        if(xhr.readyState = 4){
            if(xhr.status == 200){
                var data = xhr.reponseText;
                if（dataType == 'json'){
                    data = JSON.parse(data);
                }
                // 回调函数处理
                callback(data);
            }
        }
    }
}
```



### JQuery-Ajax 相关使用

```javascript
$.ajax({
    type:'get', // 默认是get请求
    url: '/user?username'+param，
    data： {sex:'男'}，// 两种传入参数的方式
    dataType:'json',// 获取返回值的参数，支持json,xml,text,javascirpt,jsonp 其实底层就有两种。
    success: function(data) {
    .....处理业务
	},
    error: function(data) {
        $('#info').html("出现错误了")
    }   
})；
```

### 模仿JQuery-Ajax

```javascript
function ajax(obj){
    var defaults = {
        tyep: 'get',
        data :{},
        url: '#',
        dataType : 'text',
        async: 'true',
        success: function(){}
    }
    // 处理形参，传递参数的时候就覆盖默认的参数，不传递参数的时候使用默认的参数。
    for(var key in obj) {
        default[key] = obj[key];
    }
    // 创建XMLHttpRequest 做兼容性处理
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Micrisoft.XMLHTTP');
    }
    // 将对象形式的参数转化为字符串。
  	var param = '';
    for(var attr in obj.data){
        param += attr +'='obj.data[attr] + '&';
    }
    if(defaults.type == 'get'){
        // encodeURI解决中文乱码
        default url += '?' + encodeURI(param);
    }
   
    if(param){
        
        param = param.substr(0,param.length - 1);
    }
    xhr.open(defaults.type,defaults.url,defaults.async);
    var data = null;
    if(default.type = 'post'){
        data = param;
        // 如果是post请求的话，设置请求头信息，如果不设置的话，无法传递数据。
        xhr.setRequestHeader('Content-Type','application/x-www-from-urlcoded');
    }
    // 执行发送动作
    xhr.send(data);
    if(!defaults.async){
        if(defaults.dataType == 'json'){
            return xhr.responseText;
        }
    }
    // 执行回调函数，处理服务器响应步骤。
    xhr.onreadyStatechange = function(){
        if(xhr.readyState = 4){
            if(xhr.status = 200){
                var data = xhr.reponseText;
                if(defaults.dataType = 'json'){
                    data = JSON.parse(data);
                }
                defaults.success(data);
            }
        }
    }
}
```



### 异步与同步

- 同步 彼此等待，阻塞的
- 异步 各做各的 ，非阻塞



单线程+事件队列中的任务执行满足的条件：

1. 主线程已经空闲
2. 任务满足触发条件
   1. 定时函数（延时时间已经到达）
   2. 事件函数（特定事件被触发）
   3. Ajax的回掉函数（服务端返回数据）





### Ajax跨域

同源策略

- 同源策略是浏览器的一种安全策略，所谓同源指的的是请求URL地址中的协议，域名，端口都相同，只要其中之一不相同就是跨域
- 同源策略主要是保证浏览器的安全性
- 在同源策略下，浏览器不允许Ajax跨域获取服务器数据。



### 解决跨域

- #### jsonp

  - script标签中的`src`属性可以实现跨域访问资源。
  - 用scrip标签 必须先引入资源，然后才能使用。
  - 是用script标签传入参数是不好处理的。


```javascript
var flag = 1;
// 动态创建script标签来实现跨域。
var script = documnet.createElement('script');
script.src = 'http://tom.com/data.php?flag=1';
var head = document.getElementsByTagName('head')[0];
head.appendChild(script);
// callback是一个回调函数
// 这里的callback函数由谁调用，实际上由服务器响应的内容调用（这里的内容就是js代码）
function callback(data){ // 返回一个函数调用，
    console.log(data);
}

// callback({'username':name}) 调用没有位置的要求

```

```javascript
$.ajax(){ // 支持跨域
    type:'get',
    url:'',
    dataType:'jsonp',
    jsonp:'cb', // 自定义参数名字
    jsonpCallback:'abc',// 自定义回调函数的值 cb = abc
    data:{},
    success:function(data){
       console.log(data);
    }，
    error:function(data){
        ...
    }
}
```



### Jsonp底层

```javascript

function ajax(obj){
    // jsonp仅仅支持get请求
    var defaults = {
        url : '#',
        dataType : 'jsonp',
        jsonp : 'callback',
        data : {},
        success:function(data){console.log(data);}
    }

    for(var key in obj){
        defaults[key] = obj[key];
    }
    // 这里是默认的回调函数名称
    // expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
    var cbName = 'jQuery' + ('1.11.1' + Math.random()).replace(/\D/g,"") + '_' + (new Date().getTime());
    if(defaults.jsonpCallback){
        cbName = defaults.jsonpCallback;
    }

    // 这里就是回调函数，调用方式：服务器响应内容来调用
    // 向window对象中添加了一个方法，方法名称是变量cbName的值
    window[cbName] = function(data){
        defaults.success(data);//这里success的data是实参
    }

    var param = '';
    for(var attr in defaults.data){
        param += attr + '=' + defaults.data[attr] + '&';
    }
    if(param){
        param = param.substring(0,param.length-1);
        param = '&' + param;
    }
    var script = document.createElement('script');
    script.src = defaults.url + '?' + defaults.jsonp + '=' + cbName + param;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);

    // abc({"username":"zhangsan","password":"123"})
}
```



### 整合

```javascript

function ajax(obj){
    var defaults = {
        type : 'get',
        async : true,
        url : '#',
        dataType : 'text',
        jsonp : 'callback',
        data : {},
        success:function(data){console.log(data);}
    }

    for(var key in obj){
        defaults[key] = obj[key];
    }

    if(defaults.dataType == 'jsonp'){
        ajax4Jsonp(defaults);
    }else{
        ajax4Json(defaults);
    }
}

function ajax4Json(defaults){
    // 1、创建XMLHttpRequest对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 把对象形式的参数转化为字符串形式的参数
    /*
    {username:'zhangsan','password':123}
    转换为
    username=zhangsan&password=123
    */
    var param = '';
    for(var attr in defaults.data){
        param += attr + '=' + defaults.data[attr] + '&';
    }
    if(param){
        param = param.substring(0,param.length - 1);
    }
    // 处理get请求参数并且处理中文乱码问题
    if(defaults.type == 'get'){
        defaults.url += '?' + encodeURI(param);
    }
    // 2、准备发送（设置发送的参数）
    xhr.open(defaults.type,defaults.url,defaults.async);
    // 处理post请求参数并且设置请求头信息（必须设置）
    var data = null;
    if(defaults.type == 'post'){
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    // 3、执行发送动作
    xhr.send(data);
    // 处理同步请求，不会调用回调函数
    if(!defaults.async){
        if(defaults.dataType == 'json'){
            return JSON.parse(xhr.responseText);
        }else{
            return xhr.responseText;
        }
    }
    // 4、指定回调函数（处理服务器响应数据）
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = xhr.responseText;
                if(defaults.dataType == 'json'){
                    // data = eval("("+ data +")");
                    data = JSON.parse(data);
                }
                defaults.success(data);
            }
        }
    }
}
function ajax4Jsonp(defaults){
    // 这里是默认的回调函数名称
    // expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
    var cbName = 'jQuery' + ('1.11.1' + Math.random()).replace(/\D/g,"") + '_' + (new Date().getTime());
    if(defaults.jsonpCallback){
        cbName = defaults.jsonpCallback;
    }

    // 这里就是回调函数，调用方式：服务器响应内容来调用
    // 向window对象中添加了一个方法，方法名称是变量cbName的值
    window[cbName] = function(data){
        defaults.success(data);//这里success的data是实参
    }

    var param = '';
    for(var attr in defaults.data){
        param += attr + '=' + defaults.data[attr] + '&';
    }
    if(param){
        param = param.substring(0,param.length-1);
        param = '&' + param;
    }
    var script = document.createElement('script');
    script.src = defaults.url + '?' + defaults.jsonp + '=' + cbName + param;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}
```



#### 处理时间

```javascript
// 后台返回秒数
var t = new Data();
t.setTime(time+'000'); //转化为毫秒
var date = t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDay()+'日'+（t.getHours() > 12？'下午'：'上午'）+（t.getHours()%12)+':'+t.getMinutes()+':'+t.getSeconds();
```

