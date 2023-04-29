export type FocusPosition = {
	x: number;
	y: number;
	relativeToFocusId: string | null;
};

export type Focus = {
	id: string;
	position: FocusPosition;
	prerequiredFocusIds: string[];

	additionalProperties: Record<string, unknown>;
};

export type FocusTree = {
	id: string;
	focuses: Focus[];

	additionalProperties: Record<string, unknown>;
};
