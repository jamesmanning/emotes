"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteMap = /** @class */ (function () {
    function EmoteMap(emoteData) {
        this.loadData(emoteData);
    }
    EmoteMap.prototype.loadData = function (emoteData) {
        var _this = this;
        this.emoteCount = emoteData.length;
        this.emoteMap = this.buildEmoteMap(emoteData);
        this.allEmoteNames = Object.keys(this.emoteMap);
        this.emoteImages = this.allEmoteNames.map(function (name) {
            return {
                name: name,
                imageUrl: _this.emoteMap[name]["background-image"],
            };
        });
    };
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
exports.default = EmoteMap;
//# sourceMappingURL=EmoteMap.js.map