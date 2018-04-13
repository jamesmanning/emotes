import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfEmoteDataEntries from './IHashMapOfEmoteDataEntries';
export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]);
    loadData(emoteData: IEmoteDataEntry[]): void;
    findEmote(emoteName: string): IEmoteDataEntry;
    emoteMap: IHashMapOfEmoteDataEntries;
    allEmoteNames: string[];
    emoteCount: number;
    emoteImages: {
        name: string;
        imageUrl: string;
    }[];
    private buildEmoteMap(emoteData);
}
