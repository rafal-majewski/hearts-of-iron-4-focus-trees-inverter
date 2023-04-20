import {describe, test, expect} from "vitest";
import Hello from "../../src/hello/Hello.js";
describe("hello", () => {
	describe("Hello", () => {
		describe("getMessage", () => {
			test('should return "Hello World"', () => {
				const hello = new Hello("Hello World");
				expect(hello.getMessage()).toBe("Hello World");
			});
		});
	});
});
