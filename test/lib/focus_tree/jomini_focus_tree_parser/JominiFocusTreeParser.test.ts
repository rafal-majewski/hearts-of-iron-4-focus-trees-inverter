import {test, expect, describe} from "vitest";

import * as jomini from "jomini";
import {JominiFocusTreeParser} from "../../../../src/lib/focus_tree/jomini_focus_tree_parser/JominiFocusTreeParser.js";
async function createJominiFocusTreeParser() {
	return new JominiFocusTreeParser({
		jominiInstance: await jomini.Jomini.initialize(),
	});
}
describe("JominiFocusTreeParser", async () => {
	test("Minimal focus tree with no focuses", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();
		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
			}
		`);

		expect(focusTree).toEqual({
			focuses: [],
			additionalProperties: {},
		});
	});

	test("Minimal focus tree with one minimal focus", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: null,
					},
					prerequiredFocusIds: {
						allOf: [],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {},
		});
	});

	test("Minimal focus tree with one minimal focus with a prerequisite", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
					prerequisite = {
						focus = "test_prerequisite"
					}
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: null,
					},
					prerequiredFocusIds: {
						allOf: [
							{
								anyOf: ["test_prerequisite"],
							},
						],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {},
		});
	});

	test("Minimal focus tree with one minimal focus with two prerequisites where only one is required", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
					prerequisite = {
						focus = "test_prerequisite"
						focus = "test_prerequisite_2"
					}
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: null,
					},
					prerequiredFocusIds: {
						allOf: [
							{
								anyOf: ["test_prerequisite", "test_prerequisite_2"],
							},
						],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {},
		});
	});

	test("Minimal focus tree with one minimal focus with a relative position", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
					relative_position_id = "test_relative_position"
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: "test_relative_position",
					},
					prerequiredFocusIds: {
						allOf: [],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {},
		});
	});

	test("Minimal focus tree with one minimal focus with a relative position and a prerequisite", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
					relative_position_id = "test_relative_position"
					prerequisite = {
						focus = "test_prerequisite"
					}
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: "test_relative_position",
					},
					prerequiredFocusIds: {
						allOf: [
							{
								anyOf: ["test_prerequisite"],
							},
						],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {},
		});
	});

	test("Minimal focus tree with one focus with additional properties", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
					relative_position_id = "test_relative_position"
					prerequisite = {
						focus = "test_prerequisite"
					}
					completion_reward = {
						add_ideas = HOA_state_bank_idea
					}
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: "test_relative_position",
					},
					prerequiredFocusIds: {
						allOf: [
							{
								anyOf: ["test_prerequisite"],
							},
						],
					},
					additionalProperties: {
						completion_reward: {
							add_ideas: "HOA_state_bank_idea",
						},
					},
				},
			],
			additionalProperties: {},
		});
	});
	test("Focus tree with additional properties with one minimal focus", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				country = {
					factor = 0
					modifier = {
						add = 10
						or = {
							original_tag = AFA
							original_tag = ORO
						}
						has_dlc = "By Blood Alone"
					}
				}
			
				focus = {
					id = "test_focus"
					x = 0
					y = 0
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: null,
					},
					prerequiredFocusIds: {
						allOf: [],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {
				country: {
					factor: 0,
					modifier: {
						add: 10,
						or: {
							original_tag: ["AFA", "ORO"],
						},
						has_dlc: "By Blood Alone",
					},
				},
			},
		});
	});

	test("Focus tree with a forbidden field", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		expect(() =>
			jominiFocusTreeParser.parseFocusTreeFromString(`
				focus_tree = {
				}
				something_bad = "test"
			`)
		).toThrow();
	});

	test("Minimal focus tree with multiple minimal focuses", async () => {
		const jominiFocusTreeParser = await createJominiFocusTreeParser();

		const focusTree = jominiFocusTreeParser.parseFocusTreeFromString(`
			focus_tree = {
				focus = {
					id = "test_focus_1"
					x = 0
					y = 0
				}
				focus = {
					id = "test_focus_2"
					x = 0
					y = 0
				}
			}
		`);

		expect(focusTree).toEqual({
			focuses: [
				{
					id: "test_focus_1",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: null,
					},
					prerequiredFocusIds: {
						allOf: [],
					},
					additionalProperties: {},
				},
				{
					id: "test_focus_2",
					position: {
						x: 0,
						y: 0,
						relativeToFocusId: null,
					},
					prerequiredFocusIds: {
						allOf: [],
					},
					additionalProperties: {},
				},
			],
			additionalProperties: {},
		});
	});
});
