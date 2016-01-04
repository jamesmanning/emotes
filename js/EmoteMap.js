"use strict";
var EmoteMap = (function () {
    function EmoteMap(emoteData) {
        this.emoteMap = this.buildEmoteMap(emoteData);
    }
    EmoteMap.prototype.findEmote = function (emoteName) {
        return this.emoteMap[emoteName];
    };
    EmoteMap.prototype.buildEmoteMap = function (emoteData) {
        var map = {};
        emoteData.forEach(function (emote) {
            emote.names.forEach(function (name) {
                map[name] = emote;
            });
        });
        return map;
    };
    return EmoteMap;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteMap;
//# sourceMappingURL=EmoteMap.js.map