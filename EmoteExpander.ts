export = EmoteExpander;

import EmoteParser = require("./EmoteParser");
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import EmoteMap = require('./EmoteMap');
import EmoteHtml = require('./EmoteHtml');
import IEmoteDataEntry = require('./IEmoteDataEntry');

class EmoteExpander {
    private regexp = /\[\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/gi;

    private boundEmoteReplacer: (substring: string, ...args: any[]) => string;
    private debug = true;
    private emoteHtml: EmoteHtml;
    private emoteParser: EmoteParser;

    constructor(emoteData: IEmoteDataEntry[], options: EmoteExpansionOptions) {
        let emoteMap = new EmoteMap(emoteData);
        this.emoteHtml = new EmoteHtml(emoteMap, options);
        this.emoteParser = new EmoteParser();
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }

    expand(input: string): string {
        let inputWithEmotesReplaced = input.replace(this.regexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    }

    private emoteReplacer(match: string, emoteName: string, optionalEffects: string, offset: number, stringArg: string): string {
        let parsedObject = this.emoteParser.parse(match);
        let emoteHtml = this.emoteHtml.getEmoteHtmlForObject(parsedObject);
        return emoteHtml;
    }
}

