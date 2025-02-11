import * as PIXI from 'pixi.js'
import { Point } from '$lib/primitives/point'
import { Polygon } from '$lib/primitives/polygon'

export class GraphEditor {
  app: PIXI.Application;
  map: any;
  graphics: PIXI.Graphics;
  polygon: Polygon;
  isDrawing: boolean;
  private latLngPoints: Array<{lat: number, lng: number}>

  constructor(app: PIXI.Application, map: any) {
    this.app = app;
    this.map = map;
    this.graphics = new PIXI.Graphics();
    this.polygon = new Polygon();
    this.isDrawing = false;
    this.latLngPoints = [];

    app.stage.addChild(this.graphics);
    this.#addEventListeners();
  }

  #addEventListeners() {
     // 카카오맵 클릭 이벤트 등록
    window.kakao.maps.event.addListener(this.map, 'click', this.#handleMouseClick.bind(this))

    window.kakao.maps.event.addListener(this.map, 'bounds_changed', () => {
      this.updatePolygonPosition();
    });

    // window.addEventListener('mousemove', (e : MouseEvent)=>{
    // })
    
    // window.kakao.maps.event.addListener(this.map, 'drag', () => {
    //   this.updatePolygonPosition();
    // });
  }

  #handleMouseClick(mouseEvent: any) {
    if (!this.isDrawing) return
    const latlng = mouseEvent.latLng;
      // 위경도 좌표 저장
      this.latLngPoints.push({
        lat: latlng.getLat(),
        lng: latlng.getLng()
      });

      // 화면 좌표로 변환
      const pos = this.map.getProjection().containerPointFromCoords(latlng);
      this.addPoint(new Point(pos.x, pos.y));
  }

  updatePolygonPosition() {
    // 저장된 위경도 좌표를 기반으로 폴리곤 위치 업데이트
    this.polygon.points = this.latLngPoints.map(latLng => {
      const pos = this.map.getProjection().containerPointFromCoords(
        new window.kakao.maps.LatLng(latLng.lat, latLng.lng)
      );
      return new Point(pos.x, pos.y);
    });
    this.polygon.updateSegments();
    this.draw();
  }

  addPoint(point: Point) {
    this.polygon.addPoint(point);
    this.draw();
  }

  reset(){
    this.polygon.points = [];
    this.polygon.segments = [];
    this.latLngPoints = [];  
    this.draw()
  }

  // 다각형 면적 계산
  calculateArea(): number {
    if (this.latLngPoints.length < 3) return 0;

    const path = this.latLngPoints.map(point => 
      new window.kakao.maps.LatLng(point.lat, point.lng)
    );

    // 폴리곤 생성
    const polygon = new window.kakao.maps.Polygon({
      path: path
    });

    // 면적 계산 (제곱미터 단위)
    return polygon.getArea();
  }

    // 다각형 면적 계산
    getPolygon() {
      if (this.latLngPoints.length < 3) return null;
  
      const path = this.latLngPoints.map(point => 
        new window.kakao.maps.LatLng(point.lat, point.lng)
      );
  
      // 폴리곤 생성
      const polygon = new window.kakao.maps.Polygon({
        path: path
      });
  
      return polygon
    }

  draw(){
    this.graphics.clear();

    // 선 그리기
    this.graphics.setStrokeStyle({
      width: 2,
      color: '#00a0e9'
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
    if (this.polygon.points.length < 3) return

    this.graphics.setFillStyle({
      color: '#00a0e9',
      alpha: 0.2
    })

    this.graphics.moveTo(this.polygon.points[0].x, this.polygon.points[0].y)
    for (let i = 1; i < this.polygon.points.length; i++){
      this.graphics.lineTo(this.polygon.points[i].x, this.polygon.points[i].y)
    }
    this.graphics.fill()
  }
}