export = EmoteHtml;

import EmoteMap = require('./EmoteMap');
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import EmoteEffectsModifier = require('./EmoteEffectsModifier');
import EmoteFlags = require('./EmoteFlags');
import IEmoteDataEntry = require('./IEmoteDataEntry');

var jsdom = require('jsdom');
var window = jsdom.jsdom().createWindow();
var $ = require('jquery')(window);

class EmoteHtml {
    private effectsModifier = new EmoteEffectsModifier();

    constructor(private emoteMap: EmoteMap, private emoteExpansionOptions: EmoteExpansionOptions) {
        
    }

    private isEmoteEligible(emote: IEmoteDataEntry): boolean {
        // TODO: replace with config check (nsfw, etc)
        return true;
    }

    private getBaseEmote(emoteDataEntry: IEmoteDataEntry): JQuery {
        var $emote = $('<span />')
            .addClass('berryemote')
            .attr('title', [emoteDataEntry.names, ' from ', emoteDataEntry.sr].join(''))
            .css('height', emoteDataEntry.height)
            .css('width', emoteDataEntry.width)
            .css('display', 'inline-block')
            .css('position', 'relative')
            .css('overflow', 'hidden');

        if (emoteDataEntry.nsfw) {
            $emote.addClass('nsfw');
        }

        this.addBackgroundImage($emote, emoteDataEntry);

        return $emote;
    }

    private addBackgroundImage($emote: JQuery, emoteDataEntry: IEmoteDataEntry) {
        var positionString = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        $emote.css('background-position', positionString);
        $emote.css('background-image', ['url(', emoteDataEntry['background-image'], ')'].join(''));
    }

    getEmoteHtml(emoteName: string, flags: string): string {
        var emoteData = this.emoteMap.findEmote(emoteName);
        if (typeof emoteData === "undefined") {
            return "Unable to find emote by name <b>" + emoteName + "</b>";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return '[skipped expansion of emote ' + emoteName + ']';
        }

        var $emote = this.getBaseEmote(emoteData);

        if (flags) {
            var emoteFlags = new EmoteFlags(flags, this.emoteExpansionOptions);
            var $modifiedEmote = this.effectsModifier.applyFlagsToEmote(emoteFlags, $emote);
            $emote = $modifiedEmote;
        }
        var html = $emote[0].outerHTML;
        return html;
    }
} 