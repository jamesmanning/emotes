"use strict";
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.convertCamelCaseToHyphenated = function (styleName) {
        return styleName.replace(this.uppercasePattern, '-$1').toLowerCase();
    };
    StringUtils.convertHyphenatedToCamelCase = function (styleName) {
        return styleName.replace(this.hyphenPattern, function (_, character) {
            return character.toUpperCase();
        });
    };
    // simplified version of what react does to generate the style attribute from an object
    // https://github.com/facebook/react/blob/3b96650e39ddda5ba49245713ef16dbc52d25e9e/src/renderers/dom/shared/CSSPropertyOperations.js#L130-L147
    StringUtils.createMarkupForStyles = function (styles) {
        var serialized = '';
        for (var styleName in styles) {
            // if (!styles.hasOwnProperty(styleName)) {
            //   continue;
            // }
            var styleValue = styles[styleName];
            if (styleValue != null) {
                var hyphenatedStyleName = StringUtils.convertCamelCaseToHyphenated(styleName);
                serialized += hyphenatedStyleName + ": " + styleValue + ";";
            }
        }
        return serialized || null;
    };
    StringUtils.createHtmlString = function (tag, text, styles) {
        if (!text) {
            return '';
        }
        var styleString = this.createMarkupForStyles(styles);
        return "<" + tag + " style=\"" + styleString + "\">" + text + "</" + tag + ">";
    };
    StringUtils.createInnerHtml = function (htmlOutputData) {
        var ret = '';
        ret += this.createHtmlString('em', htmlOutputData.emText, htmlOutputData.emStyles) || '';
        ret += this.createHtmlString('strong', htmlOutputData.strongText, htmlOutputData.strongStyles) || '';
        ret += htmlOutputData.altText || '';
        return ret;
    };
    // don't need to support the -ms- prefix,  so only need hyphenate
    // see https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenateStyleName.js
    // and https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenate.js
    StringUtils.uppercasePattern = /([A-Z])/g;
    // see https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/camelizeStyleName.js
    // and https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/camelize.js
    StringUtils.hyphenPattern = /-(.)/g;
    return StringUtils;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringUtils;
//# sourceMappingURL=StringUtils.js.map