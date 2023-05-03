import * as Jomini from "jomini";
import Zod from "zod";
import {DedicatedFocusTree, type FocusTree} from "../focus_tree/index.js";

const jomini = await Jomini.Jomini.initialize();

const focusTreeFromJominiParseTextResultSchema = Zod.object({
	focus_tree: Zod.object({
		focus: Zod.array(
			Zod.object({
				id: Zod.string(),
				x: Zod.number(),
				y: Zod.number(),
				prerequisite: Zod.array(
					Zod.object({
						focus: Zod.array(Zod.string()),
					})
				).optional(),
				relative_position_id: Zod.string().optional(),
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
				}))
		)
			.optional()
			.transform((focuses) => focuses ?? []),
	})
		.passthrough()
		.transform(({id, focus, ...rest}) => ({
			id: id,
			focuses: focus,
			additionalProperties: rest,
		})),
})
	.strict()
	.transform(({focus_tree}) => focus_tree);

export default function parseFocusTreeFromString(focusTreeString: string): FocusTree {
	const jominiFocusTree = jomini.parseText(focusTreeString);
	Jomini.toArray(jominiFocusTree, "focus_tree.focus");
	Jomini.toArray(jominiFocusTree, "focus_tree.focus.prerequisite");
	Jomini.toArray(jominiFocusTree, "focus_tree.focus.prerequisite.focus");
	const parseResult = focusTreeFromJominiParseTextResultSchema.parse(jominiFocusTree);
	const focusTree = new DedicatedFocusTree(parseResult);

	return focusTree;
}
