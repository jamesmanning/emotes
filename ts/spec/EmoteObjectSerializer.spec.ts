/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteObject from '../EmoteObject';
import EmoteObjectSerializer from '../EmoteObjectSerializer';

describe('EmoteObjectSerializer', () => {
  describe('#serialize', () => {
    it('should correctly serialize emote object with all features', () => {
       const input: EmoteObject = {
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
       const expected = '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-2s-!zspin-i-invert-270-x99-z5)';

       const emoteObjectSerializer = new EmoteObjectSerializer();
       const actual = emoteObjectSerializer.serialize(input);
       should(actual).eql(expected);
    });
  });
});
