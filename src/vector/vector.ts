import * as VC from "./index";

type VectorType = VC.Vector2D | VC.Vector3D | VC.Vector4D;
const vectorClasses = [VC.Vector2D, VC.Vector3D, VC.Vector4D];

export default abstract class Vector {
  abstract readonly size: 2 | 3 | 4;

  public copy(size?: 2 | 3 | 4, force: boolean = false): VectorType {
    if (size == undefined) size = this.size;
    if (size < this.size && !force)
      throw new Error("New vector size is less than before.");
    const vectorClass = vectorClasses[size - 2];
    return new vectorClass(...this.get_tuple());
  }

  public abstract get_tuple(): number[];
}
