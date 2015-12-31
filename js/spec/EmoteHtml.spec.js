/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
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
                flagsString: null,
                speed: null,
                slide: null,
                vibrate: false,
                reverse: false,
                hueRotate: false,
                invertColors: false,
                spin: null,
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="berryemote" title="ivyrage,ierage from /r/marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for an emote with one flag', function () {
            var input = {
                originalString: '[](/ierage-v)',
                emoteIdentifier: 'ierage',
                flagsString: '-v',
                speed: null,
                slide: null,
                vibrate: true,
                reverse: false,
                hueRotate: false,
                invertColors: false,
                spin: null,
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="berryemote" title="ivyrage,ierage from /r/marmemotes effects: -v" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png); animation: vibrate 0.05s linear infinite; -webkit-animation: vibrate 0.05s linear infinite;"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for a flag that adds a css class', function () {
            var input = {
                originalString: '[](/ierage-invert)',
                emoteIdentifier: 'ierage',
                flagsString: '-invert',
                speed: null,
                slide: null,
                vibrate: false,
                reverse: false,
                hueRotate: false,
                invertColors: true,
                spin: null,
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="berryemote bem-invert" title="ivyrage,ierage from /r/marmemotes effects: -invert" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for a 45 degree rotate', function () {
            var input = {
                originalString: '[](/rdwut-45)',
                emoteIdentifier: 'rdwut',
                flagsString: '-45',
                speed: null,
                slide: null,
                vibrate: false,
                reverse: false,
                hueRotate: false,
                invertColors: false,
                spin: null,
                rotateDegrees: 45,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="rotation-wrapper" style="height: 85px; display: inline-block; margin-top: 14px; position: relative;">' +
                '<span class="berryemote" ' +
                'title="rb32,b32,rdwut,rrdwut from /r/mylittlepony effects: -45" ' +
                'style="height: 70px; ' +
                'width: 70px; ' +
                'display: inline-block; ' +
                'position: relative; ' +
                'overflow: hidden; ' +
                'background-position: -300% -200%; ' +
                'background-image: url(//b.thumbs.redditmedia.com/HUq7klYsvTd62aP39_qG_qIxjSGcSSzzsoslePOPC-A.png); ' +
                'transform: rotate(45deg);"' +
                '></span>' +
                '</span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for a 45 degree rotate', function () {
            var input = {
                originalString: '[](/rdwut-45)',
                emoteIdentifier: 'rdwut',
                flagsString: '-45',
                speed: null,
                slide: null,
                vibrate: false,
                reverse: false,
                hueRotate: false,
                invertColors: false,
                spin: null,
                rotateDegrees: 45,
                brody: false,
                xAxisTranspose: 0,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var expected = '<span class="rotation-wrapper" style="height: 85px; display: inline-block; margin-top: 14px; position: relative;">' +
                '<span class="berryemote" ' +
                'title="rb32,b32,rdwut,rrdwut from /r/mylittlepony effects: -45" ' +
                'style="height: 70px; ' +
                'width: 70px; ' +
                'display: inline-block; ' +
                'position: relative; ' +
                'overflow: hidden; ' +
                'background-position: -300% -200%; ' +
                'background-image: url(//b.thumbs.redditmedia.com/HUq7klYsvTd62aP39_qG_qIxjSGcSSzzsoslePOPC-A.png); ' +
                'transform: rotate(45deg);"' +
                '></span>' +
                '</span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteHtml.spec.js.map