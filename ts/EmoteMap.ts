import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfEmoteDataEntries from './IHashMapOfEmoteDataEntries';

export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]) {
        this.loadData(emoteData);
    }

    loadData(emoteData: IEmoteDataEntry[]) {
        this.emoteCount = emoteData.length;
        this.emoteMap = this.buildEmoteMap(emoteData);
    }

    findEmote(emoteName: string): IEmoteDataEntry {
        return this.emoteMap[emoteName];
    }

    private emoteMap: IHashMapOfEmoteDataEntries;
    private emoteCount: number;

    get loadedEmoteCount() {
        return this.emoteCount;
    }

    private buildEmoteMap(emoteData: IEmoteDataEntry[]): IHashMapOfEmoteDataEntries {
        const map: IHashMapOfEmoteDataEntries = {};
        emoteData.forEach(emote => {
          emote.names.forEach(name => {
                map[name] = emote;
            });
        });
        return map;
    }
}
