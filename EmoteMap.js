
var _ = require('underscore');

var EmoteMap = (function () {
    function EmoteMap(emoteData) {
        this.emoteMap = this.buildEmoteMap(emoteData);
    }
    EmoteMap.prototype.findEmote = function (emoteName) {
        return this.emoteMap[emoteName];
    };

    EmoteMap.prototype.buildEmoteMap = function (emoteData) {
        var map = {};
        _.each(emoteData, function (emote) {
            _.each(emote.names, function (name) {
                map[name] = emote;
            });
        });
        return map;
    };
    return EmoteMap;
})();
module.exports = EmoteMap;
//# sourceMappingURL=EmoteMap.js.map
