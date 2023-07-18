import type {FocusTreeWrapper} from "../focus_tree_wrapper/FocusTreeWrapper.js";

export interface FocusTreeWrapperParser {
	parseFocusTreeWrapperFromString(focusTreeWrapperString: string): FocusTreeWrapper;
}
