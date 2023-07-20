import type {DedicatedFocusTreeWrapper} from "../focus_tree_wrapper/DedicatedFocusTreeWrapper.js";
import type {SharedFocusTreeWrapper} from "../focus_tree_wrapper/SharedFocusTreeWrapper.js";
import type {FocusTreeWrapperSerializerVisitor} from "../focus_tree_wrapper_serializer_visitor/FocusTreeWrapperSerializerVisitor.js";
import * as jomini from "jomini";
export class JominiFocusTreeWrapperSerializerVisitor implements FocusTreeWrapperSerializerVisitor {
	private readonly jominiInstance: jomini.Jomini;
	public constructor({jominiInstance}: {jominiInstance: jomini.Jomini}) {
		this.jominiInstance = jominiInstance;
	}
	// private writeUnknownValue(writer: jomini.Writer, value: unknown): void {}
	public visitDedicatedFocusTree(dedicatedFocusTreeWrapper: DedicatedFocusTreeWrapper): string {
		return Buffer.from(
			this.jominiInstance.write((writer) => {
				writer.write_unquoted("focus_tree");
				writer.write_object_start();
				writer.write_end();
			})
		).toString();
	}
	public visitSharedFocusTree(sharedFocusTreeWrapper: SharedFocusTreeWrapper): string {
		return Buffer.from(this.jominiInstance.write((writer) => {})).toString();
	}
}
