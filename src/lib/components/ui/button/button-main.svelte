<script lang='ts'>
  import Button from '$lib/components/ui/button/button.svelte' 
  import { cn } from '$lib/utils'
  interface Props {
    class?: string;
    variant?: 'default' | 'cancel' | 'confirm';
    children: any;
    [key: string]: any;  // rest props
  }
  let { class: className, variant, children, ...restProps }: Props = $props()
</script>

<Button
  class={cn(
    // 기본 스타일
    'rop-shadow-lg px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold',
    className,
    variant === 'default' ? 'bg-stone-700 hover:bg-stone-500' : '',
    variant === 'cancel' ? 'bg-rose-300 hover:bg-rose-500' : ''
  )}
  {...restProps}
>
    {@render children()}
</Button>