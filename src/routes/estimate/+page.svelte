<script lang="ts">
  import Map from '$lib/pages/Map.svelte';
  import {Alert, AlertDescription} from '$lib/components/ui/alert';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
  import { editorStore } from '$lib/store/editorStore';
  import Input from '$lib/components/ui/input/input.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { writable } from 'svelte/store';
  import { kakaoMap } from '$lib/store/mapStore'
  import { fly } from 'svelte/transition';

  let address = $state('');
  let searchResults = writable<any>([]);
  let isKakaoLoaded = $state(false);
  let errorMsg = $state('');

  let showAlert = $state(false);

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
        errorMsg = '주소 검색에 실패했습니다.'
        showAlert = true;
        setTimeout(() => {
          showAlert = false;
        }, 1000);
      }
    });
    }
  }
  function handleStartSelect() {
    editorStore.toggleEditing();
    $kakaoMap.setZoomable(false);
    $kakaoMap.setDraggable(false);
    $kakaoMap.setCursor('crosshair');
  }
  function handleCancelSelcet() {
    editorStore.toggleEditing();
    $editorStore.graphEditor?.reset();
    $kakaoMap.setZoomable(true);
    $kakaoMap.setDraggable(true);
    $kakaoMap.setCursor('move');
  }

  function handleCompleteSelect() {
    if (!$editorStore.graphEditor?.polygon?.points?.length || $editorStore.graphEditor.polygon.points.length < 3) {
      errorMsg = '최소 점 3개 이상이 필요합니다 !'
      showAlert = true;
      setTimeout(() => {
        showAlert = false;
      }, 2000);
      return;
    }
    editorStore.toggleComplete();
    $editorStore.panelEditor?.setArea($editorStore.graphEditor.getPolygon())
    $editorStore.panelEditor?.draw()
    $editorStore.graphEditor?.draw()
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

{#if showAlert}
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-30" transition:fly={{ y: -20 }}>
    <Alert variant="destructive" class="bg-white shadow-lg border-2 py-2 backdrop-blur-sm">
      <!-- <AlertTitle level={1}>다시</AlertTitle> -->
      <AlertDescription>{errorMsg}</AlertDescription>
    </Alert>
  </div>
{/if}

{#if !$editorStore.isEditing&&!$editorStore.isComplete}
<div
  in:fly={{y: -25}}
  out:fly={{y: -25}}
  class="fixed flex flex-col top-4 z-20 items-center justify-center w-screen translate-x-5">
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
{/if}

<div class="px-2 w-full z-20 bottom-4 flex flex-row fixed items-center justify-center gap-5">
  {#if !$editorStore.isEditing&&!$editorStore.isComplete}
  <div
  in:fly={{ y: 20 }} 
  >
    <Button 
      class="bg-stone-700 px-6 py-3 rounded-xl hover:bg-stone-500 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
      onclick={handleStartSelect}
      >
      영역선택
    </Button>
  </div>
  {:else if $editorStore.isEditing&&!$editorStore.isComplete}
  <div 
    in:fly={{ y: 20 }} 
  >
    <Button 
      class="bg-rose-300 hover:bg-rose-500 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
      onclick={handleCancelSelcet}
      >
      선택해제
    </Button>
    <Button 
      class="bg-slate-400 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
      onclick={handleCompleteSelect}
      >
      선택완료
    </Button>
  </div>
  {:else}
  <div
    in:fly={{ y: 20 }} 
  >
    <Button>
      견적내기
    </Button>
  </div>
  {/if}
</div>
<section class="w-full h-full">
  {#if isKakaoLoaded}
  <Map/>
  {/if}
</section>