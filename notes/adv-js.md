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


##### 注意点：

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

