import * as zod from "zod";
import {dedicatedFocusTreeFromJominiParseResultSchema} from "./dedicatedFocusTreeFromJominiParseResultSchema.js";
import {DedicatedFocusTreeWrapper} from "../focus_tree_wrapper/DedicatedFocusTreeWrapper.js";

export const dedicatedFocusTreeWrapperFromJominiParseResultSchema = zod
	.object({
		focus_tree: dedicatedFocusTreeFromJominiParseResultSchema,
	})
	.transform(
		({focus_tree}) =>
			new DedicatedFocusTreeWrapper({
				focusTree: focus_tree,
			})
	);
