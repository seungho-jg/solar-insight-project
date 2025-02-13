<script lang="ts">
  import * as Card from '$lib/components/ui/card/index'
  import ButtonSmall from '$lib/components/ui/button/button-small.svelte';
  import { cn } from '$lib/utils'
  interface Props {
    id: number;
    src: string;
    name: string;
    width: number;
    height: number;
    wph: number;
    isSelect: boolean;
    cost: number;
    onclick: () => void;
  }

  let { id, src, name, width, height, wph, isSelect, cost, onclick } : Props = $props();

  function handleclick() {
    onclick();
  }

</script>

<div class={cn(
  // 기본 스타일
  "border-4 rounded-xl",
  // 선택 상태에 따른 테두리 색상
  isSelect ? 'border-rose-400' : 'border-transparent'
)}>
  <img 
    src={src}
    alt="solapanel"
    class="bg-slate-400  w-full rounded-t-lg object-cover aspect-[16/9] group-hover:h-[120px] h-0 transition-all duration-300"
  />
  <Card.Root class="px-3 py-2 group-hover:rounded-t-none rounded-t-lg">
    <div class="flex justify-between items-center">
      <div class="flex flex-col items-start">
        <Card.Title>{name}</Card.Title>
        <Card.Description class="text-xs text-slate-500">{wph}Wp</Card.Description>
      </div>
      <ButtonSmall
        variant={isSelect ? 'select' : 'default'}
        onclick={handleclick}
      >
      {isSelect ? '선택됨' : '선택'}
    </ButtonSmall>
    </div>
    <div class="flex justify-between items-end">
      <div class="text-sm">{width} x {height}<span class="text-xs text-slate-500">(w x h)</span></div>
      <div class="text-xs text-slate-500 ">예상 비용 : {cost}원</div>
    </div>
  </Card.Root>
</div>