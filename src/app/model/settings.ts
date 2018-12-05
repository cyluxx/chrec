import { Browser } from "./browser";

export class Settings {
    //General Settings
    homeUrl: string;
    webviewWidth: number;
    webviewHeight: number;

    //Webdriver Settings
    seleniumGridUrl: string;
    browsers: Browser[];

    //Stability Settings
    useCssSelectorGenerator: boolean;
    useFinder: boolean;
    useGetQuerySelector: boolean;
    useOptimalSelect: boolean;
    useSelectorQuery: boolean;
    useBoundingBox: boolean;
    useBoundingBoxTransposition: boolean;
    useTemplateMatching: boolean;
    useFeatureMatching: boolean;

    //Alex Settings
    alexUrl: string;
    alexEmail: string;
    alexPassword: string;

    constructor(){
        this.browsers = [];
    }
}