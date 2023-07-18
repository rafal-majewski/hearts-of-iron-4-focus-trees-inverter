import {test, expect, describe} from "vitest";
import * as url from "url";
import * as path from "path";
import * as fs from "fs/promises";

import * as jomini from "jomini";
import {JominiFocusTreeWrapperParser} from "../../../src/lib/jomini_focus_tree_wrapper_parser/JominiFocusTreeWrapperParser.js";
import {DedicatedFocusTreeWrapper} from "../../../src/lib/focus_tree_wrapper/DedicatedFocusTreeWrapper.js";
async function createJominiFocusTreeWrapperParser() {
	return new JominiFocusTreeWrapperParser({
		jominiInstance: await jomini.Jomini.initialize(),
	});
}
describe("JominiFocusTreeWrapperParser", async () => {
	test("Minimal focus tree with no focuses", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();
		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
			focus_tree = {
			}
		`);

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [],
					properties: {},
				},
			})
		);
	});

	test("Minimal focus tree with one minimal focus", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
				}
			}
		`);

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: [],
							},
							prerequiredFocusIds: {
								allOf: [],
							},
							additionalProperties: {},
						},
					],
					properties: {},
				},
			})
		);
	});

	test("Minimal focus tree with one minimal focus with a prerequisite", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
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

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: [],
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
					properties: {},
				},
			})
		);
	});

	test("Minimal focus tree with one minimal focus with two prerequisites where only one is required", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
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

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: [],
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
					properties: {},
				},
			})
		);
	});

	test("Minimal focus tree with one minimal focus with a relative position", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
			focus_tree = {
				focus = {
					id = "test_focus"
					x = 0
					y = 0
					relative_position_id = "test_relative_position"
				}
			}
		`);

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: ["test_relative_position"],
							},
							prerequiredFocusIds: {
								allOf: [],
							},
							additionalProperties: {},
						},
					],
					properties: {},
				},
			})
		);
	});

	test("Minimal focus tree with one minimal focus with a relative position and a prerequisite", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
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

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: ["test_relative_position"],
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
					properties: {},
				},
			})
		);
	});

	test("Minimal focus tree with one focus with additional properties", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
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

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: ["test_relative_position"],
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
					properties: {},
				},
			})
		);
	});
	test("Focus tree with additional properties with one minimal focus", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
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

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus",
							position: {
								x: 0,
								y: 0,
								relativeToFocusIds: [],
							},
							prerequiredFocusIds: {
								allOf: [],
							},
							additionalProperties: {},
						},
					],
					properties: {
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
				},
			})
		);
	});

	test("Minimal focus tree with multiple minimal focuses", async () => {
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const focusTreeWrapper = jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(`
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

		expect(focusTreeWrapper).toEqual(
			new DedicatedFocusTreeWrapper({
				focusTree: {
					focuses: [
						{
							id: "test_focus_1",
							position: {
								x: 0,
								y: 0,

								relativeToFocusIds: [],
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
								relativeToFocusIds: [],
							},
							prerequiredFocusIds: {
								allOf: [],
							},
							additionalProperties: {},
						},
					],
					properties: {},
				},
			})
		);
	});

	const inGameFocusTreeWrappersFileNamesWithFileContent = await fs
		.readdir(path.join(path.dirname(url.fileURLToPath(import.meta.url)), "test_focus_trees"))
		.then((fileNames) =>
			Promise.all(
				fileNames.map((fileName) =>
					fs
						.readFile(
							path.join(
								path.dirname(url.fileURLToPath(import.meta.url)),
								"test_focus_trees",
								fileName
							),
							"utf8"
						)
						.then((fileContent) => [fileName, fileContent])
				)
			)
		);
	test.each(inGameFocusTreeWrappersFileNamesWithFileContent)(
		"Focus tree from in-game files %s",
		async (fileName, inGameFocusTreeWrapperAsString) => {
			const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();
			jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(inGameFocusTreeWrapperAsString);
		}
	);
});
