(function () {
    var position = 'absolute';
    // 记录蛇
    var elements = [];
    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.direction = options.direction || 'right';
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ];
    }

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

    Snake.prototype.move = function (food,map) {
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

        // 判斷蛇是否吃到食物
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if(headX == food.x && headY == food.y){
            // 讓蛇添加一節
            var last = this.body[this.body.length -1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            food.render(map);
        }

        
    }

    // 私有的
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i,1);
        }
        //elements = [];
    }

    window.Snake = Snake;

})()

