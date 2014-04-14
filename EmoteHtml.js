
var EmoteEffectsModifier = require('./EmoteEffectsModifier');
var EmoteFlags = require('./EmoteFlags');

var jsdom = require('jsdom');
var window = jsdom.jsdom().createWindow();
var $ = require('jquery')(window);

var EmoteHtml = (function () {
    function EmoteHtml(emoteMap, emoteExpansionOptions) {
        this.emoteMap = emoteMap;
        this.emoteExpansionOptions = emoteExpansionOptions;
        this.effectsModifier = new EmoteEffectsModifier();
    }
    EmoteHtml.prototype.isEmoteEligible = function (emote) {
        // TODO: replace with config check (nsfw, etc)
        return true;
    };

    EmoteHtml.prototype.getBaseEmote = function (emoteDataEntry) {
        var $emote = $('<span />').addClass('berryemote').attr('title', [emoteDataEntry.names, ' from ', emoteDataEntry.sr].join('')).css('height', emoteDataEntry.height).css('width', emoteDataEntry.width).css('display', 'inline-block').css('position', 'relative').css('overflow', 'hidden');

        if (emoteDataEntry.nsfw) {
            $emote.addClass('nsfw');
        }

        this.addBackgroundImage($emote, emoteDataEntry);

        return $emote;
    };

    EmoteHtml.prototype.addBackgroundImage = function ($emote, emoteDataEntry) {
        var positionString = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        $emote.css('background-position', positionString);
        $emote.css('background-image', ['url(', emoteDataEntry['background-image'], ')'].join(''));
    };

    EmoteHtml.prototype.getEmoteHtml = function (emoteName, flags) {
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
    };

    EmoteHtml.prototype.getEmoteHtmlForObject = function (emoteObject) {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return "Unable to find emote by name <b>" + emoteObject.emoteIdentifier + "</b>";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return '[skipped expansion of emote ' + emoteObject.emoteIdentifier + ']';
        }

        var $emote = this.getBaseEmote(emoteData);

        var $modifiedEmote = this.effectsModifier.applyFlagsFromObjectToEmote(emoteObject, $emote);
        $emote = $modifiedEmote;
        var html = $emote[0].outerHTML;
        return html;
    };
    return EmoteHtml;
})();
module.exports = EmoteHtml;
//# sourceMappingURL=EmoteHtml.js.map
