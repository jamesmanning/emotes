import EmoteExpansionOptions from './EmoteExpansionOptions';
import IEmoteDataEntry from './IEmoteDataEntry';
export default class EmoteExpander {
    private boundEmoteReplacer;
    private debug;
    private emoteHtml;
    private emoteParser;
    constructor(emoteData: IEmoteDataEntry[], options: EmoteExpansionOptions);
    expand(input: string): string;
    private emoteReplacer;
}
