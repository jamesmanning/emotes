"use strict";
// This represents the emote after it has been parsed.
// This should only be based on the emote string, decoupled
// from whether the identifier is valid, any associated lookup data, etc.
// It *should*, however, be in a valid state.  Validations on things like x-axis
// and z-axis transpose values should be done before populating them into this.
var EmoteObject = (function () {
    function EmoteObject() {
    }
    return EmoteObject;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteObject;
//# sourceMappingURL=EmoteObject.js.map