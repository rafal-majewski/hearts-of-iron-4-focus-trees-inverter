import * as zod from "zod";

export const focusFromJominiParseResultSchema = zod
	.object({
		id: zod.string(),
		x: zod.number(),
		y: zod.number(),
		prerequisite: zod
			.array(
				zod.object({
					focus: zod.array(zod.string()),
				})
			)
			.optional(),
		relative_position_id: zod.string().optional(),
	})
	.passthrough()
	.transform(({id, x, y, relative_position_id, prerequisite, ...rest}) => ({
		id: id,
		position: {
			x: x,
			y: y,
			relativeToFocusId: relative_position_id ?? null,
		},
		prerequiredFocusIds: {
			allOf: (prerequisite || []).map(({focus}) => ({
				anyOf: focus,
			})),
		},
		additionalProperties: rest,
	}));
