import FocusTree from "./FocusTree.js";
import type {Focus} from "./types.js";

export default class DedicatedFocusTree extends FocusTree {
	public readonly additionalProperties: Readonly<Record<string, unknown>>;
	public readonly id: string;
	public constructor({
		focuses,
		additionalProperties,
		id,
	}: {
		focuses: readonly Readonly<Focus>[];
		additionalProperties: Readonly<Record<string, unknown>>;
		id: string;
	}) {
		super({focuses});
		this.additionalProperties = additionalProperties;
		this.id = id;
	}
}
