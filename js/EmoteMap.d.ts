import IEmoteDataEntry from './IEmoteDataEntry';
export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]);
    loadData(emoteData: IEmoteDataEntry[]): void;
    findEmote(emoteName: string): IEmoteDataEntry;
    private emoteMap;
    private buildEmoteMap(emoteData);
}
