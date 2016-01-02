import HtmlOutputData from "./HtmlOutputData";
import EmoteMap from './EmoteMap';
import EmoteExpansionOptions from './EmoteExpansionOptions';
import EmoteEffectsModifier from './EmoteEffectsModifier';
import EmoteFlags from './EmoteFlags';
import EmoteObject from './EmoteObject';
import IEmoteDataEntry from './IEmoteDataEntry';
import HtmlElementStyle from './HtmlElementStyle';


export default class EmoteHtml {
    private effectsModifier = new EmoteEffectsModifier();

    constructor(private emoteMap: EmoteMap, private emoteExpansionOptions = new EmoteExpansionOptions()) {

    }

    private isEmoteEligible(emote: IEmoteDataEntry): boolean {
        // TODO: replace with config check (nsfw, etc)
        return true;
    }

    private getBaseHtmlDataForEmote(emoteDataEntry: IEmoteDataEntry): HtmlOutputData {

        const ret: HtmlOutputData = {
            emoteData: emoteDataEntry,
            titleForEmoteNode: `${emoteDataEntry.names.join(',')} from /r/${emoteDataEntry.sr}`,

            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: <HtmlElementStyle> {},

            cssClassesForParentNode: [],
            cssStylesForParentNode: <HtmlElementStyle> {}
        };

        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }

        ret.cssStylesForEmoteNode.height              = `${emoteDataEntry.height}px`                  ;
        ret.cssStylesForEmoteNode.width               = `${emoteDataEntry.width}px`                   ;
        ret.cssStylesForEmoteNode.display             = 'inline-block'                                ;
        ret.cssStylesForEmoteNode.position            = 'relative'                                    ;
        ret.cssStylesForEmoteNode.overflow            = 'hidden'                                      ;
        ret.cssStylesForEmoteNode.backgroundPosition  = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        ret.cssStylesForEmoteNode.backgroundImage     = `url(${emoteDataEntry['background-image']})`;

        return ret;
    }

    getEmoteHtmlMetadataForObject(emoteObject: EmoteObject): HtmlOutputData {
        const emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return null;
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return null;
        }

        const htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);

        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        return htmlOutputData;
    }

    getEmoteHtmlForObject(emoteObject: EmoteObject): string {
        const emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return `[Unable to find emote by name <b>${emoteObject.emoteIdentifier}</b>]`;
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return `[skipped expansion of emote ${emoteObject.emoteIdentifier}]`;
        }

        const htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);

        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        const htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    }

    // simplified version of what react does to generate the style attribute from an object
    // https://github.com/facebook/react/blob/3b96650e39ddda5ba49245713ef16dbc52d25e9e/src/renderers/dom/shared/CSSPropertyOperations.js#L130-L147
    private createMarkupForStyles(styles: HtmlElementStyle) {
      var serialized = '';
      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        var styleValue = styles[styleName];
        if (styleValue != null) {
          serialized += `${this.convertCamelCaseToHyphenated(styleName)}: ${styleValue};`
        }
      }
      return serialized || null;
    }

    // don't need to support the -ms- prefix,  so only need hyphenate
    // see https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenateStyleName.js
    // and https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenate.js
    private uppercasePattern = /([A-Z])/g;
    private convertCamelCaseToHyphenated(styleName: string): string {
      return styleName.replace(this.uppercasePattern, '-$1').toLowerCase();
    }

    private serializeHtmlOutputData(htmlOutputData: HtmlOutputData): string {
        const styleValue = this.createMarkupForStyles(htmlOutputData.cssStylesForEmoteNode);
        const outerStyleValue = this.createMarkupForStyles(htmlOutputData.cssStylesForParentNode);
        let html = `<span class="${htmlOutputData.cssClassesForEmoteNode.join(' ')}" title="${htmlOutputData.titleForEmoteNode}" style="${styleValue}"></span>`;
        if (htmlOutputData.cssClassesForParentNode.length > 0 || outerStyleValue) {
            // wrap with the specified span tag
            html = `<span class="${htmlOutputData.cssClassesForParentNode.join(' ')}" style="${outerStyleValue}">${html}</span>`;
        }

        return html;
    }
}
