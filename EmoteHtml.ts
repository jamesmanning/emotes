export = EmoteHtml;

import HtmlOutputData = require("HtmlOutputData");
import EmoteMap = require('./EmoteMap');
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import EmoteEffectsModifier = require('./EmoteEffectsModifier');
import EmoteFlags = require('./EmoteFlags');
import EmoteObject = require('./EmoteObject');
import IEmoteDataEntry = require('./IEmoteDataEntry');

class EmoteHtml {
    private effectsModifier = new EmoteEffectsModifier();

    constructor(private emoteMap: EmoteMap, private emoteExpansionOptions: EmoteExpansionOptions) {
        
    }

    private isEmoteEligible(emote: IEmoteDataEntry): boolean {
        // TODO: replace with config check (nsfw, etc)
        return true;
    }

    private getBaseHtmlDataForEmote(emoteDataEntry: IEmoteDataEntry): HtmlOutputData {

        var ret: HtmlOutputData = {
            titleForEmoteNode: `${emoteDataEntry.names.join(',')} from ${emoteDataEntry.sr}`,

            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: [],

            cssClassesForParentNode: [],
            cssStylesForParentNode: []
        };

        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }

        ret.cssStylesForEmoteNode.push(
            { propertyName: 'height'             , propertyValue: `${emoteDataEntry.height}px` }                  ,
            { propertyName: 'width'              , propertyValue: `${emoteDataEntry.width}px` }                   ,
            { propertyName: 'display'            , propertyValue: 'inline-block' }                                ,
            { propertyName: 'position'           , propertyValue: 'relative' }                                    ,
            { propertyName: 'overflow'           , propertyValue: 'hidden' }                                      ,
            { propertyName: 'background-position', propertyValue: (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ') },
            { propertyName: 'background-image'   , propertyValue: `url(${emoteDataEntry['background-image']})` });

        return ret;
    }

    getEmoteHtmlForObject(emoteObject: EmoteObject): string {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return `[Unable to find emote by name <b>${emoteObject.emoteIdentifier}</b>]`;
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return `[skipped expansion of emote ${emoteObject.emoteIdentifier}]`;
        }

        var htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);

        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        var htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    }

    private serializeHtmlOutputData(htmlOutputData: HtmlOutputData): string {
        let styleValue = htmlOutputData.cssStylesForEmoteNode
            .map(a => `${a.propertyName}: ${a.propertyValue}`)
            .join('; ') + ';';
        let html = `<span class="${htmlOutputData.cssClassesForEmoteNode.join(' ')}" title="${htmlOutputData.titleForEmoteNode}" style="${styleValue}"></span>`;
        if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode.length > 0) {
            // wrap with the specified span tag
            let outerStyleValue = htmlOutputData.cssStylesForParentNode
                .map(a => `${a.propertyName}: ${a.propertyValue}`)
                .join('; ') + ';';
            html = `<span class="${htmlOutputData.cssClassesForParentNode.join(' ')}" style="${outerStyleValue}">${html}</span>`;
        }

        return html;
    }
} 