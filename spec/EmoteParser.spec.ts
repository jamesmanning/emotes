/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

require('should');

import EmoteParser = require('../EmoteParser');
import EmoteObject = require('../EmoteObject');

describe('EmoteParser', () => {
    describe('#parse', () => {
        it('should correctly parse a simple emote', () => {
            var input = '[](/ierage)';
            var expected: EmoteObject = {
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

            var emoteParser = new EmoteParser();
            var actual = emoteParser.parse(input);
            actual.should.eql(expected);
        });

        it('should correctly parse an emote with one flag', () => {
            var input = '[](/ierage-v)';
            var expected: EmoteObject = {
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

            var emoteParser = new EmoteParser();
            var actual = emoteParser.parse(input);
            actual.should.eql(expected);
        });

        //it('should correctly parse 2 lines of text', () => {
        //    var input = '[**bar** *foo*](/ierage)';
        //    var expected: EmoteObject = {
        //        originalString: '[**bar** *foo*](/ierage)',
        //        emoteIdentifier: 'ierage',

        //        speed: null,
        //        slide: null,
        //        vibrate: false,
        //        reverse: false,
        //        spin: null,
        //        rotateDegrees: 0,
        //        brody: false,
        //        xAxisTranspose: 0,
        //        zAxisTranspose: 0,

        //        firstLineText: "foo",
        //        secondLineText: "bar"
        //    };

        //    var emoteParser = new EmoteParser();
        //    var actual = emoteParser.parse(input);
        //    actual.should.eql(expected);
        //});
        
    });
});
