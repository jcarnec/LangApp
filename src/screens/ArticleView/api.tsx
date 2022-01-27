import { ipv4Address } from "../../global/constants";

export function getTranslationUrl(): string {
    return 'http://' + ipv4Address + ':8080/translate';
}