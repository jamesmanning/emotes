"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmoteFlags_1 = require("./EmoteFlags");
var EmoteEffectsModifier = /** @class */ (function () {
    function EmoteEffectsModifier() {
    }
    EmoteEffectsModifier.prototype.applyFlagsFromObjectToHtmlOutputData = function (emoteData, emoteObject, emoteHtml) {
        var animations = [];
        var wrapperAnimations = [];
        var transforms = [];
        var wrappedEmoteHeight;
        if (emoteObject.flagsString) {
            emoteHtml.titleForEmoteNode += " effects: " + emoteObject.flagsString;
        }
        if (emoteObject.spin) {
            animations.push(emoteObject.spin + " 2s linear infinite");
            if (emoteObject.spin == 'zspin' || emoteObject.spin == 'spin' || emoteObject.spin == '!zspin' || emoteObject.spin == '!spin') {
                var diag = Math.sqrt(emoteData.width * emoteData.width + emoteData.height * emoteData.height);
                wrappedEmoteHeight = Math.max(diag, wrappedEmoteHeight);
            }
        }
        if (emoteObject.slide) {
            var slideAnimations = [];
            var slideSpeed = EmoteFlags_1.default.getSpeedForDescription(emoteObject.speed) || '8s';
            slideAnimations.push("slideleft " + slideSpeed + " infinite ease");
            if (!emoteObject.brody && !emoteObject.spin) {
                if (emoteObject.reverse) {
                    slideAnimations.push("!slideflip " + slideSpeed + " infinite ease");
                }
                else {
                    slideAnimations.push("slideflip " + slideSpeed + " infinite ease");
                }
            }
            if (emoteObject.spin === 'spin' || emoteObject.spin === 'zspin' || emoteObject.rotateDegrees || emoteObject.brody) {
                wrapperAnimations.push.apply(wrapperAnimations, slideAnimations);
            }
            else {
                animations.push.apply(animations, slideAnimations);
            }
        }
        if (emoteObject.rotateDegrees) {
            transforms.push("rotate(" + emoteObject.rotateDegrees + "deg)");
            var rotateHeight = emoteData.width *
                Math.abs(Math.sin(emoteObject.rotateDegrees * Math.PI / 180)) +
                emoteData.height *
                    Math.abs(Math.cos(emoteObject.rotateDegrees * Math.PI / 180));
            wrappedEmoteHeight = rotateHeight;
        }
        if (emoteObject.xAxisTranspose) {
            emoteHtml.cssStylesForEmoteNode.left = emoteObject.xAxisTranspose + "px";
        }
        if (emoteObject.zAxisTranspose) {
            emoteHtml.cssStylesForEmoteNode.zIndex = emoteObject.zAxisTranspose.toString();
        }
        if (emoteObject.vibrate) {
            animations.unshift('vibrate 0.05s linear infinite');
        }
        if (emoteObject.brody) {
            animations.push('brody  1.27659s infinite ease');
            var brodyHeight = 1.01 * (emoteData.width * Math.sin(10 * Math.PI / 180) + emoteData.height * Math.cos(10 * Math.PI / 180));
            wrappedEmoteHeight = brodyHeight;
        }
        if (emoteObject.reverse) {
            transforms.push('scaleX(-1)');
        }
        if (emoteObject.hueRotate) {
            emoteHtml.cssClassesForEmoteNode.push('bem-hue-rotate');
        }
        if (emoteObject.invertColors) {
            emoteHtml.cssClassesForEmoteNode.push('bem-invert');
        }
        if (wrappedEmoteHeight) {
            emoteHtml.cssClassesForParentNode.push('rotation-wrapper');
            var offset = Math.floor((wrappedEmoteHeight - emoteData.height) / 2);
            emoteHtml.cssStylesForParentNode['height'] = Math.ceil(wrappedEmoteHeight - offset) + "px";
            emoteHtml.cssStylesForParentNode['display'] = 'inline-block';
            emoteHtml.cssStylesForParentNode['marginTop'] = offset + "px";
            emoteHtml.cssStylesForParentNode['position'] = 'relative';
        }
        if (animations.length > 0) {
            emoteHtml.cssStylesForEmoteNode['animation'] = animations.join(',').replace('!', '-');
        }
        if (wrapperAnimations.length > 0) {
            emoteHtml.cssStylesForParentNode['animation'] = wrapperAnimations.join(',').replace('!', '-');
        }
        if (transforms.length > 0) {
            emoteHtml.cssStylesForEmoteNode['transform'] = transforms.join(' ');
        }
    };
    return EmoteEffectsModifier;
}());
exports.default = EmoteEffectsModifier;
//# sourceMappingURL=EmoteEffectsModifier.js.map