/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

require('should');

import EmoteMap = require('../EmoteMap');
import EmoteHtml = require('../EmoteHtml');
import EmoteObject = require('../EmoteObject');
import EmoteExpansionOptions = require('../EmoteExpansionOptions');
import IEmoteDataEntry = require('../IEmoteDataEntry');

const emoteData : IEmoteDataEntry[] = require('./sample_data.json');
const emoteMap = new EmoteMap(emoteData);
const emoteExpansionOptions = new EmoteExpansionOptions();

describe('EmoteHtml', () => {
    describe('#getEmoteHtmlForObject', () => {
        it('should correctly generate html for a simple emote', () => {
            const input: EmoteObject = {
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
            const expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';

            const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            const actual = emoteHtml.getEmoteHtmlForObject(input);
            actual.should.eql(expected);
        });

        it('should correctly generate html for an emote with one flag', () => {
            const input : EmoteObject = {
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
            const expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png); animation: vibrate 0.05s infinite linear; -webkit-animation: vibrate 0.05s infinite linear;"></span>';

            const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);
            const actual = emoteHtml.getEmoteHtmlForObject(input);
            actual.should.eql(expected);
        });
    });
});
