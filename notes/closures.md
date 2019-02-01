[TOC]



## 闭包

- 闭包：在一个作用域中可以访问另一个作用域的变量。

- 现象：在一个作用域中访问到另一个作用域的变量的现象。


``` javascript
function fn() {
    var n = 10;
    renturn n;
}
fn() // 这里没有发生闭包，只是把n的值进行了复制。 

function fn() {
    var n = 10;
    return function(){
    	return n;
    }
}
var f = fn();
console.log(f()) // 这里发生了闭包
```

### 特点

- 延展函数的作用域范围
- 在一个函数内部，又有一个函数，访问外层函数的变量。

### 案例

```html
<ul id='heroes'>
	<li>小白</li>
	<li>小黑</li>    
	<li>小红</li>    
</ul>
```

```javascript
// 1. 给li注册点击事件
var ul = documnet.getElementById('heroes');
var list = heroes.children;
for(var i = 0;i < list.length;i++){
    var li = list[i];
    // 给对象添加一个属性
    li.index = li;
    li.onclick = function(){
    // 2. 点击li的时候输出li对应索引
        console.log(this.index);
    }    
}

```

```javascript
// 1. 给li注册点击事件
var ul = documnet.getElementById('heroes');
var list = heroes.children;
for(var i = 0;i < list.length;i++){
    var li = list[i];
    ; (function(i){
      	li.onclick = function(){
    	// 2. 点击li的时候输出li对应索引
        console.log(this.index);
    }    
    })(i);
    
}
```

### 定时器执行的过程

```javascript
console.log('start')
setTimeout(function() {
    console.log('timeout');
},0);
console.log('over')
// 输出: start over timeout
// 原因：执行代码的时候，首先先把执行栈里面的代码执行完毕，然后再去任务队列中的函数。
```



```javascript
console.log('start')
for(var i = 0;i < 3; i++) {
    (function(i){
        // 开启一个闭包
        setTimeout(function() {
        console.log(i);
    },0);	
   })(i)
 }
   
console.log('end') 
```

### 

```javascript
function makeFun(size){
    return function(){
        documnet.body.style.fontSize = size + 'px';
    }
}

var div = document.getElemnetById('div');
var list = div.children;
for(var i = 0;i < list.length; i++) {
    var btn = list[i];
	var size = btn.getAttributte('size');
    var btn.onclick = makeFun(size);
}
```

### 思考

```javascript
var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc:function(){
        return function(){
            return this.name;
        };
    }
};
console.log(object.getNameFunc()())//这里输出的是The Window
```

```javascript
var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc:function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
console.log(object.getNameFunc()())//这里输出的是My Object
```

