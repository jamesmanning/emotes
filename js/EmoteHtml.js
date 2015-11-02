var EmoteEffectsModifier_1 = require('./EmoteEffectsModifier');
var EmoteHtml = (function () {
    function EmoteHtml(emoteMap, emoteExpansionOptions) {
        this.emoteMap = emoteMap;
        this.emoteExpansionOptions = emoteExpansionOptions;
        this.effectsModifier = new EmoteEffectsModifier_1.default();
    }
    EmoteHtml.prototype.isEmoteEligible = function (emote) {
        // TODO: replace with config check (nsfw, etc)
        return true;
    };
    EmoteHtml.prototype.getBaseHtmlDataForEmote = function (emoteDataEntry) {
        var ret = {
            titleForEmoteNode: emoteDataEntry.names.join(',') + " from " + emoteDataEntry.sr,
            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: [],
            cssClassesForParentNode: [],
            cssStylesForParentNode: []
        };
        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }
        ret.cssStylesForEmoteNode.push({ propertyName: 'height', propertyValue: emoteDataEntry.height + "px" }, { propertyName: 'width', propertyValue: emoteDataEntry.width + "px" }, { propertyName: 'display', propertyValue: 'inline-block' }, { propertyName: 'position', propertyValue: 'relative' }, { propertyName: 'overflow', propertyValue: 'hidden' }, { propertyName: 'background-position', propertyValue: (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ') }, { propertyName: 'background-image', propertyValue: "url(" + emoteDataEntry['background-image'] + ")" });
        return ret;
    };
    EmoteHtml.prototype.getEmoteHtmlForObject = function (emoteObject) {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return "[Unable to find emote by name <b>" + emoteObject.emoteIdentifier + "</b>]";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return "[skipped expansion of emote " + emoteObject.emoteIdentifier + "]";
        }
        var htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);
        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);
        var htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    };
    EmoteHtml.prototype.serializeHtmlOutputData = function (htmlOutputData) {
        var styleValue = htmlOutputData.cssStylesForEmoteNode
            .map(function (a) { return (a.propertyName + ": " + a.propertyValue); })
            .join('; ') + ';';
        var html = "<span class=\"" + htmlOutputData.cssClassesForEmoteNode.join(' ') + "\" title=\"" + htmlOutputData.titleForEmoteNode + "\" style=\"" + styleValue + "\"></span>";
        if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode.length > 0) {
            // wrap with the specified span tag
            var outerStyleValue = htmlOutputData.cssStylesForParentNode
                .map(function (a) { return (a.propertyName + ": " + a.propertyValue); })
                .join('; ') + ';';
            html = "<span class=\"" + htmlOutputData.cssClassesForParentNode.join(' ') + "\" style=\"" + outerStyleValue + "\">" + html + "</span>";
        }
        return html;
    };
    return EmoteHtml;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteHtml;
//# sourceMappingURL=EmoteHtml.js.map