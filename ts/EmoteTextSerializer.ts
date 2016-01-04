import EmoteObject from './EmoteObject';
import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfStrings from './IHashMapOfStrings';

export default class EmoteTextSerializer {
    serialize(emoteObject: EmoteObject, emoteDataEntry: IEmoteDataEntry): string {
      let html = '';
      if (emoteObject.firstLineText) {
        let emStyles = this.getStylesFromEntry('em-', emoteDataEntry);
        html += this.createHtmlString('em', emoteObject.firstLineText, emStyles);
      }
      if (emoteObject.secondLineText) {
        let strongStyles = this.getStylesFromEntry('strong-', emoteDataEntry);
        html += this.createHtmlString('strong', emoteObject.secondLineText, strongStyles);
      }
      if (emoteObject.altText) {
        let textStyles = this.getStylesFromEntry('text-', emoteDataEntry);
        html += this.createHtmlString('span', emoteObject.altText, textStyles);
      }
      return html;
    }

    private createMarkupForStyles(styles: IHashMapOfStrings): string {
      var serialized = '';
      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        var styleValue = styles[styleName];
        if (styleValue != null) {
          serialized += `${styleName}: ${styleValue};`
        }
      }
      return serialized || null;
    }

    private createHtmlString(tag: string, text: string, styles: IHashMapOfStrings) {
      var styleString = this.createMarkupForStyles(styles);
      return `<${tag} style="${styleString}">${text}</${tag}>`;
    }

    getStylesFromEntry(prefix: string, emoteDataEntry: IEmoteDataEntry): IHashMapOfStrings {
      const ret = <IHashMapOfStrings> {};
      for (var property in emoteDataEntry) {
        if (!emoteDataEntry.hasOwnProperty(property)) {
          continue;
        }
        if (property.startsWith(prefix)) {
          let strippedPropertyName = (<string>property).slice(prefix.length);
          ret[strippedPropertyName] = emoteDataEntry[property];
        }
      }
      return ret;
    }
}
