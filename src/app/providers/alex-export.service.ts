import { Injectable } from "@angular/core";
import { AlexExportDao } from "../dao/alex-export.dao";
import { AlexExport } from "../model/alex-export";
import { Project } from "../model/project";
import { AlexExportFactory } from "../factory/alex-export.factory";

@Injectable()
export class AlexExportService {

    private alexExportDao: AlexExportDao;
    private alexExportFactory: AlexExportFactory;

    constructor(alexEportDao: AlexExportDao, alexExportFactory: AlexExportFactory) {
        this.alexExportDao = alexEportDao;
        this.alexExportFactory = alexExportFactory;
    }

    public async export(fileName: string, project: Project, path: string): Promise<void> {
        if(!fileName){
            throw new Error('AlexExportService: FileName not defined!');
        }
        if(!path){
            throw new Error('AlexExportService: Path not defined!');
        }
        let alexExport = this.alexExportFactory.fromProject(project);
        this.alexExportDao.create(fileName, alexExport, path);
    }
}