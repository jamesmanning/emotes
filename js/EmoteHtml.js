"use strict";
var EmoteExpansionOptions_1 = require('./EmoteExpansionOptions');
var EmoteEffectsModifier_1 = require('./EmoteEffectsModifier');
var EmoteTextSerializer_1 = require('./EmoteTextSerializer');
var StringUtils_1 = require('./StringUtils');
var EmoteHtml = (function () {
    function EmoteHtml(emoteMap, emoteExpansionOptions) {
        if (emoteExpansionOptions === void 0) { emoteExpansionOptions = new EmoteExpansionOptions_1.default(); }
        this.emoteMap = emoteMap;
        this.emoteExpansionOptions = emoteExpansionOptions;
        this.effectsModifier = new EmoteEffectsModifier_1.default();
        this.textSerializer = new EmoteTextSerializer_1.default();
    }
    EmoteHtml.prototype.isEmoteEligible = function (emote) {
        // TODO: replace with config check (nsfw, etc)
        return true;
    };
    EmoteHtml.prototype.getBaseHtmlDataForEmote = function (emoteDataEntry) {
        var ret = {
            emoteData: emoteDataEntry,
            titleForEmoteNode: emoteDataEntry.names.join(',') + " from /r/" + emoteDataEntry.sr,
            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: {
                height: emoteDataEntry.height + "px",
                width: emoteDataEntry.width + "px",
                display: 'inline-block',
                position: 'relative',
                overflow: 'hidden',
                backgroundPosition: (emoteDataEntry['background-position'] || ['0px', '0px']).join(' '),
                backgroundImage: "url(" + emoteDataEntry['background-image'] + ")"
            },
            cssClassesForParentNode: [],
            cssStylesForParentNode: {}
        };
        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }
        return ret;
    };
    EmoteHtml.prototype.getEmoteHtmlMetadataForObject = function (emoteObject) {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return null;
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return null;
        }
        var htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);
        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);
        this.textSerializer.serializeFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);
        return htmlOutputData;
    };
    EmoteHtml.prototype.getEmoteHtmlForObject = function (emoteObject) {
        var htmlOutputData = this.getEmoteHtmlMetadataForObject(emoteObject);
        var htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    };
    EmoteHtml.prototype.serializeHtmlOutputData = function (htmlOutputData) {
        var styleValue = StringUtils_1.default.createMarkupForStyles(htmlOutputData.cssStylesForEmoteNode);
        var outerStyleValue = StringUtils_1.default.createMarkupForStyles(htmlOutputData.cssStylesForParentNode);
        var innerHtml = StringUtils_1.default.createInnerHtml(htmlOutputData) || '';
        var html = "<span class=\"" + htmlOutputData.cssClassesForEmoteNode.join(' ') + "\" title=\"" + htmlOutputData.titleForEmoteNode + "\" style=\"" + styleValue + "\">" + innerHtml + "</span>";
        if (htmlOutputData.cssClassesForParentNode.length > 0 || outerStyleValue) {
            // wrap with the specified span tag
            html = "<span class=\"" + htmlOutputData.cssClassesForParentNode.join(' ') + "\" style=\"" + outerStyleValue + "\">" + html + "</span>";
        }
        return html;
    };
    return EmoteHtml;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteHtml;
//# sourceMappingURL=EmoteHtml.js.map