import { Injectable } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ImportService } from 'chrec-core/lib/service/import.service';

@Injectable()
export class ProjectFactory {

  private importService: ImportService = new ImportService();

  public fromStorageJson(parsedJson: any): Project {
    return this.importService.reviveProject(parsedJson);
  }
}
