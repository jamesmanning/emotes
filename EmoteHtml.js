
var EmoteEffectsModifier = require('./EmoteEffectsModifier');

var StringUtils = require('./StringUtils');

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

    EmoteHtml.prototype.getBaseHtmlDataForEmote = function (emoteDataEntry) {
        var ret = {
            titleForEmoteNode: StringUtils.format('{0} from {1}', emoteDataEntry.names.join(','), emoteDataEntry.sr),
            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: [],
            cssClassesForParentNode: [],
            cssStylesForParentNode: []
        };

        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }

        ret.cssStylesForEmoteNode.push({ propertyName: 'height', propertyValue: emoteDataEntry.height.toString() + 'px' }, { propertyName: 'width', propertyValue: emoteDataEntry.width.toString() + 'px' }, { propertyName: 'display', propertyValue: 'inline-block' }, { propertyName: 'position', propertyValue: 'relative' }, { propertyName: 'overflow', propertyValue: 'hidden' }, { propertyName: 'background-position', propertyValue: (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ') }, { propertyName: 'background-image', propertyValue: ['url(', emoteDataEntry['background-image'], ')'].join('') });

        return ret;
    };

    EmoteHtml.prototype.getEmoteHtmlForObject = function (emoteObject) {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return "Unable to find emote by name <b>" + emoteObject.emoteIdentifier + "</b>";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return '[skipped expansion of emote ' + emoteObject.emoteIdentifier + ']';
        }

        var htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);

        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        var htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    };

    EmoteHtml.prototype.serializeHtmlOutputData = function (htmlOutputData) {
        var html = StringUtils.format('<span class="{0}" title="{1}" style="{2}"></span>', htmlOutputData.cssClassesForEmoteNode.join(' '), htmlOutputData.titleForEmoteNode, htmlOutputData.cssStylesForEmoteNode.map(function (a) {
            return StringUtils.format('{0}: {1}', a.propertyName, a.propertyValue);
        }).join('; ') + ';');
        if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode.length > 0) {
            // wrap with the specified span tag
            html = StringUtils.format('<span class="{0}" style="{1}">{2}</span>', htmlOutputData.cssClassesForParentNode.join(' '), htmlOutputData.cssStylesForParentNode.map(function (a) {
                return StringUtils.format('{0}: {1}', a.propertyName, a.propertyValue);
            }).join('; ') + ';', html);
        }

        return html;
    };
    return EmoteHtml;
})();
module.exports = EmoteHtml;
//# sourceMappingURL=EmoteHtml.js.map
