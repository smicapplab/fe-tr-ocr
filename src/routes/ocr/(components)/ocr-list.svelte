<script>
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input/index';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index';
	import {
		isOcrListLoading,
		lastEvalOcrStore,
		ocrListStore,
		ocrStatusStore,
		selectedOcrStore
	} from '$lib/stores/ocr';
	import { cn, formatName, formatTimeAgo } from '$lib/utils';
	import { derived, get, writable } from 'svelte/store';
	import { Icons } from '$lib/components/ui/icons';
	import { onMount } from 'svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Divider } from '$lib/components/ui/divider';
	import { ocrStatus } from '../config';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';

	export let fetchRecords;

	let isMounted = writable(false);
	let searchKey = '';

	// Derive the status from the URL
	const status = derived(page, ($page) => $page.url.searchParams.get('status') || '');

	const loadMore = async () => {};

	// Reactive statement to fetch records when status changes (only after mount)
	$: if (get(isMounted) && $status && browser) {
		ocrStatusStore.set($status);
		lastEvalOcrStore.set(null);
		fetchRecords();
	}

	// onMount block for initial setup
	onMount(() => {
		if (browser) {
			lastEvalOcrStore.set(null);
			ocrListStore.set([]);
			fetchRecords();
			isMounted.set(true); // Set isMounted to true after the initial fetch
		}
	});
</script>

<div class="bg-background/95 bg-slate-100 p-2 backdrop-blur">
	<form>
		<Label for="picture" class="font-bold">Search</Label>
		<div class="flex items-center">
			<div class="relative flex-grow">
				<Icons.search
					class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
				/>
				<Input class="w-full pl-8" bind:value={searchKey} />
			</div>
		</div>
	</form>
	<span class="overflow-hidden text-ellipsis whitespace-nowrap text-xs italic"
		>Enter Customer name and hit 'Enter' to search.</span
	>
</div>

<Divider class={$lastEvalOcrStore ? 'mb-10' : 'mb-5'} />
{#if $lastEvalOcrStore}
	<div class="flex items-center justify-end px-3">
		<Button variant="link" size="xs" on:click={loadMore} class="flex items-center">
			Load More
			{#if $isOcrListLoading}
				<Icons.loaderPinwheel class="ml-1 h-4 animate-spin" />
			{:else}
				<Icons.download class="ml-1 h-4" />
			{/if}
		</Button>
	</div>
{/if}

<ScrollArea class="h-full max-h-screen-minus-400">
	<div class="flex flex-col gap-2 p-2 pt-2">
		{#if $isOcrListLoading}
			<Skeleton class="flex h-10 flex-col items-start gap-2 rounded-lg bg-slate-300" />
			<Skeleton class="flex h-10 flex-col items-start gap-2 rounded-lg bg-slate-300" />
			<Skeleton class="flex h-10 flex-col items-start gap-2 rounded-lg bg-slate-300" />
		{:else if $ocrListStore && $ocrListStore.length > 0}
			{#each $ocrListStore as item}
				{@const itemStatus = ocrStatus[item.currentStep]}
				<button
					class={cn(
						'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
						$selectedOcrStore.sk === item.sk && 'bg-muted'
					)}
					on:click={() => selectedOcrStore.set(item)}
				>
					<div class="font-semibold">{formatName(item.form?.accountName || '')}</div>
					<div class="font-light">Uploaded {formatTimeAgo(new Date(item.sk))}</div>
					<Badge variant="outline">
						<svelte:component
							this={itemStatus.icon}
							class={cn(
								'mr-2 size-4',
								['PENDING', 'PARTIAL:BLOCKS'].includes(item.currentStep) && 'animate-spin'
							)}
							aria-hidden="true"
						/>
						{itemStatus.label}
					</Badge>
				</button>
			{/each}
		{:else}
			<div>Found No Records</div>
		{/if}
	</div>
</ScrollArea>
