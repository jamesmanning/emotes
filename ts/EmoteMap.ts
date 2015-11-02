/// <reference path="typings/underscore/underscore.d.ts" />

import _ from 'underscore';
import IEmoteDataEntry from './IEmoteDataEntry';

export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]) {
        this.emoteMap = this.buildEmoteMap(emoteData);
    }

    findEmote(emoteName: string): IEmoteDataEntry {
        return this.emoteMap[emoteName];
    }

    private emoteMap: _.Dictionary<IEmoteDataEntry>;

    private buildEmoteMap(emoteData: IEmoteDataEntry[]): _.Dictionary<IEmoteDataEntry> {
        const map: _.Dictionary<IEmoteDataEntry> = {};
        _.each(emoteData, emote=> {
            _.each(emote.names, name=> {
                map[name] = emote;
            });
        });
        return map;
    }
}
