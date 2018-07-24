import { remote, Options } from 'webdriverio';
import { Injectable } from '../../../node_modules/@angular/core';


@Injectable()
export class WebdriverService {
    options: Options = {
        desiredCapabilities: {
            browserName: 'chromium'
        }
    };

    constructor() { }

    test(): void {
        remote(this.options)
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