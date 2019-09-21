import { Injectable } from '@angular/core';
import { ImportService } from 'chrec-core/lib/service/import.service';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';

@Injectable()
export class ActionService {

  private importService: ImportService = new ImportService();

  public reviveHtmlElementAction(parsedJson: any): HtmlElementAction {
    return this.importService.reviveHtmlElementAction(parsedJson);
  }
}
