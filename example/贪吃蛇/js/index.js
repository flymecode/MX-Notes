// --------tools--------
; (function () {
    var Tools = {
        getRandom: function (min, max) {
            min = Math.ceil(min);
            max = Math.ceil(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    window.Tools = Tools;
})();
// ---------Parent-----------------------
; (function (window) {
    function Parent(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
    }
    Parent.prototype.test = function () {
        console.log('test');
    }
    window.Parent = Parent;
})(window, undefined);


// --------- Food -----------------------
// 所有的js文件中书写代码都是全局作用域
// 自调用函数---开启了一个新的局部作用域,避免命名冲突
; (function () {
    var elements = [];
    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;

        // this.width = options.width || 20;
        // this.height = options.height || 20;
        Parent.call(this, options);
        this.color = options.color || 'green';


    }

    // 原型继承
    Food.prototype = new Parent();
    Food.prototype.constructor = Food;
    // 渲染
    Food.prototype.render = function (map) {
        // 用父容器的宽度/方块的宽度，总共能放多少个方块
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
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
        for (var i = elements.length - 1; i >= 0; i--) {
            // 删除div
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组中的元素
            // 参数一、从哪个元素开始删除
            // 参数二、删除几个元素
            elements.splice(i, 1)
        }
    }
    // 把Food构造函数，让外部可以访问。
    window.Food = Food;
})();
// -----------Snake-----------------------
; (function () {
    var position = 'absolute';
    // 记录蛇
    var elements = [];
    function Snake(options) {
        options = options || {};
        // this.width = options.width || 20;
        // this.height = options.height || 20;
        Parent.call(this.options);
        this.direction = options.direction || 'right';
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ];
    }
    // 原型集成
    Snake.prototype = new Parent();
    Snake.prototype.constructor = Snake;

    Snake.prototype.render = function (map) {
        remove();
        for (var i = 0, len = this.body.length; i < len; i++) {
            // 蛇节
            var object = this.body[i];

            var div = document.createElement('div');
            map.appendChild(div);
            elements.push(div);
            // 设置代码样式
            div.style.position = position;
            div.style.height = this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.backgroundColor = object.color;
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
        }
    }

    Snake.prototype.move = function (food, map) {
        // 控制蛇的身体移动
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇头移动
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }

        // 判断蛇是否吃到食物
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX == food.x && headY == food.y) {
            // 让蛇添加一节
            var last = this.body[this.body.length - 1];
            // this.body.push({
            //     x: last.x,
            //     y: last.y,
            //     color: last.color
            // });
            var obj = {};
            //对象之间的拷贝
            extend(obj, last);
            console.dir(obj)
            this.body.push(obj);

            // 在地图上随机生成新的食物
            food.render(map);
        }
    }

    function extend(child, parent) {
        for (var key in parent) {
            if (child[key]) continue;
            child[key] = parent[key];
        }

    }

    // 私有的
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
        //elements = [];
    }

    window.Snake = Snake;

})();
// -----------Game-----------------------
; (function () {
    var that; // 记录游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);
        runSnake();
        bindKey();
    }
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }

    function runSnake() {
        var timerId = setInterval(function () {
            // 在定时器的funcion中this是指向window对象的
            // 可以利用全局屬性來保存游戲對象
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);
            var maxX = this.map.offsetWidth / this.snake.width - 1;
            var maxY = this.map.offsetHeight / this.snake.height - 1;

            // 获取蛇头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX > maxX) {
                alert('Game over');
                clearInterval(timerId);
            }
            if (headY < 0 || headY > maxY) {
                alert('Game over');
                clearInterval(timerId);
            }

        }.bind(that), 150);
    }

    window.Game = Game;
})();
// -----------main-----------------------
; (function () {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})();
