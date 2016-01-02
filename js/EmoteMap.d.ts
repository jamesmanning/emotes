import IEmoteDataEntry from './IEmoteDataEntry';
export default class EmoteMap {
    constructor(emoteData: IEmoteDataEntry[]);
    findEmote(emoteName: string): IEmoteDataEntry;
    private emoteMap;
    private buildEmoteMap(emoteData);
}
