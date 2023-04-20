import {defineConfig} from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/*.test.ts", "**/*.test.js", "**/*.test.cjs", "**/*.test.mjs"],
		coverage: {
			provider: "c8",
			reportsDirectory: "coverage_report",
			reporter: ["html", "text"],
		},
	},
});
