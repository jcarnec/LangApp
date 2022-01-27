import { ipv4Address } from "../../global/constants";

export function getUpdateInterestUrl() {
    return 'http://' + ipv4Address +':8080/updateInterest';
}

export function getInterestsRSSUrl() {
    return 'http://' + ipv4Address + ':8080/getInterestsRSS';
}


export function getLearningUrl() {
    return 'http://' + ipv4Address + ':8080/getLearning';
}
export function postLearningUrl() {
    return 'http://' + ipv4Address + ':8080/postLearning';
}


export function getTranslateUrl() {
    return 'http://' + ipv4Address + ':8080/getTranslate';
}
export function postTranslateUrl() {
    return 'http://' + ipv4Address + ':8080/postTranslate';
}
export function getLanguagePairUrl() {
    return 'http://' + ipv4Address + ':8080/getLanguagePair';
}