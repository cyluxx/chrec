import { Browser } from "./browser";

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
    useTemplateMatching: boolean;
    useFeatureMatching: boolean;

    constructor(){
        this.browsers = [];
    }
}