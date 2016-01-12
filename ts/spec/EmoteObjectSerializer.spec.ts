/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteTextSerializer from '../EmoteTextSerializer';
import EmoteObject from '../EmoteObject';
import EmoteExpansionOptions from '../EmoteExpansionOptions';
import EmoteObjectSerializer from '../EmoteObjectSerializer';
import HtmlOutputData from '../HtmlOutputData';
import IEmoteDataEntry from '../IEmoteDataEntry';
import IHashMapOfStrings from '../IHashMapOfStrings';

const emoteData: IEmoteDataEntry[] = require('./sample_data.json');
const ivyrage: IEmoteDataEntry = emoteData.filter(x => x.names[0] == 'ivyrage')[0];
const adviceajlie: IEmoteDataEntry = emoteData.filter(x => x.names[0] == 'adviceajlie')[0];

function splitIntoArray(input: string): string[] {
  return input.split(/(?=<)/);
}

function compareAsArrays(actual: string, expected: string): void {
  const expectedAsArray = splitIntoArray(expected);
  const actualAsArray = splitIntoArray(actual);
  should(actualAsArray).eql(expectedAsArray);
}

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
