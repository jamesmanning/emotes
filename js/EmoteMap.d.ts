import IEmoteDataEntry from './IEmoteDataEntry';
export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]);
    loadData(emoteData: IEmoteDataEntry[]): void;
    findEmote(emoteName: string): IEmoteDataEntry;
    private emoteMap;
    private emoteCount;
    readonly loadedEmoteCount: number;
    private buildEmoteMap(emoteData);
}
