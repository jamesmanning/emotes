export = EmoteParser;

import EmoteObject = require('./EmoteObject');

class EmoteParser {
    berryEmoteAnimationSpeedMap: { [speed: string]: string; } = {
        'slowest': '14s',
        'slower': '12s',
        'slow': '10s',
        'fast': '6s',
        'faster': '4s',
        'fastest': '2s'
    };
    berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];

    private emoteParseRegexp = /\[\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/;

    parse(input: string): EmoteObject {
        const result = this.emoteParseRegexp.exec(input);
        if (!result) return null;

        const emoteObject: EmoteObject = {
            originalString: result.input,
            emoteIdentifier: result[1],

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
            secondLineText: null
        };
        this.setFlagsOnObject(result[2], emoteObject);

        return emoteObject;
    }

    setFlagsOnObject(flagsString: string, emoteObject: EmoteObject) {
        const flagsArray = flagsString.split('-');

        for (let i = 0; i < flagsArray.length; ++i) {
            if (flagsArray[i]) {
                this.setFlagOnObject(flagsArray[i], emoteObject);
            }
        }
    }

    setFlagOnObject(flag: string, emoteObject: EmoteObject) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            emoteObject.reverse = true;
        } else if (flag == 'slide' || flag == '!slide') {
            emoteObject.slide = flag;
        } else if (flag == 'brody') {
            emoteObject.brody = true;
        } else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            emoteObject.vibrate = true;

            // now the mapping structures to check for those strings
        } else if (this.berryEmoteAnimationSpeedMap[flag]) {
            emoteObject.speed = this.berryEmoteAnimationSpeedMap[flag];
        } else if (this.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            emoteObject.spin = flag;

            // finally the regex matches
        } else if (flag.match(/^\d+$/)) {
            emoteObject.rotateDegrees = parseInt(flag);
        } else if (flag.match(/^s\d/)) {
            emoteObject.speed = flag;
        } else if (flag.match(/^x\d+$/)) {
            const shiftPosx = +flag.replace('x', '');
            if (shiftPosx <= 150) {
                emoteObject.xAxisTranspose = shiftPosx;
            }
        } else if (flag.match(/^!x\d+$/)) {
            const shiftNegx = -1 * +flag.replace('!x', '');
            if (shiftNegx >= -150) {
                emoteObject.xAxisTranspose = shiftNegx;
            }
        } else if (flag.match(/^z\d+$/)) {
            const zindex = +flag.replace('z', '');
            if (zindex <= 10) {
                emoteObject.zAxisTranspose = zindex;
            }
        } else {
            console.log('failed to parse flag', flag);
        }
    }
}