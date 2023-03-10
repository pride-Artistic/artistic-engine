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
  test("Parent-child; Intensified test", () => {
    const e1 = new Entity();
    const e2 = new Entity();
    const e3 = new Entity();
    const e4 = new Entity();
    const e5 = new Entity();
    const e6 = new Entity();
    const entities = [e1, e2, e3, e4, e5, e6];

    // Chained entities test
    e1.attachChildren(e2);
    e2.attachChildren(e3);
    e3.attachChildren(e4);
    e4.attachChildren(e5);
    e5.attachChildren(e6);

    /**
     * Graph of this tree is like this:
     * e1
     *   \
     *    e2
     *   /
     * e3
     *   \
     *    e4
     *   /
     * e5
     *   \
     *    e6
     */

    expect(e6.Parent?.Parent?.Parent?.Parent?.Parent).toBe(e1);

    // Setting index of child is meaningless and does not change its index.
    e1.setChildIndex(e2, 100);
    expect(e1.getChildIndex(e2)).toBe(0);

    // Any try of attaching a entity to lower-number-named entity will cause error.
    for (let i = 0; i < entities.length - 1; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        expect(() => {
          entities[j].attachChildren(entities[i]);
        }).toThrowError();
      }
    }

    // Move e5 to e2's child
    e2.attachChildren(e5);
    /**
     * Now the tree looks like:
     * e1
     *   \
     *    e2
     *   /  \
     * e3    e5
     *   \     \
     *    e4    e6
     */
    expect(entities.map((v) => v.Parent)).toEqual(
      expect.arrayContaining([null, e1, e2, e3, e2, e5])
    );
    expect(e2.getChildIndex(e3)).toBe(0);
    expect(e2.getChildIndex(e5)).toBe(1);

    // Detach e2 from e1, and attach e1 to e3
    e2.setParent(null);
    e3.attachChildren(e1);
    /**
     * Now the tree looks like:
     *       e2
     *      /  \
     *    e3    e5
     *   /  \     \
     * e1    e4    e6
     */
    expect(entities.map((v) => v.Parent)).toEqual(
      expect.arrayContaining([e3, null, e2, e3, e2, e5])
    );
    expect(e3.getChildIndex(e1)).toBe(1);
    expect(e3.getChildIndex(e4)).toBe(0);
  });
});
