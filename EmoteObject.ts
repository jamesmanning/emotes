export = EmoteObject;

import IEmoteDataEntry = require('./IEmoteDataEntry');

// This represents the emote after it has been parsed.  
// This should only be based on the emote string, decoupled 
// from whether the identifier is valid, any associated lookup data, etc.
class EmoteObject {
    originalString: string;
    emoteIdentifier: string;

    speed: string;
    slide: string;
    vibrate: boolean;
    reverse: boolean;
    spin: string;
    rotateDegrees: number;
    brody: boolean;
    xAxisTranspose: number;
    zAxisTranspose: number;

    firstLineText: string;
    secondLineText: string;
}