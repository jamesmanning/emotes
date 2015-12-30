"use strict";
var EmoteEffectsModifier = (function () {
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
            animations.push(emoteObject.spin + " 2s infinite linear");
            if (emoteObject.spin == 'zspin' || emoteObject.spin == 'spin') {
                var diag = Math.sqrt(emoteData.width * emoteData.width + emoteData.height * emoteData.height);
                wrappedEmoteHeight = Math.max(diag, wrappedEmoteHeight);
            }
        }
        if (emoteObject.slide) {
            var slideAnimations = [];
            var slideSpeed = emoteObject.speed || '8s';
            slideAnimations.push("slideleft " + slideSpeed + " infinite ease");
            if (!emoteObject.brody && !emoteObject.spin) {
                if (emoteObject.slide == 'slide' && emoteObject.reverse) {
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
            emoteHtml.cssStylesForEmoteNode.push({ propertyName: 'left', propertyValue: emoteObject.xAxisTranspose.toString() });
        }
        if (emoteObject.zAxisTranspose) {
            emoteHtml.cssStylesForEmoteNode.push({ propertyName: 'z-index', propertyValue: emoteObject.zAxisTranspose.toString() });
        }
        if (emoteObject.vibrate) {
            animations.unshift('vibrate 0.05s infinite linear');
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
            emoteHtml.cssStylesForParentNode.push({ propertyName: 'height', propertyValue: Math.ceil(wrappedEmoteHeight - offset) + "px" }, { propertyName: 'display', propertyValue: 'inline-block' }, { propertyName: 'margin-top', propertyValue: offset + "px" }, { propertyName: 'position', propertyValue: 'relative' });
        }
        if (animations.length > 0) {
            emoteHtml.cssStylesForEmoteNode.push({ propertyName: 'animation', propertyValue: animations.join(',').replace('!', '-') });
            emoteHtml.cssStylesForEmoteNode.push({ propertyName: '-webkit-animation', propertyValue: animations.join(',').replace('!', '-') });
        }
        if (wrapperAnimations.length > 0) {
            emoteHtml.cssStylesForParentNode.push({ propertyName: 'animation', propertyValue: wrapperAnimations.join(',').replace('!', '-') });
            emoteHtml.cssStylesForParentNode.push({ propertyName: '-webkit-animation', propertyValue: wrapperAnimations.join(',').replace('!', '-') });
        }
        if (transforms.length > 0) {
            emoteHtml.cssStylesForEmoteNode.push({ propertyName: 'transform', propertyValue: transforms.join(' ') });
        }
    };
    return EmoteEffectsModifier;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteEffectsModifier;
//# sourceMappingURL=EmoteEffectsModifier.js.map