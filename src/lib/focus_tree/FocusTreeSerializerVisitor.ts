import type DedicatedFocusTree from "./DedicatedFocusTree.js";
import type SharedFocusTree from "./SharedFocusTree.js";

export default interface FocusTreeSerializerVisitor {
	visitDedicatedFocusTree(tree: DedicatedFocusTree): string;
	visitSharedFocusTree(tree: SharedFocusTree): string;
}
