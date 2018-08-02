import { Injectable } from '@angular/core';
import * as fs from 'fs';

@Injectable()
export class ContentScriptService {
    constructor() {
    
    }

    read(): string{
        return fs.readFileSync('./content-scripts/content-scripts.js','utf-8');
    }
}
