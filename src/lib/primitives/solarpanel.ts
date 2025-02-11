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
    const pos = map.getProjection().containerPointFromCoords(
      new window.kakao.maps.LatLng(this.position.lat, this.position.lng)
    )
    console.log(pos)
    graphics.setFillStyle({ color: '#ffff00', alpha: 0.7})
    graphics.rect(pos.x, pos.y, this.width, this.height)
    graphics.fill()
  }
}