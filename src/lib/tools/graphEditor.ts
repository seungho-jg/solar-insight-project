import * as PIXI from 'pixi.js'
import { Point } from '$lib/primitives/point'
import { Polygon } from '$lib/primitives/polygon'

export class GraphEditor {
  app: PIXI.Application;
  graphics: PIXI.Graphics;
  polygon: Polygon;
  isDrawing: boolean;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.graphics = new PIXI.Graphics();
    this.polygon = new Polygon();
    this.isDrawing = false;

    app.stage.addChild(this.graphics);
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.app.canvas.addEventListener('click', (e) => {
      // const rect = (this.app.canvas as HTMLCanvasElement)
      const x = e.offsetX;
      const y = e.offsetY;

      this.addPoint(new Point(x, y));
    })
  }
  addPoint(point: Point) {
    this.polygon.addPoint(point);
    this.draw();
  }
  draw(){
    this.graphics.clear();

    // 선 그리기
    this.graphics.setStrokeStyle({
      width: 2,
      color: 0x000000
    });
    this.polygon.segments.forEach(seg => {
      this.graphics.moveTo(seg.p1.x, seg.p1.y);
      this.graphics.lineTo(seg.p2.x, seg.p2.y)
      this.graphics.stroke()
    })

    // 점 그리기
    this.graphics.setFillStyle({color: 'red'});
    this.polygon.points.forEach(point => {
      this.graphics.circle(point.x, point.y, 5)
      this.graphics.fill()
    })

    // 면적 표시
    if (this.polygon.points.length > 2) {
      const area = this.polygon.calculateArea();
      console.log(`면적: ${area.toFixed(2)} 제곱픽셀`)
    }
  }
}