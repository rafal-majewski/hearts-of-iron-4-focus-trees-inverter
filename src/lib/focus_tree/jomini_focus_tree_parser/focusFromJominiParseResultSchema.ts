import * as zod from "zod";

export const focusFromJominiParseResultSchema = zod
	.object({
		id: zod.string(),
		x: zod.number(),
		y: zod.number(),
		prerequisite: zod
			.array(
				zod.object({
					focus: zod.array(zod.string()).optional(),
				})
			)
			.optional(),
		relative_position_id: zod.array(zod.string()).optional(),
	})
	.passthrough()
	.transform(({id, x, y, relative_position_id, prerequisite, ...rest}) => ({
		id: id,
		position: {
			x: x,
			y: y,
			relativeToFocusIds: relative_position_id ?? [],
		},
		prerequiredFocusIds: {
			allOf: (prerequisite || [])
				.filter(
					(prerequisite): prerequisite is {focus: string[]} => prerequisite.focus !== undefined
				)
				.map(({focus}) => ({
					anyOf: focus,
				})),
		},
		additionalProperties: rest,
	}));
