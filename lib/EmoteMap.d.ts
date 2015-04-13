/// <reference path="../typings/underscore/underscore.d.ts" />
import IEmoteDataEntry = require('./IEmoteDataEntry');
export = EmoteMap;
declare class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]);
    findEmote(emoteName: string): IEmoteDataEntry;
    private emoteMap;
    private buildEmoteMap(emoteData);
}
