function Box(parent,options) {
   
    // 设置对象的默认值
    options = options || {};
    // 设置对象的属性
    this.backgroundColor = options.backgroundColor || 'red';
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;

    //创建对应的div
    this.div = document.createElement('div');
    parent.appendChild(this.div);
    this.parent = parent;
    this.init();
    //this.random();
}
// 在原型中初始化div的样式
Box.prototype.init = function(){
    var div = this.div;
    div.style.backgroundColor = this.backgroundColor;
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    // 脱离文档流
    div.style.position = 'absolute';
}

Box.prototype.random = function(){
    // 用父容器的宽度/方块的宽度，总共能放多少个方块
    var x = Tools.getRandom(0,this.parent.offsetWidth / this.width - 1) * this.width;
    var y = Tools.getRandom(0,this.parent.offsetHeight / this.height - 1) * this.height;

    this.div.style.left = x + 'px';
    this.div.style.top = y + 'px';
}


