
var EmoteEffectsModifier = require('./EmoteEffectsModifier');

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

    EmoteHtml.prototype.format = function (format) {
        var replacements = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            replacements[_i] = arguments[_i + 1];
        }
        var ret = format;
        for (var replacementIndex in replacements) {
            ret = ret.replace("{" + replacementIndex + "}", replacements[replacementIndex]);
        }
        return ret;
    };

    EmoteHtml.prototype.getBaseEmote = function (emoteDataEntry) {
        var cssClasses = 'berryemote';
        if (emoteDataEntry.nsfw) {
            cssClasses += ' nsfw';
        }
        var title = this.format('{0} from {1}', emoteDataEntry.names.join(','), emoteDataEntry.sr);
        var positionString = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        var imageString = ['url(', emoteDataEntry['background-image'], ')'].join('');

        var html = this.format('<span class="{0}" title="{1}" style="height: {2}px; width: {3}px; display: inline-block; position: relative; overflow: hidden; background-position: {4}; background-image: {5};"></span>', cssClasses, title, emoteDataEntry.height, emoteDataEntry.width, positionString, imageString);

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

        var emoteHtml = this.getBaseEmote(emoteData);

        var modifiedEmoteHtml = this.effectsModifier.applyFlagsFromObjectToEmote(emoteData, emoteObject, emoteHtml);
        emoteHtml = modifiedEmoteHtml;
        return emoteHtml;
    };
    return EmoteHtml;
})();
module.exports = EmoteHtml;
//# sourceMappingURL=EmoteHtml.js.map
