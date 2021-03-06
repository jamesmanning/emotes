"use strict";
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var should = require('should');
var EmoteParser_1 = require("../EmoteParser");
describe('EmoteParser', function () {
    describe('#parse', function () {
        it('should correctly parse a simple emote', function () {
            var input = '[](/ierage)';
            var expected = {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
                flagsString: null,
                speed: null,
                slide: false,
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
            var emoteParser = new EmoteParser_1.default();
            var actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });
        it('should correctly parse a specific speed, negative x offset, and ignore bogus flag', function () {
            var input = '[](/ierage-s13-bogus-!x100)';
            var expected = {
                originalString: '[](/ierage-s13-bogus-!x100)',
                emoteIdentifier: 'ierage',
                flagsString: '-s13-bogus-!x100',
                speed: '13s',
                slide: false,
                vibrate: false,
                reverse: false,
                hueRotate: false,
                invertColors: false,
                spin: null,
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: -100,
                zAxisTranspose: 0,
                firstLineText: null,
                secondLineText: null,
                altText: null
            };
            var emoteParser = new EmoteParser_1.default();
            var actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });
        it('should correctly parse an emote with one flag', function () {
            var input = '[](/ierage-v)';
            var expected = {
                originalString: '[](/ierage-v)',
                emoteIdentifier: 'ierage',
                flagsString: '-v',
                speed: null,
                slide: false,
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
            var emoteParser = new EmoteParser_1.default();
            var actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });
        it('should correctly parse emote with all features', function () {
            var input = '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)';
            var expected = {
                originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
                emoteIdentifier: 'adviceajlie',
                flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',
                speed: "fastest",
                slide: true,
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
            var emoteParser = new EmoteParser_1.default();
            var actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteParser.spec.js.map