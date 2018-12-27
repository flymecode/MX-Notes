// 所有的js文件中书写代码都是全局作用域

// 自调用函数---开启了一个新的局部作用域,避免命名冲突
(function(){
    var elements = [];
    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
    
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
       
    
    }
    // 渲染
    Food.prototype.render = function(map){
        // 用父容器的宽度/方块的宽度，总共能放多少个方块
        this.x = Tools.getRandom(0,map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0,map.offsetHeight / this.height - 1) * this.height;
        remove();
        // 动态创建div
        var div = document.createElement('div');
        map.appendChild(div);
        elements.push(div);
    
        div.style.position = 'absolute'
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.height = this.height + 'px';
        div.style.width = this.width + 'px';
        div.style.backgroundColor = this.color;
    }
    // 相当于私有方法
    // 当删除数组中元素的时候，每删一个元素数组的索引会从新排列，所以会导致删除不干净的问题
    function remove() {
        for(var i = elements.length - 1; i>=0; i--){
            // 删除div
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组中的元素
            // 参数一、从哪个元素开始删除
            // 参数二、删除几个元素
            elements.splice(i,1)
        }
    }
    // 把Food构造函数，让外部可以访问。
    window.Food = Food;
})();

