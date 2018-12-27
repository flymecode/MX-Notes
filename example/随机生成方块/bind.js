// 函數也是對象
// bind 新建一個方法，bind中的第一個參數可以改變函數中的this的指向。
// bind并沒有調用
var a = 123;
function fn() {
    console.log(this.a);
}
fn();
var o = {a:'abc'};
var fn1 = fn.bind(o);
fn1() //相當於,o.fn()
