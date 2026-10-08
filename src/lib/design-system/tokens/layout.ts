/** Runtime-only policy for the mobile header's scroll behavior. */
export const headerChrome = {
	/** Shadow / elevated once past this Y */
	elevateAfterPx: 20,
	/** Never hide above this Y */
	hideFloorPx: 80,
	/** Downward delta before hide */
	hideDeltaPx: 12,
	/** Upward delta before show */
	showDeltaPx: 6,
} as const;
