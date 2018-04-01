"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteParser_1 = require("./EmoteParser");
var EmoteMap_1 = require("./EmoteMap");
var EmoteHtml_1 = require("./EmoteHtml");
var EmoteExpander = /** @class */ (function () {
    function EmoteExpander(emoteData, options) {
        this.debug = true;
        var emoteMap = new EmoteMap_1.default(emoteData);
        this.emoteHtml = new EmoteHtml_1.default(emoteMap, options);
        this.emoteParser = new EmoteParser_1.default();
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }
    EmoteExpander.prototype.expand = function (input) {
        var inputWithEmotesReplaced = input.replace(EmoteParser_1.default.emoteParseRegexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    };
    EmoteExpander.prototype.emoteReplacer = function (match) {
        var parsedObject = this.emoteParser.parse(match);
        var emoteHtml = this.emoteHtml.getEmoteHtmlForObject(parsedObject);
        return emoteHtml;
    };
    return EmoteExpander;
}());
exports.default = EmoteExpander;
//# sourceMappingURL=EmoteExpander.js.map