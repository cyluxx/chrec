import { Injectable } from "@angular/core";
import * as util from 'util';
import * as storage from 'electron-json-storage';
import { AlexExport } from "../model/alex-export";

@Injectable()
export class AlexExportDao {

    private set: (fileName: string, object: object, options: object) => Promise<void>;

    constructor() {
        this.set = util.promisify(storage.set);
    }

    public async create(fileName: string, alexExport: AlexExport, path: string): Promise<void> {
        console.log('%cSaved Alex Export: ' + fileName + ' under ' + path, 'font-weight:bold; color:#42ff42');
        return await this.set(fileName, alexExport, { dataPath: path });
    }
}