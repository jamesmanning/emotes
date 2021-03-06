"use strict";
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var should = require('should');
var EmoteObjectSerializer_1 = require("../EmoteObjectSerializer");
describe('EmoteObjectSerializer', function () {
    describe('#serialize', function () {
        it('should correctly serialize emote object with all features', function () {
            var input = {
                originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
                emoteIdentifier: 'adviceajlie',
                flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',
                // since 'fastest' is just an alias for '2s', it parses as 2s
                speed: "2s",
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
            var expected = '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-2s-!zspin-i-invert-270-x99-z5)';
            var emoteObjectSerializer = new EmoteObjectSerializer_1.default();
            var actual = emoteObjectSerializer.serialize(input);
            should(actual).eql(expected);
        });
        it('should correctly serialize negative x offset', function () {
            var input = {
                originalString: '[](/adviceajlie-!x99)',
                emoteIdentifier: 'adviceajlie',
                flagsString: '-!x99',
                // since 'fastest' is just an alias for '2s', it parses as 2s
                speed: "",
                slide: false,
                vibrate: false,
                reverse: false,
                hueRotate: false,
                invertColors: false,
                spin: "",
                rotateDegrees: 0,
                brody: false,
                xAxisTranspose: -99,
                zAxisTranspose: 0,
                firstLineText: "",
                secondLineText: "",
                altText: ""
            };
            var expected = '[](/adviceajlie-!x99)';
            var emoteObjectSerializer = new EmoteObjectSerializer_1.default();
            var actual = emoteObjectSerializer.serialize(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteObjectSerializer.spec.js.map