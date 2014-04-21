export = EmoteHtml;

import HtmlOutputData = require("HtmlOutputData");
import EmoteMap = require('./EmoteMap');
import EmoteExpansionOptions = require('./EmoteExpansionOptions');
import EmoteEffectsModifier = require('./EmoteEffectsModifier');
import EmoteFlags = require('./EmoteFlags');
import EmoteObject = require('./EmoteObject');
import IEmoteDataEntry = require('./IEmoteDataEntry');
import StringUtils = require('./StringUtils');

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
            titleForEmoteNode: StringUtils.format('{0} from {1}', emoteDataEntry.names.join(','), emoteDataEntry.sr),

            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: [],

            cssClassesForParentNode: [],
            cssStylesForParentNode: []
        };

        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }

        ret.cssStylesForEmoteNode.push(
            { propertyName: 'height', propertyValue: emoteDataEntry.height.toString() + 'px' },
            { propertyName: 'width', propertyValue: emoteDataEntry.width.toString() + 'px' },
            { propertyName: 'display', propertyValue: 'inline-block' },
            { propertyName: 'position', propertyValue: 'relative' },
            { propertyName: 'overflow', propertyValue: 'hidden' },
            { propertyName: 'background-position', propertyValue: (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ') },
            { propertyName: 'background-image', propertyValue: ['url(', emoteDataEntry['background-image'], ')'].join('') });

        return ret;
    }

    getEmoteHtmlForObject(emoteObject: EmoteObject): string {
        var emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (typeof emoteData === "undefined") {
            return "Unable to find emote by name <b>" + emoteObject.emoteIdentifier + "</b>";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return '[skipped expansion of emote ' + emoteObject.emoteIdentifier + ']';
        }

        var htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);

        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        var htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    }

    private serializeHtmlOutputData(htmlOutputData: HtmlOutputData): string {
        var html = StringUtils.format('<span class="{0}" title="{1}" style="{2}"></span>',
            htmlOutputData.cssClassesForEmoteNode.join(' '),
            htmlOutputData.titleForEmoteNode,
            htmlOutputData.cssStylesForEmoteNode.map(a => StringUtils.format('{0}: {1}', a.propertyName, a.propertyValue)).join('; '));
        if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode.length > 0) {
            // wrap with the specified span tag
            html = StringUtils.format('<span class="{0}" style="{1}">{2}</span>',
                htmlOutputData.cssClassesForParentNode.join(' '),
                htmlOutputData.cssStylesForParentNode.map(a => StringUtils.format('{0}: {1}', a.propertyName, a.propertyValue)).join('; '),
                html);
        }

        return html;
    }
} 