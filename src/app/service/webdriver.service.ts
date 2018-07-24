import * as WebdriverIO from 'webdriverio';
import { Injectable } from '../../../node_modules/@angular/core';


@Injectable({
    providedIn: 'root',
})
export class WebdriverService {
    options: WebdriverIO.Options = {
        desiredCapabilities: {
            browserName: 'chromium'
        }
    };

    constructor() { }

    test(): void {
        WebdriverIO
            .remote(this.options)
            .init()
            .url('http://www.google.com')
            .getTitle().then(function (title) {
                console.log('Title was: ' + title);
            })
            .end()
            .catch(function (err) {
                console.log(err);
            });
    }
}


