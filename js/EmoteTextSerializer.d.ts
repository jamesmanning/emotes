import EmoteObject from './EmoteObject';
import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfStrings from './IHashMapOfStrings';
import HtmlOutputData from './HtmlOutputData';
export default class EmoteTextSerializer {
    serializeFromObjectToHtmlOutputData(emoteData: IEmoteDataEntry, emoteObject: EmoteObject, htmlOutputData: HtmlOutputData): void;
    getStylesFromEntry(prefix: string, emoteDataEntry: IEmoteDataEntry): IHashMapOfStrings;
}
