import { describe, expect, test } from "@jest/globals";
import Entity from "./entity";

describe("Entity test", () => {
  const e1 = new Entity({ X: 3, Y: 6 });
  const e2 = new Entity({ X: 2, Y: -8 });
  const e3 = new Entity({ X: 6, Y: -6 });
  const e4 = new Entity({ X: -2, Y: -4 });
  const e5 = new Entity({ X: 3, Y: 0 });
  const e6 = new Entity({ X: 0, Y: -10 });
  const entities = [e1, e2, e3, e4, e5, e6];

  afterEach(() => {
    entities.forEach((e) => e.setParent(null));
  });
  test("Parent-child", () => {
    // Chain them
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

    // The return of Entity#getChildIndex for nonchild Entity should be -1.
    expect(e5.getChildIndex(e3)).toBe(-1);

    // Setting index for nonchild Entity should cause error.
    // Only one of the cases about this situation will be run.
    expect(() => {
      e2.setChildIndex(e4, 3);
    }).toThrowError();

    // Any try of attaching a entity to lower-number-named entity should cause error.
    // Only one of the cases about this situation will be run.
    expect(() => {
      e5.attachChildren(e2);
    }).toThrowError();

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

    // In Entity#setChildIndex,
    // if the value of index is out of the range,
    // it gets converted into minimum or maximum index of the range.
    e3.setChildIndex(e4, 1000);
    expect(e3.getChildIndex(e1)).toBe(0);
    expect(e3.getChildIndex(e4)).toBe(1);
  });
});
