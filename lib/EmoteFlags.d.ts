import EmoteExpansionOptions = require("EmoteExpansionOptions");
export = EmoteFlags;
declare class EmoteFlags {
    berryEmoteAnimationSpeedMap: {
        [speed: string]: string;
    };
    berryEmoteSpinAnimations: string[];
    constructor(flags: string, options: EmoteExpansionOptions);
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
    parseFlag(flag: string, options: EmoteExpansionOptions): void;
    parseFlags(flags: string[], options: EmoteExpansionOptions): void;
}
