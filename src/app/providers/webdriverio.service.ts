import { Injectable } from '@angular/core';
import { remote, Options } from 'webdriverio';

@Injectable()
export class WebdriverioService {
    remote: typeof remote;
    options: Options;

    constructor() {
        this.options = {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }

    test(): void {
        // remote(this.options)
        //     .init()
        //     .url('http://www.google.com')
        //     .getTitle().then(function (title) {
        //         console.log('Title was: ' + title);
        //     })
        //     .end()
        //     .catch(function (err) {
        //         console.log(err);
        //     });
    }
}
