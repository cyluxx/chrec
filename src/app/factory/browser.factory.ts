import { Injectable } from '@angular/core';
import { ModelFactory } from 'chrec-core/lib/factory/model.factory';
import { Browser } from 'chrec-core/lib/model/browser/browser';

@Injectable()
export class BrowserFactory {

  private modelFactory: ModelFactory = new ModelFactory();

  public fromStorageJson(parsedJson: any): Browser {
    return this.modelFactory.browserFromChrecJson(parsedJson);
  }
}
