var EmoteParser = (function () {
    function EmoteParser() {
        this.berryEmoteAnimationSpeedMap = {
            'slowest': '14s',
            'slower': '12s',
            'slow': '10s',
            'fast': '6s',
            'faster': '4s',
            'fastest': '2s'
        };
        this.berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];
        this.emoteParseRegexp = /\[([^\]]*)\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/;
    }
    EmoteParser.prototype.parse = function (input) {
        var result = this.emoteParseRegexp.exec(input);
        console.log('result', result);
        if (!result)
            return null;
        var emoteObject = {
            originalString: result.input,
            emoteIdentifier: result[2],
            speed: null,
            slide: null,
            vibrate: false,
            reverse: false,
            spin: null,
            rotateDegrees: 0,
            brody: false,
            xAxisTranspose: 0,
            zAxisTranspose: 0,
            firstLineText: null,
            secondLineText: null,
            altText: null
        };
        this.setTextOnObject(result[1], emoteObject);
        this.setFlagsOnObject(result[3], emoteObject);
        return emoteObject;
    };
    EmoteParser.prototype.setTextOnObject = function (textString, emoteObject) {
        //         const flagsArray = textString.split('-');
        // 
        //         for (let i = 0; i < flagsArray.length; ++i) {
        //             if (flagsArray[i]) {
        //                 this.setFlagOnObject(flagsArray[i], emoteObject);
        //             }
        //         }
    };
    EmoteParser.prototype.setFlagsOnObject = function (flagsString, emoteObject) {
        var flagsArray = flagsString.split('-');
        for (var i = 0; i < flagsArray.length; ++i) {
            if (flagsArray[i]) {
                this.setFlagOnObject(flagsArray[i], emoteObject);
            }
        }
    };
    EmoteParser.prototype.setFlagOnObject = function (flag, emoteObject) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            emoteObject.reverse = true;
        }
        else if (flag == 'slide' || flag == '!slide') {
            emoteObject.slide = flag;
        }
        else if (flag == 'brody') {
            emoteObject.brody = true;
        }
        else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            emoteObject.vibrate = true;
        }
        else if (this.berryEmoteAnimationSpeedMap[flag]) {
            emoteObject.speed = this.berryEmoteAnimationSpeedMap[flag];
        }
        else if (this.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            emoteObject.spin = flag;
        }
        else if (flag.match(/^\d+$/)) {
            emoteObject.rotateDegrees = parseInt(flag);
        }
        else if (flag.match(/^s\d/)) {
            emoteObject.speed = flag;
        }
        else if (flag.match(/^x\d+$/)) {
            var shiftPosx = +flag.replace('x', '');
            if (shiftPosx <= 150) {
                emoteObject.xAxisTranspose = shiftPosx;
            }
        }
        else if (flag.match(/^!x\d+$/)) {
            var shiftNegx = -1 * +flag.replace('!x', '');
            if (shiftNegx >= -150) {
                emoteObject.xAxisTranspose = shiftNegx;
            }
        }
        else if (flag.match(/^z\d+$/)) {
            var zindex = +flag.replace('z', '');
            if (zindex <= 10) {
                emoteObject.zAxisTranspose = zindex;
            }
        }
        else {
            console.log('failed to parse flag', flag);
        }
    };
    return EmoteParser;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteParser;
//# sourceMappingURL=EmoteParser.js.map