"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils_1 = require("./StringUtils");
var EmoteTextSerializer = /** @class */ (function () {
    function EmoteTextSerializer() {
    }
    EmoteTextSerializer.prototype.serializeFromObjectToHtmlOutputData = function (emoteData, emoteObject, htmlOutputData) {
        if (emoteObject.firstLineText) {
            htmlOutputData.emText = emoteObject.firstLineText;
            htmlOutputData.emStyles = this.getStylesFromEntry("em-", emoteData);
        }
        if (emoteObject.secondLineText) {
            htmlOutputData.strongText = emoteObject.secondLineText;
            htmlOutputData.strongStyles = this.getStylesFromEntry("strong-", emoteData);
        }
        if (emoteObject.altText) {
            htmlOutputData.altText = emoteObject.altText;
        }
        var textStyles = this.getStylesFromEntry("text-", emoteData);
        if (textStyles) {
            // since these need to apply to all text, they go on the emote node itself
            for (var property in textStyles) {
                htmlOutputData.cssStylesForEmoteNode[property] = textStyles[property];
            }
        }
    };
    EmoteTextSerializer.prototype.getStylesFromEntry = function (prefix, emoteDataEntry) {
        var ret = {};
        for (var property in emoteDataEntry) {
            if (property.substr(0, prefix.length) == prefix) {
                var strippedPropertyName = property.slice(prefix.length);
                var convertedProperyName = StringUtils_1.default.convertHyphenatedToCamelCase(strippedPropertyName);
                ret[convertedProperyName] = emoteDataEntry[property];
            }
        }
        return ret;
    };
    return EmoteTextSerializer;
}());
exports.default = EmoteTextSerializer;
//# sourceMappingURL=EmoteTextSerializer.js.map