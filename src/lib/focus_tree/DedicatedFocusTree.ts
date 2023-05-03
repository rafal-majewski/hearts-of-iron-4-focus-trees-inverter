import FocusTree from "./FocusTree.js";
import type {Focus} from "./types.js";

export default class DedicatedFocusTree extends FocusTree {
	public readonly additionalProperties: Readonly<Record<string, unknown>>;
	public constructor({
		focuses,
		additionalProperties,
	}: {
		focuses: readonly Readonly<Focus>[];
		additionalProperties: Readonly<Record<string, unknown>>;
	}) {
		super({focuses});
		this.additionalProperties = additionalProperties;
	}
}
