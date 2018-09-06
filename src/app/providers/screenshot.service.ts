import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class ScreenshotService {

    private readFile: (path: string, options: string) => Promise<string>;

    constructor(){
        this.readFile = util.promisify(fs.readFile);
    }

    public async getScreenshot(path: string): Promise<string> {
        return await this.readFile(path, 'base64');
    } 
}