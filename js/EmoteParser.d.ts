import EmoteObject from './EmoteObject';
export default class EmoteParser {
    static emoteParseRegexp: RegExp;
    parse(input: string): EmoteObject;
    setTextOnObject(textString: string, emoteObject: EmoteObject): void;
    setFlagsOnObject(flagsString: string, emoteObject: EmoteObject): void;
    setFlagOnObject(flag: string, emoteObject: EmoteObject): void;
}
