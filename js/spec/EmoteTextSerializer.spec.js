/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
var should = require('should');
var EmoteTextSerializer_1 = require('../EmoteTextSerializer');
var emoteData = require('./sample_data.json');
var ivyrage = emoteData.filter(function (x) { return x.names[0] == 'ivyrage'; })[0];
var adviceajlie = emoteData.filter(function (x) { return x.names[0] == 'adviceajlie'; })[0];
describe('EmoteTextSerializer', function () {
    describe('#getStylesFromEntry', function () {
        it('should correctly find nothing for a regular emote', function () {
            var expected = {};
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("em-", ivyrage);
            should(actual).eql(expected);
        });
        it('should find correct entries for em- prefix', function () {
            var expected = {
                color: "white",
                fontStyle: "normal",
                left: "50%",
                marginLeft: "-140px",
                position: "absolute",
                top: "5px",
                width: "280px"
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("em-", adviceajlie);
            should(actual).eql(expected);
        });
        it('should find correct entries for strong- prefix', function () {
            var expected = {
                bottom: "5px",
                color: "white",
                fontWeight: "normal",
                left: "50%",
                marginLeft: "-140px",
                position: "absolute",
                width: "280px"
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("strong-", adviceajlie);
            should(actual).eql(expected);
        });
        it('should find correct entries for text- prefix', function () {
            var expected = {
                color: "white",
                fontFamily: "Impact,sans-serif",
                fontSize: "26px",
                lineHeight: "26px",
                textAlign: "center",
                textShadow: "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
                textTransform: "uppercase"
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("text-", adviceajlie);
            should(actual).eql(expected);
        });
    });
    describe('#serialize', function () {
        it('should correctly generate empty metadata for no text fields', function () {
            var input = {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
            };
            var expected = {};
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = {};
            emoteTextSerializer.serializeFromObjectToHtmlOutputData(ivyrage, input, actual);
            should(actual).eql(expected);
        });
        it('should correctly generate metadata for all text fields', function () {
            var input = {
                firstLineText: "first line",
                secondLineText: "second line",
                altText: "some alt text"
            };
            var expected = {
                cssStylesForEmoteNode: {
                    color: "white",
                    fontFamily: "Impact,sans-serif",
                    fontSize: "26px",
                    lineHeight: "26px",
                    textAlign: "center",
                    textShadow: "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
                    textTransform: "uppercase"
                },
                emText: 'first line',
                emStyles: {
                    width: '280px',
                    position: 'absolute',
                    fontStyle: 'normal',
                    color: 'white',
                    top: '5px',
                    left: '50%',
                    marginLeft: '-140px'
                },
                strongText: 'second line',
                strongStyles: {
                    bottom: '5px',
                    left: '50%',
                    position: 'absolute',
                    color: 'white',
                    marginLeft: '-140px',
                    width: '280px',
                    fontWeight: 'normal',
                },
                altText: 'some alt text'
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = {
                cssStylesForEmoteNode: {}
            };
            emoteTextSerializer.serializeFromObjectToHtmlOutputData(adviceajlie, input, actual);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteTextSerializer.spec.js.map