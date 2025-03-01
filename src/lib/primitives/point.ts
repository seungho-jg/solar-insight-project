export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }
  distanceTo(point: Point): number {
    return Math.hypot(this.x - point.x, this.y - point.y);
  }
} 