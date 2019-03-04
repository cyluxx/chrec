import { Project } from 'chrec-core/lib/model/project';
import { Settings } from '../model/settings';

export interface AppState {
    project: Project;
    settings: Settings;
}