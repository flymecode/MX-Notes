### AJAX 笔记

在没有`ajax`之前实现页面局部更新的效果使用的`iframe`标签，后台相应`js`脚本，使用子页面来调用父页面的内容。 `parent.doucmnet.getElementById()`

#### 初识Ajax

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
xhr.sendRequestHeader('Content-type','application/x-www-form-urlencode');         
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



##### JQuery-Ajax 相关使用

```javascript
$.ajax({
    type:'get',
    url: '/user?username'+param，
    data： {sex:'男'}，// 两种传入参数的方式
    dataType:'json',// 获取返回值的参数
    success: function(data){
    .....处理业务
}
})；
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