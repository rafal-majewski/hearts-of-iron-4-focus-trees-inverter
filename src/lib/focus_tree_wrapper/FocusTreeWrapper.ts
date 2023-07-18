import type {FocusTreeWrapperSerializerVisitor} from "../focus_tree_wrapper_serializer_visitor/FocusTreeWrapperSerializerVisitor.js";

export interface FocusTreeWrapper {
	serialize(visitor: FocusTreeWrapperSerializerVisitor): string;
}
