import * as path from 'path';
import { Core } from 'chrec-core';
import { ExportService } from 'chrec-core/lib/service/export.service';
import { Injectable } from '@angular/core';
import { AlexExportDao } from '../dao/alex-export.dao';
import { Project } from 'chrec-core/lib/model/project';

@Injectable()
export class ProjectService {

  private core: Core = new Core();
  private exportService: ExportService = new ExportService();

  constructor(private alexExportDao: AlexExportDao) { }

  public newProject(name: string): Project {
    return new Project(name, [], []);
  }

  public async readProject(absolutePath: string): Promise<Project> {
    return this.core.importChrecJson(path.resolve(absolutePath));
  }

  public saveProject(project: Project, absolutePath: string): void {
    this.core.exportChrecJson(project, path.resolve(absolutePath));
  }

  public exportAlexJson(fileName: string, project: Project, dirName: string): void {
    const alexExport = this.exportService.convertToAlex(project);
    this.alexExportDao.createOrUpdate(fileName, alexExport, dirName);
  }
}
