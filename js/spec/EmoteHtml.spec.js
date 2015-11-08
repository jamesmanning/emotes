/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
var should = require('should');
var EmoteMap_1 = require('../EmoteMap');
var EmoteHtml_1 = require('../EmoteHtml');
var EmoteExpansionOptions_1 = require('../EmoteExpansionOptions');
var emoteData = require('./sample_data.json');
var emoteMap = new EmoteMap_1.default(emoteData);
var emoteExpansionOptions = new EmoteExpansionOptions_1.default();
describe('EmoteHtml', function () {
    describe('#getEmoteHtmlForObject', function () {
        it('should correctly generate html for a simple emote', function () {
            var input = {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
                speed: null,
                slide: null,
                vibrate: false,
                reverse: false,
                spin: null,
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for an emote with one flag', function () {
            var input = {
                originalString: '[](/ierage-v)',
                emoteIdentifier: 'ierage',
                speed: null,
                slide: null,
                vibrate: true,
                reverse: false,
                spin: null,
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png); animation: vibrate 0.05s infinite linear; -webkit-animation: vibrate 0.05s infinite linear;"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteHtml.spec.js.map