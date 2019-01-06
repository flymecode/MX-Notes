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
let {cos,sin,random} = Math;
// 对象的属性别名
// 对象的解构赋值
// abc是别名
let {foo:abc,bar} = {bar:'hi',foo:'nihao'}

```
