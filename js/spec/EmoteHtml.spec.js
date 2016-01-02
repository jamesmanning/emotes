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
    describe('#getEmoteHtmlMetadataForObject', function () {
        it('should correctly generate metadata for a simple emote', function () {
            var input = {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
            };
            var expected = {
                "emoteData": {
                    "apng_url": "http://backstage.berrytube.tv/marminator/images/a/84ozl2WMmiYp6Euf.png",
                    "background-image": "http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png",
                    "height": 140,
                    "names": [
                        "ivyrage",
                        "ierage"
                    ],
                    "sr": "marmemotes",
                    "tags": [
                        "oc",
                        ""
                    ],
                    "width": 200
                },
                titleForEmoteNode: "ivyrage,ierage from /r/marmemotes",
                cssClassesForEmoteNode: ['berryemote'],
                cssStylesForEmoteNode: {
                    height: '140px',
                    width: '200px',
                    display: 'inline-block',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundPosition: '0px 0px',
                    backgroundImage: "url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png)"
                },
                cssClassesForParentNode: [],
                cssStylesForParentNode: {},
            };
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate metadata for an emote with all features', function () {
            var input = {
                originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
                emoteIdentifier: 'adviceajlie',
                flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',
                // since 'fastest' is just an alias for '2s', it parses as 2s
                speed: "2s",
                slide: "slide",
                vibrate: true,
                reverse: true,
                hueRotate: true,
                invertColors: true,
                spin: "!zspin",
                rotateDegrees: 270,
                brody: true,
                xAxisTranspose: 99,
                zAxisTranspose: 5,
                firstLineText: "first line",
                secondLineText: "second line",
                altText: "some alt text"
            };
            var expected = {
                "emoteData": {
                    "background-image": "//b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png",
                    "background-position": [
                        "-2px",
                        "-2px"
                    ],
                    "em-color": "white",
                    "em-font-style": "normal",
                    "em-left": "50%",
                    "em-margin-left": "-140px",
                    "em-position": "absolute",
                    "em-top": "5px",
                    "em-width": "280px",
                    "height": 300,
                    "names": [
                        "adviceajlie"
                    ],
                    "sr": "adviceponies",
                    "strong-bottom": "5px",
                    "strong-color": "white",
                    "strong-font-weight": "normal",
                    "strong-left": "50%",
                    "strong-margin-left": "-140px",
                    "strong-position": "absolute",
                    "strong-width": "280px",
                    "tags": [
                        "applejack",
                        "meme"
                    ],
                    "text-color": "white",
                    "text-font-family": "Impact,sans-serif",
                    "text-font-size": "26px",
                    "text-line-height": "26px",
                    "text-text-align": "center",
                    "text-text-shadow": "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
                    "text-text-transform": "uppercase",
                    "width": 300
                },
                titleForEmoteNode: "adviceajlie from /r/adviceponies effects: -v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5",
                cssClassesForEmoteNode: [
                    "berryemote",
                    "bem-hue-rotate",
                    "bem-invert"
                ],
                cssStylesForEmoteNode: {
                    height: "300px",
                    width: "300px",
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                    backgroundPosition: "-2px -2px",
                    backgroundImage: "url(//b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png)",
                    left: "99",
                    zIndex: "5",
                    animation: "vibrate 0.05s linear infinite,-zspin 2s linear infinite,brody  1.27659s infinite ease",
                    transform: "rotate(270deg) scaleX(-1)"
                },
                cssClassesForParentNode: ["rotation-wrapper"],
                cssStylesForParentNode: {
                    height: "327px",
                    display: "inline-block",
                    marginTop: "25px",
                    position: "relative",
                    animation: "slideleft 2s infinite ease",
                }
            };
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
            should(actual).eql(expected);
        });
    });
    describe('#getEmoteHtmlForObject', function () {
        it('should correctly generate html for a simple emote', function () {
            var input = {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
            };
            var expected = '<span class="berryemote" ' +
                'title="ivyrage,ierage from /r/marmemotes" ' +
                'style="' +
                'height: 140px;' +
                'width: 200px;' +
                'display: inline-block;' +
                'position: relative;' +
                'overflow: hidden;' +
                'background-position: 0px 0px;' +
                'background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);' +
                '"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for an emote with one flag', function () {
            var input = {
                originalString: '[](/ierage-v)',
                emoteIdentifier: 'ierage',
                flagsString: '-v',
                vibrate: true,
            };
            var expected = '<span class="berryemote" ' +
                'title="ivyrage,ierage from /r/marmemotes effects: -v" ' +
                'style="' +
                'height: 140px;' +
                'width: 200px;' +
                'display: inline-block;' +
                'position: relative;' +
                'overflow: hidden;' +
                'background-position: 0px 0px;' +
                'background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);' +
                'animation: vibrate 0.05s linear infinite;' +
                '"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for a flag that adds a css class', function () {
            var input = {
                originalString: '[](/ierage-invert)',
                emoteIdentifier: 'ierage',
                flagsString: '-invert',
                invertColors: true,
            };
            var expected = '<span class="berryemote bem-invert" ' +
                'title="ivyrage,ierage from /r/marmemotes effects: -invert" ' +
                'style="' +
                'height: 140px;' +
                'width: 200px;' +
                'display: inline-block;' +
                'position: relative;' +
                'overflow: hidden;' +
                'background-position: 0px 0px;' +
                'background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);' +
                '"></span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for a 45 degree rotate', function () {
            var input = {
                originalString: '[](/rdwut-45)',
                emoteIdentifier: 'rdwut',
                flagsString: '-45',
                rotateDegrees: 45,
            };
            var expected = '<span class="rotation-wrapper" style="height: 85px;display: inline-block;margin-top: 14px;position: relative;">' +
                '<span class="berryemote" ' +
                'title="rb32,b32,rdwut,rrdwut from /r/mylittlepony effects: -45" ' +
                'style="height: 70px;' +
                'width: 70px;' +
                'display: inline-block;' +
                'position: relative;' +
                'overflow: hidden;' +
                'background-position: -300% -200%;' +
                'background-image: url(//b.thumbs.redditmedia.com/HUq7klYsvTd62aP39_qG_qIxjSGcSSzzsoslePOPC-A.png);' +
                'transform: rotate(45deg);"' +
                '></span>' +
                '</span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
        it('should correctly generate html for an emote with all features', function () {
            var input = {
                originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
                emoteIdentifier: 'adviceajlie',
                flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',
                // since 'fastest' is just an alias for '2s', it parses as 2s
                speed: "2s",
                slide: "slide",
                vibrate: true,
                reverse: true,
                hueRotate: true,
                invertColors: true,
                spin: "!zspin",
                rotateDegrees: 270,
                brody: true,
                xAxisTranspose: 99,
                zAxisTranspose: 5,
                firstLineText: "first line",
                secondLineText: "second line",
                altText: "some alt text"
            };
            var expected = '<span class="rotation-wrapper" style="' +
                'height: 327px;' +
                'display: inline-block;' +
                'margin-top: 25px;' +
                'position: relative;' +
                'animation: slideleft 2s infinite ease;' +
                '">' +
                '<span class="berryemote bem-hue-rotate bem-invert" title="adviceajlie from /r/adviceponies effects: -v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5" style="' +
                'height: 300px;' +
                'width: 300px;' +
                'display: inline-block;' +
                'position: relative;' +
                'overflow: hidden;' +
                'background-position: -2px -2px;' +
                'background-image: url(//b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png);' +
                'left: 99;' +
                'z-index: 5;' +
                'animation: vibrate 0.05s linear infinite,-zspin 2s linear infinite,brody  1.27659s infinite ease;' +
                'transform: rotate(270deg) scaleX(-1);' +
                '">' +
                '</span>' +
                '</span>';
            var emoteHtml = new EmoteHtml_1.default(emoteMap, emoteExpansionOptions);
            var actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteHtml.spec.js.map