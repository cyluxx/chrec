import { Injectable } from '@angular/core';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { ImportService } from 'chrec-core/lib/service/import.service';

@Injectable()
export class BrowserFactory {

  private importService: ImportService = new ImportService();

  public fromStorageJson(parsedJson: any): Browser {
    return this.importService.reviveBrowser(parsedJson);
  }
}
