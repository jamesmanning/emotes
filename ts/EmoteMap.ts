/// <reference path="typings/underscore/underscore.d.ts" />

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
        emoteData.forEach(emote => {
          emote.names.forEach(name => {
                map[name] = emote;
            });
        });
        return map;
    }
}
