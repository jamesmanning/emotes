export = EmoteHtml;
import EmoteMap = require('./EmoteMap');
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import EmoteObject = require('./EmoteObject');
declare class EmoteHtml {
    private emoteMap;
    private emoteExpansionOptions;
    private effectsModifier;
    constructor(emoteMap: EmoteMap, emoteExpansionOptions: EmoteExpansionOptions);
    private isEmoteEligible(emote);
    private getBaseHtmlDataForEmote(emoteDataEntry);
    getEmoteHtmlForObject(emoteObject: EmoteObject): string;
    private serializeHtmlOutputData(htmlOutputData);
}
