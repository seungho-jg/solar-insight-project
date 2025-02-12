import type * as PIXI from 'pixi.js'
export class SolarPanel {
  width: number
  height: number
  position: {lat: number, lng: number}
  constructor(width: number, height: number, position: {lat: number, lng: number}) {
    this.width = width
    this.height = height
    this.position = position
  }

  draw(graphics: PIXI.Graphics, map: any) {
    // 현재 위치의 픽셀 좌표 얻기
    const pos = map.getProjection().containerPointFromCoords(
        new window.kakao.maps.LatLng(this.position.lat, this.position.lng)
    );

    // 현재 위치에서 width/height 미터만큼 떨어진 지점의 좌표 계산
    const rightPos = map.getProjection().containerPointFromCoords(
        new window.kakao.maps.LatLng(
            this.position.lat,
            this.position.lng + (this.width / 111000) // 경도 1도 = 약 111km
        )
    );
    const bottomPos = map.getProjection().containerPointFromCoords(
        new window.kakao.maps.LatLng(
            this.position.lat + (this.height / 111000),
            this.position.lng
        )
    );

    // 실제 픽셀 단위의 너비와 높이 계산
    const pixelWidth = Math.abs(rightPos.x - pos.x)
    const pixelHeight = Math.abs(bottomPos.y - pos.y)

    graphics.setStrokeStyle({color: '#566366', width: 1})
    graphics.setFillStyle({ color: '#f7df68', alpha: 0.7 })
    graphics.rect(
        pos.x - pixelWidth/2, 
        pos.y - pixelHeight/2, 
        pixelWidth, 
        pixelHeight
    );
    graphics.stroke()
    graphics.fill()
  }
}