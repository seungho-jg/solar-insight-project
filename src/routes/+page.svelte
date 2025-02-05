<script>
  import Map from '../lib/Map.svelte';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
</script>

<svelte:head>
  <title>Home</title>
  <script src={`http://dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_MAP_API_KEY}`}></script> 
</svelte:head>

<div class="w-full z-20 bottom-4 flex flex-row fixed items-center justify-center gap-5">
  <button class="bg-slate-400 px-6 py-3 rounded-xl opacity-35 hover:opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold">
    영역선택
  </button>
  <button class="bg-slate-400 px-6 py-3 rounded-xl opacity-35 hover:opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold">
    견적내기
  </button>
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