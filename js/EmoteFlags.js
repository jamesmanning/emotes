var EmoteFlags = (function () {
    function EmoteFlags(flags, options) {
        this.berryEmoteAnimationSpeedMap = {
            'slowest': '14s',
            'slower': '12s',
            'slow': '10s',
            'fast': '6s',
            'faster': '4s',
            'fastest': '2s'
        };
        this.berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];
        var flagsArray = flags.split('-');
        this.parseFlags(flagsArray, options);
    }
    EmoteFlags.prototype.parseFlag = function (flag, options) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            if (options.berryEnableReverse)
                this.reverse = true;
        }
        else if (flag == 'slide' || flag == '!slide') {
            if (options.berryEnableSlide)
                this.slide = flag;
        }
        else if (flag == 'brody') {
            if (options.berryEnableBrody)
                this.brody = true;
        }
        else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            if (options.berryEnableVibrate)
                this.vibrate = true;
        }
        else if (this.berryEmoteAnimationSpeedMap[flag]) {
            this.speed = this.berryEmoteAnimationSpeedMap[flag];
        }
        else if (this.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            if (options.berryEnableSpin)
                this.spin = flag;
        }
        else if (flag.match(/^\d+$/)) {
            if (options.berryEnableRotate)
                this.rotateDegrees = parseInt(flag);
        }
        else if (flag.match(/^s\d/)) {
            this.speed = flag;
        }
        else if (flag.match(/^x\d+$/)) {
            if (options.berryEnableTranspose) {
                var shiftPosx = +flag.replace('x', '');
                if (shiftPosx <= 150) {
                    this.xAxisTranspose = shiftPosx;
                }
            }
        }
        else if (flag.match(/^!x\d+$/)) {
            if (options.berryEnableTranspose) {
                var shiftNegx = -1 * +flag.replace('!x', '');
                if (shiftNegx >= -150) {
                    this.xAxisTranspose = shiftNegx;
                }
            }
        }
        else if (flag.match(/^z\d+$/)) {
            if (options.berryEnableTranspose) {
                var zindex = +flag.replace('z', '');
                if (zindex <= 10) {
                    this.zAxisTranspose = zindex;
                }
            }
        }
        else {
            console.log('failed to parse flag', flag);
        }
    };
    EmoteFlags.prototype.parseFlags = function (flags, options) {
        for (var i = 0; i < flags.length; ++i) {
            this.parseFlag(flags[i], options);
        }
    };
    return EmoteFlags;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteFlags;
//# sourceMappingURL=EmoteFlags.js.map