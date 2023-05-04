import FocusTree from "./FocusTree.js";
import type {Focus} from "./types.js";

export default class SharedFocusTree extends FocusTree {
	public constructor({focuses}: {focuses: readonly Readonly<Focus>[]}) {
		super({focuses});
	}
}
