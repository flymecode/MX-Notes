### 注册事件

- 方式一

```javascript
// 这种方式无法给同一个对象的同一个事件注册多个事件，如果注册多个事件，后面的事件会覆盖掉前面的事件。
// 所有浏览器都支持
var btn = document.getElementById('btn');
btn.onclick = function(){
    .........
}
```

- 方式二

```javascript
// 这种方式可以给同一个对象的同一个事件注册多个事件
var btn = document.getElementById('btn');
// 但是有浏览器有兼容性问题。IE-9之后支持
btn.addEventListener('click',function(){
    alert('hello word')
})

btn.addEventListener('click',function(){
    alert('hello max')
})
```

- 方式三 

```javascript
btn.attachEvent('onclick',function(){
    .........
})
```



### 处理兼容性问题

```javascript
// eventName不带on
function addEventListener(element,eventName,fn){
    if(element.addEventListener){
        element.addEventListener(eventName,fn);//第三个参数默认是false
    } else if(element.attachEvent) {
        element.attachEvent('on'+eventName,fn);
    } else {
        element['on' + element] = fn;
    }
}
```



### 移除事件

- 方式一

```javascript
// 只支持一次事件
var btn = document.getElementById('btn');
btn.onclick = function(){
    alert('hello');
    // 移除事件
    btn.onclick = null;
}
```

- 方式二

```javascript
function btnClick(){
    alert('hello word');
    btn.removeEventListener('click',btnClick)
}

var btn = document.getElementById('btn');
// 如果想要移除函数的时候，不能使用匿名函数
btn.addEventListener('click',btnClick);
})
```

### 处理兼容性问题

```javascript
function removeEventListener(element,eventName,fn){
    if(element.removeEventListener){
        element.removeEventListener(eventName,fn);
    } else if(element.detachEvent){
        element.detacthEvent('on' + eventName,fn);
    } else {
        element['on'+eventNem] = null;
    }
}
```

### addEventListener第三个参数的作用

```javascript
var box1 = documnet.getElementById('box1');
var box2 = documnet.getElementById('box2');
var box3 = documnet.getElementById('box3');
// addEventListener 的第三个参数为false的时候: 事件冒泡：
// 事件从最深的节点开始，然后逐步向上传播事件
// addEventListener 的第三个参数为false的时候: 事件捕获
// 事件三个阶段
// 一，捕获阶段
// 二，执行当前点击方式
// 三，冒泡阶段
var array = [box1,box2,box3];
for (var i = 0;i < array.length;i++){
    array[i].addEventListener('click',function(){
       console.log(this.id); 
    });
}
```

### 事件委派

```javascript
// 给标签的父元素注册事件就可以了。
// 这个函数是系统来调用的，当系统调用的时候会给函数传递一个参数。
var ul = document.getElementById('ul');
ul.onclick = function(e){
    // this带表ul这个对象
    // e 是事件参数， 事件对象 当事件发生的时候，可以获取一些和事件相关的数据。
    e.target // 是真正触发事件的对象
     
}
```

### 事件对象

```javascript
// 在DOM标准中，是给事件处理函数的一个参数，
// e就是事件对象
btn.onclick = function(e){
    e = e || window.event;
    e.eventPhase ; // 事件的阶段
    e.target;// 获取真正触发事件的对象
    var target = e.target || e.srcElement;
    e.currentTarget;// 事件处理函数注册的对象，相当于this.
    e.type; // 获取事件名称，可以为一个函数注册多个不同的事件，根据事件名称来分别处理。
    e.clientX;// 获取相对浏览器可视区左上角的坐标,与滚动条无关
    e.clientY;
    
    e.pageX;
    e.pageY;// 鼠标相对于页面的坐标
    
}
```



```javascript
<img src="#" id='ts'>
var ts = documnet.getElementById('ts');
documnent.onmousemove = function(e){
     e = e || window.event;
    ts.style.left = e.pageX - 10 +'px';
    ts.style.top = e.pageY - 10 + 'px';
}
```

### 获取滚动出页面的距离

```javascript
document.body.scrollLeft
document.body.scrollTop
// 处理兼容性问题
function getScroll() {
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
    return {
        scrollLeft:scrollLeft,
        scrollTop:scrollTop; 	
    }
}
```

### 处理获取鼠标在页面的位置，处理兼容性

```javascript
function getPage(e) {
	var pageX = e.pageX || e.clientX + getScroll().scrollLeft();
    var pageY = e.pageY || e.clinetX + getScroll().scrollTop();
    return {
        pageX:pageX,
        pageY:pageY
    }
}
```



### 获取鼠标在盒子中的位置

```javascript
box.onclick = function(e) {
    e = e || window.event;
    var x = getPage(e).pageX - this.offsetLeft;
    var y = getPage(e).pageY - this.offsetTop;
    return {
        x:x,
        y:y
    }
}
```

### 取消默认行为的执行和阻止冒泡

```javascript
link.onclick = function() {
    // 取消默认执行
    return faslse
    
    // DOM 标准方法
    // e.preventDefault();
    //IE老版本
    // e.returnValue = false;
    // Propagation 传播
    
    // 停止事件传播，取消冒泡
    // 标准的DOM方法
    e.stopProgation();
    // 老版本IE
    // e.cancelBUblle = true;
}
```

### 案例 ：只能输入数字的输入框

```javascript
// 键盘事件
// keydown 键盘按下的时候 
// keyup 键盘弹起的时候

var txt = document.getElementById('txt');
txt.onkeydown = function(e){
    // 判断当前用户按下的键是否是数字
    e = e || window.event;
    // e.keyCode 键盘码
    // 按下后退键能够删除一个数字
    if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8 ) {
        
        // 非数字
        // 取消默认行为
        return false; // 之后的代码不执行了
        e.preventDefault(); // 之后的代码执行
    }
}
```

