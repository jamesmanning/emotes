"use strict";
var EmoteTextSerializer = (function () {
    function EmoteTextSerializer() {
    }
    EmoteTextSerializer.prototype.serialize = function (emoteObject, emoteDataEntry) {
        var html = '';
        if (emoteObject.firstLineText) {
            var emStyles = this.getStylesFromEntry('em-', emoteDataEntry);
            html += this.createHtmlString('em', emoteObject.firstLineText, emStyles);
        }
        if (emoteObject.secondLineText) {
            var strongStyles = this.getStylesFromEntry('strong-', emoteDataEntry);
            html += this.createHtmlString('strong', emoteObject.secondLineText, strongStyles);
        }
        if (emoteObject.altText) {
            var textStyles = this.getStylesFromEntry('text-', emoteDataEntry);
            html += this.createHtmlString('span', emoteObject.altText, textStyles);
        }
        return html;
    };
    EmoteTextSerializer.prototype.createMarkupForStyles = function (styles) {
        var serialized = '';
        for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
                continue;
            }
            var styleValue = styles[styleName];
            if (styleValue != null) {
                serialized += styleName + ": " + styleValue + ";";
            }
        }
        return serialized || null;
    };
    EmoteTextSerializer.prototype.createHtmlString = function (tag, text, styles) {
        var styleString = this.createMarkupForStyles(styles);
        return "<" + tag + " style=\"" + styleString + "\">" + text + "</" + tag + ">";
    };
    EmoteTextSerializer.prototype.getStylesFromEntry = function (prefix, emoteDataEntry) {
        var ret = {};
        for (var property in emoteDataEntry) {
            if (!emoteDataEntry.hasOwnProperty(property)) {
                continue;
            }
            if (property.startsWith(prefix)) {
                var strippedPropertyName = property.slice(prefix.length);
                ret[strippedPropertyName] = emoteDataEntry[property];
            }
        }
        return ret;
    };
    return EmoteTextSerializer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteTextSerializer;
//# sourceMappingURL=EmoteTextSerializer.js.map