import * as jominiPackage from "jomini";
import type {FocusTreeParser} from "../FocusTreeParser.js";
import {dedicatedFocusTreeFromJominiParseResultSchema} from "./dedicatedFocusTreeFromJominiParseResultSchema.js";
import type FocusTree from "../FocusTree.js";

export class JominiFocusTreeParser implements FocusTreeParser {
	private readonly jominiInstance: jominiPackage.Jomini;
	public constructor({jominiInstance}: {jominiInstance: jominiPackage.Jomini}) {
		this.jominiInstance = jominiInstance;
	}
	public parseFocusTreeFromString(focusTreeString: string): FocusTree {
		const jominiFocusTree = this.jominiInstance.parseText(focusTreeString);
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus");
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus.prerequisite");
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus.prerequisite.focus");
		const dedicatedFocusTree = dedicatedFocusTreeFromJominiParseResultSchema.parse(jominiFocusTree);

		return dedicatedFocusTree;
	}
}
