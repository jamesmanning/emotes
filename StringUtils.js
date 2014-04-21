
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.format = function (format) {
        var replacements = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            replacements[_i] = arguments[_i + 1];
        }
        var ret = format;
        for (var replacementIndex in replacements) {
            ret = ret.replace("{" + replacementIndex + "}", replacements[replacementIndex]);
        }
        return ret;
    };
    return StringUtils;
})();
module.exports = StringUtils;
//# sourceMappingURL=StringUtils.js.map
