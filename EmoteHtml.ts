export = EmoteHtml;

import EmoteMap = require('./EmoteMap');
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import EmoteEffectsModifier = require('./EmoteEffectsModifier');
import EmoteFlags = require('./EmoteFlags');
import EmoteObject = require('./EmoteObject');
import IEmoteDataEntry = require('./IEmoteDataEntry');

class EmoteHtml {
    private effectsModifier = new EmoteEffectsModifier();

    constructor(private emoteMap: EmoteMap, private emoteExpansionOptions: EmoteExpansionOptions) {
        
    }

    private isEmoteEligible(emote: IEmoteDataEntry): boolean {
        // TODO: replace with config check (nsfw, etc)
        return true;
    }

    private format(format: string, ...replacements: any[]) {
        var ret = format;
        for (var replacementIndex in replacements) {
            ret = ret.replace("{" + replacementIndex + "}", replacements[replacementIndex]);
        }
        return ret;
    }

    private getBaseEmote(emoteDataEntry: IEmoteDataEntry): string {
        var cssClasses = 'berryemote';
        if (emoteDataEntry.nsfw) {
            cssClasses += ' nsfw';
        }
        var title = this.format('{0} from {1}', emoteDataEntry.names.join(','), emoteDataEntry.sr);
        var positionString = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        var imageString = ['url(', emoteDataEntry['background-image'], ')'].join('');

        var html = this.format('<span class="{0}" title="{1}" style="height: {2}px; width: {3}px; display: inline-block; position: relative; overflow: hidden; background-position: {4}; background-image: {5};"></span>',
            cssClasses, title, emoteDataEntry.height, emoteDataEntry.width, positionString, imageString);

        return html;
    }

    getEmoteHtmlForObject(emoteObject: EmoteObject): string {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return "Unable to find emote by name <b>" + emoteObject.emoteIdentifier + "</b>";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return '[skipped expansion of emote ' + emoteObject.emoteIdentifier + ']';
        }

        var emoteHtml = this.getBaseEmote(emoteData);

        var modifiedEmoteHtml = this.effectsModifier.applyFlagsFromObjectToEmote(emoteData, emoteObject, emoteHtml);
        emoteHtml = modifiedEmoteHtml;
        return emoteHtml;
    }
} 