import HtmlOutputData from "./HtmlOutputData";
import EmoteMap from './EmoteMap';
import EmoteExpansionOptions from './EmoteExpansionOptions';
import EmoteObject from './EmoteObject';
export default class EmoteHtml {
    private emoteMap;
    private emoteExpansionOptions;
    private effectsModifier;
    private textSerializer;
    constructor(emoteMap: EmoteMap, emoteExpansionOptions?: EmoteExpansionOptions);
    private isEmoteEligible(emote);
    private getBaseHtmlDataForEmote(emoteDataEntry);
    getEmoteHtmlMetadataForObject(emoteObject: EmoteObject): HtmlOutputData;
    getEmoteHtmlForObject(emoteObject: EmoteObject): string;
    private serializeHtmlOutputData(htmlOutputData);
}
