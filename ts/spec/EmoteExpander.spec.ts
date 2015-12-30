/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteMap from '../EmoteMap';
import EmoteExpansionOptions from '../EmoteExpansionOptions';
import EmoteExpander from '../EmoteExpander';
import IEmoteDataEntry from '../IEmoteDataEntry';

const options = new EmoteExpansionOptions();
const emoteData: IEmoteDataEntry[] = require('./sample_data.json');
const emoteExpander = new EmoteExpander(emoteData, options);

describe('EmoteExpander', () => {
    describe('#expand', () => {
        it('should correctly perform on a simple emote replace', () => {
            const input = '[](/ierage)';
            const expected = '<span class="berryemote" title="ivyrage,ierage from /r/marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';

            const actual = emoteExpander.expand(input);
            should(actual).eql(expected);
        });

        it('should correctly perform on an emote with one modifier', () => {
            const input = '[](/ierage-v)';
            const expected = '<span class="berryemote" title="ivyrage,ierage from /r/marmemotes effects: -v" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png); animation: vibrate 0.05s infinite linear; -webkit-animation: vibrate 0.05s infinite linear;"></span>';

            const actual = emoteExpander.expand(input);
            should(actual).eql(expected);
        });
    });
});
