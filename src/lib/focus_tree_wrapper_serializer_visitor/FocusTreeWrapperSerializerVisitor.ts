import type {DedicatedFocusTreeWrapper} from "../focus_tree_wrapper/DedicatedFocusTreeWrapper.js";
import type {SharedFocusTreeWrapper} from "../focus_tree_wrapper/SharedFocusTreeWrapper.js";

export interface FocusTreeWrapperSerializerVisitor {
	visitDedicatedFocusTree(dedicatedFocusTreeWrapper: DedicatedFocusTreeWrapper): string;
	visitSharedFocusTree(sharedFocusTreeWrapper: SharedFocusTreeWrapper): string;
}
