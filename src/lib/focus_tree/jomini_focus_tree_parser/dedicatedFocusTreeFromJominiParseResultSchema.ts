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
	.strict()
	.transform(
		({focus_tree: {focus, ...rest}}) =>
			new DedicatedFocusTree({focuses: focus ?? [], additionalProperties: rest})
	);
