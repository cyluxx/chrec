import { Injectable } from '@angular/core';
import { ImportService } from 'chrec-core/lib/service/import.service';
import { Project } from 'chrec-core/lib/model/project';

@Injectable()
export class ProjectFactory {

    private importService: ImportService = new ImportService();

    public fromStorageJson(parsedJson: any): Project {
        return this.importService.projectFromChrecJson(parsedJson);
    }
}