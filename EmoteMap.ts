/// <reference path="Scripts/typings/underscore/underscore.d.ts" />

//import _ = require('underscore');
require('underscore');
import IEmoteDataEntry = require('./IEmoteDataEntry');

declare var _: UnderscoreStatic;

export = EmoteMap;

class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]) {
        this.emoteMap = this.buildEmoteMap(emoteData);
    }

    findEmote(emoteName: string): IEmoteDataEntry {
        return this.emoteMap[emoteName];
    }

    private emoteMap: _.Dictionary<IEmoteDataEntry>;

    private buildEmoteMap(emoteData: IEmoteDataEntry[]): _.Dictionary<IEmoteDataEntry> {
        var map: _.Dictionary<IEmoteDataEntry> = {};
        _.each(emoteData, emote=> {
            _.each(emote.names, name=> {
                map[name] = emote;
            });
        });
        return map;
    }
}