export = HtmlOutputData;

import StyleAttribute = require("StyleAttribute");

class HtmlOutputData {
    titleForEmoteNode: string;

    cssClassesForEmoteNode: string[] = [];
    cssStylesForEmoteNode: StyleAttribute[] = [];

    cssClassesForParentNode: string[] = [];
    cssStylesForParentNode: StyleAttribute[] = [];
}