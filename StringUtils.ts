export = StringUtils;

class StringUtils {
    public static format(format: string, ...replacements: string[]) {
        var ret = format;
        for (var replacementIndex in replacements) {
            ret = ret.replace("{" + replacementIndex + "}", replacements[replacementIndex]);
        }
        return ret;
    }
}