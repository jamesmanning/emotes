"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteObjectSerializer = /** @class */ (function () {
    function EmoteObjectSerializer() {
    }
    EmoteObjectSerializer.prototype.serialize = function (emoteObject) {
        return "[" + this.serializeTextParts(emoteObject) + "](/" + emoteObject.emoteIdentifier + this.serializeFlags(emoteObject) + ")";
    };
    EmoteObjectSerializer.prototype.serializeTextParts = function (emoteObject) {
        var parts = [];
        if (emoteObject.firstLineText)
            parts.push("*" + emoteObject.firstLineText + "*");
        if (emoteObject.secondLineText)
            parts.push("**" + emoteObject.secondLineText + "**");
        if (emoteObject.altText)
            parts.push("" + emoteObject.altText);
        var ret = parts.join(' ');
        return ret;
    };
    EmoteObjectSerializer.prototype.serializeFlags = function (emoteObject) {
        var ret = '';
        if (emoteObject.vibrate)
            ret += '-v';
        if (emoteObject.reverse)
            ret += '-r';
        if (emoteObject.brody)
            ret += '-brody';
        if (emoteObject.slide)
            ret += '-slide';
        if (emoteObject.speed)
            ret += '-' + emoteObject.speed;
        if (emoteObject.spin)
            ret += '-' + emoteObject.spin;
        if (emoteObject.hueRotate)
            ret += '-i';
        if (emoteObject.invertColors)
            ret += '-invert';
        if (emoteObject.rotateDegrees > 0)
            ret += '-' + emoteObject.rotateDegrees;
        if (emoteObject.xAxisTranspose > 0)
            ret += '-x' + emoteObject.xAxisTranspose;
        if (emoteObject.xAxisTranspose < 0)
            ret += '-!x' + Math.abs(emoteObject.xAxisTranspose);
        if (emoteObject.zAxisTranspose > 0)
            ret += '-z' + emoteObject.zAxisTranspose;
        return ret;
    };
    return EmoteObjectSerializer;
}());
exports.default = EmoteObjectSerializer;
//# sourceMappingURL=EmoteObjectSerializer.js.map