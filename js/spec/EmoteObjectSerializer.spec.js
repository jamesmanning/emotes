/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
var should = require('should');
var EmoteObjectSerializer_1 = require('../EmoteObjectSerializer');
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
describe('EmoteObjectSerializer', function () {
    describe('#serialize', function () {
        it('should correctly serialize emote object with all features', function () {
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
            var expected = '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-2s-!zspin-i-invert-270-x99-z5)';
            var emoteObjectSerializer = new EmoteObjectSerializer_1.default();
            var actual = emoteObjectSerializer.serialize(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteObjectSerializer.spec.js.map