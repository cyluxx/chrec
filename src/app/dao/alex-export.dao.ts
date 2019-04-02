import { Injectable } from '@angular/core';
import * as util from 'util';
import { set, get, remove, getDefaultDataPath, DataOptions } from 'electron-json-storage';
import { AlexExport } from 'chrec-core/lib/export/alex/alex-export';

@Injectable()
export class AlexExportDao implements Dao<AlexExport> {

  private set: (fileName: string, alexExport: AlexExport, options?: DataOptions, error?: any) => Promise<void>;
  private get: (fileName: string, options?: DataOptions, error?: any) => Promise<AlexExport>;
  private remove: (fileName: string, options?: DataOptions, error?: any) => Promise<void>;

  constructor() {
    this.set = util.promisify(set);
    this.get = util.promisify(get);
    this.remove = util.promisify(remove);

    console.log('%cDefault AlexExport Storage Data Path: ' + getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
  }

  public async createOrUpdate(fileName: string, alexExport: AlexExport, path?: string): Promise<void> {
    if (path) {
      await this.set(fileName, alexExport, { dataPath: path });
    }
    await this.set(fileName, alexExport);
    console.log(`%cCreate or Update ${fileName} at ${path}`, 'font-weight:bold; color:#42ff42');
    console.log(alexExport);
  }

  public async read(fileName: string, path?: string): Promise<AlexExport> {
    throw new Error('Reading Exported Alex Files currently not supported');
  }

  public async delete(fileName: string, path?: string): Promise<void> {
    throw new Error('Deleting Exported Alex Files currently not supported');
  }
}
