import type {FocusPosition} from "./focus_position/FocusPosition.js";

export type Focus = {
	id: string;
	position: FocusPosition;
	prerequiredFocusIds: {
		allOf: {
			anyOf: string[];
		}[];
	};

	additionalProperties: Record<string, unknown>;
};
