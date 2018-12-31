## VUE基础

### MVVM 只是针对View层

前端页面使用MVVM的思想，主要是为了让我们的开发更加简单，因为提供了数据的双向绑定;

- 主要是把每个页面分成M、VM、 V
- M 就是后端传送的数据
- V 就是每个页面的html结构
- VM 是一个调度者，分割了M、V,实现了数据的双向绑定
### 指令

- v-text     `v-text会覆盖元素中原本的内容，但是插值表达式只会替换自己的这个占位符，不会把真个元素的内容清空`
- v-html  
- v-cloak  `使用v-cloak能够解决插值表达式文本闪铄问题`
- v-model `数据的双向绑定`

### 语法糖

- v-on        `@`

- v-bind       `:`

-  在绑定的时候，拼接绑定内容：`:title="btnTitle + ', 这是追加的内容'"`

```HTML
<div id="app">

    <p>{{info}}</p>

    <input type="button" value="开启" v-on:click="go">

    <input type="button" value="停止" v-on:click="stop">

  </div>

```



```javascript
var vm = new Vue({
    el:'#app',
    data: {
        msg: '你好啊，vue',
        intervalId: null
    },
    methods: {
        // 这是es6中方法的定义。
        lang() {
            console.log(this.msg);
            // 在VM实例中，如果想要获取到data上的数据，或者想要调用methods中的方法，必须通过this.数据属性名称 或者 this.方法名来进行访问，这里的this就代表我们new出来的VM实例。
            // var _this = this; 设置this指向
            // 或者使用es6的箭头函数
            if(this.intervalId != null) return;
            this.intervalId  = setInterval( ()=> {
                let start = this.msg.substring(0,1);
            	let end = this.msg.substring(1);
            	this.msg = end + start;
            },400);
        },
        stop() { // 停止定时器
            clearInterval(this.intervalId);
            // 每当清除定时器之后重新将intervalId置为null
  			this.intervalId = null;          
        }
        // 注意:VM实例会监听自己身上data中所有的数据的改变，只要数据一发生变化，就会自动的把最新的数据，从data上同步到页面上去，减少了dom的操作，我们只需要关心数据，而不需要考虑如何渲染到页面。
    }
});    
```

### 事件修饰符

```html
.stop    在事件后使用 .stop来阻止事件冒泡
.prevent 使用 .prevent来阻止默认行为
.capture 使用事件捕获机制来执行事件   
.once    事件只执行一次啊
.self    只当事件在该元素本身（比如不是子元素）触发时触发回调
```





```html
<-- 自定义一个search方法，同时把所有关键字通过传参的方式传递给search方法。 -->
<-- 将满足条件的数据放在一个新的数组中返回-->
<tr v-for='item in search(keywords)' :key='item.id'>
	<td>{{item.id}}</td>
    <td v-text='item.name'></td>
    // 过滤器 使用管道来表示
    <td>{{item.ctime | dateFormat}}</td>
</tr>
```



```javascript
var vm = new Vue({
	el: '#app',
	data : {
        id: '',
        name: '',
        keywords: '' // 收索关键字
        list: [
			{id : '1', name: '宝马'， ctime: new Date()}
        ]
	},
    method : {
        add(){
    	
   		},
        del(id) {
            this.list.some((item,i) =>{
                if(item.id == id) {
                    this.list.splice(i,1);
                    return ture; 
                }
            }) 
            
            var index = this.list.findIndex(item =>{
                if(item.id == id) {
                    return true;
                }
            })
            this.list.splice(index,1);  
        }，
        search(keywords){
            // var newList = [];
            // this.list.forEach(item => {
            //    if(item.name.indexof(keywords) != -1){
            //       newList.push(item);
            //    }
            // })
            //  return newList;
            // forEach some filter findIndex 都是数组的新方法
            // 都会数组的每一项进项遍历，进行相关操作
            return this.list.filter(item => {
                //if(item.name.indexof(keywords) != -1){}
                // es6中新的方法，判断是否包含字符串
                if(item.name.includes(keywords)){
                   return true;
                }
            });
            // return newList;
        }
    }，
    // 定义私有的过滤器， 过滤器有两个条件，过滤器名称和处理函数
    filters: {
        dataFormat: function(dateStr,pattern) {
            pattern = pattern || {};
            // 根据给定的时间字符串，得到特定的时间
            var dt = new Date(dateStr);
            var y = dt.getFullYear();
            var m = (dt.getMoth() + 1).toString().padStart(2,'0');
            var d = dt.getDate();

            // return y +'-'+ m+ '-'+ d;
            if(pattern.toLowerCase() === 'yyyy-mm-dd'){
                // 模板字符串
                return `${y}-${m}-${d}`;
            } else {
                var hh = dt.getHours().toString().padStart(2,'0');
                var mm = dt.getMinutes().toString().padStart(2,'0');
                var ss = dt.getSecondes().toString().padStart(2,'0');
                 return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
            }
        }
    }，
    directives:{
        'fontweight':{
            bind: function(el,binding){
                el.style.fontWeight = binding.value;
            }
        },
        // 等同于写入update 和 bind函数中去。
        'fontSize':function(el,binding) {
                
        }
    }
});
```



### 自定义全局过滤器

```javascript
// 进行时间的格式化
// es6 形参默认值
Vue.filter('dateFormat',function(dateStr，pattern ='') {
    // pattern = pattern || {};
    // 根据给定的时间字符串，得到特定的时间
    var dt = new Date(dateStr);
    var y = dt.getFullYear();
    var m = dt.getMoth() + 1;
    var d = dt.getDate();
    
    // return y +'-'+ m+ '-'+ d;
    if(pattern.toLowerCase() === 'yyyy-mm-dd'){
        // 模板字符串
        return `${y}-${m}-${d}`;
    } else {
        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSecondes();
         return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
})
```



### 按键修饰符

```javascript
.enter
.tab
.deleter
.esc
.space
.right
.down
.up
.left
```

### 自定义全盘键盘码

```javascript
Vue.config.keyCodes.f2 = 113;
```

### 自定义指令

```javascript
// 定义全局指令 参数一是指令命长，在定义的时候不需要v- 
// 但是在调用的时候需要加上v-
// 参数二是一个对象，这个对象上有一些特定的函数，在特定的阶段，执行特定的操作
Vue.directive('focus',{
    // 每当指令绑定到元素的时候，会立即执行这个函数，但是只执行一次
    bind:function(el){
        // 在元素刚绑定指令的时候，还没有插入到DOM中去，这时候调用没有作用。
        // 一个元素只有插入到DOM中去的时候才能获取焦点。
        // el.focus();
    },
    // 当插入到DOM元素的时候会执行，只触发一次
    inserted:function(el){
         el.focus();
    },
    // 当VNOde节点更新的时候，会执行update,可能会触发多次
    update:function(el){
        
    }
})； 
```

### 发送Ajax请求

```html
<div id='app'>
    <a type='button' value='发送get请求' @click='getInfo'></a>
</div>
```

`使用vue-resource`依赖`vue`

```javascript
var vm = new Vue({
    el: '#app',
    date: {},
    method: {
        // 发起get请求
        getInfo() {
            this.$http.get('/user/info').then(function(result){
                // 通过result.body获取服务器返回的数据
				console.log(result.body)
            })
		},
        postInfo() {
            // 通过post的第三个参数，设置提交的格式
            this.$http.post('/user',{},{emulateJSON: true}).then(result => {
                
            })
        },
       jsonInfo() {
            // 通过post的第三个参数，设置提交的格式
            this.$http.jsonp('/user',{},{emulateJSON: true}).then(result => {
                
            })
        }
    }
});
```

