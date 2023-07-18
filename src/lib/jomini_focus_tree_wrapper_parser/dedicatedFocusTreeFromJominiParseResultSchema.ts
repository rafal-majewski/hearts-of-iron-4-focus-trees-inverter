import * as zod from "zod";
import {focusFromJominiParseResultSchema} from "./focusFromJominiParseResultSchema.js";

export const dedicatedFocusTreeFromJominiParseResultSchema = zod
	.object({
		focus: zod.array(focusFromJominiParseResultSchema).optional(),
	})
	.passthrough()

	.transform(({focus, ...rest}) => ({focuses: focus ?? [], properties: rest}));
