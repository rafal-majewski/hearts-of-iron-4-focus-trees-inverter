import type DedicatedFocusTree from "./DedicatedFocusTree.js";

export default interface FocusTreeSerializerVisitor {
	visitDedicatedFocusTree(tree: DedicatedFocusTree): string;
}
