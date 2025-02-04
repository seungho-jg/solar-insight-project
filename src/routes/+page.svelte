<script>
  import Map from '../lib/Map.svelte';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
</script>

<svelte:head>
  <title>Home</title>
  <script src={`http://dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_MAP_API_KEY}`}></script> 
</svelte:head>

<section>
  <Map/>
</section>

<style>
  section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 0.6;
  }
</style>