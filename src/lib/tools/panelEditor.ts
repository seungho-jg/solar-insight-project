import * as PIXI from 'pixi.js'
import { SolarPanel } from "../primitives/solarpanel";

interface bounds {
  south: number;
  north: number;
  west: number;
  east: number;
  center: {lat: number, lng: number};
}

export class PanelEditor {
  SPACING_X: number = -0.5
  SPACING_Y: number = 1.5
  WIDTH: number = 5
  HEIGHT: number = 2

  solarPanels: SolarPanel[]
  app: PIXI.Application
  graphics: PIXI.Graphics
  map: any
  polygon: any // kakao.maps.Polygon


  constructor(app: PIXI.Application, map: any ){
    this.app = app
    this.graphics = new PIXI.Graphics()
    this.solarPanels = Array<SolarPanel>()
    this.map = map
    app.stage.addChild(this.graphics)

    this.#addEventListeners();
  }

  reset(){
    this.polygon = null
    this.solarPanels = [];  
    this.draw()
  }
  
  #addEventListeners() {
    window.kakao.maps.event.addListener(this.map, 'bounds_changed', () => {
      this.draw();
    });
  }

  setArea(polygon: any) {
    this.polygon = polygon
    this.calculatePanelPositions()
    this.draw()
  }

  setPanelSize(width: number, height: number) {
    this.WIDTH = width
    this.HEIGHT = height
  }

  calculatePanelPositions() {
    // 영역 경계 계산
    const bounds = this.calculateBounds()
    // 위도/경도를 미터 단위로 변환
    const metersPerLat = 111000 // 위도 1도 111km
    const metersPerLng = Math.cos(bounds.center.lat * Math.PI / 180) * 111000
    
    const panelSpacingX = this.WIDTH + this.SPACING_X
    const panelSpacingY = this.HEIGHT + this.SPACING_Y

    for (let lat = bounds.south; lat <= bounds.north; lat += panelSpacingY / metersPerLat) {
      for (let lng = bounds.west; lng <= bounds.east; lng += panelSpacingX / metersPerLng) {
        const point = new window.kakao.maps.LatLng(lat, lng);
        
        if (this.isPointInPolygon(point)) {
          this.solarPanels.push(new SolarPanel(
            this.WIDTH,
            this.HEIGHT,
            { lat, lng }
          ));
        }
      }
    }
  }

  calculateBounds(): bounds {
    if (!this.polygon?.Ug || this.polygon.Ug.length < 3) {
      throw new Error("유효한 폴리곤이 없습니다.");
    }

    let north = -90, south = 90, east = -180, west = 180;
    
    // 폴리곤의 모든 점을 순회하며 경계값 찾기
    this.polygon.Ug.forEach((point: any) => {
      const lat = point.Ma;
      const lng = point.La;
      
      north = Math.max(north, lat);
      south = Math.min(south, lat);
      east = Math.max(east, lng);
      west = Math.min(west, lng);
    });

    return {
      north: north,
      south: south,
      west: west,
      east: east,
      center: {
        lat: (north + south) / 2,
        lng: (east + west) / 2
      }
    };
  }

  isPointInPolygon(point: any): boolean {
    if (!this.polygon?.Ug || this.polygon.Ug.length < 3) return false;

    const vertices = this.polygon.Ug;
    let inside = false;
    const x = point.getLng();
    const y = point.getLat();

    // Ray Casting 알고리즘
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].La;  // 현재 점의 경도
        const yi = vertices[i].Ma;  // 현재 점의 위도
        const xj = vertices[j].La;  // 이전 점의 경도
        const yj = vertices[j].Ma;  // 이전 점의 위도

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            
        if (intersect) inside = !inside;
    }

    return inside;
  }

  draw() {
    this.graphics.clear()
    this.solarPanels.forEach(panel => {
      panel.draw(this.graphics, this.map)
    })
  }
}