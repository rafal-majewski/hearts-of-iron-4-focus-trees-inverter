import * as jominiPackage from "jomini";
import type {FocusTreeParser} from "../FocusTreeParser.js";
import {dedicatedFocusTreeFromJominiParseResultSchema} from "./dedicatedFocusTreeFromJominiParseResultSchema.js";
import type FocusTree from "../FocusTree.js";
import {sharedFocusTreeFromJominiParseResultSchema} from "./sharedFocusTreeFromJominiParseResultSchema.js";
import zod from "zod";
export class JominiFocusTreeParser implements FocusTreeParser {
	private readonly jominiInstance: jominiPackage.Jomini;
	public constructor({jominiInstance}: {jominiInstance: jominiPackage.Jomini}) {
		this.jominiInstance = jominiInstance;
	}
	public parseFocusTreeFromString(focusTreeString: string): FocusTree {
		const focusTreeStringSanitized = focusTreeString.replace(/\r\n/g, "\n").replace(/#.*\n/g, "\n");
		const jominiFocusTree = this.jominiInstance.parseText(focusTreeStringSanitized);
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus");
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus.relative_position_id");
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus.prerequisite");
		jominiPackage.toArray(jominiFocusTree, "focus_tree.focus.prerequisite.focus");
		jominiPackage.toArray(jominiFocusTree, "shared_focus");
		jominiPackage.toArray(jominiFocusTree, "shared_focus.prerequisite");
		jominiPackage.toArray(jominiFocusTree, "shared_focus.prerequisite.focus");
		jominiPackage.toArray(jominiFocusTree, "shared_focus.relative_position_id");
		const dedicatedFocusTree = zod
			.union([
				dedicatedFocusTreeFromJominiParseResultSchema,
				sharedFocusTreeFromJominiParseResultSchema,
			])
			.parse(jominiFocusTree);

		return dedicatedFocusTree;
	}
}
