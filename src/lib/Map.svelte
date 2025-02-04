<script lang="ts">
  import * as PIXI from 'pixi.js'
  let map: any;
  let container: any
  let pixiCanvas: any
  let sprite: PIXI.Sprite

  async function init() {
      const app = new PIXI.Application()
      await app.init({
        resizeTo: window,
        backgroundAlpha: 0
      })
      pixiCanvas = document.getElementById('pixiCanvas');
      pixiCanvas?.appendChild(app.canvas)
      await PIXI.Assets.load('favicon.png');
      sprite = PIXI.Sprite.from('favicon.png');
      sprite.x += 10
      sprite.y += 10
      sprite.width = 50;  // 스프라이트 크기 조정
      sprite.height = 50;
      app.stage.addChild(sprite)
    }

  $effect(() => {
    container = document.getElementById('map');

    async function initMap() {
      const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
      };
      map = new window.kakao.maps.Map(container, options);
      await init()
    }
    initMap()

  });
</script>
<div>
  <div id="pixiCanvas" class="w-screen h-screen absolute z-10"></div>
  <div id="map" class="w-screen h-screen opacity-95"></div>
</div>