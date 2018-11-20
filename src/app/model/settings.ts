import { Browser, Type } from "./browser";

export class Settings {
    homeUrl: string;
    seleniumGridUrl: string;
    browsers: Browser[];
    numberIterations: number;

    useCssSelectorGenerator: boolean;
    useFinder: boolean;
    useGetQuerySelector: boolean;
    useOptimalSelect: boolean;
    useSelectorQuery: boolean;
    useBoundingBox: boolean;
    useBoundingBoxTransposition: boolean;
    useTemplateMatching: boolean;
    useFeatureMatching: boolean;

    alexUrl: string;
    alexEmail: string;
    alexPassword: string;

    constructor(){
        this.browsers = [];
    }
}