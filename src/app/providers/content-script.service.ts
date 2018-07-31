import { Injectable } from '@angular/core';
import * as fs from 'fs';

@Injectable()
export class ContentScriptService {
    constructor() {
    
    }

    read(): string{
        return fs.readFileSync('./content-scripts/test.js','utf-8');
    }
}
