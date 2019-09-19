import { Injectable } from '@angular/core';
import { Locator } from 'chrec-core/lib/model/locator/locator';
import { CssLocator } from 'chrec-core/lib/model/locator/css-locator';
import { XpathLocator } from 'chrec-core/lib/model/locator/xpath-locator';
import { ImportService } from 'chrec-core/lib/service/import.service';

@Injectable()
export class LocatorFactory {

  private importService: ImportService = new ImportService();

  public fromChannelContent(channelContent: any): Locator {
    switch (channelContent.className) {
      case 'CssLocator': {
        return new CssLocator(channelContent.methodName, channelContent.value);
      }
      case 'XpathLocator': {
        return new XpathLocator(channelContent.methodName, channelContent.value);
      }
      default: {
        throw new Error('Locator Factory Error (fromChannelContent): Could not instaciate ' + channelContent.className);
      }
    }
  }

  public fromStorageJson(parsedJson: any): Locator {
    return this.importService.reviveLocator(parsedJson);
  }
}
