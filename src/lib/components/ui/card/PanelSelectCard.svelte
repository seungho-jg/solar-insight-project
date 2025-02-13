<script>
  import * as Card from '$lib/components/ui/card/index'
  let {id, name, width, height} = $props()
</script>
<div class="shadow-lg hover:shadow-xl transition-shadow duration-300">
  <img 
    src="https://picsum.photos/seed/picsum/200/300" 
    alt="solapanel"
    class="bg-slate-400 w-full rounded-t-lg h-[100px]"/>
  <Card.Root class="px-3 py-2 rounded-t-none">
    <Card.Title>{name}</Card.Title>
    <div>{width} x {height}</div>
  </Card.Root>
</div>