import IEmoteDataEntry from './IEmoteDataEntry';
import HtmlElementStyle from './HtmlElementStyle';

export default class HtmlOutputData {
    emoteData: IEmoteDataEntry;
    titleForEmoteNode: string;

    cssClassesForEmoteNode: string[] = [];
    cssStylesForEmoteNode: HtmlElementStyle = <HtmlElementStyle> {};

    cssClassesForParentNode: string[] = [];
    cssStylesForParentNode: HtmlElementStyle = <HtmlElementStyle> {};

    innerHtml: string;
    // firstLineText: string;
    // firstLineStyle: HtmlElementStyle;
    // secondLineText: string;
    // secondLineStyle: HtmlElementStyle;
    // altText: string;
}
