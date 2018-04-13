import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfEmoteDataEntries from './IHashMapOfEmoteDataEntries';

export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]) {
        this.loadData(emoteData);
    }

    loadData(emoteData: IEmoteDataEntry[]) {
        this.emoteCount = emoteData.length;
        this.emoteMap = this.buildEmoteMap(emoteData);
        this.allEmoteNames = Object.keys(this.emoteMap);
        this.emoteImages = this.allEmoteNames.map(name => {
            return {
                name: name, 
                imageUrl: this.emoteMap[name]["background-image"],
            }
        });
    }

    findEmote(emoteName: string): IEmoteDataEntry {
        return this.emoteMap[emoteName];
    }

    public emoteMap: IHashMapOfEmoteDataEntries;
    public allEmoteNames: string[];
    public emoteCount: number;
    public emoteImages: {name: string, imageUrl: string}[];

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
