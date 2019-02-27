[TOC]



## ES6常用语法

### let、const
- let声明的变量不存在预解析
- let声明的变量不允许重复（在同一作用域下）
- 引入块级作用域，在块内部定义的变量，在外部是不可以访问的。
- 在块级作用域内部必须先声明，再使用。
- const 声明的常量不允许重新赋值。
- const 声明的常量必须初始化
- 对let的限制，const也具有。

### 变量的解构赋值
```javascript
// 数组的解构赋值
let[a,b,c] = [1,3,4];
let[a,b,c] = [,123,]; // undefind 123 undefind
let[c,d,e] = 'hello';
// 我们可以指定默认值
let[a=1,b,c] = [,2,];
// 将Math对应的函数进行相应的绑定
let {cos,sin,random} = Math;
// 对象的属性别名
// 对象的解构赋值
// abc是别名，如果使用别名则原来的名称就没有效果了
// 是按照对象的名称进行赋值的，跟顺序没有关系
let {foo:abc,bar} = {bar:'hi',foo:'nihao'}
// 对象指定默认值，我们就可以在后面不用赋值
let {foo:abc='123',bar} = {bar:'hi'}
console.log(abc) // 正常输出
console.log(foo) // foo is not defined 并且报异常

// 字符串的解构赋值
// 这里不能得到长度
let[a,b,c,d,e,length] = 'hello' 
console.log(length) // length is undefind
let{length} = "hi"
// 这里能够得到长度
console.log(length) // 2
```

### 字符串扩展

```javascript
// 判断字符串中是否包含制定的字串 返回值：boolean ture 包含 fase 不包含 参数一，匹配的字符，参数二，从第几个字符开始
includes() 
// 判断字符串是否以特定的字串开始
startWith()
// 判断字符串是否以特定的字串结尾
endsWith()
```

### 模板

```javascript
var obj = {
    username:maxu,
    age:'12'
}
let template = `
	<div>
		<span>${obj.username}</span>
		<span>${obj.username}</span>
		<span>${1+1}</span>
	</div>
`
```

### 函数扩展

```javascript
// 参数默认值
function foo(param='hello') {
    console.log(param);
}
// 参数解构赋值
function foo({username='lisi',age=12}={}){console.log(username,age)}
foo({username:'zhangsi',age:23})
// rest参数
function foo(a,...rest){}
// 扩展运算符
let arr =[1,2,3]
function foo(a,b,c) {
    console.log(a+b+c);
}
// 将数组中的数值一一赋值
foo(...arr);
```

### 箭头函数

```javascript
function foo() {
    console.log("hello")
}
foo()

let foo = () => console.log("hello")
let foo = (a+b) => console.log(a+b)
// 箭头函数中的this是取决于函数的定义，而不是调用
// 箭头函数不可以new
// 箭头函数不可以使用arguments获取参数列表，可以使用rest代替
```

