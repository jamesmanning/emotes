import EmoteObject from './EmoteObject';
export default class EmoteParser {
    berryEmoteAnimationSpeedMap: {
        [speed: string]: string;
    };
    berryEmoteSpinAnimations: string[];
    private emoteParseRegexp;
    parse(input: string): EmoteObject;
    setFlagsOnObject(flagsString: string, emoteObject: EmoteObject): void;
    setFlagOnObject(flag: string, emoteObject: EmoteObject): void;
}
