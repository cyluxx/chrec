import { Browser } from 'chrec-core/lib/model/browser/browser';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';

export class Settings {
    // General Settings
    homeUrl = 'https://github.com/cyluxx/chrec';
    recentlyOpenedPath = '';
    webviewWidth = 800;
    webviewHeight = 600;

    // Webdriver Settings
    seleniumGridUrl = 'http://localhost:4444/wd/hub';
    browsers: Browser[] = [new Chrome('default', 800, 600, false)];

    // Stability Settings
    // useCssSelectorGenerator: boolean;
    // useFinder: boolean;
    // useGetQuerySelector: boolean;
    // useOptimalSelect: boolean;
    // useSelectorQuery: boolean;
    // useBoundingBox: boolean;
    // useBoundingBoxTransposition: boolean;
    // useTemplateMatching: boolean;
    // useFeatureMatching: boolean;

    // Alex Settings
    // alexUrl: string;
    // alexEmail: string;
    // alexPassword: string;
}
