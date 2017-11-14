/* !
* @author: feke9432
* @email : feke9432@gmail.com 
* @introduction: 为 html 元素添加滚动到哪里然后执行什么的方法。。。
* @param : {el} => 需要绑定方法的元素
*          {opts.el} => 等同于el
*          {opts.long} => 规定到那个高度时绑定事件
*          {opts.isBing} => 是否监听滚动事件，默认监听
*          {opts.cb} => 需要监听的事件，参数为 元素。
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : 
    (global.scrollShop = factory());
})(this, function () {
    return function scrollShop(el, opts) {
        if (el === 'object') {
            opts = el;
            el = opts.el || false;
        }
        if (!document.querySelector) return console.error('you browser don`t support this lib');
        if (!el) return console.error('plase give me a elemnet');

        var opts = opts || {};
        var long = opts.long || 500;
        var isBind = opts.isBind || true; // 默认添加 scroll 监听。

        var ele = document.querySelector(el);
        ele.isShow = true;
        var old = 0; // 记录旧的值

        (function () {
            // 初始运算保证效果正取显示。
            var scrollTop = document.documentElement.scrollTop || document.pageYOffset || document.body.scrollTop;
            if (scrollTop > long) ele.style.display = 'block';
        })();

        if (isBind) {
            window.addEventListener('scroll', function () {
                sub();
            });
        }

        function sub() {
            var scrollTop = document.documentElement.scrollTop || document.pageYOffset || document.body.scrollTop;

            if (Math.abs(scrollTop - old) < 10) return;

            if (scrollTop >= long && ele.isShow) {
                if (opts.cb) opts.cb(ele);
                ele.isShow = !ele.isShow
            }
            if (scrollTop <= long && !ele.isShow) {
                if (opts.cb) opts.cb(ele);
                ele.isShow = !ele.isShow
            }

            old = scrollTop;
        }
        return sub;
    }
});


// var scrollShow = scrollShop('.footer', {
//     cb: function (ele) {
//         if (ele.isShow) {
//             $(ele).fadeIn();
//         } else {
//             $(ele).fadeOut();
//         }
//     }
// });