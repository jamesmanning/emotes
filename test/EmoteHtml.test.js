/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/should/should.d.ts" />
require('should');

var EmoteMap = require('../EmoteMap');
var EmoteHtml = require('../EmoteHtml');

var EmoteExpansionOptions = require('../EmoteExpansionOptions');

var emoteData = require('./sample_data.json');
var emoteMap = new EmoteMap(emoteData);
var emoteExpansionOptions = new EmoteExpansionOptions();

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
                secondLineText: null
            };
            var expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';

            var emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            actual.should.eql(expected);
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
                secondLineText: null
            };
            var expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; -webkit-animation: vibrate 0.05s linear infinite; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png); background-position: 0px 0px;"></span>';

            var emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            actual.should.eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteHtml.test.js.map
