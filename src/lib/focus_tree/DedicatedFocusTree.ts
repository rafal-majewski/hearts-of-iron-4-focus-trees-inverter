import FocusTree from "./FocusTree.js";
import type FocusTreeSerializerVisitor from "./FocusTreeSerializerVisitor.js";
import type {Focus} from "./types.js";

export default class DedicatedFocusTree extends FocusTree {
	public override serialize(visitor: FocusTreeSerializerVisitor): string {
		return visitor.visitDedicatedFocusTree(this);
	}
	public readonly additionalFocusTreeProperties: Readonly<Record<string, unknown>>;
	public readonly additionalGlobalProperties: Readonly<Record<string, unknown>>;
	public constructor({
		focuses,
		additionalFocusTreeProperties,
		additionalGlobalProperties,
	}: {
		focuses: readonly Readonly<Focus>[];
		additionalFocusTreeProperties: Readonly<Record<string, unknown>>;
		additionalGlobalProperties: Readonly<Record<string, unknown>>;
	}) {
		super({focuses});
		this.additionalFocusTreeProperties = additionalFocusTreeProperties;
		this.additionalGlobalProperties = additionalGlobalProperties;
	}
}
