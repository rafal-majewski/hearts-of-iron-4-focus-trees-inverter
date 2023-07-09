import * as zod from "zod";
import {focusFromJominiParseResultSchema} from "./focusFromJominiParseResultSchema.js";
import SharedFocusTree from "../SharedFocusTree.js";

export const sharedFocusTreeFromJominiParseResultSchema = zod
	.object({
		shared_focus: zod.array(focusFromJominiParseResultSchema),
	})
	.strict()
	.transform(({shared_focus}) => new SharedFocusTree({focuses: shared_focus}));
