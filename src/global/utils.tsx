export function replaceDot(s: string) : string {
    return s.replace(".", "_DOT_")
}

export function unReplaceDot(s: string) : string {
    return s.replace("_DOT_", ".")
}

export function countryCodeString(s: string) : string {
    try {
        let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
        return languageNames.of(s)
    } catch {
        return ""
    }
}