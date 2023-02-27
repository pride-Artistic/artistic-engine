import { describe, expect, test } from "@jest/globals";
import Camera from "./camera";

describe("Camera module", () => {
  test("Camera initializing & getter & setter", () => {
    const camera = new Camera();
    expect(camera.m11).toBe(0);
    expect(camera.m12).toBe(0);
    expect(camera.m21).toBe(0);
    expect(camera.m22).toBe(0);
    expect(camera.ox).toBe(0);
    expect(camera.oy).toBe(0);
    camera.m11 = 2;
    camera.m22 = 3;
    camera.ox = 10;
    expect([camera.m11, camera.m12, camera.m21, camera.m22]).toEqual(
      expect.arrayContaining([2, 0, 0, 3])
    );
    expect([camera.ox, camera.oy]).toEqual(expect.arrayContaining([10, 0]));
  });
  test("Camera operations & coord calculations", () => {
    function toArray(
      c: Camera
    ): [number, number, number, number, number, number] {
      return [c.m11, c.m12, c.m21, c.m22, c.ox, c.oy];
    }
    const rounding = (v: number) => expect.closeTo(v, 6);
    const camera = new Camera(2, 3, 1, 4, 0, 0);
    camera.scale(2);
    expect(toArray(camera)).toEqual(expect.arrayContaining([4, 6, 2, 8, 0, 0]));
    camera.left(4).down(9).rotate(90);
    expect(toArray(camera)).toEqual(
      expect.arrayContaining([-6, 4, -8, 2, -9, -4].map(rounding))
    );
    expect(camera.calc(10, 8)).toEqual(
      expect.arrayContaining([-133, 52].map(rounding))
    );
  });
});
