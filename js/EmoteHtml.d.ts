import EmoteMap from './EmoteMap';
import EmoteExpansionOptions from './EmoteExpansionOptions';
import EmoteObject from './EmoteObject';
export default class EmoteHtml {
    private emoteMap;
    private emoteExpansionOptions;
    private effectsModifier;
    constructor(emoteMap: EmoteMap, emoteExpansionOptions: EmoteExpansionOptions);
    private isEmoteEligible(emote);
    private getBaseHtmlDataForEmote(emoteDataEntry);
    getEmoteHtmlForObject(emoteObject: EmoteObject): string;
    private serializeHtmlOutputData(htmlOutputData);
}
