<script>
  import { onMount } from "svelte";
  let map;
  onMount(() => {
      const container = document.getElementById('map');
      const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
      };
      map = new window.kakao.maps.Map(container, options);
  });
</script>

<div id="map" style="width:500px;height:400px;"></div>