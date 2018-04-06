"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteObjectBuilder = /** @class */ (function () {
    function EmoteObjectBuilder() {
    }
    EmoteObjectBuilder.clone = function (source) {
        return {
            originalString: source.originalString,
            emoteIdentifier: source.emoteIdentifier,
            flagsString: source.flagsString,
            speed: source.speed,
            slide: source.slide,
            vibrate: source.vibrate,
            reverse: source.reverse,
            hueRotate: source.hueRotate,
            invertColors: source.invertColors,
            spin: source.spin,
            rotateDegrees: source.rotateDegrees,
            brody: source.brody,
            xAxisTranspose: source.xAxisTranspose,
            zAxisTranspose: source.zAxisTranspose,
            firstLineText: source.firstLineText,
            secondLineText: source.secondLineText,
            altText: source.altText,
        };
    };
    EmoteObjectBuilder.create = function (source) {
        // TODO: params checking for source and source.emoteIdentifier ?
        return {
            emoteIdentifier: source.emoteIdentifier,
            originalString: source.originalString || '',
            flagsString: source.flagsString || '',
            firstLineText: source.firstLineText || '',
            secondLineText: source.secondLineText || '',
            altText: source.altText || '',
            spin: source.spin || '',
            brody: source.brody || false,
            hueRotate: source.hueRotate || false,
            invertColors: source.invertColors || false,
            reverse: source.reverse || false,
            rotateDegrees: source.rotateDegrees || 0,
            slide: source.slide || false,
            speed: source.speed || '',
            vibrate: source.vibrate || false,
            xAxisTranspose: source.xAxisTranspose || 0,
            zAxisTranspose: source.zAxisTranspose || 0,
        };
    };
    return EmoteObjectBuilder;
}());
exports.default = EmoteObjectBuilder;
//# sourceMappingURL=EmoteObjectBuilder.js.map