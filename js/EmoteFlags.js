"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteFlags = /** @class */ (function () {
    function EmoteFlags() {
    }
    EmoteFlags.invertHashMapOfStrings = function (obj) {
        var ret = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ret[obj[prop]] = prop;
            }
        }
        return ret;
    };
    EmoteFlags.getSpeedForDescription = function (description) {
        return EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap[description] || description;
    };
    EmoteFlags.getDescriptionForSpeed = function (speed) {
        return EmoteFlags.berryEmoteAnimationSpeedToDescriptionMap[speed] || speed;
    };
    EmoteFlags.berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];
    EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap = {
        'slowest': '14s',
        'slower': '12s',
        'slow': '10s',
        'fast': '6s',
        'faster': '4s',
        'fastest': '2s'
    };
    EmoteFlags.berryEmoteAnimationSpeedToDescriptionMap = EmoteFlags.invertHashMapOfStrings(EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap);
    return EmoteFlags;
}());
exports.default = EmoteFlags;
//# sourceMappingURL=EmoteFlags.js.map