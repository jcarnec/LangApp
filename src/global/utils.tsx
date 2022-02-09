export function replaceDot(s: string) : string {
    return s.replace(".", "_DOT_")
}

export function unReplaceDot(s: string) : string {
    return s.replace("_DOT_", ".")
}