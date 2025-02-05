import { Point } from "./point";

export class Segment {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }
  length(): number {
    return this.p1.distanceTo(this.p2);
  }
  includes(point: Point): boolean {
    return this.p1.equals(point) || this.p2.equals(point);
  }
}