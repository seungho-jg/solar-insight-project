<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import { goto } from '$app/navigation';
  function handleClick() {
    goto('/estimate')
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="px-2 w-full z-20 bottom-4 flex flex-row fixed items-center justify-center gap-5">

  <Button onclick={handleClick}>
    견적내러가기
  </Button>
</div>