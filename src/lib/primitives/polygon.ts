import { Point } from "./point"
import { Segment } from "./segment"

export class Polygon {
  points: Point[];
  segments: Segment[];

  constructor(points: Point[] = []) {
    this.points = points;
    this.segments = [];
    this.updateSegments();
  }

  updateSegments() {
    this.segments = [];
    for (let i = 0; i < this.points.length; i++) {
      this.segments.push(
        new Segment(
          this.points[i],
          this.points[(i+1) % this.points.length]
        )
      );
    }
  }
  addPoint(point: Point) {
    this.points.push(point);
    this.updateSegments()
  }

  // 다각형 면적 계산 (신발끈 공식)
  calculateArea(): number {
    let area = 0;
    for (let i = 0; i < this.points.length; i++) {
      const j = (i + 1) % this.points.length;
      area += this.points[i].x * this.points[j].y;
      area += this.points[j].x * this.points[i].y;
    }
    return Math.abs(area) / 2
  }
}

