(function (glo) {
    function dianzhan(dom, opts) {
        this.dom = dom || ''
        this.xinBtn = document.querySelector(this.dom);
        this.addXinBtn = document.querySelector('#addXin');
        this.opts = opts || {};
        this.timer; // 定时器
        this.addXinNum = 0; // 记录点击数
        this.startNum = parseInt(this.xinBtn.innerHTML);// 开始记录时的数字
        this.init();
    }

    dianzhan.prototype = {
        init: function () {
            this.xinBtn.addEventListener('click', this.xinBtnLister.bind(this), true);
        },
        xinBtnLister: function (e) {
            var img = this.createXin();
            this.xinBtn.parentElement.appendChild(img);
            this.animateXin(img);
            this.addXin();
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                this.addXinBtn.style = 'opacity: 0;';
            }.bind(this), 2000);
        },
        createXin: function () {
            var img = document.createElement('img');
            img.src = this.opts.imgSrc;
            return img;
        },
        animateXin: function (img) {
            var x = 0;
            var y = 0;
            var o = 1;
            var random = Math.random() * 3 - 1.5;
            loop();
            function loop() {
                setTimeout(function () {
                    x += 1 * random;
                    y += 3;
                    o -= 0.01;
                    img.style = 'transform: translate(' + x + 'px,-' + y + 'px);-webkit-transform: translate(' + x + 'px,-' + y + 'px); opacity:' + o;
                    if (o >= 0) {
                        loop();
                    } else {
                        img.parentElement.removeChild(img);
                    }
                }, 1000 / 60);
            }
        },
        addXin: function () {
            addXinNum++;
            this.addXinBtn.style = 'opacity: 1;';
            this.addXinBtn.innerHTML = '+' + addXinNum;
            this.xinBtn.innerHTML = this.startNum + addXinNum;
        }
    }

    glo.dianzhan = dianzhan;
})(this);