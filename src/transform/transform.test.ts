import { describe, expect, test } from "@jest/globals";
import Transform from "./transform";
import ExtendedTransform from "./extended_transform";

describe("Transform module", () => {
  test("Transfom initializing & getter & setter", () => {
    const transform = new Transform();
    expect(transform.m11).toBe(1);
    expect(transform.m12).toBe(0);
    expect(transform.m21).toBe(0);
    expect(transform.m22).toBe(1);
    expect(transform.ox).toBe(0);
    expect(transform.oy).toBe(0);
    transform.m11 = 2;
    transform.m22 = 3;
    transform.ox = 10;
    expect([
      transform.m11,
      transform.m12,
      transform.m21,
      transform.m22,
    ]).toEqual(expect.arrayContaining([2, 0, 0, 3]));
    expect([transform.ox, transform.oy]).toEqual(
      expect.arrayContaining([10, 0])
    );
  });
  test("Transfom operations & coord calculations", () => {
    function toArray(
      c: ExtendedTransform
    ): [number, number, number, number, number, number] {
      return [c.m11, c.m12, c.m21, c.m22, c.ox, c.oy];
    }
    const rounding = (v: number) => expect.closeTo(v, 6);
    const transform = new ExtendedTransform(2, 3, 1, 4, 0, 0);
    transform.scale(2);
    expect(toArray(transform)).toEqual(
      expect.arrayContaining([4, 6, 2, 8, 0, 0])
    );
    transform.left(4).down(9).rotate(90);
    expect(toArray(transform)).toEqual(
      expect.arrayContaining([-6, 4, -8, 2, -4, 9].map(rounding))
    );
    const v = transform.apply(10, 8);
    expect([v.X, v.Y]).toEqual(
      expect.arrayContaining([-32, -55].map(rounding))
    );
  });
});
