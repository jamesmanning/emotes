
var EmoteMap = require('./EmoteMap');
var EmoteHtml = require('./EmoteHtml');

var EmoteExpander = (function () {
    function EmoteExpander(emoteData, options) {
        this.regexp = /\[\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/gi;
        this.debug = true;
        var emoteMap = new EmoteMap(emoteData);
        this.emoteHtml = new EmoteHtml(emoteMap, options);
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }
    EmoteExpander.prototype.expand = function (input) {
        var inputWithEmotesReplaced = input.replace(this.regexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    };

    EmoteExpander.prototype.emoteReplacer = function (match, emoteName, optionalEffects, offset, stringArg) {
        var emoteHtml = this.emoteHtml.getEmoteHtml(emoteName, optionalEffects);
        return emoteHtml;
    };
    return EmoteExpander;
})();
module.exports = EmoteExpander;
//# sourceMappingURL=EmoteExpander.js.map
