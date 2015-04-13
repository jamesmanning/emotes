import HtmlOutputData = require("HtmlOutputData");
import EmoteObject = require("EmoteObject");
import IEmoteDataEntry = require('IEmoteDataEntry');
export = EmoteEffectsModifier;
declare class EmoteEffectsModifier {
    applyFlagsFromObjectToHtmlOutputData(emoteData: IEmoteDataEntry, emoteObject: EmoteObject, emoteHtml: HtmlOutputData): void;
}
