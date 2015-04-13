export = EmoteExpander;
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import IEmoteDataEntry = require('./IEmoteDataEntry');
declare class EmoteExpander {
    private regexp;
    private boundEmoteReplacer;
    private debug;
    private emoteHtml;
    private emoteParser;
    constructor(emoteData: IEmoteDataEntry[], options: EmoteExpansionOptions);
    expand(input: string): string;
    private emoteReplacer(match, emoteName, optionalEffects, offset, stringArg);
}
