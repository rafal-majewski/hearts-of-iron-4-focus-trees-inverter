import type {Focus} from "../focus/Focus.js";

export type DedicatedFocusTree = {
	focuses: Focus[];
	properties: Record<string, unknown>;
};
