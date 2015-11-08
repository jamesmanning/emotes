/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
var should = require('should');
var EmoteParser_1 = require('../EmoteParser');
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
            var emoteParser = new EmoteParser_1.default();
            var actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });
        it('should correctly parse lines of text', function () {
            var input = '[**bar** *foo* some alt text](/ierage)';
            var expected = {
                originalString: '[**bar** *foo*](/ierage)',
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
                firstLineText: "foo",
                secondLineText: "bar",
                altText: "some alt text"
            };
            var emoteParser = new EmoteParser_1.default();
            var actual = emoteParser.parse(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteParser.spec.js.map