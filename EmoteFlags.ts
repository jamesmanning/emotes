import EmoteExpansionOptions = require("EmoteExpansionOptions");

export = EmoteFlags;

class EmoteFlags {
    berryEmoteAnimationSpeedMap = {
        'slowest': '14s',
        'slower': '12s',
        'slow': '10s',
        'fast': '6s',
        'faster': '4s',
        'fastest': '2s'
    };
    berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];

    constructor(flags: string, options: EmoteExpansionOptions) {
        var flagsArray = flags.split('-');
        this.parseFlags(flagsArray, options);
    }

    speed: string;
    slide: string;
    vibrate: boolean;
    reverse: boolean;
    spin: string;
    rotateDegrees: number;
    brody: boolean;
    needsWrapper: boolean;
    xAxisTranspose: number;
    zAxisTranspose: number;

    parseFlag(flag: string, options: EmoteExpansionOptions) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            if (options.berryEnableReverse) this.reverse = true;
        } else if (flag == 'slide' || flag == '!slide') {
            if (options.berryEnableSlide) this.slide = flag;
        } else if (flag == 'brody') {
            if (options.berryEnableBrody) this.brody = true;
        } else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            if (options.berryEnableVibrate) this.vibrate = true;

            // now the mapping structures to check for those strings
        } else if (this.berryEmoteAnimationSpeedMap[flag]) {
            this.speed = this.berryEmoteAnimationSpeedMap[flag];
        } else if (this.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            if (options.berryEnableSpin) this.spin = flag;

            // finally the regex matches
        } else if (flag.match(/^\d+$/)) {
            if (options.berryEnableRotate) this.rotateDegrees = parseInt(flag);
        } else if (flag.match(/^s\d/)) {
            this.speed = flag;
        } else if (flag.match(/^x\d+$/)) {
            if (options.berryEnableTranspose) {
                var shiftPosx = +flag.replace('x', '');
                if (shiftPosx <= 150) {
                    this.xAxisTranspose = shiftPosx;
                }
            }
        } else if (flag.match(/^!x\d+$/)) {
            if (options.berryEnableTranspose) {
                var shiftNegx = +flag.replace('!x', '');
                shiftNegx = shiftNegx * -1;
                if (shiftNegx >= -150) {
                    this.xAxisTranspose = shiftNegx;
                }
            }
        } else if (flag.match(/^z\d+$/)) {
            if (options.berryEnableTranspose) {
                var zindex = +flag.replace('z', '');
                if (zindex <= 10) {
                    this.zAxisTranspose = zindex;
                }
            }
        } else {
            console.log('failed to parse flag', flag);
        }
    }

    parseFlags(flags: string[], options: EmoteExpansionOptions) {
        var i: number;
        for (i = 0; i < flags.length; ++i) {
            this.parseFlag(flags[i], options);
        }
    }
}
