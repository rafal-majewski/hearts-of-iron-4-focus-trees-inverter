import type FocusTree from "./FocusTree.js";

export interface FocusTreeParser {
	parseFocusTreeFromString(focusTreeString: string): FocusTree;
}
