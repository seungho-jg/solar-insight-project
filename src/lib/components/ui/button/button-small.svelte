<script lang='ts'>
  import Button from '$lib/components/ui/button/button.svelte' 
  import { cn } from '$lib/utils'
  interface Props {
    class?: string;
    variant?: 'default' | 'cancel' | 'confirm' | 'select';
    children: any;
    [key: string]: any;  // rest props
  }
  let { class: className, variant, children, ...restProps }: Props = $props()
</script>

<Button
  class={cn(
    // 기본 스타일
    'bg-rose-400 hover:bg-rose-500 text-sm px-4 py-1 rounded-xl transition-all duration-200 shadow-lg font-semibold',
    className,
    variant === 'default' ? 'bg-stone-700 hover:bg-stone-500' : '',
    variant === 'cancel' ? 'bg-rose-300 hover:bg-rose-500' : '',
    variant === 'select' ? 'bg-rose-400 hover:bg-rose-500' : '',
  )}
  {...restProps}
  size={'sm'}
>
    {@render children()}
</Button>