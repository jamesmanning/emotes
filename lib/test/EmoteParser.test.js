/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
require('should');
var EmoteParser = require('../EmoteParser');
describe('EmoteParser', function () {
    describe('#parse', function () {
        it('should correctly parse a simple emote', function () {
            var input = '[](/ierage)';
            var expected = {
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
        it('should correctly parse an emote with one flag', function () {
            var input = '[](/ierage-v)';
            var expected = {
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
//# sourceMappingURL=EmoteParser.test.js.map