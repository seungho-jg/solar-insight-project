<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { GraphEditor } from './tools/graphEditor';
  import { editorStore } from '$lib/store/editorStore';
  import { onMount } from 'svelte';

  let map: any;
  let container: any;
  let pixiCanvas: any;
  let sprite: PIXI.Sprite;
  let graphEditor: GraphEditor;
  
  onMount(() => {
    // graphEditor가 생성된 후 스토어 구독
    const unsubscribe = editorStore.subscribe(state => {
      if (graphEditor) {
        console.log('isDrawing changed:', state.isEditing);
        graphEditor.isDrawing = state.isEditing;
      }
    });

    // 컴포넌트 언마운트 시 구독 해제
    return unsubscribe;
  });

  async function initPixi() {
      const app = new PIXI.Application()
      await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true
      })
      pixiCanvas = document.getElementById('pixiCanvas');
      pixiCanvas.style.pointerEvents = 'none';  // PIXI 캔버스의 이벤트를 비활성화
      pixiCanvas?.appendChild(app.canvas)


      await PIXI.Assets.load('favicon.png');
      sprite = PIXI.Sprite.from('favicon.png');
      sprite.x += 10
      sprite.y += 10
      sprite.width = 50;  // 스프라이트 크기 조정
      sprite.height = 50;
      app.stage.addChild(sprite);

      graphEditor = new GraphEditor(app, map);
  }

  $effect(() => {
    container = document.getElementById('map');

    async function initMap() {
      const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 2
      };
      map = new window.kakao.maps.Map(container, options);
      await initPixi()
    }
    initMap()

  });
</script>
<div>
  <div id="pixiCanvas" class="w-screen h-screen absolute z-10"></div>
  <div id="map" class="w-screen h-screen opacity-95"></div>
</div>