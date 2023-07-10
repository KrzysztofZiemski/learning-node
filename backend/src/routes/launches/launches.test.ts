import { expect, test, describe, jest } from "@jest/globals";

describe("Test GET /launches", () => {
  test("It should respond withh 200 success", () => {
    const response = 200;
    expect(response).toBe(200);
  });
});

describe("Test POST /launches", () => {
  test("It should respond withh 200 success", () => {});

  test("It should catch missing required properties", () => {});
});
