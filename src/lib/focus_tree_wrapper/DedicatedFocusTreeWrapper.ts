import type {FocusTreeWrapperSerializerVisitor} from "../focus_tree_wrapper_serializer_visitor/FocusTreeWrapperSerializerVisitor.js";
import type {DedicatedFocusTree} from "./dedicated_focus_tree/DedicatedFocusTree.js";
import type {DeepReadonly} from "ts-essentials";
import type {FocusTreeWrapper} from "./FocusTreeWrapper.js";

export class DedicatedFocusTreeWrapper implements FocusTreeWrapper {
	public readonly focusTree: DeepReadonly<DedicatedFocusTree>;
	public serialize(visitor: FocusTreeWrapperSerializerVisitor): string {
		return visitor.visitDedicatedFocusTree(this);
	}
	public constructor({focusTree}: {focusTree: DeepReadonly<DedicatedFocusTree>}) {
		this.focusTree = focusTree;
	}
}
