﻿/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

require('should');
require('../EmoteMap');

var emoteData = require('./sample_data.json');

import EmoteExpansionOptions = require('../EmoteExpansionOptions');
import EmoteExpander = require('../EmoteExpander');

var options = new EmoteExpansionOptions();
var emoteExpander = new EmoteExpander(emoteData, options);

describe('EmoteExpander', () => {
    describe('#expand', () => {
        it('should correctly perform on a simple emote replace', () => {
            var input = '[](/ierage)';
            var expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png);"></span>';

            var actual = emoteExpander.expand(input);
            actual.should.eql(expected);
        });

        it('should correctly perform on an emote with one modifier', () => {
            var input = '[](/ierage-v)';
            var expected = '<span class="berryemote" title="ivyrage,ierage from marmemotes" style="height: 140px; width: 200px; display: inline-block; position: relative; overflow: hidden; background-position: 0px 0px; background-image: url(http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png); animation: vibrate 0.05s infinite linear; -webkit-animation: vibrate 0.05s infinite linear;"></span>';

            var actual = emoteExpander.expand(input);
            actual.should.eql(expected);
        });
    });
});