"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteMap = /** @class */ (function () {
    function EmoteMap(emoteData) {
        this.loadData(emoteData);
    }
    EmoteMap.prototype.loadData = function (emoteData) {
        this.emoteCount = emoteData.length;
        this.emoteMap = this.buildEmoteMap(emoteData);
    };
    EmoteMap.prototype.findEmote = function (emoteName) {
        return this.emoteMap[emoteName];
    };
    Object.defineProperty(EmoteMap.prototype, "loadedEmoteCount", {
        get: function () {
            return this.emoteCount;
        },
        enumerable: true,
        configurable: true
    });
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
exports.default = EmoteMap;
//# sourceMappingURL=EmoteMap.js.map