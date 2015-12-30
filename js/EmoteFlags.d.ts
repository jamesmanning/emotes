import EmoteExpansionOptions from "./EmoteExpansionOptions";
export default class EmoteFlags {
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
    xAxisTranspose: number;
    zAxisTranspose: number;
    parseFlag(flag: string, options: EmoteExpansionOptions): void;
    parseFlags(flags: string[], options: EmoteExpansionOptions): void;
}
