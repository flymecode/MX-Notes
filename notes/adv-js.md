[TOC]



## JS高级

### js特点

- 解释执行 慢
- 灵活 动态特性 可以随意给对象增加属性和方法
- 头等函数 函数在javaScript一等公民
- 执行环境 浏览器、nodejs

### 组成

- ECMAScript 语法规范
  - 变量、数据类型、类型转换、操作符
  - 流程控制
  - 数组、函数、作用域、预解析
  - 对象
  - 内置对象
- WEBAPIs
  - BOM 浏览器对象模型
    - onload页面加载事件
    - window 顶级对象
    - 定时器
    - location、histroy
  - DOM 文档对象模型
    - 获取页面元素、注册事件
    - 属性操作
    - 节点属性、节点层级
    - 动态创建元素
    - 事件：注册事件的方式、事件的三个阶段、事件对象

### JavaScript能作什么呢？

任何可以用JavaScript来写的应用，最终都用JavaScript来写

### 浏览器是如何工作的？

当我们输入浏览器输入域名之后浏览器都做了什么呢？

- 首先通过DNS服务器来解析域名获取IP地址
- 通过IP地址访问指定的服务器
- 服务器执行请求并响应请求
- 浏览器通过渲染引擎渲染DOM树

### 创建对象

- 方式一

```javascript
var hero = new Object(); //空对象
hero.blood = 100;
hero.name = '刘备'；
hero.weapon = '剑';
hero.attack = function(){
    console.log(this.weapon + '攻击敌人')
}
```

- 方式二

  `创建单个对象推荐使用`

```javascript
var hero = {};//空对象
var hero = {
    blood:100，
    name:'刘备'，
    weapon:'剑'
    attack: function(){
        console.log(this.weapon + '攻击敌人')
    }
};
```

- 方式三 工厂函数

`弊端：用工厂创建的对象我们不知道具体的类型 instanceof`

```javascript
function createHero(name,blood,weapon){
    var hero = new Object(); //空对象
    hero.blood = 100;
    hero.name = '刘备'；
    hero.weapon = '剑';
    hero.attack = function(){
        console.log(this.weapon + '攻击敌人')
    }
    return hero;
}
```

- 方式四 构造函数

```javascript
// new
// 1.会在内存中创建一个空对象
// 2.设置构造函数的this,让this指向空对象
// 3.执行构造函数中的代码
// 4.返回对象
// 我们无法通过tyof获取对象的具体类型。
// 但是我们可以通过constructor来获取具体的类型 
// 但是我们不建议使用这种方式，我们可以使用instanceof
// instanceof判断对象是否是某个构造函数的实例
function Hero(name,blood,weapon){

    this.name = name;
    this.blood = blood;
    this.weapon = weapon;

    this.attack = function(){
        console.log(this.weapon + '攻击敌人')；
    }
}
```

### 静态成员和实例成员

- 静态成员

```javascript
// 静态成员：直接使用对象来调用，工具中使用频繁
// MyMath.PI;
// MyMath.max;
var MyMath = {
    PI：3.1415926，
    max:function(){
        .......
    }，
    min:function(){
        .......
    }
}
```

- 实例成员

```javascript
// 实例成员：构造函数中的成员就是实例成员
// 当有很多个对象的时候，使用构造函数的方式创建对象
// 什么是实例呢？对象的一种说法
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){

    }
}
```

### 构造函数的问题

```javascript
function Student(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;

    this.sayHi =  function(){
        console.log('大家好'+this.name)；
    }
}
// 当我们创建两个函数的时候，我们在堆内存中创建了多个 sayHi 函数。
// 这样会影响效率
var s1 = new Student('lilei',18,'男')；
var s2 = new Student('xiaoming',13,'女')；
s1.sayHi === s2.sqyHi // false
```

#### 解决办法

- 方式一

`我们可以将函数转移到构造函数之外，然后将函数赋值给相应的变量`

`弊端：当我们创建多个方法的时候，容易导致重名`

```java
function Student(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.sayHi =  sayHi;

}
function sayHi(){
    console.log('大家好'+this.name)；
}

var s1 = new Student('lilei',18,'男')；
var s2 = new Student('xiaoming',13,'女')；
s1.sayHi === s2.sqyHi // true
```

- 方式二 原型

```javascript
// 每个构造函数都有一个属性 原型/原型对象
function Student(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}
console.dir(Student.prototype);// 是一个对象
// 我们可以通过原型添加方法
// 通过构造函数，创建的对象，我们可以访问原型中的对象。
Student.prototype.sayHi = function(){
    console.log('大家好，我是'+this.name);
}
var s1 = new Student('lilei',18,'男')；
var s2 = new Student('xiaoming',13,'女')；
s1.sayHi === s2.sqyHi // true
```

### 构造函数，原型对象，对象/实例 的关系

- 构造函数中拥有原型对象
- 构造函数创建对象
- 对象中的`__proto__`指向原型对象
- 原型对象中的constructor属性 指向构造函数

### 原型链

- 每个对象都有`__proto__`

- 当一个对象调用方法的时候，首先在自身查找，如果没有，再去原型链上查找

- 当一个对象调用属性的时候，首先在自身查找，如果没有，再去原型链上查找

- 当一个对象设置属性的时候，如果自身有该属性，会直接覆盖原先的值，如果没有该属性，则会为自身添加该属性，不会向原型链上检索。

- 就近原则

- Object 原型对象.`__proto__`为`null`所以原型链的最顶端为`null`

### 注意点：

```javascript
function Student(name,age) {
    // 一般情况下，对象的属性在构造函数中来设置
    this.name = name;
    this.age = age;
}
// 一般情况下，对象的方法在构造函数的原型对象中设置。
// 但是当方法增多的时候会显得代码非常的多
Student.protype.sayHi = function(){
    console.log('sqyHi');
}
// 我们可以重新改变原型对象prototype属性
// 但是这样我们不能通过对象调用constructor（是创建函数所使用的构造函数） 来查找我们想要的构造函数了
// 如果我们想使用原型对象上设置的属性的时候(此时原型对象改变了)，必须等到构造函数设置完prototype的时候才能创建对象。
// 所以我们要先设置原型属性再创建原型对象。
Student.prototype = {
    constructor: Student,
    sayHi:function(){
        ......
    },
    eat: function(){
        ......
    }
}
```

利用原型对象可以扩展内置对象

```javascript
var array = [1,2,3,4]; // 我们没有改变原型对象，只是在原型对象上新增一个属性。

// 我们可以给数组新增属性
Array.prototype.getSum = function(){
    var sum = 0;
    for(var i = 0;this.length;i++){
        if(this[i] % 2 === 0){
            sum += this[i];
        }
    }
    return sum;
}

// 数组或者string中的prototype是不可以修改的
Array.prototype = {
    getSum: function(){
        .........
    }
}
```

[`随机生成方块案例`]()

### bind()、call()、apply() 可以改变函数中this

- bind
  
```javascript

// 函数也是对象
// bind 新建一個方法，bind中的第一個參數可以改变函数中的this的指向。
// bind并沒有調用，而是直接返回一个新的函数，由返回的函数去调用。
var a = 123;
function fn() {
    console.log(this.a);
}
fn();
var o = {a:'abc'};
var fn1 = fn.bind(o);
fn1() //相当于,o.fn()

// 應用
obj = {
    name:'zhs',
    fn: setInterval(function(){
        console.log(this.name);
    }.bind(this),1000); // 此處的this指向obj
}
obj.fn();

// 在注冊事件的時候也可以改變this
btn.onclick = function() {
    console.log(this.name);
}.bind(obj);

```

- call
  
```javascript

// call() 改变函数的this，并且直接调用，需要参数的时候可以直接填写。
// call 的返回值就是函数的返回值
var a = 123;
function fn(b) {
    console.log(this.a+b);
}
fn();
var o = {a:'abc'};
fn.call(o,1); // abc1

// 应用 伪数组
var obj = {
    0:20,
    1:21
};
// 可以利用数组的方法，给伪数组做操作
Array.prototype.push.call(obj,20);
Array.prototype.aplice.call(obj,0,1);

var obj = {
    name: 'zs'
};
console
```

- apply

```javascript
    // 函数是一个对象
    // var fn = new Function();
    // 证明fn是Funtion()的实例对象
    console.log(fn.__proto__ === Function.prototype);

    function(x, y) {
        console.(this);
        console.log(x + y);
    }
    // aplay的應用
    // aplay的第二個參數是數組
    fn.apply(,[]);

    Math.max(3,5,6);
    var array = [3,5,6];
    // Math.max是不能求數組中的最大值
    Math.max(array); // 錯誤
    // 但是我們可以這樣用
    // 我們可以將array中的數值傳遞給max
    Math.max.apply(null,array)
    Math.max.apply(Math,array)

    // 我們可以將array展開傳遞給前面的方法
    console.log.apply(console,array);
```

在每个自调用函数前加分号；

自调用函数传入参数

```javascript
// 自调用函数返回一个undefined
// 传入参数的目的是为了在项目发布的时候能够压缩代码
;(function(window,undefined){ // 这里是形参
    ......
})(window,undefined) // 这里是实参
```

### 继承

```javascript
var wjl = {
    name: '王健林',
    money: '1000000',
    play: function() {
        console.log('打高尔夫');
    }
}

var wsc = {
    name: '王思聪'
    // 复制对象的成员给另一个对象
    for (var key in wjl) {
        // 不给王思聪复制同名的属性
        if(wsc[key]) {
          continue;
        }
        wsc[key] = wjl[key];
    }
}

```

### 复制对象的另外一个方法 

```javascript
    function extend(parent,child) {
        for(var key in parent ) {
            if(child[key]) {
            continue;
        }
        child[key] = parent[key];
        }
    }
```

### 继承是类型与类型之间的关系

- 例一 原型继承
  
```javascript
    // 继承的目的是：把子类型中共同的成员类型提取到父类型中，实现代码重用。
    function Person(name,age,sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    function Student() {
        this.score = 100;
    }
    // 原型继承的时候只能给构造函数赋值一次，以后就无法设置构造函数里的参数，赋值的时候非常不方便。
    // 如果给原型属性赋值的时候一定要给原型设置contructor
    Student.prototype = new Person();
    Student.prototype.constructor = Student;


    function Teacher() {

    }
```

- 例二 借用构造函数
  
```javascript
    function Person(name,age,sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    function Student(name, age sex, score){
        // 能够解决继承属性
        Person.call(this,name,age,sex);
        this.score = score;
    }

```

- 例三 组合继承
  
```javascript

    function Person(name,age,sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    Person.prototype.sayHi = function() {
        console.log('大家好'，this.name);
    }

    function Student(name, age sex, score){
        // 能够解决继承属性
        Person.call(this,name,age,sex);
        this.score = score;
    }
    Student.prototype = Person.prototype;
    Student.prototype.constructor = Student;

    Student.prototype.exam = function(){
        console.log('考试');
    }
    // 当子类型添加特有的方法的时候，包括父类型和其它子类型都会增加该方法。
    // 原因是子类型的prototype 都指向父类型的原型对象
    var p = new Person('ls',18,'男');
    // 解决办法
    Student.prototype = new Person();
```

### 函数声明与函数表达式的区别

``` javascript
    // 区别 函数调用过的是偶，函数声明会提升
    // 函数表达式不会提升
    // if 语句不会开启新的作用域
    // 只有函数会开启新的作用域
    // 现代浏览器 不会提升if语句中的函数声明，进行函数提升

    // 函数声明
    function fn1() {
        console.log("");
    }
    // 函数表达式
    var fn2 = function() {
        console.log("");
    }

    var fn;
    if(ture) {
        fn = function(){
            ....
        }
    } else {
        fn = function(){
            ....
        }
    }

```

### 函数调用形式和this的指向

```javascript
    // 1 普通函数调用
    // this 指向window
    funciton() {

    }
    // 2 方法调用
    // this指向调用该方法的对象
     var obj = {
         fn: function () {
             console.log();
         }
     }
     obj.fn();
    // 3 作为构造函数调用
    // 构造函数内部的this指向由构造函数创建的对象

    // 4 作为事件的处理函数
    // this 指向触发这个事件的元素
    btn.click = function () {

    }
    // 5 作为定时器参数
    // this 指向window
    setIntervar (function(){
        console.log(this);
    },1000);
 总结：this是在函数最终调用的时候确定的
```
### 函數中的其他成員
```javascript
    function() {
        // 获取到函数的实参
        // 当函数的参数个数不一定的时候，可以通过argumnets来获取。
        fn.argumnets;
        // 函数的形参个数
        fn.length;
        // 函数的调用者，如果是全局函数，则为null
        fn.caller;
        // 函数的名称
        fn.name;
    }
```

### 高阶函数

- 函数作为参数
```javascript
    var arr = [1,2,3,4];
    arr.sort(function(a,b) ){
        return a - b;
    }

    Array.prototype.mySort = function() {
        for (var i = 0; i < this.length; i++) {
            var isSort = true; // 假设排好了
            for (var j = 0; j < this.length - i - 1; j++){
                if(fn(this[j],this[j+1]) > 0) {
                    isSort = false;
                }
            }
        }
    }
```
- 函数作为返回值
```javascript
    // 写一个函数生成1-10之间的随机值
    function getRandom() {
        return parseInt(Math.random() * 10 + 1);
    }
    // 第一次调用生成随机数，以后每次调用返回第一次随机数
    var random = parseInt(Math.random() * 10) + 1;
    return function() {
        return random;
    }
    var fn = function();
    // 以后我们每次调用fn就可以了
    console.log(fn() === fn()) // true;

    // 求两个数的和
    // 100 + m
    // 1000 + m
    function getFun(n) {
        return function(m) {
            return n + m;
        }
    }
```

### 递归

```javascript
    function() {
        if(n === 1 || n === 2) {
            return 1;
        }
        return fn(n - 1) + fn(n - 2)
    }
```
### 浅拷贝、深拷贝 
```javascript
    // 实现浅拷贝
    for (var value in obj){
        obj[value] = obj[value];
    }

    // 深拷贝把o1的成员给o2
    function deepCopy(o1,o2) {
        for(var key in obj) {
            var item = o1[key];
            if(item instanceof Object) {
                o2[key] = {};
                deepCopy(item,o2[key]);
            } else if(item instanceof Array) {
                var arr = [];
            }
            o2[key] = [];
            deepCopy(item,o2[key]);
        } else {
            o2[key] = o1[key];
        }
    }
```
### 遍历DOM树
```javascript

    // 遍历指定元素的子元素
    function loadTree(parent，callback) {
        // 结束条件就是父元素中没有子元素
        for(var i= 0;i < parent.children.length;i++){
            var child = parent.children[i];
            // console.log(child);
            if(callback) {
                // 处理找到的子元素
                callback(child);
            }
            loadTree(child);
        }
    }
    loadTree(ul,function(element) {
        // 操作子元素
        element.onclick = function() {

        }
    })

```

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

