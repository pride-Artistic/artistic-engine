import { describe, expect, test } from "@jest/globals";
import Engine from "../src/engine";

beforeEach(() => {
  document.body.innerHTML = `<html><body><canvas id="main"></canvas></body></html>`;
});

describe("sum module", () => {
  test("jest runs", () => {
    const engine = new Engine("#main");
    expect(1).toBe(1);
    console.log(engine);
  });
});
