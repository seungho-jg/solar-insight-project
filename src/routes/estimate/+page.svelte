<script>
  import Map from '$lib/pages/Map.svelte';
  import { PUBLIC_KAKAO_MAP_API_KEY } from '$env/static/public';
  import { editorStore } from '$lib/store/editorStore';
  import Input from '$lib/components/ui/input/input.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { writable } from 'svelte/store';
  let address = '';
  let searchResults = writable([]);

  function searchAddress() {
  //   const geocoder = new window.kakao.map.services.Geocoder();

  //   geocoder.addressSearch(address, function(result, status) {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       searchResults.set(result);
  //       console.log(result)
  //     } else {
  //       alert('주소 검색에 실패했습니다.');
  //     }
  //   })
  }

</script>

<svelte:head>
  <title>Home</title>
  <script src={`http://dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_MAP_API_KEY}&libraries=services`}></script> 
</svelte:head>

<div class="fixed flex flex-col top-4 z-20 items-center justify-center w-screen translate-x-5">
  <div class="flex flex-row gap-3 opacity-90">
    <Input type="text" bind:value={address} placeholder="주소를 입력해주세요"></Input>
    <Button onclick={searchAddress}>검색</Button>
  </div>
  <ul>
    {#each $searchResults as result}
      <li>{result.address_name}</li>
    {/each}
  </ul>
</div>

<div class="px-2 w-full z-20 bottom-4 flex flex-row fixed items-center justify-center gap-5">
  <Button 
    class="bg-slate-400 px-6 py-3 rounded-xl opacity-35 hover:opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold"
    onclick={editorStore.toggleEditing}
    >
    영역선택
  </Button>
  <Button class="bg-slate-400 px-6 py-3 rounded-xl opacity-35 hover:opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold">
    견적내기
  </Button>
</div>
<section class="w-full h-full">
  <Map/>
</section>