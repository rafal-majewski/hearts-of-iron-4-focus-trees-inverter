import type {FocusTreeWrapperSerializerVisitor} from "../focus_tree_wrapper_serializer_visitor/FocusTreeWrapperSerializerVisitor.js";
import type {FocusTreeWrapper} from "./FocusTreeWrapper.js";
import type {DeepReadonly} from "ts-essentials";
import type {Focus} from "./focus/Focus.js";

export class SharedFocusTreeWrapper implements FocusTreeWrapper {
	public serialize(visitor: FocusTreeWrapperSerializerVisitor): string {
		return visitor.visitSharedFocusTree(this);
	}
	private readonly focuses: DeepReadonly<Focus[]>;
	public constructor({focuses}: {focuses: DeepReadonly<Focus[]>}) {
		this.focuses = focuses;
	}
}
