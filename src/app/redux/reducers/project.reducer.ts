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
        case ProjectActions.ADD_SEQUENCE:
            project.getSequences().push(action.payload);
            return project;
        case ProjectActions.ADD_TEST_RESULT:
            project.addTestResult(action.payload);
            return project;
    }
    return project;
}
