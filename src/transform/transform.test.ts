import { describe, expect, test } from "@jest/globals";
import Transform from "./transform";
import ExtendedTransform from "./extended_transform";

describe("Transform module", () => {
  test("Converting DOMMatrix to Transform and vice versa.", () => {
    const dom = new DOMMatrix([3, 4, 5, 6, 7, 8]);
    const transform = Transform.fromDOM(dom);
    const dom0 = transform.toDOM();
    expect(dom.a).toEqual(dom0.a);
    expect(dom.b).toEqual(dom0.b);
    expect(dom.c).toEqual(dom0.c);
    expect(dom.d).toEqual(dom0.d);
    expect(dom.e).toEqual(dom0.e);
    expect(dom.f).toEqual(dom0.f);
  });
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
      expect.arrayContaining([2, 8, -4, -6, 9, 4].map(rounding))
    );
    const v = transform.apply(10, 8);
    expect([v.X, v.Y]).toEqual(expect.arrayContaining([93, -84].map(rounding)));
  });
});
