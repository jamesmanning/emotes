import HtmlOutputData from "./HtmlOutputData";
import EmoteMap from './EmoteMap';
import EmoteExpansionOptions from './EmoteExpansionOptions';
import EmoteObject from './EmoteObject';
export default class EmoteHtml {
    private emoteMap;
    private emoteExpansionOptions;
    private effectsModifier;
    constructor(emoteMap: EmoteMap, emoteExpansionOptions?: EmoteExpansionOptions);
    private isEmoteEligible(emote);
    private getBaseHtmlDataForEmote(emoteDataEntry);
    getEmoteHtmlMetadataForObject(emoteObject: EmoteObject): HtmlOutputData;
    getEmoteHtmlForObject(emoteObject: EmoteObject): string;
    private createMarkupForStyles(styles);
    private uppercasePattern;
    private convertCamelCaseToHyphenated(styleName);
    private serializeHtmlOutputData(htmlOutputData);
}
