(function () {
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

