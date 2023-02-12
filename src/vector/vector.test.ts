import { describe, expect, test } from "@jest/globals";
import { Vector2D, Vector3D, Vector4D } from "./index";

describe("Vector module", () => {
  test("vector copy", () => {
    const v1 = new Vector3D(3, 5, 7);
    const v2 = v1.copy(new Vector4D());
    const v3 = v1.copy(new Vector2D(), true);

    // copying to vector of bigger size
    expect([v2.W, v2.X, v2.Y, v2.Z]).toEqual(
      expect.arrayContaining([v1.X, v1.Y, v1.Z, 0])
    );
    expect(v2.Size).toBe(4);

    // copying to vector of smaller size
    // which cause error without force=true
    expect(() => {
      v1.copy(new Vector2D());
    }).toThrowError();

    // force-copying to vector of smaller size
    expect([v3.X, v3.Y]).toEqual(expect.arrayContaining([v1.X, v1.Y]));
    expect(v3.Size).toBe(2);

    // shifting
    const v4 = v1.copy(new Vector3D()).shift(1);
    expect([v4.Y, v4.Z, v4.X]).toEqual(
      expect.arrayContaining([v1.X, v1.Y, v1.Z])
    );
    const v5 = v1.copy(new Vector3D()).shift(-1);
    expect([v5.Z, v5.X, v5.Y]).toEqual(
      expect.arrayContaining([v1.X, v1.Y, v1.Z])
    );
  });
});
