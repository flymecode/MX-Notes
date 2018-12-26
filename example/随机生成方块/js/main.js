var container = document.getElementById('container');
var array = []; // 存储方块
for(var i = 0; i < 10;i++){
    var r = Tools.getRandom(0,255);
    var g = Tools.getRandom(0,255);
    var b = Tools.getRandom(0,255);

    var box = new Box(container,{
        backgroundColor: 'rgb('+r+','+g+','+b+')'
    });

    array.push(box);
}
// 设置随机位置，开启定时器
setInterval(randomBox,500);
// 页面加载完成先生成随机位置
randomBox();
function randomBox(){
    // 随机生成方块的坐标
    array.map(function(item){
        item.random();
    });
}