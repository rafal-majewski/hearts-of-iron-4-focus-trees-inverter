import {describe, test, expect} from "vitest";
import * as dotenv from "dotenv";
import * as path from "path";
import * as url from "url";
dotenv.config({path: path.join(url.fileURLToPath(path.dirname(import.meta.url)), ".env.test")});
import appConfig from "../../src/app_config/appConfig.js";

describe("app-config", () => {
	describe("appConfig", () => {
		test("OPTIONAL_HELLO_MESSAGE", () => {
			expect(appConfig.OPTIONAL_HELLO_MESSAGE).toBe("Hello developer");
		});
	});
});
