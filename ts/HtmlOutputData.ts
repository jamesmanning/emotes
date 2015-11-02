import StyleAttribute from "./StyleAttribute";

export default class HtmlOutputData {
    titleForEmoteNode: string;

    cssClassesForEmoteNode: string[] = [];
    cssStylesForEmoteNode: StyleAttribute[] = [];

    cssClassesForParentNode: string[] = [];
    cssStylesForParentNode: StyleAttribute[] = [];
}
