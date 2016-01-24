/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteMap from '../EmoteMap';
import EmoteHtml from '../EmoteHtml';
import EmoteObject from '../EmoteObject';
import EmoteExpansionOptions from '../EmoteExpansionOptions';
import HtmlOutputData from '../HtmlOutputData';
import IEmoteDataEntry from '../IEmoteDataEntry';
import IHashMapOfStrings from '../IHashMapOfStrings';

const emoteData: IEmoteDataEntry[] = require('./sample_data.json');
const ivyrage: IEmoteDataEntry = emoteData.filter(x => x.names[0] == 'ivyrage')[0];
const adviceajlie: IEmoteDataEntry = emoteData.filter(x => x.names[0] == 'adviceajlie')[0];
const emoteMap = new EmoteMap(emoteData);
const emoteExpansionOptions = new EmoteExpansionOptions();

function splitIntoArray(input: string): string[] {
  return input.split(/(?=<)/);
}

function compareAsArrays(actual: string, expected: string): void {
  const expectedAsArray = splitIntoArray(expected);
  const actualAsArray = splitIntoArray(actual);
  should(actualAsArray).eql(expectedAsArray);
}

describe('EmoteHtml', () => {
  describe('#getEmoteHtmlMetadataForObject', () => {
    it('should correctly return null for invalid emote', () => {
      const input = <EmoteObject> {
            originalString: '[](/nosuchemote)',
            emoteIdentifier: 'nosuchemote',
        };
        const expected = <HtmlOutputData> null;

        const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
        const actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
        should(actual).eql(expected);
    });
    // it('should correctly return null for nsfw emote with nsfw disabled', () => {
    //   const input = <EmoteObject> {
    //         originalString: '[](/adviceajlie)',
    //         emoteIdentifier: 'adviceajlie',
    //     };
    //     const expected = <HtmlOutputData> null;
    //
    //     const disabledNsfwOptions = new EmoteExpansionOptions();
    //     disabledNsfwOptions.showNsfwEmotes = false;
    //     const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
    //     const actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
    //     should(actual).eql(expected);
    // });
      it('should correctly generate metadata for a simple emote', () => {
        const input = <EmoteObject> {
              originalString: '[](/ierage)',
              emoteIdentifier: 'ierage',
          };
          const expected = <HtmlOutputData> {
            emoteData : ivyrage,
            titleForEmoteNode: "ivyrage,ierage from /r/marmemotes",

            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: <IHashMapOfStrings> {
              height: '140px',
              width: '200px',
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              backgroundPosition: '0px 0px',
              backgroundImage: "url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png)"
            },

            cssClassesForParentNode: [],
            cssStylesForParentNode: <IHashMapOfStrings> {}
          };

          const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
          const actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
          should(actual).eql(expected);
      });
      it('should correctly generate metadata for an emote with all features', () => {
        const input = <EmoteObject> {
            originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5-bogusextraflag)',
            emoteIdentifier: 'adviceajlie',
            flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5-bogusextraflag',

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
          const expected: HtmlOutputData = {
            emoteData : adviceajlie,
            titleForEmoteNode: "adviceajlie from /r/adviceponies effects: -v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5-bogusextraflag",

            cssClassesForEmoteNode: [
              "berryemote",
              "nsfw",
              "bem-hue-rotate",
              "bem-invert"
            ],
            cssStylesForEmoteNode: <IHashMapOfStrings> {
              height: "300px",
              width: "300px",
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
              backgroundPosition: "-2px -2px",
              backgroundImage: "url(//b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png)",
              left: "99",
              zIndex: "5",
              animation: "vibrate 0.05s linear infinite,-zspin 2s linear infinite,brody  1.27659s infinite ease",
              transform: "rotate(270deg) scaleX(-1)",
              textAlign: 'center',
              fontSize: '26px',
              fontFamily: 'Impact,sans-serif',
              textShadow: '2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black',
              color: 'white',
              textTransform: 'uppercase',
              lineHeight: '26px'
            },

            cssClassesForParentNode: ["rotation-wrapper"],
            cssStylesForParentNode: <IHashMapOfStrings> {
                height: "327px",
                display: "inline-block",
                marginTop: "25px",
                position: "relative",
                animation: "slideleft 2s infinite ease",
            },

            emText: 'first line',
            emStyles: <IHashMapOfStrings> {
              'width': '280px',
              'position': 'absolute',
              'fontStyle': 'normal',
              'color': 'white',
              'top': '5px',
              'left': '50%',
              'marginLeft': '-140px'
            },
            strongText: 'second line',
            strongStyles: <IHashMapOfStrings> {
              'bottom': '5px',
              'left': '50%',
              'position': 'absolute',
              'color': 'white',
              'marginLeft': '-140px',
              'width': '280px',
              'fontWeight': 'normal',
            },
            altText: 'some alt text'
          };

          const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
          const actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
          should(actual).eql(expected);
      });
      it('should correctly generate metadata for forward slide with no brody and no spin', () => {
        const input = <EmoteObject> {
            originalString: '[](/ivyrage-slide-s13)',
            emoteIdentifier: 'ivyrage',
            flagsString: '-slide-s13',

            speed: "13s",
            slide: true,
            vibrate: false,
            reverse: false,
            hueRotate: false,
            invertColors: false,
            spin: "",
            rotateDegrees: 0,
            brody: false,
            xAxisTranspose: 0,
            zAxisTranspose: 0,

            firstLineText: "",
            secondLineText: "",
            altText: ""
        };
          const expected = <HtmlOutputData> {
            emoteData : ivyrage,
            titleForEmoteNode: "ivyrage,ierage from /r/marmemotes effects: -slide-s13",

            cssClassesForEmoteNode: [
              "berryemote",
            ],
            cssStylesForEmoteNode: <IHashMapOfStrings> {
              height: "140px",
              width: "200px",
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
              animation: "slideleft 13s infinite ease,slideflip 13s infinite ease",
              backgroundImage: "url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png)",
              backgroundPosition: "0px 0px"
            },

            cssClassesForParentNode: [],
            cssStylesForParentNode: <IHashMapOfStrings> {}
          };

          const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
          const actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
          should(actual).eql(expected);
      });
      it('should correctly generate metadata for reverse slide with no brody and no spin', () => {
        const input = <EmoteObject> {
            originalString: '[](/ivyrage-r-slide)',
            emoteIdentifier: 'ivyrage',
            flagsString: '-r-slide',

            speed: "",
            slide: true,
            vibrate: false,
            reverse: true,
            hueRotate: false,
            invertColors: false,
            spin: "",
            rotateDegrees: 0,
            brody: false,
            xAxisTranspose: 0,
            zAxisTranspose: 0,

            firstLineText: "",
            secondLineText: "",
            altText: ""
        };
          const expected = <HtmlOutputData> {
            emoteData : ivyrage,
            titleForEmoteNode: "ivyrage,ierage from /r/marmemotes effects: -r-slide",

            cssClassesForEmoteNode: [
              "berryemote",
            ],
            cssStylesForEmoteNode: <IHashMapOfStrings> {
              height: "140px",
              width: "200px",
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
              transform: 'scaleX(-1)',
              animation: "slideleft 8s infinite ease,-slideflip 8s infinite ease",
              backgroundImage: "url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png)",
              backgroundPosition: "0px 0px"
            },

            cssClassesForParentNode: [],
            cssStylesForParentNode: <IHashMapOfStrings> {}
          };

          const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
          const actual = emoteHtml.getEmoteHtmlMetadataForObject(input);
          should(actual).eql(expected);
      });
    });

    describe('#getEmoteHtmlForObject', () => {
        it('should correctly generate html for a simple emote', () => {
          const input = <EmoteObject> {
                originalString: '[](/ierage)',
                emoteIdentifier: 'ierage',
            };
            const expected =
              '<span class="berryemote" ' +
                'title="ivyrage,ierage from /r/marmemotes" ' +
                'style="' +
                  'height: 140px;' +
                  'width: 200px;' +
                  'display: inline-block;' +
                  'position: relative;' +
                  'overflow: hidden;' +
                  'background-position: 0px 0px;' +
                  'background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);' +
              '"></span>';

            const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            const actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });

        it('should correctly generate html for an emote with one flag', () => {
          const input = <EmoteObject> {
                originalString: '[](/ierage-v)',
                emoteIdentifier: 'ierage',
                flagsString: '-v',

                vibrate: true,
            };
            const expected =
              '<span class="berryemote" ' +
                'title="ivyrage,ierage from /r/marmemotes effects: -v" ' +
                'style="' +
                  'height: 140px;' +
                  'width: 200px;' +
                  'display: inline-block;' +
                  'position: relative;' +
                  'overflow: hidden;' +
                  'background-position: 0px 0px;' +
                  'background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);' +
                  'animation: vibrate 0.05s linear infinite;' +
              '"></span>';

            const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            const actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });

        it('should correctly generate html for a flag that adds a css class', () => {
            const input = <EmoteObject> {
                originalString: '[](/ierage-invert)',
                emoteIdentifier: 'ierage',
                flagsString: '-invert',

                invertColors: true,
            };
            const expected =
      				'<span class="berryemote bem-invert" ' +
      					'title="ivyrage,ierage from /r/marmemotes effects: -invert" ' +
      					'style="' +
      						'height: 140px;' +
      						'width: 200px;' +
      						'display: inline-block;' +
      						'position: relative;' +
      						'overflow: hidden;' +
      						'background-position: 0px 0px;' +
      						'background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);' +
      				'"></span>';

            const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            const actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });

        it('should  html for a 45 degree rotate', () => {
            const input = <EmoteObject> {
                originalString: '[](/rdwut-45)',
                emoteIdentifier: 'rdwut',
                flagsString: '-45',

                rotateDegrees: 45,
            };
            const expected =
              '<span class="rotation-wrapper" style="height: 85px;display: inline-block;margin-top: 14px;position: relative;">' +
                '<span class="berryemote" ' +
                  'title="rb32,b32,rdwut,rrdwut from /r/mylittlepony effects: -45" ' +
                  'style="height: 70px;' +
                    'width: 70px;' +
                    'display: inline-block;' +
                    'position: relative;' +
                    'overflow: hidden;' +
                    'background-position: -300% -200%;' +
                    'background-image: url(//b.thumbs.redditmedia.com/HUq7klYsvTd62aP39_qG_qIxjSGcSSzzsoslePOPC-A.png);' +
                    'transform: rotate(45deg);"' +
                '></span>' +
              '</span>';

            const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            const actual = emoteHtml.getEmoteHtmlForObject(input);
            should(actual).eql(expected);
        });


        it('should correctly generate html for an emote with all features', () => {
           const input = <EmoteObject> {
               originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
               emoteIdentifier: 'adviceajlie',
               flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',

               // since 'fastest' is just an alias for '2s', it parses as 2s
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

           const expected =
             '<span class="rotation-wrapper" style="' +
                'height: 327px;' +
                'display: inline-block;' +
                'margin-top: 25px;' +
                'position: relative;' +
                'animation: slideleft 2s infinite ease;' +
              '">' +
              '<span class="berryemote nsfw bem-hue-rotate bem-invert" title="adviceajlie from /r/adviceponies effects: -v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5" style="' +
                  'height: 300px;' +
                  'width: 300px;' +
                  'display: inline-block;' +
                  'position: relative;' +
                  'overflow: hidden;' +
                  'background-position: -2px -2px;' +
                  'background-image: url(//b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png);' +
                  'left: 99;' +
                  'z-index: 5;' +
                  'animation: vibrate 0.05s linear infinite,-zspin 2s linear infinite,brody  1.27659s infinite ease;' +
                  'transform: rotate(270deg) scaleX(-1);' +
                  'text-align: center;' +
                	'font-size: 26px;' +
                	'font-family: Impact,sans-serif;' +
                	'text-shadow: 2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black;' +
                	'color: white;' +
                	'text-transform: uppercase;' +
                	'line-height: 26px;' +
              '">' +
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
  		          'some alt text' +
              '</span>' +
            '</span>';


           const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
           const actual = emoteHtml.getEmoteHtmlForObject(input);
           compareAsArrays(actual, expected);
           should(actual).eql(expected);
        });
    });
});
