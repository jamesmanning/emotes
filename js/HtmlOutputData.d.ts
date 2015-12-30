import StyleAttribute from "./StyleAttribute";
import IEmoteDataEntry from './IEmoteDataEntry';
export default class HtmlOutputData {
    emoteData: IEmoteDataEntry;
    titleForEmoteNode: string;
    cssClassesForEmoteNode: string[];
    cssStylesForEmoteNode: StyleAttribute[];
    cssClassesForParentNode: string[];
    cssStylesForParentNode: StyleAttribute[];
}
