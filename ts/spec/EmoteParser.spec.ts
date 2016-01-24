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

            const emoteParser = new EmoteParser();
            const actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });

        it('should correctly parse a specific speed', () => {
            const input = '[](/ierage-s13)';
            const expected: EmoteObject = {
                originalString: '[](/ierage-s13)',
                emoteIdentifier: 'ierage',
                flagsString: '-s13',

                speed: '13s',
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

            const emoteParser = new EmoteParser();
            const actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });

        it('should correctly parse an emote with one flag', () => {
            const input = '[](/ierage-v)';
            const expected: EmoteObject = {
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

            const emoteParser = new EmoteParser();
            const actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });

        it('should correctly parse emote with all features', () => {
           const input = '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)';
           const expected: EmoteObject = {
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

           const emoteParser = new EmoteParser();
           const actual = emoteParser.parse(input);
           should(actual).eql(expected);
        });
    });
});
