"use strict";
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
    }
    EmoteParser.prototype.parse = function (input) {
        var emoteObject = {
            originalString: input,
            emoteIdentifier: null,
            flagsString: null,
            speed: null,
            slide: null,
            vibrate: false,
            reverse: false,
            hueRotate: false,
            invertColors: false,
            spin: null,
            rotateDegrees: 0,
            brody: false,
            xAxisTranspose: 0,
            zAxisTranspose: 0,
            firstLineText: null,
            secondLineText: null,
            altText: null
        };
        var result = EmoteParser.emoteParseRegexp.exec(input);
        if (result) {
            emoteObject.emoteIdentifier = result[2];
            if (result[3]) {
                emoteObject.flagsString = result[3];
            }
            this.setTextOnObject(result[1], emoteObject);
            this.setFlagsOnObject(result[3], emoteObject);
        }
        return emoteObject;
    };
    EmoteParser.prototype.setTextOnObject = function (textString, emoteObject) {
        var doubleStarSplit = textString.split('**');
        if (doubleStarSplit.length == 3) {
            emoteObject.secondLineText = doubleStarSplit[1];
            textString = doubleStarSplit[0] + doubleStarSplit[2];
        }
        var singleStarSplit = textString.split('*');
        if (singleStarSplit.length == 3) {
            emoteObject.firstLineText = singleStarSplit[1];
            textString = singleStarSplit[0] + singleStarSplit[2];
        }
        // trim just to make sure we're not keeping around just whitespace
        textString = textString.trim();
        if (textString.length > 0) {
            emoteObject.altText = textString;
        }
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
        else if (flag == 'i') {
            emoteObject.hueRotate = true;
        }
        else if (flag == 'invert') {
            emoteObject.invertColors = true;
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
    EmoteParser.emoteParseRegexp = /\[([^\]]*)\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/;
    return EmoteParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteParser;
//# sourceMappingURL=EmoteParser.js.map