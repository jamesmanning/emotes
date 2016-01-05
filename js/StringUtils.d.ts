import IHashMapOfStrings from './IHashMapOfStrings';
import HtmlOutputData from './HtmlOutputData';
export default class StringUtils {
    private static uppercasePattern;
    static convertCamelCaseToHyphenated(styleName: string): string;
    private static hyphenPattern;
    static convertHyphenatedToCamelCase(styleName: string): string;
    static createMarkupForStyles(styles: IHashMapOfStrings): string;
    static createHtmlString(tag: string, text: string, styles: IHashMapOfStrings): string;
    static createInnerHtml(htmlOutputData: HtmlOutputData): string;
}
