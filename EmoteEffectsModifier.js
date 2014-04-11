
var EmoteEffectsModifier = (function () {
    function EmoteEffectsModifier() {
    }
    EmoteEffectsModifier.prototype.applyFlagsToEmote = function (emoteFlags, $emote) {
        var animations = [];
        var wrapperAnimations = [];
        var transforms = [];
        var needsWrapper = false;

        if (emoteFlags.spin === 'spin' || emoteFlags.spin === 'zspin' || emoteFlags.rotateDegrees || emoteFlags.brody) {
            needsWrapper = true;
        }

        var emoteRoot = $emote;
        if (emoteFlags.spin) {
            animations.push(emoteFlags.spin + ' 2s infinite linear');
            if (emoteFlags.spin == 'zspin' || emoteFlags.spin == 'spin') {
                var diag = Math.sqrt($emote.width() * $emote.width() + $emote.height() * $emote.height());
                emoteRoot = this.wrapEmoteHeight($emote, diag);
            }
        }
        if (emoteFlags.slide) {
            var slideAnimations = [];
            var slideSpeed = emoteFlags.speed || '8s';

            slideAnimations.push(['slideleft', slideSpeed, 'infinite ease'].join(' '));
            if (!emoteFlags.brody && !emoteFlags.spin) {
                if (emoteFlags.slide == 'slide' && emoteFlags.reverse) {
                    slideAnimations.push(['!slideflip', slideSpeed, 'infinite ease'].join(' '));
                } else {
                    slideAnimations.push(['slideflip', slideSpeed, 'infinite ease'].join(' '));
                }
            }
            if (!emoteFlags.needsWrapper) {
                animations.push.apply(animations, slideAnimations);
            } else {
                wrapperAnimations.push.apply(wrapperAnimations, slideAnimations);
            }
        }
        if (emoteFlags.rotateDegrees) {
            transforms.push('rotate(' + emoteFlags.rotateDegrees + 'deg)');
            var rotateHeight = $emote.width() * Math.abs(Math.sin(emoteFlags.rotateDegrees * Math.PI / 180)) + $emote.height() * Math.abs(Math.cos(emoteFlags.rotateDegrees * Math.PI / 180));
            emoteRoot = this.wrapEmoteHeight($emote, rotateHeight);
        }
        if (emoteFlags.xAxisTranspose) {
            $emote.css('left', emoteFlags.xAxisTranspose);
        }
        if (emoteFlags.zAxisTranspose) {
            $emote.css('z-index', emoteFlags.zAxisTranspose);
        }
        if (emoteFlags.vibrate) {
            animations.unshift('vibrate 0.05s infinite linear');
        }
        if (emoteFlags.brody) {
            animations.push('brody  1.27659s infinite ease');
            var brodyHeight = 1.01 * ($emote.width() * Math.sin(10 * Math.PI / 180) + $emote.height() * Math.cos(10 * Math.PI / 180));
            emoteRoot = this.wrapEmoteHeight($emote, brodyHeight);
        }
        if (emoteFlags.reverse) {
            transforms.push('scaleX(-1)');
        }

        if (animations.length > 0) {
            $emote.css('animation', animations.join(',').replace('!', '-'));
        }
        if (wrapperAnimations.length > 0) {
            $emote.parent().css('animation', wrapperAnimations.join(',').replace('!', '-'));
        }
        if (transforms.length > 0) {
            $emote.css('transform', transforms.join(' '));
        }

        return emoteRoot;
    };

    EmoteEffectsModifier.prototype.wrapEmoteHeight = function ($emote, height) {
        var offset = Math.floor((height - $emote.height()) / 2);
        return $emote.wrap('<span class="rotation-wrapper" />').parent().css({
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
