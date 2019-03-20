import { Core } from 'chrec-core';
import { ExportService } from 'chrec-core/lib/service/export.service';
import { Injectable } from '@angular/core';
import { AlexExportDao } from '../dao/alex-export.dao';
import { ProjectDao } from '../dao/project.dao';
import { Project } from 'chrec-core/lib/model/project';

@Injectable()
export class ProjectService {

  private core: Core = new Core();
  private exportService: ExportService = new ExportService();

  constructor(private alexExportDao: AlexExportDao, private projectDao: ProjectDao) { }

  public newProject(name: string): Project {
    return new Project(name, [], []);
  }

  public async readProject(fileName: string, absolutePath?: string): Promise<Project> {
    return this.projectDao.read(fileName, absolutePath);
  }

  public saveProject(fileName: string, project: Project, absolutePath?: string): void {
    this.projectDao.createOrUpdate(fileName, project, absolutePath);
  }

  public exportToAlexJson(fileName: string, project: Project, dirName: string): void {
    const alexExport = this.exportService.convertToAlex(project);
    this.alexExportDao.createOrUpdate(fileName, alexExport, dirName);
  }

  public exportToChrecJson(project: Project, dirName: string): void {
    // TODO: Validation
    this.core.exportToChrecJson(project, dirName);
  }

  public async  importFromChrecJson(absolutePath: string): Promise<Project> {
    // TODO: Validation
    return this.core.importFromChrecJson(absolutePath);
  }
}
