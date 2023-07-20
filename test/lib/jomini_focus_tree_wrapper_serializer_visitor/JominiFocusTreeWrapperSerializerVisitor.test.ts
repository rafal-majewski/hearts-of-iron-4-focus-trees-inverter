import {test, describe, expect} from "vitest";

import * as jomini from "jomini";
import {DedicatedFocusTreeWrapper} from "../../../src/lib/focus_tree_wrapper/DedicatedFocusTreeWrapper.js";
import {JominiFocusTreeWrapperSerializerVisitor} from "../../../src/lib/jomini_focus_tree_wrapper_serializer_visitor/JominiFocusTreeWrapperSerializerVisitor.js";
import {JominiFocusTreeWrapperParser} from "../../../src/lib/jomini_focus_tree_wrapper_parser/JominiFocusTreeWrapperParser.js";
async function createJominiFocusTreeWrapperSerializerVisitor() {
	return new JominiFocusTreeWrapperSerializerVisitor({
		jominiInstance: await jomini.Jomini.initialize(),
	});
}
async function createJominiFocusTreeWrapperParser() {
	return new JominiFocusTreeWrapperParser({
		jominiInstance: await jomini.Jomini.initialize(),
	});
}
describe("JominiFocusTreeWrapperSerializerVisitor", async () => {
	test("Minimal dedicated focus tree wrapper with no focuses", async () => {
		const jominiFocusTreeWrapperSerializerVisitor =
			await createJominiFocusTreeWrapperSerializerVisitor();
		const jominiFocusTreeWrapperParser = await createJominiFocusTreeWrapperParser();

		const dedicatedFocusTreeWrapper = new DedicatedFocusTreeWrapper({
			focusTree: {
				focuses: [],
				properties: {},
			},
		});
		const serializedFocusTreeWrapper =
			jominiFocusTreeWrapperSerializerVisitor.visitDedicatedFocusTree(dedicatedFocusTreeWrapper);

		expect(
			jominiFocusTreeWrapperParser.parseFocusTreeWrapperFromString(serializedFocusTreeWrapper)
		).toEqual(dedicatedFocusTreeWrapper);
	});
});
