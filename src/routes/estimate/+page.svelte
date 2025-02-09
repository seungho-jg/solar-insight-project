<script lang="ts">
  import Map from '$lib/pages/Map.svelte';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
  import { editorStore } from '$lib/store/editorStore';
  import Input from '$lib/components/ui/input/input.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { writable } from 'svelte/store';
  import { kakaoMap } from '$lib/store/mapStore'

  let address = '';
  let searchResults = writable<any>([]);
  let isKakaoLoaded = false;

  function handleLoad() {
    window.kakao.maps.load(() => {
      isKakaoLoaded = true;
    });
  }
  function handleMove() {
    const result = $searchResults[0];  // 첫 번째 검색 결과 사용
    const moveLatLng = new window.kakao.maps.LatLng(result.y, result.x);
    $kakaoMap.setCenter(moveLatLng);
    searchResults.set([]);
    address = '';
  }
  function handleSearch() {
    if (isKakaoLoaded) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function(result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        searchResults.set(result);
      } else {
        alert('주소 검색에 실패했습니다.');
      }
    });
    }
  }
  function handleEstimateBtn() {
    editorStore.toggleEditing()
    $kakaoMap.setZoomable(false)
  }
  function handleEstimateCancel() {
    editorStore.toggleEditing()
    $editorStore.graphEditor?.reset()
    $kakaoMap.setZoomable(true)
  }
</script>

<svelte:head>
  <title>Home</title>
  <script 
    async
    src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
    onload={handleLoad}
  ></script>
</svelte:head>

<div class="fixed flex flex-col top-4 z-20 items-center justify-center w-screen translate-x-5">
  <div class="flex flex-row gap-3 opacity-90">
    <Input type="text" bind:value={address} placeholder="주소를 입력해주세요"></Input>
    <Button onclick={handleSearch}>검색</Button>
  </div>
  <div class="flex flex-col max-w-screen-sm px-10 mt-5">
    {#each $searchResults as result}
      <button class="bg-stone-200 opacity-90 p-3 -translate-x-5 hover:bg-slate-400 transition-colors rounded-sm flex items-center" onclick={handleMove}>
        <span class="text-xs text-slate-700 leading-none">검색결과: </span>
        <span class="leading-none ml-1">{result.address_name}</span>
      </button>
    {/each}
  </div>
</div>

<div class="px-2 w-full z-20 bottom-4 flex flex-row fixed items-center justify-center gap-5">
  {#if !$editorStore.isEditing}
  <Button 
    class="bg-stone-700 px-6 py-3 rounded-xl hover:bg-stone-500 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
    onclick={handleEstimateBtn}
    >
    영역선택
  </Button>
  {:else}
  <Button 
    class="bg-rose-300 hover:bg-rose-500 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
    onclick={handleEstimateCancel}
    >
    선택해제
  </Button>
  <Button class="bg-slate-400 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold">
    견적내기
  </Button>
  {/if}
</div>
<section class="w-full h-full">
  {#if isKakaoLoaded}
  <Map/>
  {/if}
</section>