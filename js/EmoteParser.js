"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteFlags_1 = require("./EmoteFlags");
var EmoteParser = /** @class */ (function () {
    function EmoteParser() {
    }
    EmoteParser.prototype.parse = function (input) {
        var emoteObject = {
            originalString: input,
            emoteIdentifier: null,
            flagsString: null,
            speed: null,
            slide: false,
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
    EmoteParser.prototype.parseMultipleEmotes = function (input) {
        var _this = this;
        var individualEmoteStrings = input.match(EmoteParser.multipleMatchRegexp);
        if (!individualEmoteStrings)
            return [];
        var emoteInfos = individualEmoteStrings
            .map(function (emoteString) { return _this.parse(emoteString); })
            .filter(function (emoteObject) { return emoteObject != null; });
        return emoteInfos;
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
            emoteObject.slide = true;
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
            // now the mapping structures to check for those strings
        }
        else if (EmoteFlags_1.default.berryEmoteAnimationDescriptionToSpeedMap[flag]) {
            emoteObject.speed = flag; // convert to the time value in EmoteHtml instead
        }
        else if (EmoteFlags_1.default.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            emoteObject.spin = flag;
            // finally the regex matches
        }
        else if (flag.match(/^\d+$/)) {
            emoteObject.rotateDegrees = parseInt(flag);
        }
        else if (flag.match(/^s\d+/)) {
            emoteObject.speed = flag.substring(1) + 's';
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
    EmoteParser.multipleMatchRegexp = new RegExp(EmoteParser.emoteParseRegexp.source, 'g');
    return EmoteParser;
}());
exports.default = EmoteParser;
//# sourceMappingURL=EmoteParser.js.map