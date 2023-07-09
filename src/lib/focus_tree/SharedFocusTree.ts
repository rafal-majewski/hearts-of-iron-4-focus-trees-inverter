import FocusTree from "./FocusTree.js";
import type FocusTreeSerializerVisitor from "./FocusTreeSerializerVisitor.js";
import type {Focus} from "./types.js";

export default class SharedFocusTree extends FocusTree {
	public override serialize(visitor: FocusTreeSerializerVisitor): string {
		return visitor.visitSharedFocusTree(this);
	}
	public constructor({focuses}: {focuses: readonly Readonly<Focus>[]}) {
		super({focuses});
	}
}
