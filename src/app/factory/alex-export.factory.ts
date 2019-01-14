import { Injectable } from "@angular/core";
import { AlexExport, SymbolGroup, Symbol, Step, Action as AlexAction, Node, NodeType, ActionType } from "../model/alex-export";
import { Project } from "../model/project";
import { HtmlElementAction, Action as ChrecAction, Click, Type, Read, GoTo, Refresh } from "../model/action";
import { Type as SelectorType } from "../model/selector";

@Injectable()
export class AlexExportFactory {

    public fromProject(project: Project): AlexExport {
        let symbols: Symbol[] = [];
        for (let sequence of project.sequences) {
            let steps: Step[] = [];
            for (let i: number = 0; i < sequence.actions.length; i++) {
                steps.push(new Step(this.getAlexAction(sequence.actions[i]), i));
            }
            symbols.push(new Symbol(sequence.name, steps))
        }
        let symbolGroup = new SymbolGroup(symbols);
        return new AlexExport(symbolGroup);
    }

    public getAlexAction(chrecAction: ChrecAction): AlexAction {
        let node: Node;
        let value: string;
        let url: string;
        let actionType: ActionType;
        if (chrecAction instanceof HtmlElementAction) {
            if (chrecAction.getBestSelector().type === SelectorType.Css) {
                node = new Node(chrecAction.getBestSelector().value, NodeType.CSS);
            }
            else {
                node = new Node(chrecAction.getBestSelector().value, NodeType.XPATH);
            }
        }

        if (chrecAction instanceof Read) {
            value = chrecAction.value;
            actionType = ActionType.web_checkForText;
        }
        else if (chrecAction instanceof Type) {
            value = chrecAction.value;
            actionType = ActionType.web_fill;
        }
        else if (chrecAction instanceof Click) {
            actionType = ActionType.web_click;
        }
        else if (chrecAction instanceof GoTo) {
            url = chrecAction.url;
            actionType = ActionType.web_goto;
        }
        else if (chrecAction instanceof Refresh) {
            actionType = ActionType.web_browser;
        }

        return new AlexAction(actionType, node, value, url);
    }
}