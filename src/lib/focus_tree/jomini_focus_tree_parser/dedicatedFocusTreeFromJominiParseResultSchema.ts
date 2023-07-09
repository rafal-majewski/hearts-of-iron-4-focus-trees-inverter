import * as zod from "zod";
import {focusFromJominiParseResultSchema} from "./focusFromJominiParseResultSchema.js";
import DedicatedFocusTree from "../DedicatedFocusTree.js";

export const dedicatedFocusTreeFromJominiParseResultSchema = zod
	.object({
		focus_tree: zod
			.object({
				focus: zod.array(focusFromJominiParseResultSchema).optional(),
			})
			.passthrough(),
	})
	.passthrough()
	.transform(
		({focus_tree: {focus, ...focusTreeRest}, ...globalRest}) =>
			new DedicatedFocusTree({
				focuses: focus ?? [],
				additionalFocusTreeProperties: focusTreeRest,
				additionalGlobalProperties: globalRest,
			})
	);
