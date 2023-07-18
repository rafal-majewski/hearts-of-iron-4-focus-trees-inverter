import * as jomini from "jomini";
import zod from "zod";
import type {FocusTreeWrapperParser} from "../focus_tree_wrapper_parser/FocusTreeWrapperParser.js";
import type {FocusTreeWrapper} from "../focus_tree_wrapper/FocusTreeWrapper.js";
import {dedicatedFocusTreeWrapperFromJominiParseResultSchema} from "./dedicatedFocusTreeWrapperFromJominiParseResultSchema.js";
import {sharedFocusTreeWrapperFromJominiParseResultSchema} from "./sharedFocusTreeWrapperFromJominiParseResultSchema.js";
export class JominiFocusTreeWrapperParser implements FocusTreeWrapperParser {
	private readonly jominiInstance: jomini.Jomini;
	public constructor({jominiInstance}: {jominiInstance: jomini.Jomini}) {
		this.jominiInstance = jominiInstance;
	}
	public parseFocusTreeWrapperFromString(focusTreeString: string): FocusTreeWrapper {
		const focusTreeWrapperStringSanitized = focusTreeString
			.replace(/\r\n/g, "\n")
			.replace(/#.*\n/g, "\n");
		const jominiFocusTreeWrapper = this.jominiInstance.parseText(focusTreeWrapperStringSanitized);
		jomini.toArray(jominiFocusTreeWrapper, "focus_tree.focus");
		jomini.toArray(jominiFocusTreeWrapper, "focus_tree.focus.relative_position_id");
		jomini.toArray(jominiFocusTreeWrapper, "focus_tree.focus.prerequisite");
		jomini.toArray(jominiFocusTreeWrapper, "focus_tree.focus.prerequisite.focus");
		jomini.toArray(jominiFocusTreeWrapper, "shared_focus");
		jomini.toArray(jominiFocusTreeWrapper, "shared_focus.prerequisite");
		jomini.toArray(jominiFocusTreeWrapper, "shared_focus.prerequisite.focus");
		jomini.toArray(jominiFocusTreeWrapper, "shared_focus.relative_position_id");
		const focusTreeWrapper = zod
			.union([
				dedicatedFocusTreeWrapperFromJominiParseResultSchema,
				sharedFocusTreeWrapperFromJominiParseResultSchema,
			])
			.parse(jominiFocusTreeWrapper);

		return focusTreeWrapper;
	}
}
