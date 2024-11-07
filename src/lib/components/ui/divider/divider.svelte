<script>
	import { cn } from '$lib/utils';

	export let dividerLabel = '';
	let className = undefined;
	export { className as class };
</script>

<div class={cn('relative', className)}>
	<div class="absolute inset-0 flex items-center">
		<span class="w-full border-t"></span>
	</div>
	<div class="relative flex justify-center text-xs">
		<span class="bg-background px-2 text-muted-foreground">{dividerLabel}</span>
	</div>
</div>
