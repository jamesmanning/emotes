/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteTextSerializer from '../EmoteTextSerializer';
import EmoteObject from '../EmoteObject';
import EmoteExpansionOptions from '../EmoteExpansionOptions';
import HtmlOutputData from '../HtmlOutputData';
import HtmlElementStyle from '../HtmlElementStyle';
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

describe('EmoteTextSerializer', () => {
  describe('#getStylesFromEntry', () => {
      it('should correctly find nothing for a regular emote', () => {
          const expected: IHashMapOfStrings = {};

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("em-", ivyrage);
          should(actual).eql(expected);
      });
      it('should find correct entries for em- prefix', () => {
          const expected: IHashMapOfStrings = {
              "color": "white",
              "font-style": "normal",
              "left": "50%",
              "margin-left": "-140px",
              "position": "absolute",
              "top": "5px",
              "width": "280px"
          };

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("em-", adviceajlie);
          should(actual).eql(expected);
      });
      it('should find correct entries for strong- prefix', () => {
          const expected: IHashMapOfStrings = {
              "bottom": "5px",
              "color": "white",
              "font-weight": "normal",
              "left": "50%",
              "margin-left": "-140px",
              "position": "absolute",
              "width": "280px"
          };

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("strong-", adviceajlie);
          should(actual).eql(expected);
      });
      it('should find correct entries for text- prefix', () => {
          const expected: IHashMapOfStrings = {
              "color": "white",
              "font-family": "Impact,sans-serif",
              "font-size": "26px",
              "line-height": "26px",
              "text-align": "center",
              "text-shadow": "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
              "text-transform": "uppercase"
          };

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("text-", adviceajlie);
          should(actual).eql(expected);
      });
    });

    describe('#serialize', () => {
        it('should correctly generate empty string for no text fields', () => {
          const input = <EmoteObject> {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
            };
            const expected = '';

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.serialize(input, null);
          should(actual).eql(expected);
        });

        it('should correctly generate html for all text fields', () => {
            var input = <EmoteObject> {
                firstLineText: "first line",
                secondLineText: "second line",
                altText: "some alt text"
            };
            const expected =
              '<em style="' +
                'width: 280px;' +
                'position: absolute;' +
                'font-style: normal;' +
                'color: white;' +
                'top: 5px;' +
                'left: 50%;' +
                'margin-left: -140px;' +
              '">first line</em>' +
              '<strong style="' +
                'bottom: 5px;' +
                'left: 50%;' +
                'position: absolute;' +
                'color: white;' +
                'margin-left: -140px;' +
                'width: 280px;' +
                'font-weight: normal;' +
              '">second line</strong>' +
		          '<span style="' +
                'text-align: center;' +
                'font-size: 26px;' +
                'font-family: Impact,sans-serif;' +
                'text-shadow: 2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black;' +
                'color: white;' +
                'text-transform: uppercase;' +
                'line-height: 26px;' +
              '">some alt text</span>';

            const emoteHtml = new EmoteTextSerializer();
            const actual = emoteHtml.serialize(input, adviceajlie);
            compareAsArrays(actual, expected);
            should(actual).eql(expected);
        });
    });
});
