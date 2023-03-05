import { describe, expect, test } from "@jest/globals";
import Entity from "./entity";

describe("Entity test", () => {
  test("Parent-child", () => {
    const e1 = new Entity();
    const e2 = new Entity();

    // setting e2's parent to e1
    e2.setParent(e1);
    expect(e2.Parent).toBe(e1);
    expect(e1.getChildIndex(e2)).toBe(0);
    expect(e2.getChildIndex(e1)).toBe(-1);

    // setting e1's parent to e2
    // e2 is already set as a child of e1
    // so Entity#setParent should cause an error
    expect(() => {
      e1.setParent(e2);
    }).toThrowError();

    // e3 is also going to be a child of e1
    const e3 = new Entity();
    e3.setParent(e1);

    // e3 was added after e2
    // so e3's index should be 1
    expect(e1.getChildIndex(e3)).toBe(1);

    // moved e3's index to 0
    // then e2's index should be 1
    e1.setChildIndex(e3, 0);

    expect(e1.getChildIndex(e3)).toBe(0);
    expect(e1.getChildIndex(e2)).toBe(1);

    // setting e3's index to 2
    // but there are only 2 children on e1,
    // so maximum valid index is 1
    e1.setChildIndex(e3, 2);
    expect(e1.getChildIndex(e3)).toBe(1);

    const e4 = new Entity();

    // e4 is not child of e1
    // so Entity#setChildIndex should cause an error
    expect(() => {
      e1.setChildIndex(e4, 0);
    }).toThrowError();
  });
});
