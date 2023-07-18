import * as zod from "zod";
import {SharedFocusTreeWrapper} from "../focus_tree_wrapper/SharedFocusTreeWrapper.js";
import {focusFromJominiParseResultSchema} from "./focusFromJominiParseResultSchema.js";

export const sharedFocusTreeWrapperFromJominiParseResultSchema = zod
	.object({
		shared_focus: zod.array(focusFromJominiParseResultSchema).optional(),
	})
	.transform(
		({shared_focus}) =>
			new SharedFocusTreeWrapper({
				focuses: shared_focus ?? [],
			})
	);
