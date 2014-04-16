
var EmoteEffectsModifier = (function () {
    function EmoteEffectsModifier() {
    }
    EmoteEffectsModifier.prototype.applyFlagsFromObjectToEmote = function (emoteData, emoteObject, emoteHtml) {
        var animations = [];
        var wrapperAnimations = [];
        var transforms = [];
        var needsWrapper = false;

        if (emoteObject.spin === 'spin' || emoteObject.spin === 'zspin' || emoteObject.rotateDegrees || emoteObject.brody) {
            needsWrapper = true;
        }

        var emoteRoot = emoteHtml;
        if (emoteObject.spin) {
            animations.push(emoteObject.spin + ' 2s infinite linear');
            if (emoteObject.spin == 'zspin' || emoteObject.spin == 'spin') {
                var diag = Math.sqrt(emoteData.width * emoteData.width + emoteData.height * emoteData.height);
                emoteRoot = this.wrapEmoteHeight(emoteHtml, diag);
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
            if (!needsWrapper) {
                animations.push.apply(animations, slideAnimations);
            } else {
                wrapperAnimations.push.apply(wrapperAnimations, slideAnimations);
            }
        }
        if (emoteObject.rotateDegrees) {
            transforms.push('rotate(' + emoteObject.rotateDegrees + 'deg)');
            var rotateHeight = emoteData.width * Math.abs(Math.sin(emoteObject.rotateDegrees * Math.PI / 180)) + emoteData.height * Math.abs(Math.cos(emoteObject.rotateDegrees * Math.PI / 180));
            emoteRoot = this.wrapEmoteHeight(emoteHtml, rotateHeight);
        }
        if (emoteObject.xAxisTranspose) {
            emoteHtml.css('left', emoteObject.xAxisTranspose);
        }
        if (emoteObject.zAxisTranspose) {
            emoteHtml.css('z-index', emoteObject.zAxisTranspose);
        }
        if (emoteObject.vibrate) {
            animations.unshift('vibrate 0.05s infinite linear');
        }
        if (emoteObject.brody) {
            animations.push('brody  1.27659s infinite ease');
            var brodyHeight = 1.01 * (emoteData.width * Math.sin(10 * Math.PI / 180) + emoteData.height * Math.cos(10 * Math.PI / 180));
            emoteRoot = this.wrapEmoteHeight(emoteHtml, brodyHeight);
        }
        if (emoteObject.reverse) {
            transforms.push('scaleX(-1)');
        }

        if (animations.length > 0) {
            emoteHtml.css('animation', animations.join(',').replace('!', '-'));
        }
        if (wrapperAnimations.length > 0) {
            emoteHtml.parent().css('animation', wrapperAnimations.join(',').replace('!', '-'));
        }
        if (transforms.length > 0) {
            emoteHtml.css('transform', transforms.join(' '));
        }

        return emoteRoot;
    };

    EmoteEffectsModifier.prototype.wrapEmoteHeight = function (emoteHtml, height) {
        var offset = Math.floor((height - emoteData.height) / 2);
        return emoteHtml.wrap('<span class="rotation-wrapper" />').parent().css({
            'height': Math.ceil(height - offset),
            'display': 'inline-block',
            'margin-top': offset,
            'position': 'relative'
        });
    };
    return EmoteEffectsModifier;
})();
module.exports = EmoteEffectsModifier;
//# sourceMappingURL=EmoteEffectsModifier.js.map
