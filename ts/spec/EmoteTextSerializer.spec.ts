/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteTextSerializer from '../EmoteTextSerializer';
import EmoteObject from '../EmoteObject';
import EmoteExpansionOptions from '../EmoteExpansionOptions';
import HtmlOutputData from '../HtmlOutputData';
import IEmoteDataEntry from '../IEmoteDataEntry';
import IHashMapOfStrings from '../IHashMapOfStrings';

const emoteData: IEmoteDataEntry[] = require('./sample_data.json');
const ivyrage: IEmoteDataEntry = emoteData.filter(x => x.names[0] == 'ivyrage')[0];
const adviceajlie: IEmoteDataEntry = emoteData.filter(x => x.names[0] == 'adviceajlie')[0];

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
              color: "white",
              fontStyle: "normal",
              left: "50%",
              marginLeft: "-140px",
              position: "absolute",
              top: "5px",
              width: "280px"
          };

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("em-", adviceajlie);
          should(actual).eql(expected);
      });
      it('should find correct entries for strong- prefix', () => {
          const expected: IHashMapOfStrings = {
              bottom: "5px",
              color: "white",
              fontWeight: "normal",
              left: "50%",
              marginLeft: "-140px",
              position: "absolute",
              width: "280px"
          };

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("strong-", adviceajlie);
          should(actual).eql(expected);
      });
      it('should find correct entries for text- prefix', () => {
          const expected: IHashMapOfStrings = {
              color: "white",
              fontFamily: "Impact,sans-serif",
              fontSize: "26px",
              lineHeight: "26px",
              textAlign: "center",
              textShadow: "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
              textTransform: "uppercase"
          };

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = emoteTextSerializer.getStylesFromEntry("text-", adviceajlie);
          should(actual).eql(expected);
      });
    });

    describe('#serialize', () => {
        it('should correctly generate empty metadata for no text fields', () => {
          const input = <EmoteObject> {
            originalString: '[](/ierage)',
            emoteIdentifier: 'ierage',
          };
          const expected = <HtmlOutputData> {};

          const emoteTextSerializer = new EmoteTextSerializer();
          const actual = <HtmlOutputData> {};
          emoteTextSerializer.serializeFromObjectToHtmlOutputData(ivyrage, input, actual);
          should(actual).eql(expected);
        });

        it('should correctly generate metadata for all text fields', () => {
            const input = <EmoteObject> {
                firstLineText: "first line",
                secondLineText: "second line",
                altText: "some alt text"
            };
            const expected = <HtmlOutputData> {
              cssStylesForEmoteNode: <IHashMapOfStrings> {
                color: "white",
                fontFamily: "Impact,sans-serif",
                fontSize: "26px",
                lineHeight: "26px",
                textAlign: "center",
                textShadow: "2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black",
                textTransform: "uppercase"
              },
              emText: 'first line',
              emStyles: <IHashMapOfStrings> {
                width: '280px',
                position: 'absolute',
                fontStyle: 'normal',
                color: 'white',
                top: '5px',
                left: '50%',
                marginLeft: '-140px'
              },
              strongText: 'second line',
              strongStyles: <IHashMapOfStrings> {
                bottom: '5px',
                left: '50%',
                position: 'absolute',
                color: 'white',
                marginLeft: '-140px',
                width: '280px',
                fontWeight: 'normal',
              },
              altText: 'some alt text'
            };

            const emoteTextSerializer = new EmoteTextSerializer();
            const actual = <HtmlOutputData> {
              cssStylesForEmoteNode: <IHashMapOfStrings> {}
            };
            emoteTextSerializer.serializeFromObjectToHtmlOutputData(adviceajlie, input, actual);
            should(actual).eql(expected);
        });
    });
});
