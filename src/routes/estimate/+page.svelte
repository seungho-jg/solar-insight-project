<script lang="ts">
  let fakedata = [
    {
      id: 0,
      src: "https://picsum.photos/id/1/200/300",
      name: 'test01',
      wph: 240,
      width: 2.4,
      height: 4,
      cost: 14000,
    },
    {
      id: 1,
      src: "https://picsum.photos/id/2/200/300",
      name: 'test02',
      wph: 240,
      width: 2.4,
      height: 4,
      cost: 14000,
    },
    {
      id: 2,
      src: "https://picsum.photos/id/3/200/300",
      name: 'test03',
      wph: 240,
      width: 2.4,
      height: 4,
      cost: 14000,
    },
    {
      id: 3,
      src: "https://picsum.photos/id/4/200/300",
      name: 'test04',
      wph: 240,
      width: 2.4,
      height: 4,
      cost: 14000,
    },
    {
      id: 4,
      src: "https://picsum.photos/id/5/200/300",
      name: 'test05',
      wph: 240,
      width: 2.4,
      height: 4,
      cost: 14000,
    },
    {
      id: 5,
      src: "https://picsum.photos/id/6/200/300",
      name: 'test06',
      wph: 240,
      width: 2.4,
      height: 4,
      cost: 14000,
    }
  ]
  import Map from '$lib/pages/Map.svelte';
  import {Alert, AlertDescription} from '$lib/components/ui/alert';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
  import { editorStore } from '$lib/store/editorStore';
  import { estimateStore } from '$lib/store/estimateStore';
  import Input from '$lib/components/ui/input/input.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { writable } from 'svelte/store';
  import { kakaoMap } from '$lib/store/mapStore'
  import { fly } from 'svelte/transition';
  import  * as Carousel from '$lib/components/ui/carousel/index';
  import PanelSelectCard from '$lib/components/ui/card/PanelSelectCard.svelte';
  import MainBtn from '$lib/components/ui/button/button-main.svelte'

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
    editorStore.setComplete(false);
    $editorStore.graphEditor?.reset();
    $editorStore.panelEditor?.reset();
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
    $kakaoMap.setDraggable(true);
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
      <AlertDescription>{errorMsg}</AlertDescription>
    </Alert>
  </div>
{/if}

{#if $editorStore.isEditing&&$editorStore.isComplete} 
<div
  in:fly={{y: -25}}
  class="group w-full fixed top-4 z-30">
  <Carousel.Root
    opts={{
      align: "start"
    }}
    class=" w-1/2 mx-auto"
  >
    <Carousel.Content>
      {#each fakedata as data}
      <Carousel.Item
        class="2xl:basis-1/5 lg:basis-1/3 sm:basis-1/2"
      >
        <PanelSelectCard 
          isSelect={$estimateStore.currentPanelId === data.id} 
          onclick={() => estimateStore.setCurrentPanelId(data.id)}
          {...data}
        >
      </PanelSelectCard>
      </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
  <Carousel.Next />
  </Carousel.Root>
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
    <MainBtn 
      variant="default"
      class="drop-shadow-lg bg-stone-700 px-6 py-3 rounded-xl hover:bg-stone-500 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
      onclick={handleStartSelect}
      >
      영역선택
    </MainBtn>
  </div>
  {:else if $editorStore.isEditing&&!$editorStore.isComplete}
  <div 
    in:fly={{ y: 20 }} 
  >
    <MainBtn
      variant="cancel" 
      onclick={handleCancelSelcet}
      >
      선택해제
    </MainBtn>
    <MainBtn
      variant="default"
      onclick={handleCompleteSelect}
      >
      선택완료
    </MainBtn>
  </div>
  {:else}
  <div
    in:fly={{ y: 20 }} 
  >
      <MainBtn 
        variant="cancel" 
        onclick={handleCancelSelcet}
      >
      돌아가기
    </MainBtn>
    <MainBtn
      variant="default"
    >
      견적내기
    </MainBtn>
  </div>
  {/if}
</div>
<section class="w-full h-full">
  {#if isKakaoLoaded}
  <Map/>
  {/if}
</section>