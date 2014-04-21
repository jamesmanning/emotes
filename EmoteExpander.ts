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
        var emoteMap = new EmoteMap(emoteData);
        this.emoteHtml = new EmoteHtml(emoteMap, options);
        this.emoteParser = new EmoteParser();
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }

    expand(input: string): string {
        var inputWithEmotesReplaced = input.replace(this.regexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    }

    private emoteReplacer(match: string, emoteName: string, optionalEffects: string, offset: number, stringArg: string): string {
        var parsedObject = this.emoteParser.parse(match);
        var emoteHtml = this.emoteHtml.getEmoteHtmlForObject(parsedObject);
        return emoteHtml;
    }
}

