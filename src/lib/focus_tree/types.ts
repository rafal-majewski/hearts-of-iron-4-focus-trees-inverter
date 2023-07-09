export type FocusPosition = {
	x: number;
	y: number;
	relativeToFocusIds: string[];
};

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

export type FocusTree = {
	id: string;
	focuses: Focus[];

	additionalProperties: Record<string, unknown>;
};
