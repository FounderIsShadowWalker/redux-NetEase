var tempo = {
    css: function (elem, prop) {
        return window.getComputedStyle(elem, null)[prop].replace(/[a-zA-Z]+/g, '');
    },

    //300 400 2s
    buffer: function (obj, targets, callback, times) {
        if (obj.timer) clearInterval(obj.timer);
        if (!times || times > 60) times = 60;
        times < 5 && (times = 5);
        if (typeof targets !== 'object') {
            alert('arguments error');
            return;
        }

        var _this = this;
        obj.timer = setInterval(function () {
            var speed = 0, pro = 0, stops = true;
            for (var attr in targets) {
                pro = parseInt(_this.css(obj, attr));
                speed = (targets[attr] - pro) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                (pro != targets[attr]) && (stops = false);
                obj.style[attr] = pro + speed + 'px';
            }

            stops && (clearInterval(obj.timer), obj.timer = null, callback && callback.call(obj));

        }, times);
    },

    bufferNostyle: function (obj, targets, callback, times) {
        if (obj.timer) clearInterval(obj.timer);
        if (!times || times > 60) times = 60;
        times < 5 && (times = 5);
        if (typeof targets !== 'object') {
            alert('arguments error');
            return;
        }

        var _this = this;
        obj.timer = setInterval(function () {
            var speed = 0, pro = 0, stops = true;
            for (var attr in targets) {
                pro = parseInt(_this.css(obj, attr));
                speed = (targets[attr] - pro) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                (pro != targets[attr]) && (stops = false);
                obj[attr] = pro + speed + 'px';
            }

            stops && (clearInterval(obj.timer), obj.timer = null, callback && callback.call(obj));

        }, times);
    }
}

export default tempo;

