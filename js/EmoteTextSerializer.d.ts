import EmoteObject from './EmoteObject';
import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfStrings from './IHashMapOfStrings';
export default class EmoteTextSerializer {
    serialize(emoteObject: EmoteObject, emoteDataEntry: IEmoteDataEntry): string;
    private createMarkupForStyles(styles);
    private createHtmlString(tag, text, styles);
    getStylesFromEntry(prefix: string, emoteDataEntry: IEmoteDataEntry): IHashMapOfStrings;
}
