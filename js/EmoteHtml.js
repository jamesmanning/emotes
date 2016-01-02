"use strict";
var EmoteExpansionOptions_1 = require('./EmoteExpansionOptions');
var EmoteEffectsModifier_1 = require('./EmoteEffectsModifier');
var EmoteHtml = (function () {
    function EmoteHtml(emoteMap, emoteExpansionOptions) {
        if (emoteExpansionOptions === void 0) { emoteExpansionOptions = new EmoteExpansionOptions_1.default(); }
        this.emoteMap = emoteMap;
        this.emoteExpansionOptions = emoteExpansionOptions;
        this.effectsModifier = new EmoteEffectsModifier_1.default();
        // don't need to support the -ms- prefix,  so only need hyphenate
        // see https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenateStyleName.js
        // and https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenate.js
        this.uppercasePattern = /([A-Z])/g;
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
            cssStylesForEmoteNode: {},
            cssClassesForParentNode: [],
            cssStylesForParentNode: {}
        };
        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }
        ret.cssStylesForEmoteNode.height = emoteDataEntry.height + "px";
        ret.cssStylesForEmoteNode.width = emoteDataEntry.width + "px";
        ret.cssStylesForEmoteNode.display = 'inline-block';
        ret.cssStylesForEmoteNode.position = 'relative';
        ret.cssStylesForEmoteNode.overflow = 'hidden';
        ret.cssStylesForEmoteNode.backgroundPosition = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        ret.cssStylesForEmoteNode.backgroundImage = "url(" + emoteDataEntry['background-image'] + ")";
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
        return htmlOutputData;
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
    // simplified version of what react does to generate the style attribute from an object
    // https://github.com/facebook/react/blob/3b96650e39ddda5ba49245713ef16dbc52d25e9e/src/renderers/dom/shared/CSSPropertyOperations.js#L130-L147
    EmoteHtml.prototype.createMarkupForStyles = function (styles) {
        var serialized = '';
        for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
                continue;
            }
            var styleValue = styles[styleName];
            if (styleValue != null) {
                serialized += this.convertCamelCaseToHyphenated(styleName) + ": " + styleValue + ";";
            }
        }
        return serialized || null;
    };
    EmoteHtml.prototype.convertCamelCaseToHyphenated = function (styleName) {
        return styleName.replace(this.uppercasePattern, '-$1').toLowerCase();
    };
    EmoteHtml.prototype.serializeHtmlOutputData = function (htmlOutputData) {
        var styleValue = this.createMarkupForStyles(htmlOutputData.cssStylesForEmoteNode);
        var outerStyleValue = this.createMarkupForStyles(htmlOutputData.cssStylesForParentNode);
        var html = "<span class=\"" + htmlOutputData.cssClassesForEmoteNode.join(' ') + "\" title=\"" + htmlOutputData.titleForEmoteNode + "\" style=\"" + styleValue + "\"></span>";
        if (htmlOutputData.cssClassesForParentNode.length > 0 || outerStyleValue) {
            // wrap with the specified span tag
            html = "<span class=\"" + htmlOutputData.cssClassesForParentNode.join(' ') + "\" style=\"" + outerStyleValue + "\">" + html + "</span>";
        }
        return html;
    };
    return EmoteHtml;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteHtml;
//# sourceMappingURL=EmoteHtml.js.map