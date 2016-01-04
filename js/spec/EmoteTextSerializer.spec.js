/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
var should = require('should');
var EmoteTextSerializer_1 = require('../EmoteTextSerializer');
var emoteData = require('./sample_data.json');
var ivyrage = emoteData.filter(function (x) { return x.names[0] == 'ivyrage'; })[0];
var adviceajlie = emoteData.filter(function (x) { return x.names[0] == 'adviceajlie'; })[0];
function splitIntoArray(input) {
    return input.split(/(?=<)/);
}
function compareAsArrays(actual, expected) {
    var expectedAsArray = splitIntoArray(expected);
    var actualAsArray = splitIntoArray(actual);
    should(actualAsArray).eql(expectedAsArray);
}
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
                "color": "white",
                "font-style": "normal",
                "left": "50%",
                "margin-left": "-140px",
                "position": "absolute",
                "top": "5px",
                "width": "280px"
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("em-", adviceajlie);
            should(actual).eql(expected);
        });
        it('should find correct entries for strong- prefix', function () {
            var expected = {
                "bottom": "5px",
                "color": "white",
                "font-weight": "normal",
                "left": "50%",
                "margin-left": "-140px",
                "position": "absolute",
                "width": "280px"
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("strong-", adviceajlie);
            should(actual).eql(expected);
        });
        it('should find correct entries for text- prefix', function () {
            var expected = {
                "color": "white",
                "font-family": "Impact,sans-serif",
                "font-size": "26px",
                "line-height": "26px",
                "text-align": "center",
                "text-shadow": "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
                "text-transform": "uppercase"
            };
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.getStylesFromEntry("text-", adviceajlie);
            should(actual).eql(expected);
        });
    });
    describe('#serialize', function () {
        it('should correctly generate empty string for no text fields', function () {
            var input = {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
            };
            var expected = '';
            var emoteTextSerializer = new EmoteTextSerializer_1.default();
            var actual = emoteTextSerializer.serialize(input, null);
            should(actual).eql(expected);
        });
        it('should correctly generate html for all text fields', function () {
            var input = {
                firstLineText: "first line",
                secondLineText: "second line",
                altText: "some alt text"
            };
            var expected = '<em style="' +
                'width: 280px;' +
                'position: absolute;' +
                'font-style: normal;' +
                'color: white;' +
                'top: 5px;' +
                'left: 50%;' +
                'margin-left: -140px;' +
                '">first line</em>' +
                '<strong style="' +
                'bottom: 5px;' +
                'left: 50%;' +
                'position: absolute;' +
                'color: white;' +
                'margin-left: -140px;' +
                'width: 280px;' +
                'font-weight: normal;' +
                '">second line</strong>' +
                '<span style="' +
                'text-align: center;' +
                'font-size: 26px;' +
                'font-family: Impact,sans-serif;' +
                'text-shadow: 2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black;' +
                'color: white;' +
                'text-transform: uppercase;' +
                'line-height: 26px;' +
                '">some alt text</span>';
            var emoteHtml = new EmoteTextSerializer_1.default();
            var actual = emoteHtml.serialize(input, adviceajlie);
            compareAsArrays(actual, expected);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteTextSerializer.spec.js.map