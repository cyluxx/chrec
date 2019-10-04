import { Browser } from 'chrec-core/lib/model/browser/browser';

export class Settings {

  constructor(
    // General Settings
    public homeUrl: string,
    public recentlyOpenedPath: string,
    public webviewWidth: number,
    public webviewHeight: number,
    public shouldMaximizeWebviewSize: boolean,

    // Webdriver Settings
    public seleniumGridUrl: string,
    public browsers: Browser[]

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
  ) { }
}
