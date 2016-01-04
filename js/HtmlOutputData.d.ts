import IEmoteDataEntry from './IEmoteDataEntry';
import HtmlElementStyle from './HtmlElementStyle';
export default class HtmlOutputData {
    emoteData: IEmoteDataEntry;
    titleForEmoteNode: string;
    cssClassesForEmoteNode: string[];
    cssStylesForEmoteNode: HtmlElementStyle;
    cssClassesForParentNode: string[];
    cssStylesForParentNode: HtmlElementStyle;
    innerHtml: string;
}
