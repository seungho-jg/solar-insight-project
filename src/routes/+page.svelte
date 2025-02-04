<script>
  import Map from '../lib/Map.svelte';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
</script>

<svelte:head>
  <title>Home</title>
  <script src={`http://dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_MAP_API_KEY}`}></script> 
</svelte:head>

<div class="w-full absolute z-20 bottom-1 flex">
  <button class="bg-slate-400 p-3 rounded-xl mx-auto opacity-35 hover:opacity-100 transition-colors duration-75"> 견적내기</button>
</div>
<section class="w-full h-full">
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