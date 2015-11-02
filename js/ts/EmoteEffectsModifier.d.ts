import HtmlOutputData from "./HtmlOutputData";
import EmoteObject from "./EmoteObject";
import IEmoteDataEntry from './IEmoteDataEntry';
export = EmoteEffectsModifier;
declare class EmoteEffectsModifier {
    applyFlagsFromObjectToHtmlOutputData(emoteData: IEmoteDataEntry, emoteObject: EmoteObject, emoteHtml: HtmlOutputData): void;
}
