import { Project } from 'chrec-core/lib/model/project';
import * as ProjectActions from '../actions/project.actions';

export type Action = ProjectActions.All;

export function projectReducer(project: Project = null, action: Action): Project {
    console.log(action.type, project);

    switch (action.type) {
        case ProjectActions.CREATE:
            return new Project(action.payload, [], []);
        case ProjectActions.EDIT_NAME:
            project.setName(action.payload);
            return project;
        default:
            return project;
    }
}