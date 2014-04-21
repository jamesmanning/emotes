import HtmlOutputData = require("HtmlOutputData");
import EmoteObject = require("EmoteObject");
import IEmoteDataEntry = require('IEmoteDataEntry');

export = EmoteEffectsModifier;

class EmoteEffectsModifier {
    applyFlagsFromObjectToHtmlOutputData(emoteData : IEmoteDataEntry, emoteObject: EmoteObject, emoteHtml: HtmlOutputData) {
        var animations: string[] = [];
        var wrapperAnimations: string[] = [];
        var transforms: string[] = [];
        var wrappedEmoteHeight: number;

        if (emoteObject.spin) {
            animations.push(emoteObject.spin + ' 2s infinite linear');
            if (emoteObject.spin == 'zspin' || emoteObject.spin == 'spin') {
                var diag = Math.sqrt(emoteData.width * emoteData.width + emoteData.height * emoteData.height);
                wrappedEmoteHeight = Math.max(diag, wrappedEmoteHeight);
            }
        }
        if (emoteObject.slide) {
            var slideAnimations = [];
            var slideSpeed = emoteObject.speed || '8s';

            slideAnimations.push(['slideleft', slideSpeed, 'infinite ease'].join(' '));
            if (!emoteObject.brody && !emoteObject.spin) {
                if (emoteObject.slide == 'slide' && emoteObject.reverse) {
                    slideAnimations.push(['!slideflip', slideSpeed, 'infinite ease'].join(' '));
                } else {
                    slideAnimations.push(['slideflip', slideSpeed, 'infinite ease'].join(' '));
                }
            }
            if (emoteObject.spin === 'spin' || emoteObject.spin === 'zspin' || emoteObject.rotateDegrees || emoteObject.brody) {
                wrapperAnimations.push.apply(wrapperAnimations, slideAnimations);
            } else {
                animations.push.apply(animations, slideAnimations);
            }
        }
        if (emoteObject.rotateDegrees) {
            transforms.push('rotate(' + emoteObject.rotateDegrees + 'deg)');
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

        if (wrappedEmoteHeight) {
            emoteHtml.cssClassesForParentNode.push('rotation-wrapper');
            var offset = Math.floor((wrappedEmoteHeight - emoteData.height) / 2);
            emoteHtml.cssStylesForParentNode.push(
                { propertyName: 'height', propertyValue: offset.toString() + 'px' },
                { propertyName: 'display', propertyValue: 'inline-block' },
                { propertyName: 'margin-top', propertyValue: 'offset' },
                { propertyName: 'position', propertyValue: 'relative' });
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
    }
}
 