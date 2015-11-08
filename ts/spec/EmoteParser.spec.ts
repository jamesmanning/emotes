/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteParser from '../EmoteParser';
import EmoteObject from '../EmoteObject';

describe('EmoteParser', () => {
    describe('#parse', () => {
        it('should correctly parse a simple emote', () => {
            const input = '[](/ierage)';
            const expected: EmoteObject = {
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

            const emoteParser = new EmoteParser();
            const actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });

        it('should correctly parse an emote with one flag', () => {
            const input = '[](/ierage-v)';
            const expected: EmoteObject = {
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

            const emoteParser = new EmoteParser();
            const actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });

        it('should correctly parse emote with all features', () => {
           const input = '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-270-x99-z5)';
           const expected: EmoteObject = {
               originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-270-x99-z5)',
               emoteIdentifier: 'adviceajlie',

               speed: "2s",
               slide: "slide",
               vibrate: true,
               reverse: true,
               spin: "!zspin",
               rotateDegrees: 270,
               brody: true,
               xAxisTranspose: 99,
               zAxisTranspose: 5,

               firstLineText: "first line",
               secondLineText: "second line",
               altText: "some alt text"
           };

           const emoteParser = new EmoteParser();
           const actual = emoteParser.parse(input);
           should(actual).eql(expected);
        });
    });
});
